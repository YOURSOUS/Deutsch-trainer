#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""组装 ÖSD A1 的「终极 Schema 大组题」→ data/_staging/osd_a1_parsed_group.json

与 B1 的差异（重要）：
- A1 没有长篇阅读，多为「情境↔广告」「短文↔图标」「照片↔听力文本」的配对题，
  以及三则广告配 6 道 JA/NEIN 判断题。共享材料统一放在 group.passage。
- 图片材料（Bild 1–6 / Foto A–F）在 PDF 里是图，纯文本提取为空；此处按视觉核验
  结果做**如实文字转述**，并在 passage 内明确标注「原卷为图片」，绝不冒充德文原文。
- 答案来源：两套卷的「Lösungen und Bewertung」答案卡（文字答案表 + JA/NEIN 打叉网格），
  已逐页视觉核验，并与题目页的广告编号 / 短文 / 图标做了交叉自洽验证。

不纳入的题型（保持「绝不瞎编」原则）：
- Hören Aufgabe 2（Notizblatt 开放式填空，无给定选项）
- Schreiben / Sprechen（开放式写作与口语）
- KID A1 儿童版（题型与成人卷不同，本轮未纳入，待用户确认后再补）

数据来源全部为已核验产物；本脚本不做正则猜测、不生成任何未见于卷面的选项。
"""
import os
import json
import shutil
from urllib.parse import quote

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(BASE, "data", "_staging", "osd_a1_parsed_group.json")
AUDIO_REL_DIR = "data/audio/a1"
LEVEL = "A1"

AUDIO_TEXT_NOTE = ("源 PDF 为 Kandidatenblätter（考生卷），不含听力原文 Hörtexte；"
                   "如需无障碍文本/提示，须另行获取 Prüferblätter 或人工转写。")

PIC_NOTE = "原卷该部分为图片，下列为卷面图片的如实文字转述（非德文原文）。"


def audio_url(fname):
    return quote("%s/%s" % (AUDIO_REL_DIR, fname), safe="/")


# ==========================================================================
# 视觉核验抄录：ÖSD Zertifikat A1 / ZA1
# ==========================================================================
ZA1 = {
    "key": "za1",
    "source": "ÖSD Zertifikat A1 / ZA1 Modellsatz",
    "audio": {
        "a1": "ZA1_MS_A1_060917.mp3",
        "a2": "ZA1_MS_A2_060917.mp3",
        "a3": "ZA1_MS_A3_060917.mp3",
    },
    # Lesen Aufgabe 1：答案卡 Situation A–E → Anzeige = 4 6 1 5 2（Anzeige 3 多余）
    "a1_instruction": ("Situation: Sie suchen verschiedene Dinge in der Zeitung. Finden Sie zu jeder "
                       "Situation (Situation A–E) die passende Anzeige (Anzeige Nr. 1–6). "
                       "Achtung: Eine Anzeige ist zu viel."),
    "a1_anzeigen": {
        1: ("Sekretärin/Sekretär gesucht",
            "Internationale Firma sucht Sekretärin/Sekretär mit Berufserfahrung (Vollzeit). "
            "Aufgaben: telefonische Kundenbetreuung, organisatorische Tätigkeiten. "
            "Bewerbungen an: info@personalvermittlung-holzer.de"),
        2: ("Fitnesscenter Olymp",
            "Unser Angebot: 120 Geräte für Kraft- und Fitnesstraining, Rückengymnastik, "
            "Beratung durch geprüfte Trainer. Burggasse 10, 1070 Wien, täglich 10–22 Uhr"),
        3: ("Buchhandlung Steiner",
            "Bücher zum halben Preis: Richtig telefonieren – Gesprächstraining für SekretärInnen; "
            "Gesund essen im Büro: 50 Kochideen; 100 Jahre Sportfotografie; Diverse Kinderbücher. "
            "Angebot gültig bis Ende Mai"),
        4: ("Die ganze Welt um wenig Geld! Günstige Auslandsanrufe",
            "Günstige Auslandsanrufe ab 1,9 Cent/Minute. weltweitanrufen.de bietet Ihnen die "
            "besten Tarife für Anrufe in Mobilnetze und ins ausländische Festnetz. www.weltweitanrufen.de"),
        5: ("Hilfe im Haushalt (Petra Maier)",
            "SIE SUCHEN JEMANDEN, der Ihre Wäsche wäscht und bügelt? SIE BRAUCHEN JEMANDEN, "
            "der beim Saubermachen oder bei der Gartenarbeit hilft? Kein Problem! "
            "RUFEN SIE MICH AN: Petra Maier, Tel. 0676 / 5568987"),
        6: ("Feinkost Klement",
            "In unserem Delikatessengeschäft bieten wir Ihnen: hausgemachte Salate, "
            "Brötchen mit Ei- und Curryaufstrich, Schinken und Käse aus der Region. "
            "Petersgasse 8, 4051 Basel, Mo–Sa: 9–18 Uhr"),
    },
    "a1_situations": [
        ("A", "Sie haben viele Freunde in anderen Ländern und möchten billig mit ihnen telefonieren.", 4),
        ("B", "Sie sollen für ein Fest etwas zum Essen mitbringen. Sie haben keine Zeit zum Kochen.", 6),
        ("C", "Sie suchen einen Job. Sie wollen in einem Büro arbeiten.", 1),
        ("D", "Sie haben eine große Wohnung. Sie brauchen Hilfe bei der Hausarbeit.", 5),
        ("E", "Sie arbeiten viel am Computer. In Ihrer Freizeit möchten Sie Sport machen.", 2),
    ],
    "a1_answer_key": [4, 6, 1, 5, 2],
    # Lesen Aufgabe 2：答案卡 JA/NEIN = 1 NEIN, 2 JA, 3 NEIN, 4 NEIN, 5 NEIN, 6 JA
    "a2_material": (
        "Situation: Sie lesen drei Anzeigen. Dazu gibt es je 2 Fragen. Antworten Sie mit JA oder NEIN.\n\n"
        "[1] Schönes-Wochenende-Ticket\n"
        "gültig ab Samstag 0 Uhr bis Montag 3 Uhr für Reisen in Deutschland; "
        "für Gruppen bis zu fünf Personen und für Einzelreisende. "
        "Preis: 39 Euro im Internet, 41 Euro im Reisezentrum an Ihrem Bahnhof. www.bahn.de/angebote\n\n"
        "[2] Lesen im Park\n"
        "Im Sommer gibt es in Grazer Parks wieder Bücherkisten mit vielen Kinderbüchern – "
        "zum Lesen vor Ort oder zum Mit-nach-Hause-Nehmen. "
        "Weitere Aktivitäten: Bastel- und Malgruppen; Papier und Stifte haben wir für dich. "
        "www.lesen-im-park.at\n\n"
        "[3] 3-Zimmer-Wohnung\n"
        "Neu renovierte Wohnung (63 m²) ab 1. August zu vermieten. Gesamtmiete: CHF 1'200,–. "
        "Sie haben noch Fragen? Schreiben Sie eine E-Mail an: info@immobilien-heiss.ch. "
        "Termine zur Wohnungsbesichtigung: 15. Juli, 11.00 Uhr | 18. Juli, 15.00 Uhr"),
    "a2_questions": [
        ("Kann man am Freitagabend mit dem Ticket fahren?", "NEIN"),
        ("Kostet das Ticket beim Kauf am Bahnhof mehr?", "JA"),
        ("Darf man die Bücher nur im Park lesen?", "NEIN"),
        ("Müssen die Kinder Papier und Stifte mitbringen?", "NEIN"),
        ("Kann man telefonisch Informationen bekommen?", "NEIN"),
        ("Kann man die Wohnung am Vormittag sehen?", "JA"),
    ],
    "a2_answer_key": ["NEIN", "JA", "NEIN", "NEIN", "NEIN", "JA"],
    # Lesen Aufgabe 3：答案卡 Text A–E → Bild = 5 4 1 6 3（Bild 2 多余）
    "a3_instruction": ("Situation: Sie lesen hier 5 kurze Texte (Text A–E). Auf Blatt 2 gibt es zu jedem "
                       "Text je ein Bild (Bild 1–6). Welches Bild passt zu welchem Text? "
                       "Achtung: Ein Bild ist zu viel."),
    "a3_bilder": {
        1: "Verbotsschild »Rauchen verboten«（点燃的香烟 + 红色斜杠）",
        2: "Verbotsschild »Essen und Trinken verboten«（饮料杯与汉堡 + 红色斜杠）【多余项】",
        3: "公交车正面图标（Bus）",
        4: "戴白色厨师帽的厨师卡通形象（Koch）",
        5: "Verbotsschild »Handy verboten«（手机带无线电波 + 红色斜杠）",
        6: "牵着狗散步的人形剪影（Hund an der Leine）",
    },
    "a3_texts": [
        ("A", "Liebe Besucherinnen und Besucher! Im Krankenhaus ist das Telefonieren mit Handy "
              "verboten. Bitte schalten Sie Ihr Handy während Ihres Besuchs bei uns aus.", 5),
        ("B", "Gasthaus Neuwirth – leichte regionale Küche, frische Salate vom Buffet, "
              "günstige Mittagsmenüs. Mo–Sa: 9–22 Uhr | Sonntag Ruhetag", 4),
        ("C", "Liebe Kolleginnen und Kollegen! In den Büroräumen ist das Rauchen verboten. "
              "Bitte nützen Sie die Raucherzonen im Erdgeschoss.", 1),
        ("D", "Liebe Hundebesitzer! Wir bitten Sie, im Interesse aller Parkbenützer Ihren Hund "
              "an die Leine zu nehmen.", 6),
        ("E", "Der Flughafen-Bus bringt Sie schnell und bequem ins Stadtzentrum. Nützen Sie das "
              "Angebot! Fahrplanauskünfte am Flughafen Graz: +43 (316) 2902172", 3),
    ],
    "a3_answer_key": [5, 4, 1, 6, 3],
    # Hören Aufgabe 1：答案卡 Bild A–F → Text = 5 / - / 2 / 4 / 1 / 3（B 为示例）
    "h1_instruction": ("Sehen Sie sich die Bilder gut an. Sie hören jetzt fünf verschiedene Texte zu den "
                       "Fotos. Sie hören jeden Text ein Mal. Welcher Text passt zu welchem Foto? "
                       "Achtung: Ein Bild ist zu viel. (Foto B = Beispiel, 不计入)"),
    "h1_fotos": [
        ("A", "Apotheke：穿白袍的店员把一盒药递给一位年长女顾客", 5),
        ("B", "两位金发女性在书架前一起看一本书【示例题 Beispiel，不计入】", None),
        ("C", "一男一女在办公室一起看笔记本电脑", 2),
        ("D", "超市收银台：顾客拿着装满蔬菜的购物篮，收银员在扫码", 4),
        ("E", "两名背着背包、手持登山杖的徒步者在山间", 1),
        ("F", "一男一女在餐桌旁准备食物 / 摆餐具", 3),
    ],
    "h1_answer_key": {"A": 5, "C": 2, "D": 4, "E": 1, "F": 3},
    # Hören Aufgabe 3：答案卡 Text 1–5 → Asien / Afrika / Europa / Amerika / Afrika
    "h3_stem": "Wo gefällt es Ihnen am besten?",
    "h3_options": ["Afrika", "Amerika", "Asien", "Europa"],
    "h3_answers": ["Asien", "Afrika", "Europa", "Amerika", "Afrika"],
}

# ==========================================================================
# 视觉核验抄录：ÖSD Zertifikat A1/Österreich / ZA1 Ö
# ==========================================================================
ZA1_OE = {
    "key": "za1oe",
    "source": "ÖSD Zertifikat A1/Österreich / ZA1 Ö Modellsatz",
    "audio": {
        "a1": "ZA1_OE_MS_A1_150917.mp3",
        "a2": "ZA1_OE_MS_A2_150917.mp3",
        "a3": "ZA1_OE_MS_A3_150917.mp3",
    },
    # Lesen Aufgabe 1：答案卡 Situation A–E → Anzeige = 2 6 3 1 5（Anzeige 4 多余）
    "a1_instruction": ("Situation: Sie suchen verschiedene Dinge in der Zeitung. Finden Sie zu jeder "
                       "Situation (Situation A–E) die passende Anzeige (Anzeige Nr. 1–6). "
                       "Achtung: Eine Anzeige ist zu viel."),
    "a1_anzeigen": {
        1: ("GLOBAL UNION – Geldtransfer",
            "Geldtransfer in alle Länder, Barauszahlung in wenigen Minuten. "
            "Gebühren für Überweisungen in die Türkei: bis € 50: € 4,90; € 51 bis € 100: € 6,90. "
            "Gebühren für weitere Länder finden Sie auf www.globalunion.at"),
        2: ("Oma/Opa-Projekt",
            "Wir lernen mit dir am Nachmittag in deiner Schule. derverein@nl40.at, 0699/1123 8004"),
        3: ("Hals-Nasen-Ohren-Arzt Dr. Claudia Setz",
            "Ordinationszeiten Mo: 10:00–13:00, Mi: 15:00–17:00, Do: 15:00–19:00. "
            "Telefon: 01 / 26 23 71 7, Schloßhoferstraße 38/1, 1210 Wien"),
        4: ("Papier & Buch Heyner – Sommeraktionen",
            "alles zum Schulanfang für wenig Geld, 10 % auf vegetarische Kochbücher, "
            "Hörbücher in verschiedenen Sprachen ab 5 €. Unsere Verkäuferinnen helfen Ihnen gerne! "
            "Getreidegasse 102, 5020 Salzburg"),
        5: ("SPRACHINSTITUT NEUNER",
            "WIR BIETEN: Kurse in kleinen Gruppen, Niveau A1–C2, aktuelle Materialien. "
            "KURSZEITEN: Mo–Fr, 8:30–11:30 Uhr oder 13:00–16:00 Uhr. INFORMATION: info@neuner.at"),
        6: ("Hilfe in der Küche – Restaurant »Zum Alpenkönig«",
            "Wir brauchen für die Mittagszeit Hilfe in der Küche. Mo, Mi, Fr: 11–14 Uhr, gute Bezahlung. "
            "Restaurant »Zum Alpenkönig«, Dorfgasse 12, 6020 Innsbruck"),
    },
    "a1_situations": [
        ("A", "Ihr Sohn hat Probleme in Mathematik. Er muss rechnen üben und braucht Hilfe.", 2),
        ("B", "Sie suchen einen Job. Sie können gut kochen.", 6),
        ("C", "Sie hören seit zwei Tagen nicht gut. Sie möchten einen Hörtest machen.", 3),
        ("D", "Ihre Familie lebt in einem anderen Land. Sie möchten Geld schicken.", 1),
        ("E", "Sie möchten in einer Sprachschule Deutsch lernen. Sie haben nur am Nachmittag Zeit.", 5),
    ],
    "a1_answer_key": [2, 6, 3, 1, 5],
    # Lesen Aufgabe 2：答案卡 1 NEIN, 2 JA, 3 JA, 4 JA, 5 NEIN, 6 JA
    "a2_material": (
        "Situation: Sie lesen drei Anzeigen. Dazu gibt es je 2 Fragen. Antworten Sie mit JA oder NEIN.\n\n"
        "[1] Achtung! (Deutschkurs)\n"
        "Ihr Deutschkurs fängt erst nächste Woche an. Die Trainerin ist krank. "
        "Erster Kurstag: Montag, 13. September. Bücher bitte vor dem Kurs im Büro abholen. "
        "Informationen telefonisch: 02742/328 oder im Internet: www.vhs-noe.at\n\n"
        "[2] Internationaler Abend\n"
        "Orientalische Musik hören, zu afrikanischen Rhythmen tanzen, Essen aus Österreich genießen. "
        "Bei uns treffen sich Kulturen aus aller Welt. Samstag, 27. Juli, ab 20:00 Uhr "
        "im Vereinstreff Leopoldsdorf. Eintritt: 2 Euro\n\n"
        "[3] Service-Hotline\n"
        "Ist Ihr Kühlschrank kaputt? Dann rufen Sie uns bitte an. "
        "Wir helfen Ihnen gerne und sind von 6 bis 22 Uhr für Sie da. "
        "Tel.: 0800 100 107. Garantie auf Neugeräte: 2 Jahre"),
    "a2_questions": [
        ("Bekommt man die Bücher im Kurs?", "NEIN"),
        ("Kann man in der Schule anrufen?", "JA"),
        ("Gibt es bei der Party Musik aus Afrika?", "JA"),
        ("Muss man für die Party etwas bezahlen?", "JA"),
        ("Kann man bei Problemen mit dem Herd Hilfe bekommen?", "NEIN"),
        ("Kann man auch am Abend anrufen?", "JA"),
    ],
    "a2_answer_key": ["NEIN", "JA", "JA", "JA", "NEIN", "JA"],
    # Lesen Aufgabe 3：答案卡 Text A–E → Bild = 4 3 2 1 6（Bild 5 多余）
    "a3_instruction": ("Situation: Sie lesen hier 5 kurze Texte (Text A–E). Auf Blatt 2 gibt es zu jedem "
                       "Text je ein Bild (Bild 1–6). Welches Bild passt zu welchem Text? "
                       "Achtung: Ein Bild ist zu viel."),
    "a3_bilder": {
        1: "拖车正在拖走一辆小汽车（Abschleppwagen）",
        2: "一个人用钥匙打开红色挂锁（Schlüsseldienst / Schloss öffnen）",
        3: "一个人捧着翻开的书阅读（Buchklub）",
        4: "Verbotsschild »Fußballspielen verboten«（足球 + 红色斜杠）",
        5: "Verbotsschild »Hund verboten«（狗 + 红色斜杠）【多余项】",
        6: "一只鹿的黑色剪影（Hirsch / Tierpark）",
    },
    "a3_texts": [
        ("A", "Bitte beachten Sie, dass das Fußballspielen auf den Rasenflächen des Parks verboten ist!", 4),
        ("B", "Kommen Sie zum Buchklub. Wir lesen jeden Monat zusammen ein neues Buch und sprechen "
              "darüber. Montags nach dem Deutschkurs, Raum 34.2", 3),
        ("C", "Schlüssel verloren? Schloss kaputt? Ihr Schlüsseldienst kommt sofort! "
              "Rufen Sie uns an: 01 430 25 25. Wir öffnen Ihre Tür für Sie.", 2),
        ("D", "Sie dürfen hier NICHT HALTEN oder PARKEN! Parkende Autos werden abgeschleppt!", 1),
        ("E", "Willkommen im Tierpark Herberstein. Über 600 Tiere, viel Natur, alte Bäume ... "
              "Mai bis September 9–17 Uhr. www.tierwelt-herberstein.at", 6),
    ],
    "a3_answer_key": [4, 3, 2, 1, 6],
    # Hören Aufgabe 1：答案卡 Bild A–F → Text = 3 / - / 1 / 4 / 2 / 5（B 为示例）
    "h1_instruction": ("Sehen Sie sich die Bilder gut an. Sie hören jetzt fünf verschiedene Texte zu den "
                       "Fotos. Sie hören jeden Text ein Mal. Welcher Text passt zu welchem Foto? "
                       "Achtung: Ein Bild ist zu viel. (Foto B = Beispiel, 不计入)"),
    "h1_fotos": [
        ("A", "市场水果摊：一男一女在挑选柑橘类水果，旁边是成堆的橙子", 3),
        ("B", "两名徒步者（红色背包）在山间查看地图 / 手机【示例题 Beispiel，不计入】", None),
        ("C", "三个人围在一台电脑显示器前（办公室 / 电脑课）", 1),
        ("D", "两名男子在花园里弯腰查看植物", 4),
        ("E", "牙医戴手套与防护面罩，用器械检查病人张开的嘴", 2),
        ("F", "穿深色西装的男士向一位女士展示一盒药品 / 药片", 5),
    ],
    "h1_answer_key": {"A": 3, "C": 1, "D": 4, "E": 2, "F": 5},
    # Hören Aufgabe 3：答案卡 Text 1–5 → im Wald / im Büro / im Restaurant / im Supermarkt / im Büro
    "h3_stem": "Wo möchten Sie am liebsten arbeiten?",
    "h3_options": ["im Büro", "im Supermarkt", "im Wald", "im Restaurant"],
    "h3_answers": ["im Wald", "im Büro", "im Restaurant", "im Supermarkt", "im Büro"],
}


def opt_label(prefix, n, short):
    return "%s %s – %s" % (prefix, n, short)


def distractors_from(pool, correct, seed=0, count=2):
    """从卷面真实选项池中按题号轮换取非正确答案作为干扰项（可复现、绝不凭空生成）。"""
    others = [x for x in pool if x != correct]
    if not others:
        return []
    n = min(count, len(others))
    start = seed % len(others)
    return [others[(start + k) % len(others)] for k in range(n)]


def build_volume(v):
    """把一套卷组装成 5 个大组题。"""
    key, src = v["key"], v["source"]
    groups = []

    # ---------- Lesen Aufgabe 1：情境 ↔ 广告 ----------
    assert [x[2] for x in v["a1_situations"]] == v["a1_answer_key"], "%s A1 答案卡不一致" % key
    pool = [opt_label("Anzeige", n, v["a1_anzeigen"][n][0]) for n in sorted(v["a1_anzeigen"])]
    passage = v["a1_instruction"] + "\n\n[Anzeigen / 广告原文]\n" + "\n\n".join(
        "Anzeige %d – %s\n%s" % (n, v["a1_anzeigen"][n][0], v["a1_anzeigen"][n][1])
        for n in sorted(v["a1_anzeigen"]))
    qs = []
    for i, (letter, text, correct) in enumerate(v["a1_situations"]):
        a = opt_label("Anzeige", correct, v["a1_anzeigen"][correct][0])
        qs.append({"q": "Situation %s: %s  →  Welche Anzeige passt?" % (letter, text),
                   "a": [a], "distractors": distractors_from(pool, a, i)})
    groups.append({"id": key + "_lesen_a1", "type": "阅读配对", "level": LEVEL,
                   "source": src, "module": "Lesen Aufgabe 1", "passage": passage,
                   "questions": qs})

    # ---------- Lesen Aufgabe 2：三则广告 + 6 道 JA/NEIN ----------
    assert [x[1] for x in v["a2_questions"]] == v["a2_answer_key"], "%s A2 答案卡不一致" % key
    ja_nein = ["JA", "NEIN"]
    qs = []
    for i, (q, ans) in enumerate(v["a2_questions"], 1):
        qs.append({"q": "Frage %d: %s" % (i, q), "a": [ans],
                   "distractors": [x for x in ja_nein if x != ans]})
    groups.append({"id": key + "_lesen_a2", "type": "阅读判断", "level": LEVEL,
                   "source": src, "module": "Lesen Aufgabe 2", "passage": v["a2_material"],
                   "questions": qs})

    # ---------- Lesen Aufgabe 3：短文 ↔ 图标 ----------
    assert [x[2] for x in v["a3_texts"]] == v["a3_answer_key"], "%s A3 答案卡不一致" % key
    pool = [opt_label("Bild", n, v["a3_bilder"][n]) for n in sorted(v["a3_bilder"])]
    passage = (v["a3_instruction"] + "\n\n" + PIC_NOTE + "\n[Bild 1–6 文字转述]\n" +
               "\n".join("Bild %d – %s" % (n, v["a3_bilder"][n]) for n in sorted(v["a3_bilder"])))
    qs = []
    for i, (letter, text, correct) in enumerate(v["a3_texts"]):
        a = opt_label("Bild", correct, v["a3_bilder"][correct])
        qs.append({"q": "Text %s: %s  →  Welches Bild passt?" % (letter, text),
                   "a": [a], "distractors": distractors_from(pool, a, i)})
    groups.append({"id": key + "_lesen_a3", "type": "阅读配对", "level": LEVEL,
                   "source": src, "module": "Lesen Aufgabe 3", "passage": passage,
                   "questions": qs})

    # ---------- Hören Aufgabe 1：照片 ↔ 听力文本 ----------
    fotos = [(l, d, t) for l, d, t in v["h1_fotos"] if t is not None]
    assert {l: t for l, d, t in fotos} == v["h1_answer_key"], "%s H1 答案卡不一致" % key
    pool = ["Text %d" % n for n in range(1, 6)]
    passage = (v["h1_instruction"] + "\n\n" + PIC_NOTE + "\n[Foto A–F 文字转述]\n" +
               "\n".join("Foto %s – %s" % (l, d) for l, d, t in v["h1_fotos"]))
    qs = []
    for i, (letter, desc, correct) in enumerate(fotos):
        a = "Text %d" % correct
        qs.append({"q": "Foto %s: %s  →  Welcher Text passt?" % (letter, desc),
                   "a": [a], "distractors": distractors_from(pool, a, i)})
    groups.append({
        "id": key + "_hoeren_a1", "type": "听力选择", "level": LEVEL,
        "source": src, "module": "Hören Aufgabe 1", "passage": passage,
        "audioUrl": audio_url(v["audio"]["a1"]), "audioFile": v["audio"]["a1"],
        "audioUrls": [audio_url(v["audio"][k]) for k in ("a1", "a3")],
        "audioText": "", "audioTextNote": AUDIO_TEXT_NOTE,
        "audioNote": "Foto B 为卷面示例题（Beispiel），不计入 5 道子题；另有一张多余图片。音频对应本卷 Hören Aufgabe 1。",
        "questions": qs})

    # ---------- Hören Aufgabe 3：5 人问答 ↔ 给定选项 ----------
    qs = []
    for i, ans in enumerate(v["h3_answers"], 1):
        qs.append({"q": "Text %d: %s" % (i, v["h3_stem"]), "a": [ans],
                   "distractors": distractors_from(v["h3_options"], ans, i)})
    groups.append({
        "id": key + "_hoeren_a3", "type": "听力选择", "level": LEVEL,
        "source": src, "module": "Hören Aufgabe 3",
        "passage": ("Situation: Sie hören jetzt 5 Personen, die befragt werden. Hören Sie gut zu und "
                    "kreuzen Sie die richtigen Antworten an. Pro Person gibt es nur eine Antwort. "
                    "Sie hören die Texte ein Mal.\n\nFrage: %s\n选项（卷面原文）: %s"
                    % (v["h3_stem"], " | ".join(v["h3_options"]))),
        "audioUrl": audio_url(v["audio"]["a3"]), "audioFile": v["audio"]["a3"],
        "audioUrls": [audio_url(v["audio"][k]) for k in ("a1", "a3")],
        "audioText": "", "audioTextNote": AUDIO_TEXT_NOTE,
        "audioNote": "音频对应本卷 Hören Aufgabe 3；5 段短采访共用同一音轨，按 Text 1–5 顺序作答。",
        "questions": qs})

    return groups


def main():
    groups = build_volume(ZA1) + build_volume(ZA1_OE)

    # ===== 严谨性校验 =====
    b1 = json.load(open(os.path.join(BASE, "data", "_staging", "osd_b1_parsed_group.json"),
                        encoding="utf-8"))
    b1_keys = set().union(*[set(g.keys()) for g in b1])
    a1_keys = set().union(*[set(g.keys()) for g in groups])
    assert a1_keys <= b1_keys, "出现 B1 终极 Schema 之外的新字段: %s" % (a1_keys - b1_keys)
    for g in groups:
        assert all(sorted(q.keys()) == ["a", "distractors", "q"] for q in g["questions"]), \
            "%s 子题字段不符" % g["id"]
        assert all(isinstance(q["a"], list) and len(q["a"]) == 1 for q in g["questions"])
        assert all(1 <= len(q["distractors"]) <= 2 for q in g["questions"])
        assert all(q["a"][0] not in q["distractors"] for q in g["questions"])
        if "audioUrl" in g:
            p = os.path.join(BASE, "data", "audio", "a1", g["audioFile"])
            assert os.path.exists(p), "音频不存在: %s" % p
    assert len({g["id"] for g in groups}) == len(groups), "组 id 重复"

    if os.path.exists(OUT):
        shutil.copyfile(OUT, OUT + ".bak")
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(groups, f, ensure_ascii=False, indent=2)

    # ===== 统计 =====
    print("WROTE:", os.path.relpath(OUT, BASE))
    print("大组题总数: %d" % len(groups))
    print("  - 阅读组: %d / 听力组: %d" % (
        sum(1 for g in groups if g["type"].startswith("阅读")),
        sum(1 for g in groups if g["type"].startswith("听力"))))
    print("子题总数: %d" % sum(len(g["questions"]) for g in groups))
    print("\n===== 各组明细 =====")
    for g in groups:
        print("  %-22s %-6s %-18s %d 题  passage %5d 字" % (
            g["id"], g["type"], g["module"], len(g["questions"]), len(g.get("passage", ""))))
    print("\n===== 听力组 audioUrl =====")
    for g in groups:
        if "audioUrl" in g:
            print("  %-22s -> %s" % (g["id"], g["audioUrl"]))
    print("\n===== 前 3 道题（第一大组的前 3 个子题） =====")
    first = groups[0]
    print("所属组: %s | %s | %s | %s" % (
        first["id"], first["type"], first["source"], first["module"]))
    for i, q in enumerate(first["questions"][:3], 1):
        print("\n  [%d] q: %s" % (i, q["q"]))
        print("      a          : %s" % q["a"])
        print("      distractors: %s" % q["distractors"])


if __name__ == "__main__":
    main()
