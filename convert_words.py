import json
import re
import os

# 1. 词性映射表
POS_MAP = {
    'Vt': '动词', 'Vi': '动词', 'Adj': '形容词', 'Adv': '副词',
    'Präp': '介词', 'Konj': '连词', 'Pron': '代词', 'Num': '数词',
    'Art': '冠词', 'Interj': '感叹词', 'm': '名词', 'f': '名词', 'n': '名词',
}

words = []
file_path = 'pgh.csv'  # 你的CSV文件名

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#'): continue

            # 提取德语和词性/翻译
            if '"' not in line: continue
            parts = line.split('"', 1)
            german_part = parts[0].strip()
            rest = parts[1].rstrip('"').strip()

            if not german_part or not rest: continue

            # 提取词性
            pos = '其他'
            translation = rest
            found_pos = False

            # 尝试从映射表匹配词性
            for key, chinese_pos in POS_MAP.items():
                if rest.startswith(key + ' ') or rest.startswith(key + '/'):
                    pos = chinese_pos
                    translation = rest[len(key):].strip()
                    found_pos = True
                    break

            # 如果没匹配到，检查是否以 m/f/n 开头（名词）
            if not found_pos:
                if re.match(r'^[mfn]\s*[,.]', rest):
                    pos = '名词'
                    translation = re.sub(r'^[mfn]\s*[,.]?\s*', '', rest).strip()

            # 清理翻译文本
            translation = re.sub(r'^[,，]\s*', '', translation)

            if german_part and translation:
                words.append({
                    "word": german_part,
                    "translation": translation,
                    "phonetic": "",
                    "pos": pos
                })
except FileNotFoundError:
    print(f"❌ 找不到文件：{file_path}，请确保它在同一个文件夹！")
    exit()

print(f"✅ 成功解析 {len(words)} 个单词")

# 写入 data/words.js
os.makedirs('data', exist_ok=True)
with open('data/words.js', 'w', encoding='utf-8') as f:
    f.write('window.ALL_WORDS = ' + json.dumps(words, ensure_ascii=False, indent=2) + ';')

print("🎉 data/words.js 已生成！刷新你的网页看看！")