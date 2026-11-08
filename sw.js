/* ============================================================================
 * 德语自适应学习小站 · Service Worker（v1.3 PWA 封装）
 *
 * 缓存策略：Stale-While-Revalidate（同源 / GET / 非音频 / 非 Range）
 *   - 命中缓存：立刻返回旧版保证秒开，同时后台拉取最新版写回缓存
 *   - 未命中：等网络，成功后写回；离线且无缓存时导航请求回退 index.html
 *
 * ★ 绝对红线：data/audio/ 下的 MP3 一律不由本 SW 接管、不进 Cache Storage。
 *   听力音轨合计 100MB+，缓存会撑爆手机空间；音频始终走网络（离线时自然
 *   不可用，由页面 offline 轻提示告知用户）。
 *   注意：本文件里出现的 mp3 字样「只」在 isAudioAsset() 排除规则中，
 *   PRECACHE 数组内零音频文件。改代码时请勿删除该排除闸门。
 *
 * 版本升级：改动 PRECACHE 或缓存策略后请把 CACHE_NAME 版本号 +1，
 *   activate 会自动删除旧缓存，避免老用户长期停留在旧版页面。
 * ========================================================================== */
'use strict';

const CACHE_NAME = 'de-trainer-shell-v3';   /* v1.5：上线 PWA 更新检测与提示，+1 强制所有老用户触发更新 */
const SCOPE = self.registration.scope;

/* 只列离线必需的外壳资源：HTML、4 个 data/*.js、manifest、UI 图片。
   这里绝无任何音频文件。 */
const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './data/questions.js',
  './data/words.js',
  './data/dictation.js',
  './data/phonics.js',
  './img/hina-icon.png',
  './img/hina-face.png',
  './img/lv1.png',
  './img/lv2.png',
  './img/lv3.png',
  './img/lv4.png',
  './img/lv5.png'
];

function abs(u) { return new URL(u, SCOPE).href; }

/* 音频闸门：路径含 /data/audio/，或任何音频后缀 → 完全不拦截、不缓存 */
function isAudioAsset(u) {
  return /\/data\/audio\//i.test(u.pathname) ||
         /\.mp3($|[?#])/i.test(u.href) ||
         /\.(m4a|aac|ogg|wav|webm)($|[?#])/i.test(u.href);
}

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      /* 逐个 add + 单条 catch：某个图片 404 不让整个 install 失败 */
      return Promise.all(PRECACHE.map(function (u) {
        return cache.add(new Request(abs(u), { cache: 'reload' })).catch(function () {});
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE_NAME; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  const req = event.request;
  if (req.method !== 'GET') return;

  let u;
  try { u = new URL(req.url); } catch (e) { return; }

  if (u.origin !== self.location.origin) return;   /* 跨域（TTS / 翻译等）不接管 */
  if (isAudioAsset(u)) return;                    /* ★ 音频零缓存：直接走网络 */
  if (req.headers.has('range')) return;           /* Range 请求不缓存 */

  event.respondWith((async function () {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req);

    const network = fetch(req).then(function (res) {
      if (res && res.ok && res.type === 'basic') {
        cache.put(req, res.clone()).catch(function () {});
      }
      return res;
    }).catch(function () { return null; });

    if (cached) {
      event.waitUntil(network);                   /* 后台静默更新，不阻塞秒开 */
      return cached;
    }
    const fresh = await network;
    if (fresh) return fresh;

    if (req.mode === 'navigate') {
      const shell = await cache.match(abs('./index.html')) || await cache.match(abs('./'));
      if (shell) return shell;
    }
    return new Response('', { status: 504, statusText: 'Offline' });
  })());
});
