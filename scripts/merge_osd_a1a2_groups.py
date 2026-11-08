#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""把 A1 / A2 终极 Schema 大组题追加到 data/questions.js 的 bank[1] / bank[2] 末尾。

沿用 v0.5 合并 B1 的方式：
- 只在数字等级数组的闭合 `],` 之前插入新字面量，原有题目一行不动、索引不变。
- 每个大组补两个「旧链路兼容字段」（与 B1 组题完全一致）：
    q : 'ÖSD A1 · <module>（N 小题）'   供错题本 / 朗读 / 兜底显示
    a : ['[大组题，请展开作答]']        供旧判题链路不崩（非组题判分依据）
- 保持源文件原有换行符（CRLF / LF），不做全文件重排。

红线：绝不覆盖/清空任何原题；重复执行会被 assert 拦下。
"""
import os
import json

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(BASE, "data", "questions.js")

# 从后往前插入，避免前一个插入点影响后一个行号
PLAN = [
    (2, "A2", os.path.join(BASE, "data", "_staging", "osd_a2_parsed_group.json")),
    (1, "A1", os.path.join(BASE, "data", "_staging", "osd_a1_parsed_group.json")),
]


def key_start(lines, key):
    tag = "%d: [" % key
    return next(i for i, l in enumerate(lines) if l.strip().startswith(tag))


def array_close(lines, start, end):
    """找 bank[key] 数组的闭合行：start..end 之间最后一个恰为 '],' 的行。"""
    hits = [i for i in range(start, end) if lines[i].strip() == "],"]
    if not hits:
        raise RuntimeError("未找到数组闭合行 %d..%d" % (start, end))
    return max(hits)


def js_blocks(groups, level):
    out = []
    for g in groups:
        item = dict(g)
        item["q"] = "ÖSD %s · %s（%d 小题）" % (
            level, item.get("module") or item.get("type") or "组题", len(item["questions"]))
        item["a"] = ["[大组题，请展开作答]"]
        text = json.dumps(item, ensure_ascii=False, indent=2)
        out.append("\n".join("      " + ln for ln in text.split("\n")))
    return [b + ("," if i < len(out) - 1 else "") for i, b in enumerate(out)]


def main():
    with open(SRC, "r", encoding="utf-8", newline="") as f:
        raw = f.read()
    nl = "\r\n" if "\r\n" in raw else "\n"
    assert "ÖSD A1 ·" not in raw and "ÖSD A2 ·" not in raw, "似乎已经合并过，拒绝重复写入"

    lines = raw.split(nl)
    starts = {k: key_start(lines, k) for k in (1, 2, 3)}
    bounds = {
        1: (starts[1], starts[2]),
        2: (starts[2], starts[3]),
    }

    # 预检：闭合行前一行必须是原题字面量（以 { 开头）
    for key, _, _ in PLAN:
        s, e = bounds[key]
        c = array_close(lines, s, e)
        assert lines[c - 1].strip().startswith("{"), \
            "bank[%d] 闭合行前不是题目字面量: %r" % (key, lines[c - 1])

    report = []
    for key, level, json_path in PLAN:   # 2 → 1，从后往前
        with open(json_path, encoding="utf-8") as f:
            groups = json.load(f)
        s, e = bounds[key]
        close = array_close(lines, s, e)
        last = close - 1
        lines[last] = lines[last].rstrip() + ","
        blocks = js_blocks(groups, level)
        lines[close:close] = blocks
        report.append((key, level, len(groups), sum(len(g["questions"]) for g in groups), close + 1))

    with open(SRC, "w", encoding="utf-8", newline="") as f:
        f.write(nl.join(lines))

    for key, level, ng, nq, lineno in report:
        print("bank[%d] <- %s: %d 组 / %d 小题（插入于原第 %d 行前，换行符 %s）" % (
            key, level, ng, nq, lineno, repr(nl)))
    print("原题目一行未动；总行数 %d -> %d" % (len(raw.split(nl)), len(lines)))


if __name__ == "__main__":
    main()
