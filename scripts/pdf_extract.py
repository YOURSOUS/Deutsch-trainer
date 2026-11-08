#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
OSD Modellsatz PDF -> 纯文本提取（零 AI、零总结、零格式化）。

策略：优先 pypdf（纯 Python，已安装），若环境中另有 PyMuPDF(fitz) 则二者皆可，
      这里以 pypdf 为主、fitz 为备选。

规则：
  - 逐页提取，页间用 `--- Page X ---` 分隔（X 从 1 开始）。
  - 仅过滤"明显的重复页眉/页脚"：
        * 纯数字页码行（如 ` 12 `）；
        * 含版权声明的行（© / Copyright / Alle Rechte vorbehalten 等）。
    其余文字（题目编号、选项 a/b/c、文章原文、德语变元音）一律原样保留。
  - 输出 UTF-8，确保 ä ö ü ß 不乱码。
  - 输出目录镜像源结构：data/_raw/osd/{level}/{name}.txt
"""
import os
import re
import sys
import logging
import warnings

# pypdf 对某些 CFF Type1 字体会刷 fontTools 警告（仅影响编码解析提示，不影响提取），
# 压成 ERROR 级并忽略 warnings，保持输出干净。
logging.getLogger("pypdf").setLevel(logging.ERROR)
warnings.filterwarnings("ignore")

SRC_ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                         'data', '_sources', 'osd')
OUT_ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                        'data', '_raw', 'osd')
LEVELS = ('A1', 'A2', 'B1', 'B2', 'C1')

# 仅匹配"整行就是页码"或"版权/保留声明"的行，绝不碰正文。
PAGE_NUM_RE = re.compile(r'^\s*\d{1,4}\s*$')
COPYRIGHT_RE = re.compile(r'(©|copyright|alle rechte|vorbehalten|impressum)', re.IGNORECASE)


def filter_line(line):
    """返回 True 表示该行是页眉/页脚噪声，应丢弃。"""
    if PAGE_NUM_RE.match(line):
        return True
    if COPYRIGHT_RE.search(line):
        return True
    return False


def get_pdf_text(path):
    """返回 (pages_text_list, page_count)。零清洗，仅取原始文本。"""
    # 优先 pypdf
    try:
        import pypdf
        reader = pypdf.PdfReader(path)
        pages = [p.extract_text() or '' for p in reader.pages]
        return pages, len(pages)
    except ImportError:
        pass
    # 备选 PyMuPDF
    import fitz
    doc = fitz.open(path)
    try:
        pages = [doc.load_page(i).get_text('text') for i in range(doc.page_count)]
        return pages, doc.page_count
    finally:
        doc.close()


def extract_pdf(src_path, out_path):
    pages, n = get_pdf_text(src_path)
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    parts = []
    for i, raw in enumerate(pages, start=1):
        parts.append('--- Page %d ---' % i)
        for line in raw.split('\n'):
            line = line.rstrip('\r')
            if filter_line(line):
                continue
            parts.append(line)
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(parts) + '\n')
    return n


def main():
    if not os.path.isdir(SRC_ROOT):
        print('[FATAL] 源目录不存在: %s' % SRC_ROOT)
        sys.exit(1)
    os.makedirs(OUT_ROOT, exist_ok=True)

    success, failed = [], []
    total_pages = 0
    for lvl in LEVELS:
        sdir = os.path.join(SRC_ROOT, lvl)
        if not os.path.isdir(sdir):
            continue
        for fn in sorted(os.listdir(sdir)):
            if not fn.lower().endswith('.pdf'):
                continue
            src = os.path.join(sdir, fn)
            out = os.path.join(OUT_ROOT, lvl, os.path.splitext(fn)[0] + '.txt')
            try:
                n = extract_pdf(src, out)
                total_pages += n
                success.append((lvl, fn, n))
                print('[OK]   %s/%s  (%d 页) -> %s' % (lvl, fn, n, out))
            except Exception as e:
                failed.append((lvl, fn, repr(e)))
                print('[FAIL] %s/%s  %s' % (lvl, fn, repr(e)))

    print('\n===== 提取统计 =====')
    print('成功: %d 份' % len(success))
    print('失败: %d 份' % len(failed))
    print('总页数: %d' % total_pages)
    if failed:
        print('失败明细:')
        for lvl, fn, err in failed:
            print('  %s/%s : %s' % (lvl, fn, err))
    return 0 if not failed else 1


if __name__ == '__main__':
    sys.exit(main())
