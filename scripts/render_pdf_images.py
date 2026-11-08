#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
scripts/render_pdf_images.py
===========================
把 ÖSD Modellsatz「Kandidatenblätter」PDF 的页面渲染为 150dpi PNG，
供人工 / 多模态视觉核验答案卡（Lösungen 涂卡网格）与题目页。

用法：
    python scripts/render_pdf_images.py            # 默认 B1（保持上轮 ZB1 / ZB1_J 产物命名）
    python scripts/render_pdf_images.py A1         # 渲染 A1 三份卷
    python scripts/render_pdf_images.py A1 A2      # 一次渲染多个级别

规则：
- 只读 data/_sources/osd/<LEVEL>/ 下的源 PDF，输出到 data/_staging/pdf_images/。
- 不修改任何前端业务代码，不触碰 data/questions.js。
- 每页若含 "Lösungen" 字样则标注 [答案卡]，方便定位。
- 文件名前缀与级别/变体绑定，避免跨卷同名覆盖（首轮踩过的坑）。
"""
import os
import sys
import glob
import warnings

import fitz

warnings.filterwarnings("ignore")  # 屏蔽 fitz 2.0 的 FutureWarning

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(BASE, "data", "_staging", "pdf_images")


def prefix_for(level, fname):
    """由源 PDF 文件名推导稳定的 PNG 前缀。B1 沿用上轮既有命名。"""
    stem = os.path.splitext(fname)[0].lower()
    rules = [
        ("a1_za1_oe", "A1_ZA1_OE"), ("a1_za1", "A1_ZA1"), ("a1_kid_a1", "A1_KID_A1"),
        ("a2_za2_oe", "A2_ZA2_OE"), ("a2_za2", "A2_ZA2"), ("a2_kid_a2", "A2_KID_A2"),
        ("b1_zb1_j", "ZB1_J"), ("b1_zb1", "ZB1"),
        ("b1_zdoe_b1_j", "B1_ZDOE_J"), ("b1_zdoe_b1", "B1_ZDOE"),
        ("b2_zb2_j", "B2_ZB2_J"), ("b2_zb2_pmb", "B2_ZB2_PMB"), ("b2_zb2", "B2_ZB2"),
        ("c1_zc1_j", "C1_ZC1_J"), ("c1_zc1_pmb", "C1_ZC1_PMB"), ("c1_zc1", "C1_ZC1"),
    ]
    for key, prefix in rules:
        if stem.startswith(key):
            return prefix
    # 兜底：用文件名前两段大写化
    return "_".join(os.path.splitext(fname)[0].split("_")[:2]).upper()


def main():
    levels = [x.upper() for x in sys.argv[1:]] or ["B1"]
    os.makedirs(OUT, exist_ok=True)
    total = 0
    answer_pages = []
    print("输出目录:", OUT)
    for level in levels:
        src_dir = os.path.join(BASE, "data", "_sources", "osd", level)
        pdfs = sorted(glob.glob(os.path.join(src_dir, "*.pdf")))
        if not pdfs:
            print("[跳过] 找不到 PDF:", src_dir)
            continue
        for path in pdfs:
            prefix = prefix_for(level, os.path.basename(path))
            doc = fitz.open(path)
            print("\n[%s] %s 共 %d 页" % (prefix, os.path.basename(path), doc.page_count))
            for i, page in enumerate(doc, 1):
                pix = page.get_pixmap(dpi=150)
                fn = os.path.join(OUT, "%s_page_%02d.png" % (prefix, i))
                pix.save(fn)
                total += 1
                txt = page.get_text().lower()
                is_answer = "lösungen" in txt or "losungen" in txt
                tag = "  [答案卡 Lösungen]" if is_answer else ""
                if is_answer:
                    answer_pages.append(os.path.basename(fn))
                print("  保存 %s  (%.0f KB)%s" % (
                    os.path.basename(fn), os.path.getsize(fn) / 1024, tag))
            doc.close()
    print("\n>>> 共生成 %d 张 PNG" % total)
    print(">>> 答案卡页 (%d):" % len(answer_pages))
    for p in answer_pages:
        print("   ", p)


if __name__ == "__main__":
    main()
