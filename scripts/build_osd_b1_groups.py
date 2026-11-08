#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""把 osd_b1_parsed.json 的 24 道单题重组为「终极 Schema 大组题」，并挂上听力音频。

数据来源（全部为已核验的既有产物，本脚本不做任何内容推断）：
- data/_staging/osd_b1_parsed.json  —— 24 道已人工/视觉核验的单题（q/a/type/distractors）
- data/_raw/osd/B1/*.txt + page_12/13 —— 用于确认听力题归属 Hören Teil 1 / Teil 2
- data/audio/b1/*.mp3                —— 由 scripts/extract_osd_audio.py 从原始 zip 找回

分组原则：
- 阅读：按「文章」分组，文章全文提到 group.passage，questions 里只留纯净题干。
- 听力：按「卷 + Teil」分组，因为 ZB1 的音频按 HV 1/2/3/4 对应 Teil 1/2/3/4 分段。
- ZB1_J 的 zip 只提供 1 个合并听力音频，故整卷听力题共用它（已在 audioNote 说明）。

绝不做的事：不修改 data/questions.js、index.html；不编造听力原文（Kandidatenblätter
本身不含 Hörtexte），audioText 留空并以 audioTextNote 如实说明。
"""
import os
import json
import shutil
from urllib.parse import quote

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(BASE, "data", "_staging", "osd_b1_parsed.json")
OUT = os.path.join(BASE, "data", "_staging", "osd_b1_parsed_group.json")
AUDIO_REL_DIR = "data/audio/b1"

# 音频真实文件名（保留 zip 内原名，由 extract_osd_audio.py 落盘）
ZB1_AUDIO = [
    "ZB1 MS HV 1-converted.mp3",   # Hören Teil 1
    "ZB1 MS HV 2-converted.mp3",   # Hören Teil 2
    "ZB1 MS HV 3-converted.mp3",   # Hören Teil 3
    "ZB1 MS HV 4-converted.mp3",   # Hören Teil 4
]
ZB1J_AUDIO = "M8_H10_110124-komprimiert.mp3"   # 该卷唯一音频，覆盖整卷听力

AUDIO_NOTE_EMPTY_TEXT = ("源 PDF 为 Kandidatenblätter（考生卷），不含听力原文 Hörtexte；"
                         "如需无障碍文本/提示，须另行获取 Prüferblätter 或人工转写。")

# (id, 组类型, 来源卷, 题目索引(1-based), 模块, 主音频文件名, 该卷相关音频列表, 备注)
GROUP_DEFS = [
    ("zb1_lesen_energie", "阅读长文", "ÖSD Zertifikat B1 / ZB1", [1, 2, 3, 4], "Lesen Teil 2", None, [], ""),
    ("zb1_lesen_murten", "阅读长文", "ÖSD Zertifikat B1 / ZB1", [5], "Lesen", None, [], ""),
    ("zb1_lesen_hausordnung", "阅读长文", "ÖSD Zertifikat B1 / ZB1", [6, 7], "Lesen Teil 5", None, [], ""),
    ("zb1j_lesen_lesefieber", "阅读长文", "ÖSD Zertifikat B1 Jugendliche / ZB1 J", [14, 15], "Lesen", None, [], ""),
    ("zb1j_lesen_sport", "阅读长文", "ÖSD Zertifikat B1 Jugendliche / ZB1 J", [16, 17], "Lesen", None, [], ""),
    ("zb1j_lesen_campordnung", "阅读长文", "ÖSD Zertifikat B1 Jugendliche / ZB1 J", [18], "Lesen", None, [], ""),
    ("zb1_hoeren_teil1", "听力选择", "ÖSD Zertifikat B1 / ZB1", [8, 9, 10, 11, 12], "Hören Teil 1",
     ZB1_AUDIO[0], ZB1_AUDIO, "HV 编号按卷内 Teil 1–4 顺序对应；本组含 Text 1–5（含页上示例题）。"),
    ("zb1_hoeren_teil2", "听力选择", "ÖSD Zertifikat B1 / ZB1", [13], "Hören Teil 2",
     ZB1_AUDIO[1], ZB1_AUDIO, "对应 PDF Page 13 的 Stadtmuseum-Führung（题 15）。"),
    ("zb1j_hoeren", "听力选择", "ÖSD Zertifikat B1 Jugendliche / ZB1 J", [19, 20, 21, 22, 23, 24], "Hören Teil 1–2",
     ZB1J_AUDIO, [ZB1J_AUDIO], "该卷 zip 只提供 1 个合并听力音频，覆盖整卷 Teil 1–4；本组题目跨 Teil 1 与 Teil 2，共用此音频。"),
]


def audio_url(fname):
    """保留原文件名落盘，但 URL 需转义空格（前端可直接 fetch/audio.src 使用）。"""
    return quote("%s/%s" % (AUDIO_REL_DIR, fname), safe="/")


def main():
    items = json.load(open(SRC, encoding="utf-8"))
    assert isinstance(items, list) and len(items) == 24, "源数据应为 24 道单题"

    used = []
    groups = []
    for gid, gtype, source, idxs, teil, main_audio, related, note in GROUP_DEFS:
        group = {
            "id": gid,
            "type": gtype,
            "level": "B1",
            "source": source,
            "module": teil,
        }
        if gtype == "阅读长文":
            # 文章全文只保留一份，提到组级别
            passages = []
            for i in idxs:
                q = items[i - 1]["q"]
                if "\n\n" in q:
                    passages.append(q.split("\n\n")[0])
            assert passages and len(set(passages)) == 1, "%s 组内文章不一致" % gid
            group["passage"] = passages[0]
        else:
            group["audioUrl"] = audio_url(main_audio)
            group["audioFile"] = main_audio          # 磁盘上的真实文件名（含空格）
            group["audioUrls"] = [audio_url(f) for f in related]
            group["audioText"] = ""                  # 不编造听力原文
            group["audioTextNote"] = AUDIO_NOTE_EMPTY_TEXT
            if note:
                group["audioNote"] = note

        questions = []
        for i in idxs:
            item = items[i - 1]
            stem = item["q"].split("\n\n")[-1]       # 阅读题去掉长文，听力题本就是纯题干
            questions.append({
                "q": stem,
                "a": item["a"],
                "distractors": item["distractors"],
            })
            used.append(i)
        group["questions"] = questions
        groups.append(group)

    # 严谨性校验：24 题恰好各归属一次
    assert sorted(used) == list(range(1, 25)), "题目分配有遗漏或重复: %s" % used
    assert all(os.path.exists(os.path.join(BASE, "data", "audio", "b1", g["audioFile"]))
               for g in groups if "audioUrl" in g), "存在指向不存在 MP3 的 audioUrl"

    if os.path.exists(OUT):
        shutil.copyfile(OUT, OUT + ".bak")
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(groups, f, ensure_ascii=False, indent=2)

    # ===== 打印统计 =====
    print("WROTE:", os.path.relpath(OUT, BASE))
    print("大组题总数: %d" % len(groups))
    print("  - 阅读长文组: %d" % sum(1 for g in groups if g["type"] == "阅读长文"))
    print("  - 听力选择组: %d" % sum(1 for g in groups if g["type"] == "听力选择"))
    print("子题总数: %d" % sum(len(g["questions"]) for g in groups))
    print("\n===== 各组明细 =====")
    for g in groups:
        print("  %-26s %-6s %-14s %d 题" % (g["id"], g["type"], g["module"], len(g["questions"])))
    print("\n===== 听力组 audioUrl =====")
    for g in groups:
        if "audioUrl" in g:
            print("  %s\n    audioUrl : %s\n    audioFile: %s\n    audioUrls : %s" % (
                g["id"], g["audioUrl"], g["audioFile"], ", ".join(g["audioUrls"])))


if __name__ == "__main__":
    main()
