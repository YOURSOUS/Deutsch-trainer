#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""组装 ÖSD A2 的「终极 Schema 大组题」→ data/_staging/osd_a2_parsed_group.json

与 A1/B1 的关系：
- 字段集合严格 ⊆ B1 终极 Schema，子题键仍为 {q, a, distractors}。
- A2 卷面结构与 A1 不同：每套卷只有 2 个 Lesen Aufgabe + 3 个 Hören Aufgabe。
- 两套成人卷（ZA2 / ZA2 Ö）的「Lösungen und Bewertung」答案卡为 P11 / P12，
  已逐页视觉核验，并与题目页的标题字母 / 短文编号 / A·B·C 选项列 / 打叉网格
  做了交叉自洽验证（答案序列 ↔ 材料内容完全对得上）。

题型转换说明（关键，绝不瞎编）：
- Lesen Aufgabe 1：10 个 Überschriften (A–K) ↔ 5 段短文，答案卡 5 个字母。
  → 5 道单选配对题，干扰项从卷面真实标题池按题号轮换取。
- Lesen Aufgabe 2：长文 + 5 道 A/B/C 三选一，答案卡 5 个字母。
  → 5 道单选题，干扰项直接取该题卷面上另外 2 个真实选项。
- Hören Aufgabe 1：8 个候选项中勾 4 个（卷面原话 „Es gibt vier richtige Antworten"）。
  原卷是多选，前端只支持单选 → 忠实展开为 8 道 JA/NEIN 判断题，
  每题答案直接来自答案卡该格子是否打 X，不生成任何新选项。
- Hören Aufgabe 3：5 位 Sprecher/-in × 5 个话题的多选打叉网格
  （卷面原话 „Pro Person sind mehrere Antworten möglich"）。
  → 忠实展开为 25 道 JA/NEIN 判断题（每个格子一题），答案来自答案卡网格。
  保持单一大组，听完一遍音轨做完 25 格，符合真实考试与「整组复习」逻辑。

不纳入的题型（用户拍板 + 绝不瞎编原则）：
- Hören Aufgabe 2（Notizblatt 开放式填空，无给定选项）
- Schreiben / Sprechen（开放式写作与口语）
- KID A2 儿童版（题型偏离主线）

