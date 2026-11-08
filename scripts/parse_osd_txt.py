#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
scripts/parse_osd_txt.py
=======================
【第一步 · 正则粗加工】处理 data/_raw/osd/B1/ 下的纯文本，尝试用 a) b) c) 匹配
提取 B1 选择题（阅读理解 / 听力选择），输出到 data/_staging/。

⚠️ 重要事实（决定本脚本行为）：
    OSD「Modellsatz HP」= Kandidatenblätter（仅试题）。正确答案标记位于文件末尾
    独立的「Lösungen」区，且该区排版错位（字母三连/答案网格与题号无内联对应），
    无法用正则可靠地映射回题干。为遵守"绝对不要瞎编"红线，本脚本【不臆测正确项】。

因此：
    - 能稳定切分出的 a/b/c(/d) 题块 → 转入 osd_b1_errors.json（含题干、选项文本、
      选项字母标签、原始文本、reason），供人工标注正确项。
    - 排版严重错位的 ZDÖ 卷（A/B/C 与选项文本线性交错，pypdf 抽取错位）→ 按题号切分
      保留原文，同样转入 errors，reason 标注"结构不清晰"。
    - osd_b1_parsed.json → 合法空数组 []（没有可忠实确定正确项的题目，绝不塞假数据）。

红线：
    1) 不修改 data/questions.js；
    2) 不把结果推入任何前端变量；
    3) 输出仅存在于 data/_staging/。
