/**
 * netlify/functions/tts.js
 * 发音代理：GET /.netlify/functions/tts?text=Hallo&lang=de
 * 用 edge-tts-universal 调微软 Edge 在线语音（免 API Key），返回 MP3。
 *
 * 三个设计点（都对应真实坑）：
 *  1. 9 秒硬超时——连不上微软时这个库不抛错、只会一直挂着，
 *     不兜底就会拖到 Netlify 的 60 秒上限，前端要转圈一分钟才降级。
 *  2. 公开地址没有鉴权，限制 300 字符 + CDN 缓存 1 天，防止被刷额度。
 *  3. 所有响应（含 4xx/5xx）都带 CORS 头，方便前端和你在浏览器里直接排查。
 */

const { Communicate } = require('edge-tts-universal');

const VOICES = { de: 'de-DE-KatjaNeural', zh: 'zh-CN-XiaoxiaoNeural' };
const MAX_TEXT = 300;
const TIMEOUT_MS = 9000;
const CONNECT_TIMEOUT_MS = 8000;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

function json(statusCode, payload) {
  return {
    statusCode: statusCode,
    headers: Object.assign({}, CORS, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    }),
    body: JSON.stringify(payload),
  };
}

async function synthesize(text, voice) {
  const communicate = new Communicate(text, {
    voice: voice,
    connectionTimeout: CONNECT_TIMEOUT_MS,
  });
  const chunks = [];
  for await (const chunk of communicate.stream()) {
    if (chunk.type === 'audio' && chunk.data && chunk.data.length) {
      chunks.push(Buffer.from(chunk.data));
    }
  }
  if (chunks.length === 0) throw new Error('微软服务未返回音频数据');
  return Buffer.concat(chunks);
}

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS, body: '' };
  }
  if (event.httpMethod !== 'GET') {
    return json(405, { error: '只支持 GET 请求' });
  }

  const params = event.queryStringParameters || {};
  const text = String(params.text == null ? '' : params.text)
    .replace(/\s+/g, ' ')
    .trim();
  const lang = String(params.lang == null ? '' : params.lang).toLowerCase();

  if (!text) return json(400, { error: '缺少 text 参数' });
  if (text.length > MAX_TEXT) {
    return json(400, { error: '文本过长，上限 ' + MAX_TEXT + ' 字符' });
  }
  if (!VOICES[lang]) {
    return json(400, { error: "lang 只支持 'de' 或 'zh'" });
  }

  const voice = VOICES[lang];
  let timer = null;

  try {
    const work = synthesize(text, voice);
    // 超时之后这条链的失败不要再冒泡成 unhandled rejection
    work.catch(function () {});

    const audio = await Promise.race([
      work,
      new Promise(function (_, reject) {
        timer = setTimeout(function () {
          reject(new Error('合成超时（超过 ' + TIMEOUT_MS + ' 毫秒）'));
        }, TIMEOUT_MS);
      }),
    ]);

    return {
      statusCode: 200,
      headers: Object.assign({}, CORS, {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400', // CDN 缓存 1 天，重复请求不再合成
        'X-TTS-Voice': voice,
      }),
      body: audio.toString('base64'), // 二进制必须 base64 + isBase64Encoded
      isBase64Encoded: true,
    };
  } catch (err) {
    console.error('[tts] 合成失败：', err && err.message);
    return json(500, {
      error: '语音合成失败',
      detail: String((err && err.message) || err),
    });
  } finally {
    if (timer) clearTimeout(timer);
  }
};