数据来源全部为视觉核验抄录；本脚本不做正则猜测、不生成任何未见于卷面的选项。
"""
import os
import json
import shutil
from urllib.parse import quote

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(BASE, "data", "_staging", "osd_a2_parsed_group.json")
AUDIO_REL_DIR = "data/audio/a2"
LEVEL = "A2"

AUDIO_TEXT_NOTE = ("源 PDF 为 Kandidatenblätter（考生卷），不含听力原文 Hörtexte；"
                   "如需无障碍文本/提示，须另行获取 Prüferblätter 或人工转写。")

L1_INSTRUCTION = ("Lesen Sie die 10 Überschriften auf Blatt 1 und die 5 Texte auf Blatt 2. "
                  "Suchen Sie dann zu jedem Text (1–5) die passende Überschrift (A–K) "
                  "und schreiben Sie den Buchstaben auf die Linie über dem Text. "
                  "Pro Text gibt es nur eine richtige Lösung.")

L2_INSTRUCTION = ("Lesen Sie zuerst den Text auf Blatt 1 und lösen Sie dann die 5 Aufgaben, "
                  "indem Sie die richtige Antwort (A oder B oder C) markieren. "
                  "Für jede Aufgabe (1–5) gibt es nur eine richtige Lösung.")

H1_INSTRUCTION = ("Situation: Sie hören zwei verschiedene Texte mit dem gleichen Inhalt. "
                  "Hören Sie gut zu und markieren Sie die Antworten. "
                  "Es gibt vier richtige Antworten. Sie hören die Texte ein Mal. "
                  "（原卷为「8 选 4」多选；此处按每个候选项展开为 JA/NEIN 判断题，"
                  "JA = 该信息属于录音中的 4 个正确答案之一）")

H3_INSTRUCTION = ("Situation: Sie hören ein Interview, bei dem fünf Personen befragt werden. "
                  "Hören Sie gut zu und kreuzen Sie in der Liste die richtigen Antworten an. "
                  "Pro Person sind mehrere Antworten möglich. Sie hören die Texte ein Mal. "
                  "（原卷为 5 人 × 5 项的打叉网格；此处按每个格子展开为 JA/NEIN 判断题，"
                  "JA = 答案卡该格子打了 X）")


def audio_url(fname):
    return quote("%s/%s" % (AUDIO_REL_DIR, fname), safe="/")


# ==========================================================================
# 视觉核验抄录：ÖSD Zertifikat A2 / ZA2
# ==========================================================================
ZA2 = {
    "key": "za2",
    "source": "ÖSD Zertifikat A2 / ZA2 Modellsatz",
    "audio": {"a1": "ZA2_MS_A1.mp3", "a3": "ZA2_MS_A3.mp3"},
    # Lesen Aufgabe 1 答案卡（P11）：Text 1–5 → Überschrift = C E K B G
    "l1_headlines": {
        "A": "Jetzt das Fahrrad reparieren lassen",
        "B": "Im Rathaus: Informationen über Tiere",
        "C": "Tipp: Ausflug in den Tierpark",
        "D": "Frühlingspflanzen im Sonderangebot",
        "E": "Tipps fürs Radfahren in der Stadt",
        "F": "Radfahren ist gesund!",
        "G": "Mit neuen Pflanzen in den Frühling",
        "H": "Haustiere machen krank",
        "I": "Ausstellung: Blumen im Frühling",
        "K": "Wiener wurden zum Radfahren befragt",
    },
    "l1_texts": [
        (1, "Seit Jahrzehnten ist der Oberberger Tierpark ein beliebtes Ausflugsziel. "
            "Die Vielfalt der Tiere und Pflanzen und die wunderbare Naturlandschaft sind die Gründe dafür. "
            "Das Angebot ist vielfältig: Führungen, Tierfütterungen, Naturlehrpfad, Waldspielplätze "
            "und vieles mehr. Info-Telefon 804 31 69 [aus einer deutschen Zeitung]", "C"),
        (2, "Fahrrad fahren in Hamburg liegt voll im Trend. Das Fahrrad hat sich im Stadtgebiet heute "
            "einen wichtigen Platz erobert. Mehr als 1 000 Kilometer an Radwegen sollen Sie animieren, "
            "umzusteigen und das Fahrrad (neu) zu entdecken. Was Sie dabei beachten müssen, aber auch "
            "Tipps zu interessanten Routen – das finden Sie unter www.hamburg.de/verkehr/radfahren. "
            "[aus einer deutschen Tageszeitung]", "E"),
        (3, "An Werktagen nützen 37 Prozent der Wiener ihr Rad in der Freizeit, aber auch für Wege "
            "in die Arbeit oder zur Schule/Uni ist das Rad ein beliebtes Verkehrsmittel. Das ging aus "
            "den Antworten auf eine Interview-Reihe zum Thema „Mit dem Fahrrad in Wien“ hervor. "
            "Das Ergebnis der Umfrage im Detail: [卷面附柱状图图表] [aus einer österreichischen Zeitung]", "K"),
        (4, "Die aktuelle Ausstellung im Rathaus bietet Wissenswertes über Tierschutz und Tierhaltung. "
            "Für Kinder gibt es die Möglichkeit, verschiedene Haustiere kennenzulernen und sich über "
            "das Zusammenleben mit ihnen zu informieren. Der Eintritt ist frei! "
            "Informationen: www.tierschutzbern.ch [aus einer Schweizer Zeitung]", "B"),
        (5, "„Unsere Stadt blüht auf!“ – Das ist unser Motto für den Frühling und alle sind eingeladen, "
            "mitzumachen: Egal ob Sie neue Sträucher, Bäume oder Blumen am Fenster pflanzen – mehr Natur "
            "tut allen gut! Schicken Sie ein Foto von Ihren Frühlingspflanzen an das Gemeindeamt und "
            "gewinnen Sie einen Einkaufsgutschein im Wert von 50 Euro. "
            "[aus einer österreichischen Tageszeitung]", "G"),
    ],
    "l1_answer_key": ["C", "E", "K", "B", "G"],
    # Lesen Aufgabe 2：长文 + 5 道 A/B/C，答案卡 = C A A A A
    "l2_title": "65 Jahre ohne ernsten Streit",
    "l2_text": (
        "Dass sich zwei Menschen, die schon 65 Jahre verheiratet sind und einander stets treu waren, "
        "nach so langer Zeit immer noch lieben und achten wie am ersten Tag, ist doch etwas sehr "
        "Außergewöhnliches.\n\n"
        "Franz und Hanna Böhm aus Linz sind ein solches Paar. „Liebe auf den ersten Blick war es nicht“, "
        "meint der 88-jährige Franz Böhm und lacht, „denn ich habe ihr anfangs gar nicht gefallen.“ "
        "Damals war seine Hanna 19 Jahre alt und „hatte es schon recht eilig“, endlich zu heiraten. "
        "Heute ist Hanna Böhm 84 und glücklich, dass ihr Franz sie doch noch erobert hat.\n\n"
        "Er hat als Matrose auf einem Donauschiff gearbeitet, sie war die Tochter seines Chefs, "
        "des Steuermannes. Und als er erzählt, wie er einmal eine Frau aus dem Wasser geholt und "
        "so vor dem Ertrinken gerettet hat, da merkt man, wie stolz seine Ehefrau auf ihn ist.\n\n"
        "Eigene Kinder haben die beiden leider nie bekommen, dafür haben sie ihren Neffen, "
        "den Sohn von Hannas Schwester, zu sich genommen und liebevoll erzogen.\n\n"
        "Gemeinsame Spaziergänge am Pöstlingberg in der Nähe von Linz halten das rüstige Paar jung "
        "und fit – und natürlich auch ihre Liebe zueinander, die all die Jahre in guten wie in "
        "schlechten Zeiten bis heute andauert.\n\n[aus einer österreichischen Zeitung]"),
    "l2_items": [
        ("Herr Böhm ist",
         {"A": "65 Jahre alt.", "B": "84 Jahre alt.", "C": "88 Jahre alt."}, "C"),
        ("Franz Böhm",
         {"A": "hat auf einem Schiff gearbeitet.", "B": "hat ein Schiff gekauft.",
          "C": "wollte auf einem Schiff arbeiten."}, "A"),
        ("Franz Böhm hat",
         {"A": "einer Frau in Not geholfen.", "B": "seine Frau oft auf dem Schiff mitfahren lassen.",
          "C": "seinem Chef geholfen."}, "A"),
        ("Das Paar hat",
         {"A": "einen Neffen bei sich aufgenommen.", "B": "einen Sohn bekommen.",
          "C": "viele Kinder bekommen."}, "A"),
        ("Das Ehepaar",
         {"A": "bleibt durch Spazierengehen jung.",
          "B": "geht oft im Stadtzentrum von Linz spazieren.",
          "C": "ist früher gern spazieren gegangen."}, "A"),
    ],
    "l2_answer_key": ["C", "A", "A", "A", "A"],
    # Hören Aufgabe 1 答案卡（P11）：8 个候选项中 4 个打 X
    "h1_topic": "Das Wetter am Wochenende",
    "h1_options": [
        ("Sonne", True), ("Gewitter", True), ("18 Grad", False), ("Regen", False),
        ("Nebel", False), ("Wind", True), ("25 Grad", True), ("Wolken", False),
    ],
    # Hören Aufgabe 3 答案卡（P12）：5 人 × 5 项运动打叉网格
    "h3_topic": "Welchen Sport betreiben Sie in Ihrer Freizeit?",
    "h3_rows": ["1. Sprecherin", "2. Sprecher", "3. Sprecherin", "4. Sprecher", "5. Sprecherin"],
    "h3_cols": ["Fußball", "Tennis", "Laufen", "Schwimmen", "Radfahren"],
    "h3_grid": [
        [False, True, False, True, False],     # 1: Tennis, Schwimmen
        [True, False, True, False, True],      # 2: Fußball, Laufen, Radfahren
        [False, False, False, False, True],    # 3: Radfahren
        [True, True, False, False, False],     # 4: Fußball, Tennis
        [False, False, True, True, False],     # 5: Laufen, Schwimmen
    ],
}

# ==========================================================================
# 视觉核验抄录：ÖSD Zertifikat A2/Österreich / ZA2 Ö
# ==========================================================================
ZA2_OE = {
    "key": "za2oe",
    "source": "ÖSD Zertifikat A2/Österreich / ZA2 Ö Modellsatz",
    "audio": {"a1": "ZA2_Oe_MS_A1_111017.mp3", "a3": "ZA2_Oe_MS_A3_111017.mp3"},
    # Lesen Aufgabe 1 答案卡（P11）：Text 1–5 → Überschrift = F A C H D
    "l1_headlines": {
        "A": "Lebensmittel aus anderen Ländern",
        "B": "Kindergärtnerinnen lernen Sprachen",
        "C": "Gut einkaufen für wenig Geld",
        "D": "Hilfe bei Hausaufgaben und Schulproblemen",
        "E": "800 Euro für Lebensmittel",
        "F": "Kindergarten für ein Jahr gratis",
        "G": "Im Ausland einkaufen",
        "H": "Beim Spielen Sprachen lernen",
        "I": "Mehr Kindergärten für kleine Kinder",
        "K": "Teurer Nachmittagsunterricht",
    },
    "l1_texts": [
        (1, "Wohin mit dem Kind, wenn man nach der Babypause wieder arbeiten will? "
            "Kinderbetreuung kann teuer sein und ist oft nur schwer zu bekommen. Das vor Kurzem "
            "von österreichischen Politikern eingeführte Gratis-Kindergartenjahr soll eine "
            "Verbesserung bringen. Für ihre Fünfjährigen müssen die Eltern in ganz Österreich "
            "nichts bezahlen. In manchen Bundesländern gilt das auch schon für Drei- oder Vierjährige. "
            "[von einer österreichischen Website]", "F"),
        (2, "In Wien kaufen immer mehr Menschen in sogenannten „Ethno-Supermärkten“ ein. "
            "Das sind Geschäfte von Türken, Afrikanern oder Indern, die Gemüse und Obst aus dem Süden, "
            "Süßigkeiten und Gewürze aus dem Orient sowie viele andere Waren aus dem eigenen Land "
            "verkaufen. Waren es früher hauptsächlich ausländische Käufer, so zeigen nun immer mehr "
            "Österreicher Interesse am internationalen Angebot. [aus einem österreichischen Magazin]", "A"),
        (3, "In Wien wurde ein weiterer Sozialmarkt eröffnet. Man verkauft dort frische Lebensmittel, "
            "Haushaltswaren und neuwertige Kleidung an sozial Bedürftige. Im Sozialmarkt dürfen nur "
            "Personen einkaufen, die pro Monat maximal 800 Euro verdienen. Man bekommt einen "
            "Mitgliedspass und bezahlt für alle Waren maximal 30 Prozent des normalen Verkaufspreises. "
            "Brot gibt es sogar gratis. [von einer österreichischen Website]", "C"),
        (4, "In der Wiener Kindergruppe „Niños del Sol“ (Sonnenkinder) spielen, singen und lernen "
            "die Kinder auf Deutsch und auf Spanisch. Die meisten Kinder haben österreichische Eltern, "
            "ein paar Kinder haben eine Mama oder einen Papa aus Peru, Kuba oder Spanien. "
            "Die Kindergärtnerinnen kommen aus Österreich und Südamerika, sie sprechen, lesen und "
            "singen mit den Kindern in ihrer Muttersprache. [aus einer österreichischen Zeitschrift]", "H"),
        (5, "Das Lerncafé Gries in Graz bietet für Schulkinder gratis Nachmittagsbetreuung an. "
            "Viele Kinder, die nicht Deutsch als Muttersprache haben, nutzen das Angebot. "
            "„Wenn ich mich in Deutsch oder Mathematik nicht auskenne, kann ich im Lerncafé einen "
            "Betreuer fragen“, erzählt Aysen, ein 11-jähriges Mädchen aus der Türkei. Willkommen sind "
            "aber alle Kinder, die Probleme beim Lernen haben. [aus einer österreichischen Tageszeitung]", "D"),
    ],
    "l1_answer_key": ["F", "A", "C", "H", "D"],
    # Lesen Aufgabe 2：长文 + 5 道 A/B/C，答案卡 = B B C B A
    "l2_title": "Wenn ein Türke Deutsch unterrichtet",
    "l2_text": (
        "Adnan* ist gebürtiger Türke. Bis zu seinem 15. Geburtstag lebte er in einem kleinen Dorf "
        "in der Türkei. Dann fand Adnans Vater Arbeit in Österreich und die ganze Familie zog nach Wien.\n\n"
        "Damals musste Adnan Deutsch lernen, heute unterrichtet er selbst Deutsch – als Lehrer im "
        "Nachhilfeinstitut** „Phönix“. „Ich unterrichte sehr gerne. Es macht mir viel Freude, mit "
        "Kindern und Jugendlichen zu arbeiten, und wir lachen oft beim Lernen. Außerdem kann ich "
        "meine Schüler gut verstehen, ich hatte früher ja die gleichen Probleme“, meint Adnan.\n\n"
        "„Phönix“ ist kein gewöhnliches Nachhilfeinstitut, da es in erster Linie Lernhilfe für Kinder "
        "aus türkischen Familien anbietet. Damit sich die Familien die Nachhilfe leisten können, "
        "kostet der Unterricht bei „Phönix“ nicht so viel wie in anderen Instituten. Der Verein "
        "möchte die Bildungschancen von ausländischen Kindern verbessern.\n\n"
        "Der Weg zu guten Schulnoten führt bei „Phönix“ aber nicht nur über die Arbeit mit den "
        "Schülerinnen und Schülern, sondern auch über die Eltern. Ein Mitarbeiter von „Phönix“ "
        "besucht das Elternhaus und achtet darauf, dass das Kind einen eigenen Platz zum Lernen hat "
        "und nicht neben dem eingeschalteten Fernseher die Hausaufgaben machen muss. Außerdem lädt "
        "„Phönix“ die Eltern einmal pro Monat zum Elternabend ein und informiert sie über wichtige "
        "Themen wie das österreichische Schulsystem oder Probleme beim Lernen.\n\n"
        "[aus einer österreichischen Zeitung]\n"
        "* Der Name wurde vom ÖSD-Team geändert.\n"
        "** Nachhilfeinstitut: Dort bekommen Schülerinnen und Schüler, die in der Schule Probleme "
        "haben, gegen Bezahlung Privatunterricht."),
    "l2_items": [
        ("Beim Lernen mit Kindern und Jugendlichen hat Adnan",
         {"A": "noch immer große Probleme.", "B": "sehr viel Spaß.",
          "C": "zu wenig Zeit für Deutsch."}, "B"),
        ("Adnan",
         {"A": "gibt nur österreichischen Kindern und Jugendlichen Unterricht.",
          "B": "kennt die Probleme seiner Schüler aus seinem eigenen Leben.",
          "C": "unterrichtet nicht nur Deutsch, sondern auch andere Sprachen."}, "B"),
        ("Das Lehrerteam von „Phönix“",
         {"A": "gibt Kindern mit Schulproblemen gratis Unterricht.",
          "B": "möchte, dass auch die Eltern der Kinder Deutsch lernen.",
          "C": "will, dass ausländische Kinder mehr Erfolg in der Schule haben."}, "C"),
        ("Die Mitarbeiter von „Phönix“ finden, dass die Kinder",
         {"A": "beim Fernsehen viel lernen.", "B": "beim Lernen Ruhe brauchen.",
          "C": "ihre Hausaufgaben alleine machen müssen."}, "B"),
        ("Am Elternabend",
         {"A": "geben die Lehrer von „Phönix“ den Eltern praktische Informationen.",
          "B": "informieren sich nur wenige Eltern beim Nachhilfeinstitut „Phönix“.",
          "C": "sollen die Kinder zusammen mit ihren Eltern zu „Phönix“ kommen."}, "A"),
    ],
    "l2_answer_key": ["B", "B", "C", "B", "A"],
    # Hören Aufgabe 1 答案卡（P11）：8 个职业中 4 个打 X
    "h1_topic": "Welche Berufe sind für junge Menschen am interessantesten?",
    "h1_options": [
        ("Kellner/Kellnerin", False), ("Kfz-Mechaniker/Kfz-Mechanikerin", True),
        ("Maler/Malerin", False), ("Elektrotechniker/Elektrotechnikerin", True),
        ("Verkäufer/Verkäuferin", True), ("Koch/Köchin", False),
        ("Tischler/Tischlerin", False), ("Friseur/Friseurin", True),
    ],
    # Hören Aufgabe 3 答案卡（P12）：5 人 × 5 个工作要素打叉网格
    "h3_topic": "Was ist für Sie am Arbeitsplatz am wichtigsten?",
    "h3_rows": ["1. Sprecherin", "2. Sprecher", "3. Sprecherin", "4. Sprecher", "5. Sprecherin"],
    "h3_cols": ["Geld", "Kollegen", "Arbeitsort", "Arbeitszeit", "Sicherheit"],
    "h3_grid": [
        [True, True, False, False, False],     # 1: Geld, Kollegen
        [False, False, False, False, True],    # 2: Sicherheit
        [False, False, False, True, False],    # 3: Arbeitszeit
        [False, False, False, True, True],     # 4: Arbeitszeit, Sicherheit
        [True, True, True, False, False],      # 5: Geld, Kollegen, Arbeitsort
    ],
}


def head_label(letter, headlines):
    return "%s – %s" % (letter, headlines[letter])


def distractors_from(pool, correct, seed=0, count=2):
    """从卷面真实选项池中按题号轮换取非正确答案（可复现、绝不凭空生成）。"""
    others = [x for x in pool if x != correct]
    if not others:
        return []
    n = min(count, len(others))
    start = seed % len(others)
    return [others[(start + k) % len(others)] for k in range(n)]


def yn_q(stem, is_yes):
    return {"q": stem, "a": ["JA" if is_yes else "NEIN"],
            "distractors": ["NEIN" if is_yes else "JA"]}


def build_volume(v):
    """把一套 A2 卷组装成 4 个大组题。"""
    key, src = v["key"], v["source"]
    groups = []
    refs = [audio_url(v["audio"][k]) for k in ("a1", "a3")]

    # ---------- Lesen Aufgabe 1：10 标题 ↔ 5 短文 ----------
    assert [t[2] for t in v["l1_texts"]] == v["l1_answer_key"], "%s L1 答案卡不一致" % key
    hl = v["l1_headlines"]
    pool = [head_label(x, hl) for x in sorted(hl)]
    passage = (L1_INSTRUCTION + "\n\n[Überschriften A–K / 卷面标题原文]\n" +
               "\n".join(head_label(x, hl) for x in sorted(hl)) +
               "\n\n[Texte 1–5 / 卷面短文原文]\n" +
               "\n\n".join("Text %d: %s" % (n, t) for n, t, _ in v["l1_texts"]))
    qs = []
    for i, (n, text, correct) in enumerate(v["l1_texts"]):
        a = head_label(correct, hl)
        qs.append({"q": "Text %d: %s  →  Welche Überschrift passt?" % (n, text),
                   "a": [a], "distractors": distractors_from(pool, a, i)})
    groups.append({"id": key + "_lesen_a1", "type": "阅读配对", "level": LEVEL,
                   "source": src, "module": "Lesen Aufgabe 1", "passage": passage,
                   "questions": qs})

    # ---------- Lesen Aufgabe 2：长文 + 5 道 A/B/C ----------
    assert [x[2] for x in v["l2_items"]] == v["l2_answer_key"], "%s L2 答案卡不一致" % key
    passage = (L2_INSTRUCTION + "\n\n[" + v["l2_title"] + "]\n\n" + v["l2_text"])
    qs = []
    for i, (stem, opts, correct) in enumerate(v["l2_items"], 1):
        a = opts[correct]
        qs.append({"q": "Aufgabe %d: %s" % (i, stem), "a": [a],
                   "distractors": [opts[x] for x in sorted(opts) if x != correct]})
    groups.append({"id": key + "_lesen_a2", "type": "阅读选择", "level": LEVEL,
                   "source": src, "module": "Lesen Aufgabe 2", "passage": passage,
                   "questions": qs})

    # ---------- Hören Aufgabe 1：8 选 4 → 8 道 JA/NEIN ----------
    assert sum(1 for _, yes in v["h1_options"] if yes) == 4, "%s H1 应恰有 4 个正确项" % key
    passage = (H1_INSTRUCTION + "\n\nThema: " + v["h1_topic"] +
               "\n\n[卷面 8 个候选项 / 原卷需勾选 4 个]\n" +
               "\n".join("%d. %s" % (i, o) for i, (o, _) in enumerate(v["h1_options"], 1)))
    qs = [yn_q("Aufgabe 1 / %s：候选项 „%s“ 是否属于录音中的 4 个正确信息？" % (v["h1_topic"], o), yes)
          for o, yes in v["h1_options"]]
    groups.append({
        "id": key + "_hoeren_a1", "type": "听力判断", "level": LEVEL,
        "source": src, "module": "Hören Aufgabe 1", "passage": passage,
        "audioUrl": audio_url(v["audio"]["a1"]), "audioFile": v["audio"]["a1"],
        "audioUrls": refs, "audioText": "", "audioTextNote": AUDIO_TEXT_NOTE,
        "audioNote": "原卷为 8 个候选项中勾选 4 个；此处忠实展开为 8 道 JA/NEIN 判断题。音频对应本卷 Hören Aufgabe 1。",
        "questions": qs})

    # ---------- Hören Aufgabe 3：5×5 多选网格 → 25 道 JA/NEIN ----------
    rows, cols, grid = v["h3_rows"], v["h3_cols"], v["h3_grid"]
    assert len(grid) == len(rows) == 5 and all(len(r) == len(cols) == 5 for r in grid), \
        "%s H3 网格维度不符" % key
    passage = (H3_INSTRUCTION + "\n\nFrage: " + v["h3_topic"] +
               "\n\n[卷面打叉网格：行 = 5 位 Sprecher/-in，列 = 5 个选项]\n" +
               "列标签: " + " | ".join(cols) + "\n" +
               "行标签: " + " | ".join(rows) +
               "\n\n说明: 每位受访者可以有多个答案；下列判断题的 JA 表示答案卡上该格子打了 X。")
    qs = []
    for ri, row in enumerate(rows):
        for ci, col in enumerate(cols):
            qs.append(yn_q("Aufgabe 3 / %s × „%s“：答案卡该格子是否应打 X？" % (row, col),
                           grid[ri][ci]))
    groups.append({
        "id": key + "_hoeren_a3", "type": "听力判断", "level": LEVEL,
        "source": src, "module": "Hören Aufgabe 3", "passage": passage,
        "audioUrl": audio_url(v["audio"]["a3"]), "audioFile": v["audio"]["a3"],
        "audioUrls": refs, "audioText": "", "audioTextNote": AUDIO_TEXT_NOTE,
        "audioNote": "原卷为 5 人 × 5 项的多选打叉网格；此处忠实展开为 25 道 JA/NEIN 判断题，听完一遍音轨完成整组。",
        "questions": qs})

    return groups


def main():
    groups = build_volume(ZA2) + build_volume(ZA2_OE)

    # ===== 严谨性校验 =====
    b1 = json.load(open(os.path.join(BASE, "data", "_staging", "osd_b1_parsed_group.json"),
                        encoding="utf-8"))
    b1_keys = set().union(*[set(g.keys()) for g in b1])
    a2_keys = set().union(*[set(g.keys()) for g in groups])
    assert a2_keys <= b1_keys, "出现 B1 终极 Schema 之外的新字段: %s" % (a2_keys - b1_keys)
    for g in groups:
        assert all(sorted(q.keys()) == ["a", "distractors", "q"] for q in g["questions"]), \
            "%s 子题字段不符" % g["id"]
        assert all(isinstance(q["a"], list) and len(q["a"]) == 1 for q in g["questions"])
        assert all(1 <= len(q["distractors"]) <= 2 for q in g["questions"])
        assert all(q["a"][0] not in q["distractors"] for q in g["questions"])
        assert all(len(set(q["distractors"])) == len(q["distractors"]) for q in g["questions"])
        if "audioUrl" in g:
            assert os.path.exists(os.path.join(BASE, "data", "audio", "a2", g["audioFile"])), \
                "音频不存在: %s" % g["audioFile"]
            # 关键：audioUrls 只允许指向实际引用（会进 Git）的音轨，避免部署包死链
            for u in g["audioUrls"]:
                from urllib.parse import unquote
                assert unquote(u) in [unquote(x) for x in
                                      (audio_url(ZA2["audio"][k]) for k in ("a1", "a3"))] + \
                                     [unquote(x) for x in
                                      (audio_url(ZA2_OE["audio"][k]) for k in ("a1", "a3"))], \
                    "audioUrls 含未引用音轨: %s" % u
    assert len({g["id"] for g in groups}) == len(groups), "组 id 重复"

    if os.path.exists(OUT):
        shutil.copyfile(OUT, OUT + ".bak")
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(groups, f, ensure_ascii=False, indent=2)

    print("WROTE:", os.path.relpath(OUT, BASE))
    print("大组题总数: %d" % len(groups))
    print("  - 阅读组: %d / 听力组: %d" % (
        sum(1 for g in groups if g["type"].startswith("阅读")),
        sum(1 for g in groups if g["type"].startswith("听力"))))
    print("子题总数: %d" % sum(len(g["questions"]) for g in groups))
    print("\n===== 各组明细 =====")
    for g in groups:
        print("  %-20s %-6s %-18s %2d 题  passage %5d 字" % (
            g["id"], g["type"], g["module"], len(g["questions"]), len(g.get("passage", ""))))
    print("\n===== 听力组 audioUrl =====")
    for g in groups:
        if "audioUrl" in g:
            print("  %-20s -> %s" % (g["id"], g["audioUrl"]))
    print("\n===== 前 3 道题（第一大组的前 3 个子题） =====")
    first = groups[0]
    print("所属组: %s | %s | %s | %s" % (
        first["id"], first["type"], first["source"], first["module"]))
    for i, q in enumerate(first["questions"][:3], 1):
        print("\n  [%d] q: %s" % (i, q["q"][:220]))
        print("      a          : %s" % q["a"])
        print("      distractors: %s" % q["distractors"])


if __name__ == "__main__":
    main()
