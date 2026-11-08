#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""把 B2 终极 Schema 大组题追加到 data/questions.js 的 bank[4] 末尾。

完全沿用 scripts/merge_osd_a1a2_groups.py 的已验证方式：
- 只在数字等级数组闭合 `],` 之前插入新字面量，原有题目一行不动、索引不变。
- 每个大组补两个「旧链路兼容字段」（与 A1/A2/B1 组题完全一致）：
    q : 'ÖSD B2 · <module>（N 小题）'   供错题本 / 朗读 / 兜底显示
    a : ['[大组题，请展开作答]']        供旧判题链路不崩（非组题判分依据）
- 注意：questions.js 是混合换行（部分行 CRLF、部分 LF）。
  以文件主换行符 split / join 是字节可逆的，插入块内部沿用 "\n"，
  与上一轮 A1/A2 合并产物保持一致，绝不整文件重排。

红线：绝不覆盖/清空任何原题；重复执行会被 assert 拦下。
用法：/d/纪家鑫/python.exe scripts/merge_osd_b2_groups.py
"""
import os
import json

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(BASE, "data", "questions.js")
STAGING = os.path.join(BASE, "data", "_staging", "osd_b2_parsed_group.json")
KEY, LEVEL = 4, "B2"


def key_start(lines, key):
    tag = "%d: [" % key
    return next(i for i, l in enumerate(lines) if l.strip().startswith(tag))


def array_close(lines, start, end):
    """找 bank[KEY] 数组的闭合行：start..end 之间最后一个恰为 '],' 的行。"""
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
    assert "ÖSD B2 ·" not in raw, "似乎已经合并过 B2，拒绝重复写入"

    lines = raw.split(nl)
    start = key_start(lines, KEY)
    end = key_start(lines, KEY + 1)
    close = array_close(lines, start, end)
    assert lines[close - 1].strip().startswith("{"), \
        "bank[%d] 闭合行前不是题目字面量: %r" % (KEY, lines[close - 1])

    with open(STAGING, encoding="utf-8") as f:
        groups = json.load(f)
    assert len(groups) == 12 and sum(len(g["questions"]) for g in groups) == 142, \
        "B2 staging 组数/小题数不符"
    assert len({g["id"] for g in groups}) == len(groups), "B2 组 id 重复"

    lines[close - 1] = lines[close - 1].rstrip() + ","
    blocks = js_blocks(groups, LEVEL)
    lines[close:close] = blocks

    with open(SRC, "w", encoding="utf-8", newline="") as f:
        f.write(nl.join(lines))

    print("bank[%d] <- %s: %d 组 / %d 小题（插入于逻辑第 %d 行前，主换行符 %s）" % (
        KEY, LEVEL, len(groups), sum(len(g["questions"]) for g in groups),
        close + 1, repr(nl)))
    print("原题目一行未动；逻辑行数 %d -> %d" % (len(raw.split(nl)), len(lines)))
    print("源文件字节 %d -> %d" % (len(raw.encode("utf-8")),
                                len(nl.join(lines).encode("utf-8"))))


if __name__ == "__main__":
    main()
