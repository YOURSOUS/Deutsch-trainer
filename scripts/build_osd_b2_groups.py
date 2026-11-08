#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""组装 ÖSD B2 三套模考卷的「终极 Schema 大组题」→ data/_staging/osd_b2_parsed_group.json

数据来源与严谨性说明（绝不瞎编）：
- 答案：全部来自答案卡 PNG 的【视觉核验抄录】，见 data/_staging/pdf_images/B2_*_page_2*.png。
  Lesen 1/2、Hören 1 与 PMB Hören 1/2 是明文答案表格；
  ZB2 / ZB2_J 的 Hören Aufgabe 2 是逐格打叉网格，已用 3 倍局部重渲染
  （data/_staging/pdf_images/hi/*_p23_b*.png）逐格核验，绝不靠正则猜答案。
- 题干 / 选项 / 短文：来自源 PDF 文本层，用 PyMuPDF get_text("words") 按坐标重建
  （合并 PDF 排版造成的单词内部断裂，如 "wichti g" → "wichtig"）。
- 题号与选项的【视觉顺序】已逐页核验：PDF 文本层会把左右分栏打乱
  （例如 ZB2 Hören 1 的第 1 题在文本层排在第 6 位），故 Hören 陈述按图片顺序硬编码抄录。
  PMB Lesen Aufgabe 2 的 10 条 Betreffzeile 在文本层是 B..K,A 的循环移位，
  视觉上是 A..K，故同样按图片顺序硬编码。
- 已做交叉自洽验证：答案字母序列 ↔ 材料内容逐条对得上（例：ZB2 L2 = A B H D E、
  ZB2/J L2 = E B H C D、PMB L2 = B K G F D），绝非正则猜测。

题型转换说明（用户决策 v0.10，沿用 A2 方案）：
- Hören Aufgabe 2（ZB2 / ZB2_J）原卷为 Notizblatt：3 列比较对象 × 10 行，
  其中 5 行是 dichotome / polytome 打叉格、5 行是开放式数值填空。
  按 A2 既定方案把【打叉格逐格忠实展开成 JA/NEIN 判断题】
  （ZB2 33 格、ZB2_J 39 格），JA = 答案卡 P23 该格子打了 X；
  开放式填空行无给定选项，仍不纳入，但卷面结构写进 passage 供参考。
  对应的两条 A2 音轨因此重新被引用，全部进 Git。
- PMB Hören Aufgabe 2 是 5 段 Dialog × (R/F + A/B/C) 的纯选择题，予以纳入。

不纳入的题型（延续 A1/A2 既定口径）：
- Lesen Aufgabe 3 / 4：开放式填空（无给定选项，答案为词素/单词）
- Hören Aufgabe 2 的开放式填空行（Preis / Kilometerstand / Baujahr 等数值题）
- Schreiben / Sprechen：开放式写作与口语

用法：/d/纪家鑫/python.exe scripts/build_osd_b2_groups.py
"""
import os
import re
import json
import shutil
import warnings
from urllib.parse import quote

import fitz

warnings.filterwarnings("ignore")

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(BASE, "data", "_sources", "osd", "B2")
OUT = os.path.join(BASE, "data", "_staging", "osd_b2_parsed_group.json")
AUDIO_REL_DIR = "data/audio/b2"
LEVEL = "B2"
LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "K"]

AUDIO_TEXT_NOTE = ("Kandidatenblätter（考生卷）不含听力原文 Hörtexte；"
                   "如需无障碍文本须另行获取 Prüferblätter 或人工转写。")

L1_INSTRUCTION = ("Lesen Sie zuerst den Text auf Blatt 1 und lösen Sie dann die 5 Aufgaben, "
                  "indem Sie die richtige Antwort (A oder B oder C) markieren. "
                  "Für jede Aufgabe (1–5) gibt es nur eine richtige Lösung.")
L2_INSTRUCTION_HEAD = ("Lesen Sie die 10 Überschriften auf Blatt 1 und die 5 Texte auf Blatt 2. "
                       "Suchen Sie dann zu jedem Text (1–5) die passende Überschrift (A–K). "
                       "Pro Text gibt es nur eine richtige Lösung.")
L2_INSTRUCTION_MAIL = ("Lesen Sie die 10 Betreffzeilen auf Blatt 1 und die 5 E-Mails auf Blatt 2 und 3. "
                       "Suchen Sie dann zu jedem E-Mail (1–5) die passende Betreffzeile (A–K). "
                       "Pro E-Mail gibt es nur eine richtige Lösung.")
H_RF_INSTRUCTION = ("Lesen Sie Aufgabe 1 gut durch. Situation: Sie hören eine Radiosendung. "
                    "Lesen Sie die folgenden Aussagen und kreuzen Sie jeweils Richtig (R) oder "
                    "Falsch (F) an. Sie hören den Text zwei Mal. "
                    "（原卷为 10 条 R/F 判断；此处按题号顺序逐条呈现）")
H_PMB_INSTRUCTION = ("Lesen Sie die Aufgabe gut durch. Situation: Sie hören jetzt fünf Texte. "
                     "Zu jedem Text gibt es zwei Aufgaben: eine Richtig/Falsch-Aussage und "
                     "eine A/B/C-Aufgabe. Wählen Sie bei jeder Aufgabe die richtige Lösung. "
                     "Sie hören jeden Text zwei Mal.")
H2_GRID_INSTRUCTION = (
    "Lesen Sie Aufgabe 2 gut durch. Sie haben 90 Sekunden Zeit. Situation: Sie hören ein "
    "Gespräch zwischen zwei Personen, die Informationen austauschen. Ergänzen Sie die "
    "fehlenden Informationen oder kreuzen Sie die entsprechenden Kästchen an. "
    "Sie hören den Text ein Mal. "
    "（原卷为 Notizblatt 打叉网格；此处按 A2 既定方案把每个打叉格忠实展开为 "
    "JA/NEIN 判断题，JA = 答案卡该格子打了 X。开放式填空行无给定选项，不纳入判断题）")


# ==========================================================================
# 文本层工具：按坐标重建单词，修复 PDF 排版造成的词内断裂
# ==========================================================================
LIGATURES = {"ﬁ": "fi", "ﬂ": "fl", "ﬀ": "ff", "ﬃ": "ffi", "ﬄ": "ffl", "ﬅ": "st"}


def clean_lines(doc, page_no):
    words = doc[page_no - 1].get_text("words")
    groups = {}
    for x0, y0, x1, y1, text, block, line, _ in words:
        groups.setdefault((block, line), []).append((x0, x1, text))
    out = []
    for key in sorted(groups):
        arr = sorted(groups[key])
        buf, prev_x = "", None
        for x0, x1, text in arr:
            buf = text if prev_x is None else buf + ("" if x0 - prev_x < 1.6 else " ") + text
            prev_x = x1
        for a, b in LIGATURES.items():
            buf = buf.replace(a, b)
        out.append(buf.strip())
    return out


def is_header(line):
    s = line.strip()
    if not s or re.fullmatch(r"\d+", s):
        return True
    prefixes = ("ÖSD Zertifikat", "Name:", "insgesamt", "5 Punkte", "10 Punkte",
                "Lesen", "Aufgabe", "Hören", "Lies ", "Lesen Sie", "Betreff:",
                "Überschrift:", "Text ", "Dialog ", "Richtig", "Falsch", "Sport",
                "Meine Oma fährt", "Eine Sendung", "* Jus")
    return s.startswith(prefixes)


def join_lines(arr):
    """拼接被 PDF 断行切开的段落，处理行尾连字符。"""
    s = ""
    for x in arr:
        x = x.strip()
        if not x:
            continue
        if not s:
            s = x
        elif s.endswith("-"):
            s = s[:-1] + x
        else:
            s += " " + x
    return re.sub(r"\s+", " ", s).strip()


def article(doc, page_no):
    """从 Blatt 1 提取阅读长文正文（过滤页眉、说明、页码）。"""
    return join_lines([l for l in clean_lines(doc, page_no) if not is_header(l)])


def parse_abc(doc, page_no):
    """解析 Lesen Aufgabe 1 | Blatt 2：题号 1-5 → (题干, [A, B, C])。"""
    lines = clean_lines(doc, page_no)
    res = {}
    i = 0
    while i < len(lines):
        s = lines[i].strip()
        if len(s) == 1 and s in "12345":
            j = i + 1
            while j < len(lines) and lines[j].strip() in ("A", "B", "C"):
                j += 1
            if j + 3 < len(lines):
                stem, opts = lines[j].strip(), [x.strip() for x in lines[j + 1:j + 4]]
                # 防御：PDF 每页左上角的印刷页码（"2"/"3"/...）也是纯数字，
                # 若不过滤页眉，会把 "ÖSD Zertifikat..." 当题干、把 "Name:" 当选项。
                clean = (stem and not is_header(stem)
                         and all(len(o) > 3 and not is_header(o) for o in opts))
                if clean and int(s) not in res:
                    res[int(s)] = (stem, opts)
                    i = j + 4
                    continue
        i += 1
    assert sorted(res) == [1, 2, 3, 4, 5], "Lesen A1 解析题号异常: %s" % sorted(res)
    return res


def parse_headlines(doc, page_no, override=None):
    """解析 10 个 Überschriften / Betreffzeilen → {A..K: 文本}。"""
    if override:
        assert len(override) == 10 and set(override) == set(LETTERS)
        return override
    lines = clean_lines(doc, page_no)
    for i in range(len(lines) - 9):
        if [x.strip() for x in lines[i:i + 10]] == LETTERS:
            heads = [x.strip() for x in lines[:i]
                     if x.strip() and not x.strip().startswith(("ÖSD", "Name:"))
                     and not re.fullmatch(r"\d+", x.strip())]
            assert len(heads) == 10, "标题数量异常: %d" % len(heads)
            return dict(zip(LETTERS, heads))
    raise AssertionError("找不到 A..K 字母序列")


def parse_texts(doc, page_no):
    """解析 Lesen Aufgabe 2 | Blatt 2：按 Überschrift 标记 + 题号切出 5 段短文。"""
    lines = clean_lines(doc, page_no)
    chunks, cur = [], None
    for l in lines:
        if l.strip().startswith("Überschrift:"):
            if cur:
                chunks.append(cur)
            cur = {"num": None, "body": []}
        elif cur is not None:
            s = l.strip()
            if len(s) == 1 and s in "12345" and cur["num"] is None:
                cur["num"] = int(s)
            elif s and not s.startswith(("ÖSD", "Name:", "Lesen", "Aufgabe", "insgesamt", "5 Punkte")):
                cur["body"].append(s)
    if cur:
        chunks.append(cur)
    res = {c["num"]: join_lines(c["body"]) for c in chunks if c["num"]}
    assert sorted(res) == [1, 2, 3, 4, 5], "短文题号异常: %s" % sorted(res)
    return res


def parse_pmb_mails(doc, spans):
    """PMB 的 5 封 E-Mail：按已核验的固定行区间切分（文本层把这 5 封连排）。"""
    cache = {}
    res = {}
    for n, (page_no, start, end) in enumerate(spans, 1):
        lines = cache.setdefault(page_no, clean_lines(doc, page_no))
        res[n] = join_lines(lines[start - 1:end])
    return res


def audio_url(fname):
    return quote("%s/%s" % (AUDIO_REL_DIR, fname), safe="/")


def distractors_from(pool, correct, seed, count=2):
    others = [x for x in pool if x != correct]
    start = seed % len(others)
    return [others[(start + k) % len(others)] for k in range(min(count, len(others)))]


def rf_q(stem, is_r):
    return {"q": stem, "a": ["Richtig" if is_r else "Falsch"],
            "distractors": ["Falsch" if is_r else "Richtig"]}


def yn_q(stem, is_yes):
    """A2 既定方案：打叉网格每个格子 → 1 道 JA/NEIN 判断题。"""
    return {"q": stem, "a": ["JA" if is_yes else "NEIN"],
            "distractors": ["NEIN" if is_yes else "JA"]}


# ==========================================================================
# 视觉核验抄录：答案序列（答案卡 PNG）
# ==========================================================================
# ZB2        P21: Lesen1 C B B A B | Lesen2 A B H D E；P22: Hören1 F R R F R R F R F R
# ZB2/J      P21: Lesen1 A B A A B | Lesen2 E B H C D；P22: Hören1 R F F F F R F F R R
# ZB2/PMB    P21: Lesen1 B C C A A | Lesen2 B K G F D；
#            P23: Hören1 F B R C R A F C R B | Hören2 R C F A R A F C R A
ANSWERS = {
    "zb2":     {"l1": "CBBAB", "l2": "ABHDE", "h1": "FRRFRRFRFR"},
    "zb2j":    {"l1": "ABAAB", "l2": "EBHCD", "h1": "RFFFFRFFRR"},
    # PMB Hören 答案卡 10 格 = 5 段 Text × (R/F, A/B/C) 两题：
    # h1 = (F,B)(R,C)(R,A)(F,C)(R,B)   h2 = (R,C)(F,A)(R,A)(F,C)(R,A)
    "zb2pmb":  {"l1": "BCCAA", "l2": "BKGFD",
                "h1": "FBRCRAFCRB", "h2": "RCFARAFCRA"},
}

# PMB Lesen Aufgabe 2 的 10 条 Betreffzeile（视觉 A–K，文本层是 B..K,A 循环移位）
PMB_HEADS = {
    "A": "Erinnerung: Zur Informationsveranstaltung anmelden",
    "B": "Verpflegung der Bewohner am Wochenende",
    "C": "Immer mehr Müll im Personalraum!",
    "D": "Neuübernahme des Gastronomiebereichs",
    "E": "Lieferservice stellt Mahlzeiten zu",
    "F": "Regelungen bezüglich Essen und Trinken im Dienst",
    "G": "Vortrag über Appetitförderung",
    "H": "Umbauarbeiten im Schnellrestaurant früher fertig",
    "I": "Gekühlte Getränke zur freien Entnahme für das Personal",
    "K": "Vergünstigte Heißgetränke für Angestellte",
}

# Hören Aufgabe 1：10 条 R/F 陈述，按【图片上的题号顺序】抄录
ZB2_RF = [
    "Eine Umfrage hat ergeben, dass sich vor allem junge Menschen immer mehr für Sport interessieren.",
    "Laut Aussage von Otmar Weiss stärkt Sport das Selbstbewusstsein.",
    "Sportliche Leistungen sind leichter und klarer sichtbar als Leistungen im Alltag.",
    "Profisportler finden sich üblicherweise am Ende ihrer Karriere leicht im Alltag zurecht.",
    "Die Gründe, warum Menschen Sport ausüben, werden immer vielfältiger.",
    "Schwimmen, Radfahren und Skifahren sind die beliebtesten Sportarten in Österreich.",
    "Sowohl Männer als auch Frauen betreiben Sport in erster Linie aus gesundheitlichen Gründen.",
    "Männer sind beim Sporttreiben leistungsorientierter als Frauen.",
    "Viele Menschen nutzen den Sport dazu, Freunde zu treffen.",
    "Warum sich manche Sportarten besser durchsetzen als andere, ist bis heute ungeklärt.",
]
ZB2J_RF = [
    "Für Julia und Philipp ist die künstlerische Beschäftigung ihrer Oma ein Gewinn.",
    "Die Oma von Julia und Philipp denkt, dass sie sich an der Erziehung ihrer Enkel beteiligen sollte.",
    "Die Moderatorin findet, dass man den Eingangsbereich des Altersheims wohnlicher gestalten könnte.",
    "Ihre Mahlzeiten nehmen die Heimbewohner in ihren Zimmern ein.",
    "Die Enkelkinder haben Opa Böhm einige Fotos mitgebracht.",
    "Christopher besucht seinen Opa so oft, weil dieser früher viel für ihn da war.",
    "Die Großeltern Eser fühlen sich mit der Sorge um die Enkelkinder langsam überfordert.",
    "Dr. Fuchs erklärt, dass zu viel Bewegung im Alter den Körper belasten kann.",
    "Julias Oma hält aus heutiger Sicht die Strenge ihrer eigenen Großmutter für angemessen.",
    "Abschließend stellen die Kinder fest, dass sie viele Vorteile beim Älterwerden sehen.",
]

# ==========================================================================
# Hören Aufgabe 2 打叉网格：答案卡 P23 视觉核验逐格抄录（3 倍局部重渲染确认）
# grid[ci][oi] = 第 ci 列、第 oi 个选项是否打 X（True = ☒，False = ☐）
# rows 中每项的 opts 顺序与卷面自上而下一致；open_rows 是开放式填空行（不纳入判断题）。
# ZB2   P23：Zeile 1 Schwerpunkt / 5 Arten der Buchausleihe / 6 Bei der Anmeldung /
#            7 Serviceleistungen / 8 Zusätzliches Angebot → 11 项 × 3 列 = 33 格
# ZB2/J P23：Zeile 4 Extras / 5 Ausstattung / 6 Zahlung / 7 Garantie /
#            8 Öffnungszeiten → 13 项 × 3 列 = 39 格
# ==========================================================================
ZB2_H2 = {
    "topic": "Bibliotheken",
    "cols": ["Universitätsbibliothek (Hauptbibliothek)", "ZB (Zentralbibliothek)", "Literaturarchiv"],
    "rows": [
        ("Schwerpunkt", ["allgemein", "Fachliteratur"],
         [[True, True], [True, True], [False, True]]),
        ("Arten der Buchausleihe außer vor Ort", ["Postversand", "Fernleihe"],
         [[True, True], [True, True], [False, False]]),
        ("Bei der Anmeldung nötig", ["amtlicher Ausweis", "Adressnachweis"],
         [[True, False], [True, False], [True, True]]),
        ("Serviceleistungen", ["Lesungen", "Cafeteria", "Leselounge"],
         [[True, False, True], [True, True, False], [True, True, False]]),
        ("Zusätzliches Angebot", ["WLAN", "Führungen"],
         [[True, True], [True, True], [True, False]]),
    ],
    "open_rows": ["Kosten Jahresausweis", "Ermäßigung für Studierende", "Ausleihdauer",
                  "Maximale Ausleihe", "Öffnungszeiten"],
}
ZB2J_H2 = {
    "topic": "Motorrollerkauf",
    "cols": ["Vespa", "Honda", "Aprilia"],
    "rows": [
        ("Extras", ["Helm", "Schloss", "Spezialfarbe"],
         [[False, True, False], [True, False, False], [False, True, True]]),
        ("Ausstattung", ["Gepäckfach", "Ledersitz", "Windschutz"],
         [[True, False, True], [True, True, False], [True, False, True]]),
        ("Zahlung", ["Teilzahlung möglich", "Rabatt bei Barzahlung"],
         [[True, False], [True, True], [False, True]]),
        ("Garantie", ["Ersatzteile", "Arbeitskosten"],
         [[True, False], [True, True], [True, False]]),
        ("Öffnungszeiten", ["abends", "mittags", "samstags"],
         [[False, True, True], [True, False, True], [True, True, False]]),
    ],
    "open_rows": ["Preis", "Kilometerstand", "Baujahr", "Entfernung", "Telefonnummer"],
}

# PMB Hören：每 Text/Dialog = 1 条 R/F 陈述 + 1 道 A/B/C（题干 + 3 个真实选项）
PMB_H1 = [
    ("Valerie soll wegen eines Notfalls sofort zu Herrn Thannhauser kommen.",
     "Der Klient hat sich beim Sturz",
     ["die Beine gebrochen.", "den Ellenbogen gebrochen.", "nicht verletzt."]),
    ("Frau Meiningers Zustand hat sich gebessert.",
     "Frau Meininger",
     ["darf in den nächsten Stunden nichts essen.", "muss noch länger im Krankenhaus bleiben.",
      "soll heute noch mit dem Arzt reden."]),
    ("Im Text geht es um eine hilfreiche Methode im Pflegebereich.",
     "Der Einsatz von Düften/Aromen in der Kranken- und Altenpflege",
     ["bewirkt eine längere Aufenthaltsdauer von Besuchern.",
      "kann bei älteren Menschen auch Unruhe auslösen.",
      "wird vom Pflegepersonal als störend empfunden."]),
    ("Herr Martini wirkt sehr müde und verwirrt.",
     "Für die weitere Behandlung des Patienten rät die Ärztin",
     ["zu einer Umstellung auf ein anderes Schmerzmittel.",
      "zum kompletten Absetzen von Schmerzmitteln.",
      "zur Einnahme eines magenschonenden Medikaments."]),
    ("Auf der Messe kann man sich auch über verschiedene Möglichkeiten von Pflegeausbildungen informieren.",
     "Bestimmte Veranstaltungen auf der Fachmesse",
     ["erfordern eine Anmeldung im Eingangsbereich.",
      "kann man sich als Weiterbildung anrechnen lassen.",
      "richten sich nur an Personen mit abgeschlossener Ausbildung."]),
]
PMB_H2 = [
    ("Herrn Grankvists Tante zieht in ein Pflegeheim in einer ländlichen Gegend.",
     "Beim Aufnahmegespräch erklärt die Leiterin Herrn Grankvist, dass",
     ["derzeit alle Einzelzimmer im Pflegeheim belegt sind.",
      "fehlende Dokumente vorbeigebracht werden müssen.",
      "seine Verwandte eigene Möbelstücke mitbringen kann."]),
    ("Laut Herrn Bak sind die Herzbeschwerden auf Medikamente zurückzuführen.",
     "Nach der Auswertung eines Elektrokardiogramms",
     ["äußert Herr Bak Bedenken über die Zukunft.", "hat der Klient Probleme mit dem Atmen.",
      "verständigt die Pflegerin einen Krankenwagen."]),
    ("Herr Urtl litt unter einer Mandelentzündung und hat mehrere Personen angesteckt.",
     "Die Therapie von Herrn Urtl",
     ["erforderte einen Medikamentenwechsel.", "verursachte heftige Nebenwirkungen.",
      "wurde zunächst von ihm verweigert."]),
    ("Jahrzehntelanger Alkoholmissbrauch hat zur Bettlägerigkeit von Frau Thalmann geführt.",
     "Bei der heutigen Dekubitusprophylaxe werden bei Frau Thalmann",
     ["die oberen Extremitäten mit einer Pflegesalbe versorgt.",
      "mehrere Körperstellen aufgrund von Rötungen behandelt.",
      "Reste eines Körperpflegeproduktes von der Haut entfernt."]),
    ("Herr Becker muss während seines Urlaubs ein Krankenhaus aufsuchen.",
     "Vor der Katheterisierung",
     ["bemängelt Herr Becker die medizinische Behandlung auf der Station.",
      "erklärt die Pflegerin dem Patienten die Vorgehensweise genau.",
      "wird der Patient auf eine beginnende Infektion aufmerksam gemacht."]),
]

VOLS = [
    {"key": "zb2", "pdf": "B2_zb2_ZB2 Modellsatz HP.pdf",
     "source": "ÖSD Zertifikat B2 / ZB2 Modellsatz", "variant": "Standard",
     "p": {"art": 2, "abc": 3, "heads": 4, "texts": 5},
     "audio": {"h1": "ZB2_MS_A1_270917.mp3", "h2": "ZB2_MS_A2_270917.mp3"},
     "rf": ZB2_RF, "h2": ZB2_H2},
    {"key": "zb2j", "pdf": "B2_zb2_j_ZB2 J Modellsatz HP.pdf",
     "source": "ÖSD Zertifikat B2/Jugendliche / ZB2 J Modellsatz", "variant": "Jugendliche",
     "p": {"art": 2, "abc": 3, "heads": 4, "texts": 5},
     "audio": {"h1": "ZB2_J_MS_A1.mp3", "h2": "ZB2_J_MS_A2.mp3"},
     "rf": ZB2J_RF, "h2": ZB2J_H2},
    {"key": "zb2pmb", "pdf": "B2_zb2_pmb_ZB2 PMB Modellsatz HP.pdf",
     "source": "ÖSD Zertifikat B2/PMB / ZB2 PMB Modellsatz", "variant": "Pflege und medizinische Berufe",
     "p": {"art": 2, "abc": 3, "heads": 4},
     "audio": {"h1": "ZB2_PMB_MS_A1_271223-converted.mp3",
               "h2": "ZB2_PMB_MS_A2_110124-converted.mp3"}},
]


def head_label(letter, heads):
    return "%s – %s" % (letter, heads[letter])


def build_reading_groups(v, doc, groups):
    key, src, p = v["key"], v["source"], v["p"]
    ans = ANSWERS[key]

    # ---- Lesen Aufgabe 1：长文 + 5 道 A/B/C ----
    abc = parse_abc(doc, p["abc"])
    art = article(doc, p["art"])
    qs = []
    for n in range(1, 6):
        stem, opts = abc[n]
        letter = ans["l1"][n - 1]
        assert letter in "ABC", "%s L1 答案字母异常 %s" % (key, letter)
        correct = opts["ABC".index(letter)]
        qs.append({"q": "Aufgabe %d: %s" % (n, stem), "a": [correct],
                   "distractors": [o for o in opts if o != correct]})
    groups.append({
        "id": key + "_lesen_a1", "type": "阅读选择", "level": LEVEL, "source": src,
        "module": "Lesen Aufgabe 1", "passage": L1_INSTRUCTION + "\n\n[Text / Blatt 1]\n\n" + art,
        "questions": qs})

    # ---- Lesen Aufgabe 2：10 标题/主题 ↔ 5 短文/邮件 ----
    heads = parse_headlines(doc, p["heads"], PMB_HEADS if key == "zb2pmb" else None)
    if key == "zb2pmb":
        texts = parse_pmb_mails(doc, [(5, 14, 24), (5, 25, 34), (5, 35, 45),
                                      (6, 12, 23), (6, 24, 34)])
        label, instr, noun = "Betreffzeile", L2_INSTRUCTION_MAIL, "E-Mail"
    else:
        texts = parse_texts(doc, p["texts"])
        label, instr, noun = "Überschrift", L2_INSTRUCTION_HEAD, "Text"
    pool = [head_label(x, heads) for x in LETTERS]
    passage = (instr + "\n\n[%s A–K / 卷面原文]\n" % label +
               "\n".join(pool) + "\n\n[Texte 1–5 / 卷面原文]\n" +
               "\n\n".join("%s %d: %s" % (noun, n, texts[n]) for n in range(1, 6)))
    qs = []
    for n in range(1, 6):
        letter = ans["l2"][n - 1]
        assert letter in LETTERS, "%s L2 答案字母异常 %s" % (key, letter)
        correct = head_label(letter, heads)
        qs.append({"q": "%s %d: %s  →  Welche %s passt?" % (noun, n, texts[n], label),
                   "a": [correct], "distractors": distractors_from(pool, correct, n - 1)})
    groups.append({
        "id": key + "_lesen_a2", "type": "阅读配对", "level": LEVEL, "source": src,
        "module": "Lesen Aufgabe 2", "passage": passage, "questions": qs})


def build_rf_group(v, groups):
    """ZB2 / ZB2_J 的 Hören Aufgabe 1：10 道 R/F。"""
    key, src = v["key"], v["source"]
    rf, ans = v["rf"], ANSWERS[key]["h1"]
    assert len(rf) == len(ans) == 10, "%s R/F 数量不符" % key
    assert set(ans) <= {"R", "F"}, "%s R/F 答案异常" % key
    qs = [rf_q("Aussage %d: „%s“  →  Richtig oder Falsch?" % (i, s), ans[i - 1] == "R")
          for i, s in enumerate(rf, 1)]
    passage = (H_RF_INSTRUCTION + "\n\n[Thema] " +
               ("Sport" if key == "zb2" else "Meine Oma fährt im Hühnerstall Motorrad") +
               "\n\n[卷面 10 条 Aussagen / 按题号顺序]\n" +
               "\n".join("%2d. %s" % (i, s) for i, s in enumerate(rf, 1)))
    fname = v["audio"]["h1"]
    groups.append({
        "id": key + "_hoeren_a1", "type": "听力判断", "level": LEVEL, "source": src,
        "module": "Hören Aufgabe 1", "passage": passage,
        "audioUrl": audio_url(fname), "audioFile": fname, "audioUrls": [audio_url(fname)],
        "audioText": "", "audioTextNote": AUDIO_TEXT_NOTE,
        "audioNote": "原卷为 10 条 Richtig/Falsch 判断题；音频对应本卷 Hören Aufgabe 1。",
        "questions": qs})


def build_grid_group(v, groups):
    """ZB2 / ZB2_J 的 Hören Aufgabe 2：Notizblatt 打叉网格 → JA/NEIN 判断题。

    沿用 A2 的 Hören Aufgabe 3 方案：每个打叉格 = 1 道题，
    JA = 答案卡该格子打了 X；不生成任何卷面上不存在的选项。
    """
    key, src, cfg = v["key"], v["source"], v["h2"]
    cols, rows = cfg["cols"], cfg["rows"]
    assert len(cols) == 3, "%s H2 列数不符" % key
    qs, grid_lines = [], []
    for row_label, opts, grid in rows:
        assert len(grid) == len(cols) and all(len(g) == len(opts) for g in grid), \
            "%s H2 网格维度不符: %s" % (key, row_label)
        grid_lines.append("%s：%s" % (row_label, " / ".join("□ " + o for o in opts)))
        for ci, col in enumerate(cols):
            for oi, opt in enumerate(opts):
                qs.append(yn_q(
                    "Aufgabe 2 / %s × „%s“（%s）：录音中是否应勾选此项？（JA = 应勾选）"
                    % (col, opt, row_label), grid[ci][oi]))
    expected = sum(len(opts) for _, opts, _ in rows) * len(cols)
    assert len(qs) == expected == (33 if key == "zb2" else 39), \
        "%s H2 展开题数不符: %d" % (key, len(qs))
    passage = (H2_GRID_INSTRUCTION + "\n\nThema: " + cfg["topic"] +
               "\n\n[卷面 Notizblatt 结构：3 列比较对象]\n列: " + " | ".join(cols) +
               "\n\n[卷面打叉行（各选项需按对应列勾选）]\n" + "\n".join(grid_lines) +
               "\n\n[卷面另有开放式填空行，无给定选项，不纳入判断题]\n" +
               " / ".join(cfg["open_rows"]) +
               "\n\n说明: 下列判断题的 JA 表示答案卡上「该列 × 该行 × 该选项」的格子打了 X，"
               "NEIN 表示留空。听完一遍音轨完成整组。")
    fname = v["audio"]["h2"]
    groups.append({
        "id": key + "_hoeren_a2", "type": "听力判断", "level": LEVEL, "source": src,
        "module": "Hören Aufgabe 2", "passage": passage,
        "audioUrl": audio_url(fname), "audioFile": fname, "audioUrls": [audio_url(fname)],
        "audioText": "", "audioTextNote": AUDIO_TEXT_NOTE,
        "audioNote": ("原卷为 Notizblatt 打叉网格，按 A2 方案忠实展开为 %d 道 JA/NEIN 判断题；"
                      "开放式填空行不纳入。音频对应本卷 Hören Aufgabe 2。" % len(qs)),
        "questions": qs})


def build_pmb_hearing_groups(v, groups):
    """PMB 的两个 Hören：5 Text × (R/F + A/B/C) = 10 小题 / 组。"""
    key, src = v["key"], v["source"]
    for tag, data, ans in (("h1", PMB_H1, ANSWERS[key]["h1"]),
                           ("h2", PMB_H2, ANSWERS[key]["h2"])):
        assert len(data) == 5 and len(ans) == 10, "%s %s 数量不符" % (key, tag)
        qs, passage_rows = [], []
        for i, (statement, stem, opts) in enumerate(data):
            rf_letter, abc_letter = ans[2 * i], ans[2 * i + 1]
            assert rf_letter in "RF" and abc_letter in "ABC", "%s %s 答案异常" % (key, tag)
            correct = opts["ABC".index(abc_letter)]
            label = "Text" if tag == "h1" else "Dialog"
            qs.append(rf_q("%s %d / Richtig oder Falsch? „%s“" % (label, i + 1, statement),
                           rf_letter == "R"))
            qs.append({"q": "%s %d / %s" % (label, i + 1, stem), "a": [correct],
                       "distractors": [o for o in opts if o != correct]})
            passage_rows.append(
                "%s %d\n  R/F-Aussage: %s\n  A/B/C-Stem: %s\n    A %s\n    B %s\n    C %s"
                % (label, i + 1, statement, stem, opts[0], opts[1], opts[2]))
        fname = v["audio"][tag]
        gid = key + ("_hoeren_a1" if tag == "h1" else "_hoeren_a2")
        groups.append({
            "id": gid,
            "type": "听力选择", "level": LEVEL, "source": src,
            "module": "Hören Aufgabe " + ("1" if tag == "h1" else "2"),
            "passage": H_PMB_INSTRUCTION + "\n\n[卷面 5 段 Text/Dialog × 2 Aufgaben]\n\n" +
                       "\n\n".join(passage_rows),
            "audioUrl": audio_url(fname), "audioFile": fname, "audioUrls": [audio_url(fname)],
            "audioText": "", "audioTextNote": AUDIO_TEXT_NOTE,
            "audioNote": "原卷每 Text/Dialog 含 1 条 R/F 判断 + 1 道 A/B/C 选择；共 10 小题。",
            "questions": qs})


def main():
    groups = []
    for v in VOLS:
        doc = fitz.open(os.path.join(SRC, v["pdf"]))
        build_reading_groups(v, doc, groups)
        if v["key"] == "zb2pmb":
            build_pmb_hearing_groups(v, groups)
        else:
            build_rf_group(v, groups)
            build_grid_group(v, groups)   # ★ v0.10：Hören 2 打叉网格展开为 JA/NEIN
        doc.close()

    # ===== 严谨性校验 =====
    b1 = json.load(open(os.path.join(BASE, "data", "_staging", "osd_b1_parsed_group.json"),
                        encoding="utf-8"))
    b1_keys = set().union(*[set(g.keys()) for g in b1])
    b2_keys = set().union(*[set(g.keys()) for g in groups])
    assert b2_keys <= b1_keys, "出现 B1 终极 Schema 之外的新字段: %s" % (b2_keys - b1_keys)
    assert len({g["id"] for g in groups}) == len(groups), "组 id 重复"
    referenced = set()
    BAD = ("ÖSD Zertifikat", "Name:", "Blatt", "insgesamt", "©", "Punkte", "Aufgabe |")
    for g in groups:
        assert all(sorted(q.keys()) == ["a", "distractors", "q"] for q in g["questions"]), \
            "%s 子题字段不符" % g["id"]
        # 兜底：任何题干/答案/干扰项里都不许混入页眉、页脚、印刷页码
        for q in g["questions"]:
            for field in ("q", "a", "distractors"):
                vals = q[field] if isinstance(q[field], list) else [q[field]]
                for val in vals:
                    assert not any(b in val for b in BAD), \
                        "%s 混入页眉内容: %s" % (g["id"], val[:80])
        assert all(isinstance(q["a"], list) and len(q["a"]) == 1 for q in g["questions"])
        assert all(1 <= len(q["distractors"]) <= 2 for q in g["questions"])
        assert all(q["a"][0] not in q["distractors"] for q in g["questions"])
        assert all(len(set(q["distractors"])) == len(q["distractors"]) for q in g["questions"])
        if "audioUrl" in g:
            f = os.path.join(BASE, "data", "audio", "b2", g["audioFile"])
            assert os.path.exists(f), "音频不存在: %s" % f
            referenced.add(g["audioFile"])
            assert g["audioUrls"] == [g["audioUrl"]], "%s audioUrls 含非引用音轨" % g["id"]
    assert referenced == {
        "ZB2_MS_A1_270917.mp3", "ZB2_MS_A2_270917.mp3",
        "ZB2_J_MS_A1.mp3", "ZB2_J_MS_A2.mp3",
        "ZB2_PMB_MS_A1_271223-converted.mp3", "ZB2_PMB_MS_A2_110124-converted.mp3"}, \
        "引用音轨集合不符: %s" % referenced
    assert len(groups) == 12 and sum(len(g["questions"]) for g in groups) == 142, \
        "组数/小题数不符: %d / %d" % (len(groups), sum(len(g["questions"]) for g in groups))

    if os.path.exists(OUT):
        shutil.copyfile(OUT, OUT + ".bak")
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(groups, f, ensure_ascii=False, indent=2)

    print("WROTE:", os.path.relpath(OUT, BASE))
    print("大组题总数: %d  |  子题总数: %d" % (len(groups), sum(len(g["questions"]) for g in groups)))
    print("\n===== 各组明细 =====")
    for g in groups:
        print("  %-22s %-6s %-18s %2d 题  passage %5d 字%s" % (
            g["id"], g["type"], g["module"], len(g["questions"]), len(g.get("passage", "")),
            "  [音频 " + g["audioFile"] + "]" if "audioFile" in g else ""))
    print("\n===== 引用音轨（6 个 / 展开 Hören 2 后全部引用，.gitignore 不再排除） =====")
    for f in sorted(referenced):
        print("  data/audio/b2/" + f)
    print("\n===== 前 3 道题（第一大组的前 3 个子题） =====")
    first = groups[0]
    print("所属组: %s | %s | %s | %s" % (
        first["id"], first["type"], first["source"], first["module"]))
    for i, q in enumerate(first["questions"][:3], 1):
        print("\n  [%d] q: %s" % (i, q["q"][:300]))
        print("      a          : %s" % q["a"])
        print("      distractors: %s" % q["distractors"])


if __name__ == "__main__":
    main()
