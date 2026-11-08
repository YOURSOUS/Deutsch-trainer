#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""从 OSD B1 原始 zip 包中找回听力 MP3，落到 data/audio/b1/。

背景：首轮解压 zip 时按「仅保留 PDF」策略丢弃了音频，导致听力题退化成阅读题。
本脚本只做机械搬运：遍历 B1 的 zip，提取所有 .mp3，保留 zip 内原文件名。

规则：
- 跳过 macOS 垃圾条目（__MACOSX / ._ 前缀），沿用 PDF 提取时的同一套过滤。
- 同名冲突时自动加 zip 前缀并打印警告，绝不静默覆盖（首轮踩过的坑）。
- 不修改任何业务代码，不碰 data/questions.js / index.html。
- 只写 data/audio/b1/ 一个目录；清单只打印到终端，不额外落盘。

用法：python3 scripts/extract_osd_audio.py            # 默认 B1
      python3 scripts/extract_osd_audio.py A1        # 其他级别（输出到 data/audio/a1/）
"""
import os
import sys
import glob
import zipfile

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LEVEL = (sys.argv[1] if len(sys.argv) > 1 else "B1").upper()
SRC_DIR = os.path.join(BASE, "data", "_sources", "osd", LEVEL)
OUT_DIR = os.path.join(BASE, "data", "audio", LEVEL.lower())


def is_junk(name):
    low = name.lower().replace("\\", "/")
    return "__macosx" in low or os.path.basename(low).startswith("._")


def main():
    zips = sorted(glob.glob(os.path.join(SRC_DIR, "*.zip")))
    if not zips:
        print("NO_ZIP_FOUND:", SRC_DIR)
        return
    os.makedirs(OUT_DIR, exist_ok=True)

    records = []
    used = set()
    for zp in zips:
        zname = os.path.splitext(os.path.basename(zp))[0]
        with zipfile.ZipFile(zp) as z:
            for info in z.infolist():
                n = info.filename
                low = n.lower().replace("\\", "/")
                if low.endswith("/") or is_junk(n) or not low.endswith(".mp3"):
                    continue
                raw = os.path.basename(n.replace("\\", "/"))
                out_name = raw
                # 同名保护：加 zip 名前缀，绝不静默覆盖
                if out_name in used:
                    out_name = zname + "_" + raw
                    print("  [WARN] 同名冲突，改用前缀名:", out_name)
                used.add(out_name)
                dst = os.path.join(OUT_DIR, out_name)
                if os.path.exists(dst) and os.path.getsize(dst) == info.file_size:
                    status = "skipped_existing"
                else:
                    with z.open(info) as src, open(dst, "wb") as out:
                        while True:
                            buf = src.read(1024 * 1024)
                            if not buf:
                                break
                            out.write(buf)
                    status = "extracted"
                records.append({
                    "zip": os.path.basename(zp),
                    "entry": n,
                    "file": out_name,
                    "size": info.file_size,
                    "status": status,
                })
                print("  %-9s %7.2f MB  %s" % (status, info.file_size / 1048576, out_name))

    print("\n===== %s MP3 清单 (%d 个) =====" % (LEVEL, len(records)))
    for i, r in enumerate(records, 1):
        print("%2d. data/audio/%s/%s   [%.2f MB | %s | %s]" % (
            i, LEVEL.lower(), r["file"], r["size"] / 1048576, r["status"], r["zip"]))
    total = sum(r["size"] for r in records)
    print("总大小: %.2f MB" % (total / 1048576))
    print("输出目录:", OUT_DIR)


if __name__ == "__main__":
    main()