"""

import os
import re
import json
import glob

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW_DIR = os.path.join(BASE, "data", "_raw", "osd", "B1")
STAGING_DIR = os.path.join(BASE, "data", "_staging")
PARSED_PATH = os.path.join(STAGING_DIR, "osd_b1_parsed.json")
ERRORS_PATH = os.path.join(STAGING_DIR, "osd_b1_errors.json")

PAGE_RE = re.compile(r"^--- Page \d+ ---\s*$")
LETTER_RE = re.compile(r"^[a-d]$")         # 单独一行的 a/b/c/d（仅小写：ZB1 风格）
QNUM_RE = re.compile(r"^\d{1,2}\s")        # 题干/陈述以 1-2 位数字+空格开头（B1 题号≤29）
ANSWER_HEADER_RE = re.compile(r"(Lesen|Hören)\s*[–-]\s*Lösungen")  # 答案键区块标题


def load_candidate_lines(text):
    """切到答案键之前，去掉分页符，返回清洗后的行列表与模块标注。"""
    all_lines = text.splitlines()
    cut_idx = None
    for idx, ln in enumerate(all_lines):
        if ANSWER_HEADER_RE.search(ln):
            cut_idx = idx
            break
    if cut_idx is not None:
        all_lines = all_lines[:cut_idx]
    lines = [ln.strip() for ln in all_lines if not PAGE_RE.match(ln.strip())]

    # 模块标注（阅读理解 / 听力选择）
    mod = ["阅读理解"] * len(lines)
    cur = "阅读理解"
    for i, l in enumerate(lines):
        low = l.lower()
        if "hör" in low:
            cur = "听力选择"
        elif "lesen" in low:
            cur = "阅读理解"
        mod[i] = cur
    return lines, mod


def find_letter_runs(lines):
    """返回所有『连续 3 或 4 个单独字母行』的 (start, length)。"""
    runs = []
    i, n = 0, len(lines)
    while i < n:
        if LETTER_RE.match(lines[i]):
            j = i
            while j < n and LETTER_RE.match(lines[j]):
                j += 1
            length = j - i
            if length in (3, 4):
                runs.append((i, length))
            i = j
        else:
            i += 1
    return runs


def validate_options(opts):
    """选项文本必须是真实句子：长度>3 且不是单独字母行。"""
    if len(opts) not in (3, 4):
        return False
    for o in opts:
        if len(o) < 4 or LETTER_RE.match(o):
            return False
    return True


def extract_mc_blocks(lines, runs, mod_map):
    """根据字母连续锚点切分题干 + 选项文本 + 字母标签。

    仅认小写 a/b/c/d 锚点（ZB1 风格：选项文本紧跟在字母之前）。
    守卫：题干区必须含题号（避免把封面/说明前言误当题干）；
          跳过 Beispiel / Bsp. 示例块。
    """
    blocks = []
    prev = 0
    for (a, length) in runs:
        opt_texts = lines[a - length:a]              # 锚点前的 length 行 = 选项文本
        letters = lines[a:a + length]                # 锚点行 = 选项字母
        stem_lines = lines[prev:a - length]          # 再往前 = 题干

        # 守卫：题干区必须存在题号，否则是封面/说明前言 → 跳过
        if not any(QNUM_RE.match(x) for x in stem_lines):
            prev = a + length
            continue

        # 题干从最后一个「数字开头」行开始，去掉前面的说明文字
        start = 0
        for k in range(len(stem_lines) - 1, -1, -1):
            if QNUM_RE.match(stem_lines[k]):
                start = k
                break
        q_lines = stem_lines[start:]

        opts = [o.strip() for o in opt_texts if o.strip()]
        q = " ".join(s.strip() for s in q_lines if s.strip())
        q = re.sub(r"^\d+\s*", "", q).strip()

        # 跳过示例块（Beispiel / Bsp.）
        if re.search(r"beispiel|bsp\.|beispiele", q.lower()):
            prev = a + length
            continue

        if q and validate_options(opts):
            blocks.append({
                "stem": q,
                "options": opts,
                "option_letters": letters,
                "type": mod_map[a] if a < len(mod_map) else "阅读理解/听力选择",
            })
        prev = a + length
    return blocks


def fallback_by_question_number(lines, name, mod_map):
    """兜底：对无法干净切分的卷，按题号切分保留原文（结构不清晰）。"""
    errors = []
    # 找所有题号行的位置
    idxs = [i for i, l in enumerate(lines) if QNUM_RE.match(l)]
    if not idxs:
        return errors
    MAX_CHUNK = 1500  # 超过则视为多题/说明混排的大块，丢弃（非单题）
    for k in range(len(idxs)):
        s = idxs[k]
        e = idxs[k + 1] if k + 1 < len(idxs) else len(lines)
        chunk = " ".join(lines[s:e]).strip()
        if len(chunk) < 20 or len(chunk) > MAX_CHUNK:
            continue
        mtype = mod_map[s] if s < len(mod_map) else "阅读理解/听力选择"
        errors.append({
            "source": name,
            "type": mtype,
            "q": "",
            "options": [],
            "option_letters": [],
            "raw": chunk,
            "reason": ("结构不清晰：该卷(如 ZDÖ B1)排版为 A/B/C 字母与选项文本在 PDF 中"
                       "线性交错，pypdf 抽取严重错位，无法可靠切分『题干+选项』；"
                       "已按题号切分仅保留原文，供人工在源 PDF 中核对后标注正确项。"),
        })
    return errors


def main():
    os.makedirs(STAGING_DIR, exist_ok=True)
    errors = []
    parsed = []  # 无忠实可确定正确项的题目，保持空（见文件头说明）

    files = sorted(glob.glob(os.path.join(RAW_DIR, "*.txt")))
    for fp in files:
        name = os.path.basename(fp)
        text = open(fp, encoding="utf-8").read()
        lines, mod_map = load_candidate_lines(text)
        runs = find_letter_runs(lines)
        blocks = extract_mc_blocks(lines, runs, mod_map)

        if blocks:
            for b in blocks:
                errors.append({
                    "source": name,
                    "type": b["type"],
                    "q": b["stem"],
                    "options": b["options"],
                    "option_letters": b["option_letters"],
                    "raw": (b["stem"] + "\n" + "\n".join(b["options"])),
                    "reason": ("结构不清晰：候选卷(Modellsatz HP/Kandidatenblätter)未标注正确选项；"
                               "答案键在独立 Lösungen 区且排版错位，正则无法可靠映射回题号。"
                               "依「禁止瞎编」红线，无法拆分 a(正确选项)/distractors(错误选项)，"
                               "已转存供人工对照 Lösungen 标注正确项。"),
                })
        else:
            # 干净提取为 0 → 该卷排版错位，按题号兜底保留原文
            errors.extend(fallback_by_question_number(lines, name, mod_map))

    with open(PARSED_PATH, "w", encoding="utf-8") as f:
        json.dump(parsed, f, ensure_ascii=False, indent=2)
    with open(ERRORS_PATH, "w", encoding="utf-8") as f:
        json.dump(errors, f, ensure_ascii=False, indent=2)

    print("处理的 B1 文件数 :", len(files))
    print("parsed（已忠实确定正确项）:", len(parsed))
    print("errors（已切分题干+选项 / 或保留原文，待人工标注正确项）:", len(errors))


if __name__ == "__main__":
    main()
