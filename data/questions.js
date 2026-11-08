/* ==========================================================================
 * 德语学习站 · 题库数据（自 index.html 拆分，纯数据，勿在此写业务逻辑）
 * 加载方式：由 index.html 用 script 标签引入  →  window.ALL_QUESTIONS
 * index.html 内以局部别名 bank 引用；判题 / SRS / 存档逻辑均在 index.html。
 * 新增题目：直接在对应等级数组末尾追加 { type, q, a }。
 * ========================================================================== */
  /* ==========================================================================
   * 题库：A1-C1 每级 70 题，共 350 题。
   * 题型：词汇 / 语法填空 / 翻译 / 选择 / 改错。
   * 梯度依据 CEFR 与 Goethe-Institut 语法大纲：
   *   A1 现在时、sein/haben、名词与冠词、W-疑问、可分动词
   *   A2 完成时、三四格、比较级、从句(weil/dass/wenn/ob)、反身动词
   *   B1 关系从句、被动语态、虚拟式II入门、um...zu 与带 zu 不定式、je...desto
   *   B2 虚拟式II完整、分词定语、属格关系代词、功能动词、复杂从句
   *   C1 高级书面语、惯用语、虚拟式I转述、抽象论说句型
   * 答案判定：忽略大小写、ä/ö/ü/ß 的写法、标点与多余空格。
   * ========================================================================== */
window.ALL_QUESTIONS = {
    1: [
      { type: '词汇', q: '“你好”用德语怎么说？', a: ['hallo'], distractors: ['tschuess', 'danke', 'bitte'] },
      { type: '词汇', q: '“早上好”用德语怎么说？', a: ['guten morgen'], distractors: ['guten abend', 'gute nacht', 'guten tag'] },
      { type: '词汇', q: '“晚上好”用德语怎么说？', a: ['guten abend'], distractors: ['guten morgen', 'gute nacht', 'guten tag'] },
      { type: '词汇', q: '“再见”用德语怎么说？', a: ['tschuess', 'auf wiedersehen'] },
      { type: '词汇', q: '“谢谢”用德语怎么说？', a: ['danke', 'vielen dank'], distractors: ['bitte', 'entschuldigung', 'hallo'] },
      { type: '词汇', q: '“请 / 不客气”用德语怎么说？', a: ['bitte'], distractors: ['danke', 'gern', 'entschuldigung'] },
      { type: '词汇', q: '“对不起”用德语怎么说？', a: ['entschuldigung', 'entschuldigen sie'] },
      { type: '词汇', q: '“是”和“不”用德语怎么说？', a: ['ja nein', 'ja, nein'] },
      { type: '词汇', q: '“水”用德语怎么说？', a: ['wasser'], distractors: ['wein', 'saft', 'bier'] },
      { type: '词汇', q: '“面包”用德语怎么说？', a: ['brot'], distractors: ['kuche', 'reis', 'fleisch'] },
      { type: '词汇', q: '“苹果”用德语怎么说？', a: ['apfel'], distractors: ['banane', 'orange', 'birne'] },
      { type: '词汇', q: '“咖啡”用德语怎么说？', a: ['kaffee'], distractors: ['tee', 'milch', 'saft'] },
      { type: '词汇', q: '“茶”用德语怎么说？', a: ['tee'], distractors: ['kaffee', 'milch', 'wasser'] },
      { type: '词汇', q: '“牛奶”用德语怎么说？', a: ['milch'], distractors: ['wasser', 'saft', 'wein'] },
      { type: '词汇', q: '“书”用德语怎么说？', a: ['buch'], distractors: ['heft', 'zeitung', 'tisch'] },
      { type: '词汇', q: '“桌子”用德语怎么说？', a: ['tisch'], distractors: ['stuhl', 'bett', 'schrank'] },
      { type: '词汇', q: '“椅子”用德语怎么说？', a: ['stuhl'], distractors: ['tisch', 'sofa', 'bett'] },
      { type: '词汇', q: '“窗户”用德语怎么说？', a: ['fenster'], distractors: ['tuer', 'wand', 'dach'] },
      { type: '词汇', q: '“门”用德语怎么说？', a: ['tuer'], distractors: ['fenster', 'wand', 'treppe'] },
      { type: '词汇', q: '“房子 / 家”用德语怎么说？', a: ['haus', 'zuhause'], distractors: ['wohnung', 'zimmer', 'stadt'] },
      { type: '语法填空', q: 'Ich ___ Student.（sein 现在时）', a: ['bin'], distractors: ['bist', 'ist', 'sind'] },
      { type: '语法填空', q: 'Du ___ aus China.（kommen 现在时）', a: ['kommst'], distractors: ['komme', 'kommt', 'kommen'] },
      { type: '语法填空', q: 'Er ___ in Berlin.（wohnen 现在时）', a: ['wohnt'], distractors: ['wohne', 'wohnst', 'wohnen'] },
      { type: '语法填空', q: 'Wir ___ Deutsch.（lernen 现在时）', a: ['lernen'], distractors: ['lerne', 'lernst', 'lernt'] },
      { type: '语法填空', q: 'Sie（复数）___ heute Zeit.（haben 现在时）', a: ['haben'], distractors: ['habe', 'hast', 'hat'] },
      { type: '语法填空', q: 'Ich ___ 20 Jahre alt.（sein 现在时）', a: ['bin'], distractors: ['bist', 'ist', 'seid'] },
      { type: '语法填空', q: 'Das ___ mein Bruder.（sein 现在时）', a: ['ist'], distractors: ['bin', 'bist', 'sind'] },
      { type: '语法填空', q: 'Ihr ___ sehr freundlich.（sein 现在时）', a: ['seid'], distractors: ['sind', 'ist', 'bist'] },
      { type: '语法填空', q: 'Woher ___ du?（kommen 现在时）', a: ['kommst'], distractors: ['komme', 'kommt', 'kommen'] },
      { type: '语法填空', q: 'Ich ___ einen Kaffee.（nehmen 现在时）', a: ['nehme'], distractors: ['nimmst', 'nimmt', 'nehmen'] },
      { type: '语法填空', q: 'Du ___ gern Musik.（hoeren 现在时）', a: ['hoerst'], distractors: ['hoere', 'hoert', 'hoeren'] },
      { type: '语法填空', q: 'Er ___ gern Fussball.（spielen 现在时）', a: ['spielt'], distractors: ['spiele', 'spielst', 'spielen'] },
      { type: '语法填空', q: 'Ich ___ gern ins Kino.（gehen 现在时）', a: ['gehe'], distractors: ['gehst', 'geht', 'gehen'] },
      { type: '语法填空', q: 'Sie（她）___ Lehrerin.（sein 现在时）', a: ['ist'], distractors: ['bist', 'sind', 'seid'] },
      { type: '语法填空', q: 'Wie ___ du?（heissen 现在时）', a: ['heisst'], distractors: ['heisse', 'heissen', 'heisst du'] },
      { type: '语法填空', q: 'Wir ___ aus Deutschland.（kommen 现在时）', a: ['kommen'], distractors: ['komme', 'kommst', 'kommt'] },
      { type: '语法填空', q: '___ du Kaffee oder Tee?（moechten 现在时）', a: ['moechtest'], distractors: ['moechte', 'moechten', 'moechtet'] },
      { type: '语法填空', q: 'Ich ___ eine Frage.（haben 现在时）', a: ['habe'], distractors: ['hast', 'hat', 'haben'] },
      { type: '语法填空', q: 'Der Kurs ___ um 9 Uhr an.（anfangen 现在时，可分动词）', a: ['faengt'], distractors: ['fange', 'faengst', 'fangen'] },
      { type: '语法填空', q: 'Er ___ gern Musik.（hoeren 现在时）', a: ['hoert'], distractors: ['hoere', 'hoerst', 'hoeren'] },
      { type: '翻译', q: '我是学生。', a: ['ich bin student', 'ich bin studentin'] },
      { type: '翻译', q: '你好吗？', a: ['wie geht es dir', 'wie geht es ihnen', 'wie geht es dir heute'] },
      { type: '翻译', q: '你叫什么名字？', a: ['wie heisst du', 'wie heissen sie'] },
      { type: '翻译', q: '我来自中国。', a: ['ich komme aus china', 'ich bin aus china'] },
      { type: '翻译', q: '我住在北京。', a: ['ich wohne in beijing', 'ich wohne in peking', 'ich lebe in beijing', 'ich lebe in peking'] },
      { type: '翻译', q: '我学德语。', a: ['ich lerne deutsch'], distractors: ['ich lerne deutschland', 'ich lerne deutsch sprechen', 'ich studiere deutsch'] },
      { type: '翻译', q: '请您说慢一点。', a: ['sprechen sie bitte langsamer', 'bitte sprechen sie langsamer', 'koennen sie bitte langsamer sprechen'] },
      { type: '翻译', q: '这个多少钱？', a: ['was kostet das', 'wie viel kostet das'] },
      { type: '翻译', q: '洗手间在哪里？', a: ['wo ist die toilette', 'wo sind die toiletten'] },
      { type: '翻译', q: '我不懂。', a: ['ich verstehe nicht', 'ich verstehe das nicht'] },
      { type: '翻译', q: '请再说一遍。', a: ['koennen sie das bitte wiederholen', 'bitte wiederholen sie das', 'kannst du das bitte wiederholen'] },
      { type: '翻译', q: '我想喝一杯水。', a: ['ich moechte ein wasser', 'ich moechte ein glas wasser', 'ich haette gern ein wasser'] },
      { type: '翻译', q: '我饿了。', a: ['ich habe hunger', 'ich bin hungrig'], distractors: ['ich habe durst', 'ich bin muede', 'ich habe kalt'] },
      { type: '翻译', q: '今天是星期一。', a: ['heute ist montag', 'heute haben wir montag'], distractors: ['heute ist dienstag', 'heute ist sonntag', 'heute ist mittwoch'] },
      { type: '翻译', q: '谢谢你的帮助。', a: ['danke fuer deine hilfe', 'danke fuer ihre hilfe', 'vielen dank fuer deine hilfe', 'vielen dank fuer ihre hilfe'] },
      { type: '选择', q: '冠词填空：___ Frau（女人）', a: ['die'], distractors: ['der', 'das', 'den'] },
      { type: '选择', q: '冠词填空：___ Mann（男人）', a: ['der'], distractors: ['die', 'das', 'dem'] },
      { type: '选择', q: '冠词填空：___ Kind（孩子）', a: ['das'], distractors: ['der', 'die', 'den'] },
      { type: '选择', q: '填入正确介词：Ich komme ___ Deutschland.', a: ['aus'], distractors: ['von', 'in', 'nach'] },
      { type: '选择', q: '填入正确介词：Ich wohne ___ Berlin.', a: ['in'], distractors: ['an', 'auf', 'nach'] },
      { type: '选择', q: '填入正确介词：Das Geschenk ist ___ dich.', a: ['fuer'], distractors: ['von', 'mit', 'ohne'] },
      { type: '选择', q: '填入正确介词：Ich fahre ___ dem Bus.', a: ['mit'], distractors: ['in', 'auf', 'per'] },
      { type: '选择', q: '复数形式：das Buch → die ___', a: ['buecher'], distractors: ['bueche', 'buchs', 'buecherer'] },
      { type: '改错', q: '改错：Ich bin komme aus China.', a: ['ich komme aus china', 'ich bin aus china'] },
      { type: '改错', q: '改错：Ich habe 20 Jahre alt.', a: ['ich bin 20 jahre alt'], distractors: ['ich habe 20 jahre', 'ich bin 20 jahre', 'ich habe 20 jahre alt gewesen'] },
      { type: '改错', q: '改错：Du kommt aus Spanien.', a: ['du kommst aus spanien'], distractors: ['du kommen aus spanien', 'du komme aus spanien', 'du kommt aus spanien nicht'] },
      { type: '改错', q: '改错：Ich heisse bin Anna.', a: ['ich heisse anna'], distractors: ['ich bin heisse anna', 'ich heisse anna bin', 'ich heisse bin anna'] },
      { type: '改错', q: '改错：Er wohnen in Hamburg.', a: ['er wohnt in hamburg'], distractors: ['er wohnen in hamburg', 'er wohne in hamburg', 'er wohnt in hamburg nicht'] },
      { type: '改错', q: '改错：Wir sind lernen Deutsch.', a: ['wir lernen deutsch'], distractors: ['wir sind lernen deutsch', 'wir lernt deutsch', 'wir lernen deutsch sind'] },
      { type: '改错', q: '改错：Ich geht nach Hause.', a: ['ich gehe nach hause'], distractors: ['ich geht nach hause', 'ich gehe zu hause', 'ich gehen nach hause'] },
      {
        "id": "za1_lesen_a1",
        "type": "阅读配对",
        "level": "A1",
        "source": "ÖSD Zertifikat A1 / ZA1 Modellsatz",
        "module": "Lesen Aufgabe 1",
        "passage": "Situation: Sie suchen verschiedene Dinge in der Zeitung. Finden Sie zu jeder Situation (Situation A–E) die passende Anzeige (Anzeige Nr. 1–6). Achtung: Eine Anzeige ist zu viel.\n\n[Anzeigen / 广告原文]\nAnzeige 1 – Sekretärin/Sekretär gesucht\nInternationale Firma sucht Sekretärin/Sekretär mit Berufserfahrung (Vollzeit). Aufgaben: telefonische Kundenbetreuung, organisatorische Tätigkeiten. Bewerbungen an: info@personalvermittlung-holzer.de\n\nAnzeige 2 – Fitnesscenter Olymp\nUnser Angebot: 120 Geräte für Kraft- und Fitnesstraining, Rückengymnastik, Beratung durch geprüfte Trainer. Burggasse 10, 1070 Wien, täglich 10–22 Uhr\n\nAnzeige 3 – Buchhandlung Steiner\nBücher zum halben Preis: Richtig telefonieren – Gesprächstraining für SekretärInnen; Gesund essen im Büro: 50 Kochideen; 100 Jahre Sportfotografie; Diverse Kinderbücher. Angebot gültig bis Ende Mai\n\nAnzeige 4 – Die ganze Welt um wenig Geld! Günstige Auslandsanrufe\nGünstige Auslandsanrufe ab 1,9 Cent/Minute. weltweitanrufen.de bietet Ihnen die besten Tarife für Anrufe in Mobilnetze und ins ausländische Festnetz. www.weltweitanrufen.de\n\nAnzeige 5 – Hilfe im Haushalt (Petra Maier)\nSIE SUCHEN JEMANDEN, der Ihre Wäsche wäscht und bügelt? SIE BRAUCHEN JEMANDEN, der beim Saubermachen oder bei der Gartenarbeit hilft? Kein Problem! RUFEN SIE MICH AN: Petra Maier, Tel. 0676 / 5568987\n\nAnzeige 6 – Feinkost Klement\nIn unserem Delikatessengeschäft bieten wir Ihnen: hausgemachte Salate, Brötchen mit Ei- und Curryaufstrich, Schinken und Käse aus der Region. Petersgasse 8, 4051 Basel, Mo–Sa: 9–18 Uhr",
        "questions": [
          {
            "q": "Situation A: Sie haben viele Freunde in anderen Ländern und möchten billig mit ihnen telefonieren.  →  Welche Anzeige passt?",
            "a": [
              "Anzeige 4 – Die ganze Welt um wenig Geld! Günstige Auslandsanrufe"
            ],
            "distractors": [
              "Anzeige 1 – Sekretärin/Sekretär gesucht",
              "Anzeige 2 – Fitnesscenter Olymp"
            ]
          },
          {
            "q": "Situation B: Sie sollen für ein Fest etwas zum Essen mitbringen. Sie haben keine Zeit zum Kochen.  →  Welche Anzeige passt?",
            "a": [
              "Anzeige 6 – Feinkost Klement"
            ],
            "distractors": [
              "Anzeige 2 – Fitnesscenter Olymp",
              "Anzeige 3 – Buchhandlung Steiner"
            ]
          },
          {
            "q": "Situation C: Sie suchen einen Job. Sie wollen in einem Büro arbeiten.  →  Welche Anzeige passt?",
            "a": [
              "Anzeige 1 – Sekretärin/Sekretär gesucht"
            ],
            "distractors": [
              "Anzeige 4 – Die ganze Welt um wenig Geld! Günstige Auslandsanrufe",
              "Anzeige 5 – Hilfe im Haushalt (Petra Maier)"
            ]
          },
          {
            "q": "Situation D: Sie haben eine große Wohnung. Sie brauchen Hilfe bei der Hausarbeit.  →  Welche Anzeige passt?",
            "a": [
              "Anzeige 5 – Hilfe im Haushalt (Petra Maier)"
            ],
            "distractors": [
              "Anzeige 4 – Die ganze Welt um wenig Geld! Günstige Auslandsanrufe",
              "Anzeige 6 – Feinkost Klement"
            ]
          },
          {
            "q": "Situation E: Sie arbeiten viel am Computer. In Ihrer Freizeit möchten Sie Sport machen.  →  Welche Anzeige passt?",
            "a": [
              "Anzeige 2 – Fitnesscenter Olymp"
            ],
            "distractors": [
              "Anzeige 6 – Feinkost Klement",
              "Anzeige 1 – Sekretärin/Sekretär gesucht"
            ]
          }
        ],
        "q": "ÖSD A1 · Lesen Aufgabe 1（5 小题）",
        "a": [
          "[大组题，请展开作答]"
        ]
      },
      {
        "id": "za1_lesen_a2",
        "type": "阅读判断",
        "level": "A1",
        "source": "ÖSD Zertifikat A1 / ZA1 Modellsatz",
        "module": "Lesen Aufgabe 2",
        "passage": "Situation: Sie lesen drei Anzeigen. Dazu gibt es je 2 Fragen. Antworten Sie mit JA oder NEIN.\n\n[1] Schönes-Wochenende-Ticket\ngültig ab Samstag 0 Uhr bis Montag 3 Uhr für Reisen in Deutschland; für Gruppen bis zu fünf Personen und für Einzelreisende. Preis: 39 Euro im Internet, 41 Euro im Reisezentrum an Ihrem Bahnhof. www.bahn.de/angebote\n\n[2] Lesen im Park\nIm Sommer gibt es in Grazer Parks wieder Bücherkisten mit vielen Kinderbüchern – zum Lesen vor Ort oder zum Mit-nach-Hause-Nehmen. Weitere Aktivitäten: Bastel- und Malgruppen; Papier und Stifte haben wir für dich. www.lesen-im-park.at\n\n[3] 3-Zimmer-Wohnung\nNeu renovierte Wohnung (63 m²) ab 1. August zu vermieten. Gesamtmiete: CHF 1'200,–. Sie haben noch Fragen? Schreiben Sie eine E-Mail an: info@immobilien-heiss.ch. Termine zur Wohnungsbesichtigung: 15. Juli, 11.00 Uhr | 18. Juli, 15.00 Uhr",
        "questions": [
          {
            "q": "Frage 1: Kann man am Freitagabend mit dem Ticket fahren?",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Frage 2: Kostet das Ticket beim Kauf am Bahnhof mehr?",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Frage 3: Darf man die Bücher nur im Park lesen?",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Frage 4: Müssen die Kinder Papier und Stifte mitbringen?",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Frage 5: Kann man telefonisch Informationen bekommen?",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Frage 6: Kann man die Wohnung am Vormittag sehen?",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          }
        ],
        "q": "ÖSD A1 · Lesen Aufgabe 2（6 小题）",
        "a": [
          "[大组题，请展开作答]"
        ]
      },
      {
        "id": "za1_lesen_a3",
        "type": "阅读配对",
        "level": "A1",
        "source": "ÖSD Zertifikat A1 / ZA1 Modellsatz",
        "module": "Lesen Aufgabe 3",
        "passage": "Situation: Sie lesen hier 5 kurze Texte (Text A–E). Auf Blatt 2 gibt es zu jedem Text je ein Bild (Bild 1–6). Welches Bild passt zu welchem Text? Achtung: Ein Bild ist zu viel.\n\n原卷该部分为图片，下列为卷面图片的如实文字转述（非德文原文）。\n[Bild 1–6 文字转述]\nBild 1 – Verbotsschild »Rauchen verboten«（点燃的香烟 + 红色斜杠）\nBild 2 – Verbotsschild »Essen und Trinken verboten«（饮料杯与汉堡 + 红色斜杠）【多余项】\nBild 3 – 公交车正面图标（Bus）\nBild 4 – 戴白色厨师帽的厨师卡通形象（Koch）\nBild 5 – Verbotsschild »Handy verboten«（手机带无线电波 + 红色斜杠）\nBild 6 – 牵着狗散步的人形剪影（Hund an der Leine）",
        "questions": [
          {
            "q": "Text A: Liebe Besucherinnen und Besucher! Im Krankenhaus ist das Telefonieren mit Handy verboten. Bitte schalten Sie Ihr Handy während Ihres Besuchs bei uns aus.  →  Welches Bild passt?",
            "a": [
              "Bild 5 – Verbotsschild »Handy verboten«（手机带无线电波 + 红色斜杠）"
            ],
            "distractors": [
              "Bild 1 – Verbotsschild »Rauchen verboten«（点燃的香烟 + 红色斜杠）",
              "Bild 2 – Verbotsschild »Essen und Trinken verboten«（饮料杯与汉堡 + 红色斜杠）【多余项】"
            ]
          },
          {
            "q": "Text B: Gasthaus Neuwirth – leichte regionale Küche, frische Salate vom Buffet, günstige Mittagsmenüs. Mo–Sa: 9–22 Uhr | Sonntag Ruhetag  →  Welches Bild passt?",
            "a": [
              "Bild 4 – 戴白色厨师帽的厨师卡通形象（Koch）"
            ],
            "distractors": [
              "Bild 2 – Verbotsschild »Essen und Trinken verboten«（饮料杯与汉堡 + 红色斜杠）【多余项】",
              "Bild 3 – 公交车正面图标（Bus）"
            ]
          },
          {
            "q": "Text C: Liebe Kolleginnen und Kollegen! In den Büroräumen ist das Rauchen verboten. Bitte nützen Sie die Raucherzonen im Erdgeschoss.  →  Welches Bild passt?",
            "a": [
              "Bild 1 – Verbotsschild »Rauchen verboten«（点燃的香烟 + 红色斜杠）"
            ],
            "distractors": [
              "Bild 4 – 戴白色厨师帽的厨师卡通形象（Koch）",
              "Bild 5 – Verbotsschild »Handy verboten«（手机带无线电波 + 红色斜杠）"
            ]
          },
          {
            "q": "Text D: Liebe Hundebesitzer! Wir bitten Sie, im Interesse aller Parkbenützer Ihren Hund an die Leine zu nehmen.  →  Welches Bild passt?",
            "a": [
              "Bild 6 – 牵着狗散步的人形剪影（Hund an der Leine）"
            ],
            "distractors": [
              "Bild 4 – 戴白色厨师帽的厨师卡通形象（Koch）",
              "Bild 5 – Verbotsschild »Handy verboten«（手机带无线电波 + 红色斜杠）"
            ]
          },
          {
            "q": "Text E: Der Flughafen-Bus bringt Sie schnell und bequem ins Stadtzentrum. Nützen Sie das Angebot! Fahrplanauskünfte am Flughafen Graz: +43 (316) 2902172  →  Welches Bild passt?",
            "a": [
              "Bild 3 – 公交车正面图标（Bus）"
            ],
            "distractors": [
              "Bild 6 – 牵着狗散步的人形剪影（Hund an der Leine）",
              "Bild 1 – Verbotsschild »Rauchen verboten«（点燃的香烟 + 红色斜杠）"
            ]
          }
        ],
        "q": "ÖSD A1 · Lesen Aufgabe 3（5 小题）",
        "a": [
          "[大组题，请展开作答]"
        ]
      },
      {
        "id": "za1_hoeren_a1",
        "type": "听力选择",
        "level": "A1",
        "source": "ÖSD Zertifikat A1 / ZA1 Modellsatz",
        "module": "Hören Aufgabe 1",
        "passage": "Sehen Sie sich die Bilder gut an. Sie hören jetzt fünf verschiedene Texte zu den Fotos. Sie hören jeden Text ein Mal. Welcher Text passt zu welchem Foto? Achtung: Ein Bild ist zu viel. (Foto B = Beispiel, 不计入)\n\n原卷该部分为图片，下列为卷面图片的如实文字转述（非德文原文）。\n[Foto A–F 文字转述]\nFoto A – Apotheke：穿白袍的店员把一盒药递给一位年长女顾客\nFoto B – 两位金发女性在书架前一起看一本书【示例题 Beispiel，不计入】\nFoto C – 一男一女在办公室一起看笔记本电脑\nFoto D – 超市收银台：顾客拿着装满蔬菜的购物篮，收银员在扫码\nFoto E – 两名背着背包、手持登山杖的徒步者在山间\nFoto F – 一男一女在餐桌旁准备食物 / 摆餐具",
        "audioUrl": "data/audio/a1/ZA1_MS_A1_060917.mp3",
        "audioFile": "ZA1_MS_A1_060917.mp3",
        "audioUrls": [
          "data/audio/a1/ZA1_MS_A1_060917.mp3",
          "data/audio/a1/ZA1_MS_A3_060917.mp3"
        ],
        "audioText": "",
        "audioTextNote": "源 PDF 为 Kandidatenblätter（考生卷），不含听力原文 Hörtexte；如需无障碍文本/提示，须另行获取 Prüferblätter 或人工转写。",
        "audioNote": "Foto B 为卷面示例题（Beispiel），不计入 5 道子题；另有一张多余图片。音频对应本卷 Hören Aufgabe 1。",
        "questions": [
          {
            "q": "Foto A: Apotheke：穿白袍的店员把一盒药递给一位年长女顾客  →  Welcher Text passt?",
            "a": [
              "Text 5"
            ],
            "distractors": [
              "Text 1",
              "Text 2"
            ]
          },
          {
            "q": "Foto C: 一男一女在办公室一起看笔记本电脑  →  Welcher Text passt?",
            "a": [
              "Text 2"
            ],
            "distractors": [
              "Text 3",
              "Text 4"
            ]
          },
          {
            "q": "Foto D: 超市收银台：顾客拿着装满蔬菜的购物篮，收银员在扫码  →  Welcher Text passt?",
            "a": [
              "Text 4"
            ],
            "distractors": [
              "Text 3",
              "Text 5"
            ]
          },
          {
            "q": "Foto E: 两名背着背包、手持登山杖的徒步者在山间  →  Welcher Text passt?",
            "a": [
              "Text 1"
            ],
            "distractors": [
              "Text 5",
              "Text 2"
            ]
          },
          {
            "q": "Foto F: 一男一女在餐桌旁准备食物 / 摆餐具  →  Welcher Text passt?",
            "a": [
              "Text 3"
            ],
            "distractors": [
              "Text 1",
              "Text 2"
            ]
          }
        ],
        "q": "ÖSD A1 · Hören Aufgabe 1（5 小题）",
        "a": [
          "[大组题，请展开作答]"
        ]
      },
      {
        "id": "za1_hoeren_a3",
        "type": "听力选择",
        "level": "A1",
        "source": "ÖSD Zertifikat A1 / ZA1 Modellsatz",
        "module": "Hören Aufgabe 3",
        "passage": "Situation: Sie hören jetzt 5 Personen, die befragt werden. Hören Sie gut zu und kreuzen Sie die richtigen Antworten an. Pro Person gibt es nur eine Antwort. Sie hören die Texte ein Mal.\n\nFrage: Wo gefällt es Ihnen am besten?\n选项（卷面原文）: Afrika | Amerika | Asien | Europa",
        "audioUrl": "data/audio/a1/ZA1_MS_A3_060917.mp3",
        "audioFile": "ZA1_MS_A3_060917.mp3",
        "audioUrls": [
          "data/audio/a1/ZA1_MS_A1_060917.mp3",
          "data/audio/a1/ZA1_MS_A3_060917.mp3"
        ],
        "audioText": "",
        "audioTextNote": "源 PDF 为 Kandidatenblätter（考生卷），不含听力原文 Hörtexte；如需无障碍文本/提示，须另行获取 Prüferblätter 或人工转写。",
        "audioNote": "音频对应本卷 Hören Aufgabe 3；5 段短采访共用同一音轨，按 Text 1–5 顺序作答。",
        "questions": [
          {
            "q": "Text 1: Wo gefällt es Ihnen am besten?",
            "a": [
              "Asien"
            ],
            "distractors": [
              "Amerika",
              "Europa"
            ]
          },
          {
            "q": "Text 2: Wo gefällt es Ihnen am besten?",
            "a": [
              "Afrika"
            ],
            "distractors": [
              "Europa",
              "Amerika"
            ]
          },
          {
            "q": "Text 3: Wo gefällt es Ihnen am besten?",
            "a": [
              "Europa"
            ],
            "distractors": [
              "Afrika",
              "Amerika"
            ]
          },
          {
            "q": "Text 4: Wo gefällt es Ihnen am besten?",
            "a": [
              "Amerika"
            ],
            "distractors": [
              "Asien",
              "Europa"
            ]
          },
          {
            "q": "Text 5: Wo gefällt es Ihnen am besten?",
            "a": [
              "Afrika"
            ],
            "distractors": [
              "Europa",
              "Amerika"
            ]
          }
        ],
        "q": "ÖSD A1 · Hören Aufgabe 3（5 小题）",
        "a": [
          "[大组题，请展开作答]"
        ]
      },
      {
        "id": "za1oe_lesen_a1",
        "type": "阅读配对",
        "level": "A1",
        "source": "ÖSD Zertifikat A1/Österreich / ZA1 Ö Modellsatz",
        "module": "Lesen Aufgabe 1",
        "passage": "Situation: Sie suchen verschiedene Dinge in der Zeitung. Finden Sie zu jeder Situation (Situation A–E) die passende Anzeige (Anzeige Nr. 1–6). Achtung: Eine Anzeige ist zu viel.\n\n[Anzeigen / 广告原文]\nAnzeige 1 – GLOBAL UNION – Geldtransfer\nGeldtransfer in alle Länder, Barauszahlung in wenigen Minuten. Gebühren für Überweisungen in die Türkei: bis € 50: € 4,90; € 51 bis € 100: € 6,90. Gebühren für weitere Länder finden Sie auf www.globalunion.at\n\nAnzeige 2 – Oma/Opa-Projekt\nWir lernen mit dir am Nachmittag in deiner Schule. derverein@nl40.at, 0699/1123 8004\n\nAnzeige 3 – Hals-Nasen-Ohren-Arzt Dr. Claudia Setz\nOrdinationszeiten Mo: 10:00–13:00, Mi: 15:00–17:00, Do: 15:00–19:00. Telefon: 01 / 26 23 71 7, Schloßhoferstraße 38/1, 1210 Wien\n\nAnzeige 4 – Papier & Buch Heyner – Sommeraktionen\nalles zum Schulanfang für wenig Geld, 10 % auf vegetarische Kochbücher, Hörbücher in verschiedenen Sprachen ab 5 €. Unsere Verkäuferinnen helfen Ihnen gerne! Getreidegasse 102, 5020 Salzburg\n\nAnzeige 5 – SPRACHINSTITUT NEUNER\nWIR BIETEN: Kurse in kleinen Gruppen, Niveau A1–C2, aktuelle Materialien. KURSZEITEN: Mo–Fr, 8:30–11:30 Uhr oder 13:00–16:00 Uhr. INFORMATION: info@neuner.at\n\nAnzeige 6 – Hilfe in der Küche – Restaurant »Zum Alpenkönig«\nWir brauchen für die Mittagszeit Hilfe in der Küche. Mo, Mi, Fr: 11–14 Uhr, gute Bezahlung. Restaurant »Zum Alpenkönig«, Dorfgasse 12, 6020 Innsbruck",
        "questions": [
          {
            "q": "Situation A: Ihr Sohn hat Probleme in Mathematik. Er muss rechnen üben und braucht Hilfe.  →  Welche Anzeige passt?",
            "a": [
              "Anzeige 2 – Oma/Opa-Projekt"
            ],
            "distractors": [
              "Anzeige 1 – GLOBAL UNION – Geldtransfer",
              "Anzeige 3 – Hals-Nasen-Ohren-Arzt Dr. Claudia Setz"
            ]
          },
          {
            "q": "Situation B: Sie suchen einen Job. Sie können gut kochen.  →  Welche Anzeige passt?",
            "a": [
              "Anzeige 6 – Hilfe in der Küche – Restaurant »Zum Alpenkönig«"
            ],
            "distractors": [
              "Anzeige 2 – Oma/Opa-Projekt",
              "Anzeige 3 – Hals-Nasen-Ohren-Arzt Dr. Claudia Setz"
            ]
          },
          {
            "q": "Situation C: Sie hören seit zwei Tagen nicht gut. Sie möchten einen Hörtest machen.  →  Welche Anzeige passt?",
            "a": [
              "Anzeige 3 – Hals-Nasen-Ohren-Arzt Dr. Claudia Setz"
            ],
            "distractors": [
              "Anzeige 4 – Papier & Buch Heyner – Sommeraktionen",
              "Anzeige 5 – SPRACHINSTITUT NEUNER"
            ]
          },
          {
            "q": "Situation D: Ihre Familie lebt in einem anderen Land. Sie möchten Geld schicken.  →  Welche Anzeige passt?",
            "a": [
              "Anzeige 1 – GLOBAL UNION – Geldtransfer"
            ],
            "distractors": [
              "Anzeige 5 – SPRACHINSTITUT NEUNER",
              "Anzeige 6 – Hilfe in der Küche – Restaurant »Zum Alpenkönig«"
            ]
          },
          {
            "q": "Situation E: Sie möchten in einer Sprachschule Deutsch lernen. Sie haben nur am Nachmittag Zeit.  →  Welche Anzeige passt?",
            "a": [
              "Anzeige 5 – SPRACHINSTITUT NEUNER"
            ],
            "distractors": [
              "Anzeige 6 – Hilfe in der Küche – Restaurant »Zum Alpenkönig«",
              "Anzeige 1 – GLOBAL UNION – Geldtransfer"
            ]
          }
        ],
        "q": "ÖSD A1 · Lesen Aufgabe 1（5 小题）",
        "a": [
          "[大组题，请展开作答]"
        ]
      },
      {
        "id": "za1oe_lesen_a2",
        "type": "阅读判断",
        "level": "A1",
        "source": "ÖSD Zertifikat A1/Österreich / ZA1 Ö Modellsatz",
        "module": "Lesen Aufgabe 2",
        "passage": "Situation: Sie lesen drei Anzeigen. Dazu gibt es je 2 Fragen. Antworten Sie mit JA oder NEIN.\n\n[1] Achtung! (Deutschkurs)\nIhr Deutschkurs fängt erst nächste Woche an. Die Trainerin ist krank. Erster Kurstag: Montag, 13. September. Bücher bitte vor dem Kurs im Büro abholen. Informationen telefonisch: 02742/328 oder im Internet: www.vhs-noe.at\n\n[2] Internationaler Abend\nOrientalische Musik hören, zu afrikanischen Rhythmen tanzen, Essen aus Österreich genießen. Bei uns treffen sich Kulturen aus aller Welt. Samstag, 27. Juli, ab 20:00 Uhr im Vereinstreff Leopoldsdorf. Eintritt: 2 Euro\n\n[3] Service-Hotline\nIst Ihr Kühlschrank kaputt? Dann rufen Sie uns bitte an. Wir helfen Ihnen gerne und sind von 6 bis 22 Uhr für Sie da. Tel.: 0800 100 107. Garantie auf Neugeräte: 2 Jahre",
        "questions": [
          {
            "q": "Frage 1: Bekommt man die Bücher im Kurs?",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Frage 2: Kann man in der Schule anrufen?",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Frage 3: Gibt es bei der Party Musik aus Afrika?",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Frage 4: Muss man für die Party etwas bezahlen?",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Frage 5: Kann man bei Problemen mit dem Herd Hilfe bekommen?",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Frage 6: Kann man auch am Abend anrufen?",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          }
        ],
        "q": "ÖSD A1 · Lesen Aufgabe 2（6 小题）",
        "a": [
          "[大组题，请展开作答]"
        ]
      },
      {
        "id": "za1oe_lesen_a3",
        "type": "阅读配对",
        "level": "A1",
        "source": "ÖSD Zertifikat A1/Österreich / ZA1 Ö Modellsatz",
        "module": "Lesen Aufgabe 3",
        "passage": "Situation: Sie lesen hier 5 kurze Texte (Text A–E). Auf Blatt 2 gibt es zu jedem Text je ein Bild (Bild 1–6). Welches Bild passt zu welchem Text? Achtung: Ein Bild ist zu viel.\n\n原卷该部分为图片，下列为卷面图片的如实文字转述（非德文原文）。\n[Bild 1–6 文字转述]\nBild 1 – 拖车正在拖走一辆小汽车（Abschleppwagen）\nBild 2 – 一个人用钥匙打开红色挂锁（Schlüsseldienst / Schloss öffnen）\nBild 3 – 一个人捧着翻开的书阅读（Buchklub）\nBild 4 – Verbotsschild »Fußballspielen verboten«（足球 + 红色斜杠）\nBild 5 – Verbotsschild »Hund verboten«（狗 + 红色斜杠）【多余项】\nBild 6 – 一只鹿的黑色剪影（Hirsch / Tierpark）",
        "questions": [
          {
            "q": "Text A: Bitte beachten Sie, dass das Fußballspielen auf den Rasenflächen des Parks verboten ist!  →  Welches Bild passt?",
            "a": [
              "Bild 4 – Verbotsschild »Fußballspielen verboten«（足球 + 红色斜杠）"
            ],
            "distractors": [
              "Bild 1 – 拖车正在拖走一辆小汽车（Abschleppwagen）",
              "Bild 2 – 一个人用钥匙打开红色挂锁（Schlüsseldienst / Schloss öffnen）"
            ]
          },
          {
            "q": "Text B: Kommen Sie zum Buchklub. Wir lesen jeden Monat zusammen ein neues Buch und sprechen darüber. Montags nach dem Deutschkurs, Raum 34.2  →  Welches Bild passt?",
            "a": [
              "Bild 3 – 一个人捧着翻开的书阅读（Buchklub）"
            ],
            "distractors": [
              "Bild 2 – 一个人用钥匙打开红色挂锁（Schlüsseldienst / Schloss öffnen）",
              "Bild 4 – Verbotsschild »Fußballspielen verboten«（足球 + 红色斜杠）"
            ]
          },
          {
            "q": "Text C: Schlüssel verloren? Schloss kaputt? Ihr Schlüsseldienst kommt sofort! Rufen Sie uns an: 01 430 25 25. Wir öffnen Ihre Tür für Sie.  →  Welches Bild passt?",
            "a": [
              "Bild 2 – 一个人用钥匙打开红色挂锁（Schlüsseldienst / Schloss öffnen）"
            ],
            "distractors": [
              "Bild 4 – Verbotsschild »Fußballspielen verboten«（足球 + 红色斜杠）",
              "Bild 5 – Verbotsschild »Hund verboten«（狗 + 红色斜杠）【多余项】"
            ]
          },
          {
            "q": "Text D: Sie dürfen hier NICHT HALTEN oder PARKEN! Parkende Autos werden abgeschleppt!  →  Welches Bild passt?",
            "a": [
              "Bild 1 – 拖车正在拖走一辆小汽车（Abschleppwagen）"
            ],
            "distractors": [
              "Bild 5 – Verbotsschild »Hund verboten«（狗 + 红色斜杠）【多余项】",
              "Bild 6 – 一只鹿的黑色剪影（Hirsch / Tierpark）"
            ]
          },
          {
            "q": "Text E: Willkommen im Tierpark Herberstein. Über 600 Tiere, viel Natur, alte Bäume ... Mai bis September 9–17 Uhr. www.tierwelt-herberstein.at  →  Welches Bild passt?",
            "a": [
              "Bild 6 – 一只鹿的黑色剪影（Hirsch / Tierpark）"
            ],
            "distractors": [
              "Bild 5 – Verbotsschild »Hund verboten«（狗 + 红色斜杠）【多余项】",
              "Bild 1 – 拖车正在拖走一辆小汽车（Abschleppwagen）"
            ]
          }
        ],
        "q": "ÖSD A1 · Lesen Aufgabe 3（5 小题）",
        "a": [
          "[大组题，请展开作答]"
        ]
      },
      {
        "id": "za1oe_hoeren_a1",
        "type": "听力选择",
        "level": "A1",
        "source": "ÖSD Zertifikat A1/Österreich / ZA1 Ö Modellsatz",
        "module": "Hören Aufgabe 1",
        "passage": "Sehen Sie sich die Bilder gut an. Sie hören jetzt fünf verschiedene Texte zu den Fotos. Sie hören jeden Text ein Mal. Welcher Text passt zu welchem Foto? Achtung: Ein Bild ist zu viel. (Foto B = Beispiel, 不计入)\n\n原卷该部分为图片，下列为卷面图片的如实文字转述（非德文原文）。\n[Foto A–F 文字转述]\nFoto A – 市场水果摊：一男一女在挑选柑橘类水果，旁边是成堆的橙子\nFoto B – 两名徒步者（红色背包）在山间查看地图 / 手机【示例题 Beispiel，不计入】\nFoto C – 三个人围在一台电脑显示器前（办公室 / 电脑课）\nFoto D – 两名男子在花园里弯腰查看植物\nFoto E – 牙医戴手套与防护面罩，用器械检查病人张开的嘴\nFoto F – 穿深色西装的男士向一位女士展示一盒药品 / 药片",
        "audioUrl": "data/audio/a1/ZA1_OE_MS_A1_150917.mp3",
        "audioFile": "ZA1_OE_MS_A1_150917.mp3",
        "audioUrls": [
          "data/audio/a1/ZA1_OE_MS_A1_150917.mp3",
          "data/audio/a1/ZA1_OE_MS_A3_150917.mp3"
        ],
        "audioText": "",
        "audioTextNote": "源 PDF 为 Kandidatenblätter（考生卷），不含听力原文 Hörtexte；如需无障碍文本/提示，须另行获取 Prüferblätter 或人工转写。",
        "audioNote": "Foto B 为卷面示例题（Beispiel），不计入 5 道子题；另有一张多余图片。音频对应本卷 Hören Aufgabe 1。",
        "questions": [
          {
            "q": "Foto A: 市场水果摊：一男一女在挑选柑橘类水果，旁边是成堆的橙子  →  Welcher Text passt?",
            "a": [
              "Text 3"
            ],
            "distractors": [
              "Text 1",
              "Text 2"
            ]
          },
          {
            "q": "Foto C: 三个人围在一台电脑显示器前（办公室 / 电脑课）  →  Welcher Text passt?",
            "a": [
              "Text 1"
            ],
            "distractors": [
              "Text 3",
              "Text 4"
            ]
          },
          {
            "q": "Foto D: 两名男子在花园里弯腰查看植物  →  Welcher Text passt?",
            "a": [
              "Text 4"
            ],
            "distractors": [
              "Text 3",
              "Text 5"
            ]
          },
          {
            "q": "Foto E: 牙医戴手套与防护面罩，用器械检查病人张开的嘴  →  Welcher Text passt?",
            "a": [
              "Text 2"
            ],
            "distractors": [
              "Text 5",
              "Text 1"
            ]
          },
          {
            "q": "Foto F: 穿深色西装的男士向一位女士展示一盒药品 / 药片  →  Welcher Text passt?",
            "a": [
              "Text 5"
            ],
            "distractors": [
              "Text 1",
              "Text 2"
            ]
          }
        ],
        "q": "ÖSD A1 · Hören Aufgabe 1（5 小题）",
        "a": [
          "[大组题，请展开作答]"
        ]
      },
      {
        "id": "za1oe_hoeren_a3",
        "type": "听力选择",
        "level": "A1",
        "source": "ÖSD Zertifikat A1/Österreich / ZA1 Ö Modellsatz",
        "module": "Hören Aufgabe 3",
        "passage": "Situation: Sie hören jetzt 5 Personen, die befragt werden. Hören Sie gut zu und kreuzen Sie die richtigen Antworten an. Pro Person gibt es nur eine Antwort. Sie hören die Texte ein Mal.\n\nFrage: Wo möchten Sie am liebsten arbeiten?\n选项（卷面原文）: im Büro | im Supermarkt | im Wald | im Restaurant",
        "audioUrl": "data/audio/a1/ZA1_OE_MS_A3_150917.mp3",
        "audioFile": "ZA1_OE_MS_A3_150917.mp3",
        "audioUrls": [
          "data/audio/a1/ZA1_OE_MS_A1_150917.mp3",
          "data/audio/a1/ZA1_OE_MS_A3_150917.mp3"
        ],
        "audioText": "",
        "audioTextNote": "源 PDF 为 Kandidatenblätter（考生卷），不含听力原文 Hörtexte；如需无障碍文本/提示，须另行获取 Prüferblätter 或人工转写。",
        "audioNote": "音频对应本卷 Hören Aufgabe 3；5 段短采访共用同一音轨，按 Text 1–5 顺序作答。",
        "questions": [
          {
            "q": "Text 1: Wo möchten Sie am liebsten arbeiten?",
            "a": [
              "im Wald"
            ],
            "distractors": [
              "im Supermarkt",
              "im Restaurant"
            ]
          },
          {
            "q": "Text 2: Wo möchten Sie am liebsten arbeiten?",
            "a": [
              "im Büro"
            ],
            "distractors": [
              "im Restaurant",
              "im Supermarkt"
            ]
          },
          {
            "q": "Text 3: Wo möchten Sie am liebsten arbeiten?",
            "a": [
              "im Restaurant"
            ],
            "distractors": [
              "im Büro",
              "im Supermarkt"
            ]
          },
          {
            "q": "Text 4: Wo möchten Sie am liebsten arbeiten?",
            "a": [
              "im Supermarkt"
            ],
            "distractors": [
              "im Wald",
              "im Restaurant"
            ]
          },
          {
            "q": "Text 5: Wo möchten Sie am liebsten arbeiten?",
            "a": [
              "im Büro"
            ],
            "distractors": [
              "im Restaurant",
              "im Supermarkt"
            ]
          }
        ],
        "q": "ÖSD A1 · Hören Aufgabe 3（5 小题）",
        "a": [
          "[大组题，请展开作答]"
        ]
      }
    ],
    2: [
      { type: '语法填空', q: 'Ich ___ gestern ins Kino gegangen.（sein 过去时）', a: ['bin'] },
      { type: '语法填空', q: 'Wir ___ gestern einen Film gesehen.（haben 过去时）', a: ['haben'] },
      { type: '语法填空', q: '___ du schon in Deutschland gewesen?（sein 过去时）', a: ['bist'] },
      { type: '语法填空', q: 'Ich ___ letzten Sommer nach Wien gefahren.（sein 过去时）', a: ['bin'] },
      { type: '语法填空', q: 'Er ___ mir gestern geholfen.（haben 过去时）', a: ['hat'] },
      { type: '语法填空', q: 'Wenn ich Zeit ___, komme ich mit.（haben）', a: ['habe'] },
      { type: '语法填空', q: 'Wenn es morgen ___, bleiben wir zu Hause.（regnen）', a: ['regnet'] },
      { type: '语法填空', q: 'Ich weiss, ___ er morgen kommt.（连词：that）', a: ['dass'] },
      { type: '语法填空', q: 'Ich lerne Deutsch, ___ ich in Berlin arbeiten will.（连词：because）', a: ['weil'] },
      { type: '语法填空', q: 'Ich weiss nicht, ___ er kommt.（连词：whether）', a: ['ob'] },
      { type: '语法填空', q: 'Ich gebe ___ Mann das Buch.（与格定冠词）', a: ['dem'] },
      { type: '语法填空', q: 'Ich sehe ___ Hund.（宾格定冠词）', a: ['den'] },
      { type: '语法填空', q: 'Das ist das Auto ___ Frau.（属格定冠词）', a: ['der'] },
      { type: '语法填空', q: 'Das sind die Buecher ___ Kinder.（属格定冠词，复数）', a: ['der'] },
      { type: '语法填空', q: 'Ich helfe ___.（我的兄弟，与格）', a: ['meinem bruder'] },
      { type: '语法填空', q: 'Sie interessiert ___ fuer Musik.（反身代词）', a: ['sich'] },
      { type: '语法填空', q: 'Ich freue ___ auf den Urlaub.（反身代词）', a: ['mich'] },
      { type: '语法填空', q: 'Der Film war sehr ___.（gut，作表语）', a: ['gut'] },
      { type: '语法填空', q: 'Ich habe ein ___ Auto.（neu，中性主格词尾）', a: ['neues'] },
      { type: '语法填空', q: 'Ich wohne in ___ kleinen Stadt.（eine 与格 + 形容词）', a: ['einer'] },
      { type: '语法填空', q: 'Die Pruefung war ___ als ich dachte.（schwer 比较级）', a: ['schwerer'] },
      { type: '语法填空', q: 'Das ist der ___ Film, den ich kenne.（gut 最高级）', a: ['beste'] },
      { type: '词汇', q: '“因为”用德语怎么说？', a: ['weil', 'denn'] },
      { type: '词汇', q: '“重要”用德语怎么说？', a: ['wichtig'] },
      { type: '词汇', q: '“总是”用德语怎么说？', a: ['immer'] },
      { type: '词汇', q: '“经常”用德语怎么说？', a: ['oft', 'haeufig'] },
      { type: '词汇', q: '“有时”用德语怎么说？', a: ['manchmal'] },
      { type: '词汇', q: '“从不”用德语怎么说？', a: ['nie', 'niemals'] },
      { type: '词汇', q: '“昨天”用德语怎么说？', a: ['gestern'] },
      { type: '词汇', q: '“明天”用德语怎么说？', a: ['morgen'] },
      { type: '词汇', q: '“现在”用德语怎么说？', a: ['jetzt'] },
      { type: '词汇', q: '“以后 / 然后”用德语怎么说？', a: ['spaeter', 'danach'] },
      { type: '词汇', q: '“也许”用德语怎么说？', a: ['vielleicht'] },
      { type: '词汇', q: '“一起”用德语怎么说？', a: ['zusammen'] },
      { type: '词汇', q: '“立刻”用德语怎么说？', a: ['sofort'] },
      { type: '词汇', q: '“医院”用德语怎么说？', a: ['krankenhaus'] },
      { type: '词汇', q: '“火车站”用德语怎么说？', a: ['bahnhof'] },
      { type: '词汇', q: '“飞机场”用德语怎么说？', a: ['flughafen'] },
      { type: '词汇', q: '“护照”用德语怎么说？', a: ['pass', 'reisepass'] },
      { type: '词汇', q: '“行李”用德语怎么说？', a: ['gepaeck'] },
      { type: '翻译', q: '我喜欢学德语。', a: ['ich lerne gern deutsch', 'ich lerne gerne deutsch'] },
      { type: '翻译', q: '你能帮我吗？', a: ['kannst du mir helfen', 'koennen sie mir helfen'] },
      { type: '翻译', q: '我昨天去电影院了。', a: ['ich bin gestern ins kino gegangen'] },
      { type: '翻译', q: '我正在学德语。', a: ['ich lerne gerade deutsch'] },
      { type: '翻译', q: '我想再要一杯咖啡。', a: ['ich moechte noch einen kaffee', 'ich haette gern noch einen kaffee'] },
      { type: '翻译', q: '你知道他住在哪里吗？', a: ['weisst du, wo er wohnt', 'wissen sie, wo er wohnt'] },
      { type: '翻译', q: '如果明天天气好，我们去公园。', a: ['wenn das wetter morgen gut ist, gehen wir in den park'] },
      { type: '翻译', q: '我不认为这是对的。', a: ['ich glaube nicht, dass das richtig ist'] },
      { type: '翻译', q: '他比他的哥哥更年轻。', a: ['er ist juenger als sein bruder'] },
      { type: '翻译', q: '这本书比他那本更有意思。', a: ['dieses buch ist interessanter als sein buch'] },
      { type: '翻译', q: '请你帮我一下。', a: ['hilf mir bitte', 'helfen sie mir bitte', 'kannst du mir bitte helfen'] },
      { type: '翻译', q: '我得走了。', a: ['ich muss gehen', 'ich muss jetzt gehen', 'ich muss los'] },
      { type: '翻译', q: '你可以在这里停车。', a: ['du kannst hier parken', 'sie koennen hier parken'] },
      { type: '翻译', q: '我很喜欢这个城市。', a: ['ich mag diese stadt sehr', 'diese stadt gefaellt mir sehr', 'mir gefaellt diese stadt sehr'] },
      { type: '翻译', q: '他德语说得很好。', a: ['er spricht gut deutsch'] },
      { type: '选择', q: '填入正确介词：Ich warte ___ den Bus.', a: ['auf'] },
      { type: '选择', q: '填入正确介词：Ich denke ___ dich.', a: ['an'] },
      { type: '选择', q: '填入正确介词：Wir sprechen ___ das Problem.', a: ['ueber'] },
      { type: '选择', q: '填入正确助动词：Ich ___ nach Hause gegangen.', a: ['bin'] },
      { type: '选择', q: '填入正确助动词：Er ___ das Buch gelesen.', a: ['hat'] },
      { type: '选择', q: '填入正确物主冠词：Das ist ___ Fahrrad.（我的）', a: ['mein'] },
      { type: '选择', q: '填入正确形式：Ich fahre ___ Fahrrad zur Arbeit.', a: ['mit dem'] },
      { type: '选择', q: '填入正确形式：Ich gehe ___ Supermarkt.', a: ['zum', 'in den'] },
      { type: '改错', q: '改错：Ich habe gestern ins Kino gegangen.', a: ['ich bin gestern ins kino gegangen'] },
      { type: '改错', q: '改错：Ich bin nach Hause gefahren mit dem Bus.', a: ['ich bin mit dem bus nach hause gefahren'] },
      { type: '改错', q: '改错：Weil ich muede bin, ich gehe schlafen.', a: ['weil ich muede bin, gehe ich schlafen'] },
      { type: '改错', q: '改错：Er ist groesser wie ich.', a: ['er ist groesser als ich'] },
      { type: '改错', q: '改错：Ich helfe mein Bruder.', a: ['ich helfe meinem bruder'] },
      { type: '改错', q: '改错：Ich habe ein neues Auto gekauft gestern.', a: ['ich habe gestern ein neues auto gekauft'] },
      { type: '改错', q: '改错：Ich weiss nicht, dass er kommt.', a: ['ich weiss nicht, ob er kommt'] },
      {
        "id": "za2_lesen_a1",
        "type": "阅读配对",
        "level": "A2",
        "source": "ÖSD Zertifikat A2 / ZA2 Modellsatz",
        "module": "Lesen Aufgabe 1",
        "passage": "Lesen Sie die 10 Überschriften auf Blatt 1 und die 5 Texte auf Blatt 2. Suchen Sie dann zu jedem Text (1–5) die passende Überschrift (A–K) und schreiben Sie den Buchstaben auf die Linie über dem Text. Pro Text gibt es nur eine richtige Lösung.\n\n[Überschriften A–K / 卷面标题原文]\nA – Jetzt das Fahrrad reparieren lassen\nB – Im Rathaus: Informationen über Tiere\nC – Tipp: Ausflug in den Tierpark\nD – Frühlingspflanzen im Sonderangebot\nE – Tipps fürs Radfahren in der Stadt\nF – Radfahren ist gesund!\nG – Mit neuen Pflanzen in den Frühling\nH – Haustiere machen krank\nI – Ausstellung: Blumen im Frühling\nK – Wiener wurden zum Radfahren befragt\n\n[Texte 1–5 / 卷面短文原文]\nText 1: Seit Jahrzehnten ist der Oberberger Tierpark ein beliebtes Ausflugsziel. Die Vielfalt der Tiere und Pflanzen und die wunderbare Naturlandschaft sind die Gründe dafür. Das Angebot ist vielfältig: Führungen, Tierfütterungen, Naturlehrpfad, Waldspielplätze und vieles mehr. Info-Telefon 804 31 69 [aus einer deutschen Zeitung]\n\nText 2: Fahrrad fahren in Hamburg liegt voll im Trend. Das Fahrrad hat sich im Stadtgebiet heute einen wichtigen Platz erobert. Mehr als 1 000 Kilometer an Radwegen sollen Sie animieren, umzusteigen und das Fahrrad (neu) zu entdecken. Was Sie dabei beachten müssen, aber auch Tipps zu interessanten Routen – das finden Sie unter www.hamburg.de/verkehr/radfahren. [aus einer deutschen Tageszeitung]\n\nText 3: An Werktagen nützen 37 Prozent der Wiener ihr Rad in der Freizeit, aber auch für Wege in die Arbeit oder zur Schule/Uni ist das Rad ein beliebtes Verkehrsmittel. Das ging aus den Antworten auf eine Interview-Reihe zum Thema „Mit dem Fahrrad in Wien“ hervor. Das Ergebnis der Umfrage im Detail: [卷面附柱状图图表] [aus einer österreichischen Zeitung]\n\nText 4: Die aktuelle Ausstellung im Rathaus bietet Wissenswertes über Tierschutz und Tierhaltung. Für Kinder gibt es die Möglichkeit, verschiedene Haustiere kennenzulernen und sich über das Zusammenleben mit ihnen zu informieren. Der Eintritt ist frei! Informationen: www.tierschutzbern.ch [aus einer Schweizer Zeitung]\n\nText 5: „Unsere Stadt blüht auf!“ – Das ist unser Motto für den Frühling und alle sind eingeladen, mitzumachen: Egal ob Sie neue Sträucher, Bäume oder Blumen am Fenster pflanzen – mehr Natur tut allen gut! Schicken Sie ein Foto von Ihren Frühlingspflanzen an das Gemeindeamt und gewinnen Sie einen Einkaufsgutschein im Wert von 50 Euro. [aus einer österreichischen Tageszeitung]",
        "questions": [
          {
            "q": "Text 1: Seit Jahrzehnten ist der Oberberger Tierpark ein beliebtes Ausflugsziel. Die Vielfalt der Tiere und Pflanzen und die wunderbare Naturlandschaft sind die Gründe dafür. Das Angebot ist vielfältig: Führungen, Tierfütterungen, Naturlehrpfad, Waldspielplätze und vieles mehr. Info-Telefon 804 31 69 [aus einer deutschen Zeitung]  →  Welche Überschrift passt?",
            "a": [
              "C – Tipp: Ausflug in den Tierpark"
            ],
            "distractors": [
              "A – Jetzt das Fahrrad reparieren lassen",
              "B – Im Rathaus: Informationen über Tiere"
            ]
          },
          {
            "q": "Text 2: Fahrrad fahren in Hamburg liegt voll im Trend. Das Fahrrad hat sich im Stadtgebiet heute einen wichtigen Platz erobert. Mehr als 1 000 Kilometer an Radwegen sollen Sie animieren, umzusteigen und das Fahrrad (neu) zu entdecken. Was Sie dabei beachten müssen, aber auch Tipps zu interessanten Routen – das finden Sie unter www.hamburg.de/verkehr/radfahren. [aus einer deutschen Tageszeitung]  →  Welche Überschrift passt?",
            "a": [
              "E – Tipps fürs Radfahren in der Stadt"
            ],
            "distractors": [
              "B – Im Rathaus: Informationen über Tiere",
              "C – Tipp: Ausflug in den Tierpark"
            ]
          },
          {
            "q": "Text 3: An Werktagen nützen 37 Prozent der Wiener ihr Rad in der Freizeit, aber auch für Wege in die Arbeit oder zur Schule/Uni ist das Rad ein beliebtes Verkehrsmittel. Das ging aus den Antworten auf eine Interview-Reihe zum Thema „Mit dem Fahrrad in Wien“ hervor. Das Ergebnis der Umfrage im Detail: [卷面附柱状图图表] [aus einer österreichischen Zeitung]  →  Welche Überschrift passt?",
            "a": [
              "K – Wiener wurden zum Radfahren befragt"
            ],
            "distractors": [
              "C – Tipp: Ausflug in den Tierpark",
              "D – Frühlingspflanzen im Sonderangebot"
            ]
          },
          {
            "q": "Text 4: Die aktuelle Ausstellung im Rathaus bietet Wissenswertes über Tierschutz und Tierhaltung. Für Kinder gibt es die Möglichkeit, verschiedene Haustiere kennenzulernen und sich über das Zusammenleben mit ihnen zu informieren. Der Eintritt ist frei! Informationen: www.tierschutzbern.ch [aus einer Schweizer Zeitung]  →  Welche Überschrift passt?",
            "a": [
              "B – Im Rathaus: Informationen über Tiere"
            ],
            "distractors": [
              "E – Tipps fürs Radfahren in der Stadt",
              "F – Radfahren ist gesund!"
            ]
          },
          {
            "q": "Text 5: „Unsere Stadt blüht auf!“ – Das ist unser Motto für den Frühling und alle sind eingeladen, mitzumachen: Egal ob Sie neue Sträucher, Bäume oder Blumen am Fenster pflanzen – mehr Natur tut allen gut! Schicken Sie ein Foto von Ihren Frühlingspflanzen an das Gemeindeamt und gewinnen Sie einen Einkaufsgutschein im Wert von 50 Euro. [aus einer österreichischen Tageszeitung]  →  Welche Überschrift passt?",
            "a": [
              "G – Mit neuen Pflanzen in den Frühling"
            ],
            "distractors": [
              "E – Tipps fürs Radfahren in der Stadt",
              "F – Radfahren ist gesund!"
            ]
          }
        ],
        "q": "ÖSD A2 · Lesen Aufgabe 1（5 小题）",
        "a": [
          "[大组题，请展开作答]"
        ]
      },
      {
        "id": "za2_lesen_a2",
        "type": "阅读选择",
        "level": "A2",
        "source": "ÖSD Zertifikat A2 / ZA2 Modellsatz",
        "module": "Lesen Aufgabe 2",
        "passage": "Lesen Sie zuerst den Text auf Blatt 1 und lösen Sie dann die 5 Aufgaben, indem Sie die richtige Antwort (A oder B oder C) markieren. Für jede Aufgabe (1–5) gibt es nur eine richtige Lösung.\n\n[65 Jahre ohne ernsten Streit]\n\nDass sich zwei Menschen, die schon 65 Jahre verheiratet sind und einander stets treu waren, nach so langer Zeit immer noch lieben und achten wie am ersten Tag, ist doch etwas sehr Außergewöhnliches.\n\nFranz und Hanna Böhm aus Linz sind ein solches Paar. „Liebe auf den ersten Blick war es nicht“, meint der 88-jährige Franz Böhm und lacht, „denn ich habe ihr anfangs gar nicht gefallen.“ Damals war seine Hanna 19 Jahre alt und „hatte es schon recht eilig“, endlich zu heiraten. Heute ist Hanna Böhm 84 und glücklich, dass ihr Franz sie doch noch erobert hat.\n\nEr hat als Matrose auf einem Donauschiff gearbeitet, sie war die Tochter seines Chefs, des Steuermannes. Und als er erzählt, wie er einmal eine Frau aus dem Wasser geholt und so vor dem Ertrinken gerettet hat, da merkt man, wie stolz seine Ehefrau auf ihn ist.\n\nEigene Kinder haben die beiden leider nie bekommen, dafür haben sie ihren Neffen, den Sohn von Hannas Schwester, zu sich genommen und liebevoll erzogen.\n\nGemeinsame Spaziergänge am Pöstlingberg in der Nähe von Linz halten das rüstige Paar jung und fit – und natürlich auch ihre Liebe zueinander, die all die Jahre in guten wie in schlechten Zeiten bis heute andauert.\n\n[aus einer österreichischen Zeitung]",
        "questions": [
          {
            "q": "Aufgabe 1: Herr Böhm ist",
            "a": [
              "88 Jahre alt."
            ],
            "distractors": [
              "65 Jahre alt.",
              "84 Jahre alt."
            ]
          },
          {
            "q": "Aufgabe 2: Franz Böhm",
            "a": [
              "hat auf einem Schiff gearbeitet."
            ],
            "distractors": [
              "hat ein Schiff gekauft.",
              "wollte auf einem Schiff arbeiten."
            ]
          },
          {
            "q": "Aufgabe 3: Franz Böhm hat",
            "a": [
              "einer Frau in Not geholfen."
            ],
            "distractors": [
              "seine Frau oft auf dem Schiff mitfahren lassen.",
              "seinem Chef geholfen."
            ]
          },
          {
            "q": "Aufgabe 4: Das Paar hat",
            "a": [
              "einen Neffen bei sich aufgenommen."
            ],
            "distractors": [
              "einen Sohn bekommen.",
              "viele Kinder bekommen."
            ]
          },
          {
            "q": "Aufgabe 5: Das Ehepaar",
            "a": [
              "bleibt durch Spazierengehen jung."
            ],
            "distractors": [
              "geht oft im Stadtzentrum von Linz spazieren.",
              "ist früher gern spazieren gegangen."
            ]
          }
        ],
        "q": "ÖSD A2 · Lesen Aufgabe 2（5 小题）",
        "a": [
          "[大组题，请展开作答]"
        ]
      },
      {
        "id": "za2_hoeren_a1",
        "type": "听力判断",
        "level": "A2",
        "source": "ÖSD Zertifikat A2 / ZA2 Modellsatz",
        "module": "Hören Aufgabe 1",
        "passage": "Situation: Sie hören zwei verschiedene Texte mit dem gleichen Inhalt. Hören Sie gut zu und markieren Sie die Antworten. Es gibt vier richtige Antworten. Sie hören die Texte ein Mal. （原卷为「8 选 4」多选；此处按每个候选项展开为 JA/NEIN 判断题，JA = 该信息属于录音中的 4 个正确答案之一）\n\nThema: Das Wetter am Wochenende\n\n[卷面 8 个候选项 / 原卷需勾选 4 个]\n1. Sonne\n2. Gewitter\n3. 18 Grad\n4. Regen\n5. Nebel\n6. Wind\n7. 25 Grad\n8. Wolken",
        "audioUrl": "data/audio/a2/ZA2_MS_A1.mp3",
        "audioFile": "ZA2_MS_A1.mp3",
        "audioUrls": [
          "data/audio/a2/ZA2_MS_A1.mp3",
          "data/audio/a2/ZA2_MS_A3.mp3"
        ],
        "audioText": "",
        "audioTextNote": "源 PDF 为 Kandidatenblätter（考生卷），不含听力原文 Hörtexte；如需无障碍文本/提示，须另行获取 Prüferblätter 或人工转写。",
        "audioNote": "原卷为 8 个候选项中勾选 4 个；此处忠实展开为 8 道 JA/NEIN 判断题。音频对应本卷 Hören Aufgabe 1。",
        "questions": [
          {
            "q": "Aufgabe 1 / Das Wetter am Wochenende：候选项 „Sonne“ 是否属于录音中的 4 个正确信息？",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Aufgabe 1 / Das Wetter am Wochenende：候选项 „Gewitter“ 是否属于录音中的 4 个正确信息？",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Aufgabe 1 / Das Wetter am Wochenende：候选项 „18 Grad“ 是否属于录音中的 4 个正确信息？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 1 / Das Wetter am Wochenende：候选项 „Regen“ 是否属于录音中的 4 个正确信息？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 1 / Das Wetter am Wochenende：候选项 „Nebel“ 是否属于录音中的 4 个正确信息？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 1 / Das Wetter am Wochenende：候选项 „Wind“ 是否属于录音中的 4 个正确信息？",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Aufgabe 1 / Das Wetter am Wochenende：候选项 „25 Grad“ 是否属于录音中的 4 个正确信息？",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Aufgabe 1 / Das Wetter am Wochenende：候选项 „Wolken“ 是否属于录音中的 4 个正确信息？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          }
        ],
        "q": "ÖSD A2 · Hören Aufgabe 1（8 小题）",
        "a": [
          "[大组题，请展开作答]"
        ]
      },
      {
        "id": "za2_hoeren_a3",
        "type": "听力判断",
        "level": "A2",
        "source": "ÖSD Zertifikat A2 / ZA2 Modellsatz",
        "module": "Hören Aufgabe 3",
        "passage": "Situation: Sie hören ein Interview, bei dem fünf Personen befragt werden. Hören Sie gut zu und kreuzen Sie in der Liste die richtigen Antworten an. Pro Person sind mehrere Antworten möglich. Sie hören die Texte ein Mal. （原卷为 5 人 × 5 项的打叉网格；此处按每个格子展开为 JA/NEIN 判断题，JA = 答案卡该格子打了 X）\n\nFrage: Welchen Sport betreiben Sie in Ihrer Freizeit?\n\n[卷面打叉网格：行 = 5 位 Sprecher/-in，列 = 5 个选项]\n列标签: Fußball | Tennis | Laufen | Schwimmen | Radfahren\n行标签: 1. Sprecherin | 2. Sprecher | 3. Sprecherin | 4. Sprecher | 5. Sprecherin\n\n说明: 每位受访者可以有多个答案；下列判断题的 JA 表示答案卡上该格子打了 X。",
        "audioUrl": "data/audio/a2/ZA2_MS_A3.mp3",
        "audioFile": "ZA2_MS_A3.mp3",
        "audioUrls": [
          "data/audio/a2/ZA2_MS_A1.mp3",
          "data/audio/a2/ZA2_MS_A3.mp3"
        ],
        "audioText": "",
        "audioTextNote": "源 PDF 为 Kandidatenblätter（考生卷），不含听力原文 Hörtexte；如需无障碍文本/提示，须另行获取 Prüferblätter 或人工转写。",
        "audioNote": "原卷为 5 人 × 5 项的多选打叉网格；此处忠实展开为 25 道 JA/NEIN 判断题，听完一遍音轨完成整组。",
        "questions": [
          {
            "q": "Aufgabe 3 / 1. Sprecherin × „Fußball“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 1. Sprecherin × „Tennis“：答案卡该格子是否应打 X？",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Aufgabe 3 / 1. Sprecherin × „Laufen“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 1. Sprecherin × „Schwimmen“：答案卡该格子是否应打 X？",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Aufgabe 3 / 1. Sprecherin × „Radfahren“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 2. Sprecher × „Fußball“：答案卡该格子是否应打 X？",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Aufgabe 3 / 2. Sprecher × „Tennis“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 2. Sprecher × „Laufen“：答案卡该格子是否应打 X？",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Aufgabe 3 / 2. Sprecher × „Schwimmen“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 2. Sprecher × „Radfahren“：答案卡该格子是否应打 X？",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Aufgabe 3 / 3. Sprecherin × „Fußball“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 3. Sprecherin × „Tennis“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 3. Sprecherin × „Laufen“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 3. Sprecherin × „Schwimmen“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 3. Sprecherin × „Radfahren“：答案卡该格子是否应打 X？",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Aufgabe 3 / 4. Sprecher × „Fußball“：答案卡该格子是否应打 X？",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Aufgabe 3 / 4. Sprecher × „Tennis“：答案卡该格子是否应打 X？",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Aufgabe 3 / 4. Sprecher × „Laufen“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 4. Sprecher × „Schwimmen“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 4. Sprecher × „Radfahren“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 5. Sprecherin × „Fußball“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 5. Sprecherin × „Tennis“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 5. Sprecherin × „Laufen“：答案卡该格子是否应打 X？",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Aufgabe 3 / 5. Sprecherin × „Schwimmen“：答案卡该格子是否应打 X？",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Aufgabe 3 / 5. Sprecherin × „Radfahren“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          }
        ],
        "q": "ÖSD A2 · Hören Aufgabe 3（25 小题）",
        "a": [
          "[大组题，请展开作答]"
        ]
      },
      {
        "id": "za2oe_lesen_a1",
        "type": "阅读配对",
        "level": "A2",
        "source": "ÖSD Zertifikat A2/Österreich / ZA2 Ö Modellsatz",
        "module": "Lesen Aufgabe 1",
        "passage": "Lesen Sie die 10 Überschriften auf Blatt 1 und die 5 Texte auf Blatt 2. Suchen Sie dann zu jedem Text (1–5) die passende Überschrift (A–K) und schreiben Sie den Buchstaben auf die Linie über dem Text. Pro Text gibt es nur eine richtige Lösung.\n\n[Überschriften A–K / 卷面标题原文]\nA – Lebensmittel aus anderen Ländern\nB – Kindergärtnerinnen lernen Sprachen\nC – Gut einkaufen für wenig Geld\nD – Hilfe bei Hausaufgaben und Schulproblemen\nE – 800 Euro für Lebensmittel\nF – Kindergarten für ein Jahr gratis\nG – Im Ausland einkaufen\nH – Beim Spielen Sprachen lernen\nI – Mehr Kindergärten für kleine Kinder\nK – Teurer Nachmittagsunterricht\n\n[Texte 1–5 / 卷面短文原文]\nText 1: Wohin mit dem Kind, wenn man nach der Babypause wieder arbeiten will? Kinderbetreuung kann teuer sein und ist oft nur schwer zu bekommen. Das vor Kurzem von österreichischen Politikern eingeführte Gratis-Kindergartenjahr soll eine Verbesserung bringen. Für ihre Fünfjährigen müssen die Eltern in ganz Österreich nichts bezahlen. In manchen Bundesländern gilt das auch schon für Drei- oder Vierjährige. [von einer österreichischen Website]\n\nText 2: In Wien kaufen immer mehr Menschen in sogenannten „Ethno-Supermärkten“ ein. Das sind Geschäfte von Türken, Afrikanern oder Indern, die Gemüse und Obst aus dem Süden, Süßigkeiten und Gewürze aus dem Orient sowie viele andere Waren aus dem eigenen Land verkaufen. Waren es früher hauptsächlich ausländische Käufer, so zeigen nun immer mehr Österreicher Interesse am internationalen Angebot. [aus einem österreichischen Magazin]\n\nText 3: In Wien wurde ein weiterer Sozialmarkt eröffnet. Man verkauft dort frische Lebensmittel, Haushaltswaren und neuwertige Kleidung an sozial Bedürftige. Im Sozialmarkt dürfen nur Personen einkaufen, die pro Monat maximal 800 Euro verdienen. Man bekommt einen Mitgliedspass und bezahlt für alle Waren maximal 30 Prozent des normalen Verkaufspreises. Brot gibt es sogar gratis. [von einer österreichischen Website]\n\nText 4: In der Wiener Kindergruppe „Niños del Sol“ (Sonnenkinder) spielen, singen und lernen die Kinder auf Deutsch und auf Spanisch. Die meisten Kinder haben österreichische Eltern, ein paar Kinder haben eine Mama oder einen Papa aus Peru, Kuba oder Spanien. Die Kindergärtnerinnen kommen aus Österreich und Südamerika, sie sprechen, lesen und singen mit den Kindern in ihrer Muttersprache. [aus einer österreichischen Zeitschrift]\n\nText 5: Das Lerncafé Gries in Graz bietet für Schulkinder gratis Nachmittagsbetreuung an. Viele Kinder, die nicht Deutsch als Muttersprache haben, nutzen das Angebot. „Wenn ich mich in Deutsch oder Mathematik nicht auskenne, kann ich im Lerncafé einen Betreuer fragen“, erzählt Aysen, ein 11-jähriges Mädchen aus der Türkei. Willkommen sind aber alle Kinder, die Probleme beim Lernen haben. [aus einer österreichischen Tageszeitung]",
        "questions": [
          {
            "q": "Text 1: Wohin mit dem Kind, wenn man nach der Babypause wieder arbeiten will? Kinderbetreuung kann teuer sein und ist oft nur schwer zu bekommen. Das vor Kurzem von österreichischen Politikern eingeführte Gratis-Kindergartenjahr soll eine Verbesserung bringen. Für ihre Fünfjährigen müssen die Eltern in ganz Österreich nichts bezahlen. In manchen Bundesländern gilt das auch schon für Drei- oder Vierjährige. [von einer österreichischen Website]  →  Welche Überschrift passt?",
            "a": [
              "F – Kindergarten für ein Jahr gratis"
            ],
            "distractors": [
              "A – Lebensmittel aus anderen Ländern",
              "B – Kindergärtnerinnen lernen Sprachen"
            ]
          },
          {
            "q": "Text 2: In Wien kaufen immer mehr Menschen in sogenannten „Ethno-Supermärkten“ ein. Das sind Geschäfte von Türken, Afrikanern oder Indern, die Gemüse und Obst aus dem Süden, Süßigkeiten und Gewürze aus dem Orient sowie viele andere Waren aus dem eigenen Land verkaufen. Waren es früher hauptsächlich ausländische Käufer, so zeigen nun immer mehr Österreicher Interesse am internationalen Angebot. [aus einem österreichischen Magazin]  →  Welche Überschrift passt?",
            "a": [
              "A – Lebensmittel aus anderen Ländern"
            ],
            "distractors": [
              "C – Gut einkaufen für wenig Geld",
              "D – Hilfe bei Hausaufgaben und Schulproblemen"
            ]
          },
          {
            "q": "Text 3: In Wien wurde ein weiterer Sozialmarkt eröffnet. Man verkauft dort frische Lebensmittel, Haushaltswaren und neuwertige Kleidung an sozial Bedürftige. Im Sozialmarkt dürfen nur Personen einkaufen, die pro Monat maximal 800 Euro verdienen. Man bekommt einen Mitgliedspass und bezahlt für alle Waren maximal 30 Prozent des normalen Verkaufspreises. Brot gibt es sogar gratis. [von einer österreichischen Website]  →  Welche Überschrift passt?",
            "a": [
              "C – Gut einkaufen für wenig Geld"
            ],
            "distractors": [
              "D – Hilfe bei Hausaufgaben und Schulproblemen",
              "E – 800 Euro für Lebensmittel"
            ]
          },
          {
            "q": "Text 4: In der Wiener Kindergruppe „Niños del Sol“ (Sonnenkinder) spielen, singen und lernen die Kinder auf Deutsch und auf Spanisch. Die meisten Kinder haben österreichische Eltern, ein paar Kinder haben eine Mama oder einen Papa aus Peru, Kuba oder Spanien. Die Kindergärtnerinnen kommen aus Österreich und Südamerika, sie sprechen, lesen und singen mit den Kindern in ihrer Muttersprache. [aus einer österreichischen Zeitschrift]  →  Welche Überschrift passt?",
            "a": [
              "H – Beim Spielen Sprachen lernen"
            ],
            "distractors": [
              "D – Hilfe bei Hausaufgaben und Schulproblemen",
              "E – 800 Euro für Lebensmittel"
            ]
          },
          {
            "q": "Text 5: Das Lerncafé Gries in Graz bietet für Schulkinder gratis Nachmittagsbetreuung an. Viele Kinder, die nicht Deutsch als Muttersprache haben, nutzen das Angebot. „Wenn ich mich in Deutsch oder Mathematik nicht auskenne, kann ich im Lerncafé einen Betreuer fragen“, erzählt Aysen, ein 11-jähriges Mädchen aus der Türkei. Willkommen sind aber alle Kinder, die Probleme beim Lernen haben. [aus einer österreichischen Tageszeitung]  →  Welche Überschrift passt?",
            "a": [
              "D – Hilfe bei Hausaufgaben und Schulproblemen"
            ],
            "distractors": [
              "F – Kindergarten für ein Jahr gratis",
              "G – Im Ausland einkaufen"
            ]
          }
        ],
        "q": "ÖSD A2 · Lesen Aufgabe 1（5 小题）",
        "a": [
          "[大组题，请展开作答]"
        ]
      },
      {
        "id": "za2oe_lesen_a2",
        "type": "阅读选择",
        "level": "A2",
        "source": "ÖSD Zertifikat A2/Österreich / ZA2 Ö Modellsatz",
        "module": "Lesen Aufgabe 2",
        "passage": "Lesen Sie zuerst den Text auf Blatt 1 und lösen Sie dann die 5 Aufgaben, indem Sie die richtige Antwort (A oder B oder C) markieren. Für jede Aufgabe (1–5) gibt es nur eine richtige Lösung.\n\n[Wenn ein Türke Deutsch unterrichtet]\n\nAdnan* ist gebürtiger Türke. Bis zu seinem 15. Geburtstag lebte er in einem kleinen Dorf in der Türkei. Dann fand Adnans Vater Arbeit in Österreich und die ganze Familie zog nach Wien.\n\nDamals musste Adnan Deutsch lernen, heute unterrichtet er selbst Deutsch – als Lehrer im Nachhilfeinstitut** „Phönix“. „Ich unterrichte sehr gerne. Es macht mir viel Freude, mit Kindern und Jugendlichen zu arbeiten, und wir lachen oft beim Lernen. Außerdem kann ich meine Schüler gut verstehen, ich hatte früher ja die gleichen Probleme“, meint Adnan.\n\n„Phönix“ ist kein gewöhnliches Nachhilfeinstitut, da es in erster Linie Lernhilfe für Kinder aus türkischen Familien anbietet. Damit sich die Familien die Nachhilfe leisten können, kostet der Unterricht bei „Phönix“ nicht so viel wie in anderen Instituten. Der Verein möchte die Bildungschancen von ausländischen Kindern verbessern.\n\nDer Weg zu guten Schulnoten führt bei „Phönix“ aber nicht nur über die Arbeit mit den Schülerinnen und Schülern, sondern auch über die Eltern. Ein Mitarbeiter von „Phönix“ besucht das Elternhaus und achtet darauf, dass das Kind einen eigenen Platz zum Lernen hat und nicht neben dem eingeschalteten Fernseher die Hausaufgaben machen muss. Außerdem lädt „Phönix“ die Eltern einmal pro Monat zum Elternabend ein und informiert sie über wichtige Themen wie das österreichische Schulsystem oder Probleme beim Lernen.\n\n[aus einer österreichischen Zeitung]\n* Der Name wurde vom ÖSD-Team geändert.\n** Nachhilfeinstitut: Dort bekommen Schülerinnen und Schüler, die in der Schule Probleme haben, gegen Bezahlung Privatunterricht.",
        "questions": [
          {
            "q": "Aufgabe 1: Beim Lernen mit Kindern und Jugendlichen hat Adnan",
            "a": [
              "sehr viel Spaß."
            ],
            "distractors": [
              "noch immer große Probleme.",
              "zu wenig Zeit für Deutsch."
            ]
          },
          {
            "q": "Aufgabe 2: Adnan",
            "a": [
              "kennt die Probleme seiner Schüler aus seinem eigenen Leben."
            ],
            "distractors": [
              "gibt nur österreichischen Kindern und Jugendlichen Unterricht.",
              "unterrichtet nicht nur Deutsch, sondern auch andere Sprachen."
            ]
          },
          {
            "q": "Aufgabe 3: Das Lehrerteam von „Phönix“",
            "a": [
              "will, dass ausländische Kinder mehr Erfolg in der Schule haben."
            ],
            "distractors": [
              "gibt Kindern mit Schulproblemen gratis Unterricht.",
              "möchte, dass auch die Eltern der Kinder Deutsch lernen."
            ]
          },
          {
            "q": "Aufgabe 4: Die Mitarbeiter von „Phönix“ finden, dass die Kinder",
            "a": [
              "beim Lernen Ruhe brauchen."
            ],
            "distractors": [
              "beim Fernsehen viel lernen.",
              "ihre Hausaufgaben alleine machen müssen."
            ]
          },
          {
            "q": "Aufgabe 5: Am Elternabend",
            "a": [
              "geben die Lehrer von „Phönix“ den Eltern praktische Informationen."
            ],
            "distractors": [
              "informieren sich nur wenige Eltern beim Nachhilfeinstitut „Phönix“.",
              "sollen die Kinder zusammen mit ihren Eltern zu „Phönix“ kommen."
            ]
          }
        ],
        "q": "ÖSD A2 · Lesen Aufgabe 2（5 小题）",
        "a": [
          "[大组题，请展开作答]"
        ]
      },
      {
        "id": "za2oe_hoeren_a1",
        "type": "听力判断",
        "level": "A2",
        "source": "ÖSD Zertifikat A2/Österreich / ZA2 Ö Modellsatz",
        "module": "Hören Aufgabe 1",
        "passage": "Situation: Sie hören zwei verschiedene Texte mit dem gleichen Inhalt. Hören Sie gut zu und markieren Sie die Antworten. Es gibt vier richtige Antworten. Sie hören die Texte ein Mal. （原卷为「8 选 4」多选；此处按每个候选项展开为 JA/NEIN 判断题，JA = 该信息属于录音中的 4 个正确答案之一）\n\nThema: Welche Berufe sind für junge Menschen am interessantesten?\n\n[卷面 8 个候选项 / 原卷需勾选 4 个]\n1. Kellner/Kellnerin\n2. Kfz-Mechaniker/Kfz-Mechanikerin\n3. Maler/Malerin\n4. Elektrotechniker/Elektrotechnikerin\n5. Verkäufer/Verkäuferin\n6. Koch/Köchin\n7. Tischler/Tischlerin\n8. Friseur/Friseurin",
        "audioUrl": "data/audio/a2/ZA2_Oe_MS_A1_111017.mp3",
        "audioFile": "ZA2_Oe_MS_A1_111017.mp3",
        "audioUrls": [
          "data/audio/a2/ZA2_Oe_MS_A1_111017.mp3",
          "data/audio/a2/ZA2_Oe_MS_A3_111017.mp3"
        ],
        "audioText": "",
        "audioTextNote": "源 PDF 为 Kandidatenblätter（考生卷），不含听力原文 Hörtexte；如需无障碍文本/提示，须另行获取 Prüferblätter 或人工转写。",
        "audioNote": "原卷为 8 个候选项中勾选 4 个；此处忠实展开为 8 道 JA/NEIN 判断题。音频对应本卷 Hören Aufgabe 1。",
        "questions": [
          {
            "q": "Aufgabe 1 / Welche Berufe sind für junge Menschen am interessantesten?：候选项 „Kellner/Kellnerin“ 是否属于录音中的 4 个正确信息？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 1 / Welche Berufe sind für junge Menschen am interessantesten?：候选项 „Kfz-Mechaniker/Kfz-Mechanikerin“ 是否属于录音中的 4 个正确信息？",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Aufgabe 1 / Welche Berufe sind für junge Menschen am interessantesten?：候选项 „Maler/Malerin“ 是否属于录音中的 4 个正确信息？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 1 / Welche Berufe sind für junge Menschen am interessantesten?：候选项 „Elektrotechniker/Elektrotechnikerin“ 是否属于录音中的 4 个正确信息？",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Aufgabe 1 / Welche Berufe sind für junge Menschen am interessantesten?：候选项 „Verkäufer/Verkäuferin“ 是否属于录音中的 4 个正确信息？",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Aufgabe 1 / Welche Berufe sind für junge Menschen am interessantesten?：候选项 „Koch/Köchin“ 是否属于录音中的 4 个正确信息？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 1 / Welche Berufe sind für junge Menschen am interessantesten?：候选项 „Tischler/Tischlerin“ 是否属于录音中的 4 个正确信息？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 1 / Welche Berufe sind für junge Menschen am interessantesten?：候选项 „Friseur/Friseurin“ 是否属于录音中的 4 个正确信息？",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          }
        ],
        "q": "ÖSD A2 · Hören Aufgabe 1（8 小题）",
        "a": [
          "[大组题，请展开作答]"
        ]
      },
      {
        "id": "za2oe_hoeren_a3",
        "type": "听力判断",
        "level": "A2",
        "source": "ÖSD Zertifikat A2/Österreich / ZA2 Ö Modellsatz",
        "module": "Hören Aufgabe 3",
        "passage": "Situation: Sie hören ein Interview, bei dem fünf Personen befragt werden. Hören Sie gut zu und kreuzen Sie in der Liste die richtigen Antworten an. Pro Person sind mehrere Antworten möglich. Sie hören die Texte ein Mal. （原卷为 5 人 × 5 项的打叉网格；此处按每个格子展开为 JA/NEIN 判断题，JA = 答案卡该格子打了 X）\n\nFrage: Was ist für Sie am Arbeitsplatz am wichtigsten?\n\n[卷面打叉网格：行 = 5 位 Sprecher/-in，列 = 5 个选项]\n列标签: Geld | Kollegen | Arbeitsort | Arbeitszeit | Sicherheit\n行标签: 1. Sprecherin | 2. Sprecher | 3. Sprecherin | 4. Sprecher | 5. Sprecherin\n\n说明: 每位受访者可以有多个答案；下列判断题的 JA 表示答案卡上该格子打了 X。",
        "audioUrl": "data/audio/a2/ZA2_Oe_MS_A3_111017.mp3",
        "audioFile": "ZA2_Oe_MS_A3_111017.mp3",
        "audioUrls": [
          "data/audio/a2/ZA2_Oe_MS_A1_111017.mp3",
          "data/audio/a2/ZA2_Oe_MS_A3_111017.mp3"
        ],
        "audioText": "",
        "audioTextNote": "源 PDF 为 Kandidatenblätter（考生卷），不含听力原文 Hörtexte；如需无障碍文本/提示，须另行获取 Prüferblätter 或人工转写。",
        "audioNote": "原卷为 5 人 × 5 项的多选打叉网格；此处忠实展开为 25 道 JA/NEIN 判断题，听完一遍音轨完成整组。",
        "questions": [
          {
            "q": "Aufgabe 3 / 1. Sprecherin × „Geld“：答案卡该格子是否应打 X？",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Aufgabe 3 / 1. Sprecherin × „Kollegen“：答案卡该格子是否应打 X？",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Aufgabe 3 / 1. Sprecherin × „Arbeitsort“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 1. Sprecherin × „Arbeitszeit“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 1. Sprecherin × „Sicherheit“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 2. Sprecher × „Geld“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 2. Sprecher × „Kollegen“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 2. Sprecher × „Arbeitsort“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 2. Sprecher × „Arbeitszeit“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 2. Sprecher × „Sicherheit“：答案卡该格子是否应打 X？",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Aufgabe 3 / 3. Sprecherin × „Geld“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 3. Sprecherin × „Kollegen“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 3. Sprecherin × „Arbeitsort“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 3. Sprecherin × „Arbeitszeit“：答案卡该格子是否应打 X？",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Aufgabe 3 / 3. Sprecherin × „Sicherheit“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 4. Sprecher × „Geld“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 4. Sprecher × „Kollegen“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 4. Sprecher × „Arbeitsort“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 4. Sprecher × „Arbeitszeit“：答案卡该格子是否应打 X？",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Aufgabe 3 / 4. Sprecher × „Sicherheit“：答案卡该格子是否应打 X？",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Aufgabe 3 / 5. Sprecherin × „Geld“：答案卡该格子是否应打 X？",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Aufgabe 3 / 5. Sprecherin × „Kollegen“：答案卡该格子是否应打 X？",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Aufgabe 3 / 5. Sprecherin × „Arbeitsort“：答案卡该格子是否应打 X？",
            "a": [
              "JA"
            ],
            "distractors": [
              "NEIN"
            ]
          },
          {
            "q": "Aufgabe 3 / 5. Sprecherin × „Arbeitszeit“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          },
          {
            "q": "Aufgabe 3 / 5. Sprecherin × „Sicherheit“：答案卡该格子是否应打 X？",
            "a": [
              "NEIN"
            ],
            "distractors": [
              "JA"
            ]
          }
        ],
        "q": "ÖSD A2 · Hören Aufgabe 3（25 小题）",
        "a": [
          "[大组题，请展开作答]"
        ]
      }
    ],
    3: [
      { type: '语法填空', q: 'Das Buch, ___ ich gestern gelesen habe, ist gut.（关系代词）', a: ['das'] },
      { type: '语法填空', q: 'Der Mann, ___ dort steht, ist mein Lehrer.（关系代词）', a: ['der'] },
      { type: '语法填空', q: 'Die Frau, ___ ich geholfen habe, ist meine Nachbarin.（关系代词，与格）', a: ['der'] },
      { type: '语法填空', q: 'Das Haus, in ___ wir wohnen, ist alt.（关系代词）', a: ['dem'] },
      { type: '语法填空', q: 'Die Stadt, in ___ ich geboren bin, ist klein.（关系代词）', a: ['der'] },
      { type: '语法填空', q: 'Das ist der Freund, ___ ich gestern getroffen habe.（关系代词，宾格）', a: ['den'] },
      { type: '语法填空', q: 'Ich habe keine Lust, ___ ich muede bin.（连词：because）', a: ['weil'] },
      { type: '语法填空', q: '___ ich muede war, arbeitete ich weiter.（让步连词：although）', a: ['obwohl'] },
      { type: '语法填空', q: 'Ich komme, ___ ich Zeit habe.（如果 / 当……时）', a: ['wenn'] },
      { type: '语法填空', q: '___ ich das gewusst haette, waere ich nicht gekommen.（条件连词）', a: ['wenn'] },
      { type: '语法填空', q: 'Ich weiss nicht, ___ er kommt oder nicht.（是否）', a: ['ob'] },
      { type: '语法填空', q: 'Er ist nicht so klug, ___ ich.（同级比较）', a: ['wie'] },
      { type: '语法填空', q: 'Die Arbeit ___ erledigt werden.（被动 + 情态动词）', a: ['muss'] },
      { type: '语法填空', q: 'Das Problem wurde gestern ___.（loesen 的被动过去分词）', a: ['geloest'] },
      { type: '语法填空', q: 'Die Strasse ___ gerade repariert.（被动现在时）', a: ['wird'] },
      { type: '语法填空', q: 'Ich lasse mein Auto ___.（被动替代形式：让别人修）', a: ['reparieren'] },
      { type: '语法填空', q: 'Er tat so, ___ er nichts wuesste.（als / wie）', a: ['als'] },
      { type: '语法填空', q: 'Je mehr ich lerne, ___ besser verstehe ich.（比较句型）', a: ['desto', 'umso'] },
      { type: '语法填空', q: 'Ich habe vor, morgen frueh ___.（aufstehen，带 zu 不定式）', a: ['aufzustehen'] },
      { type: '语法填空', q: 'Es ist wichtig, regelmaessig ___.（lernen，带 zu 不定式）', a: ['zu lernen'] },
      { type: '语法填空', q: 'Ich gehe zum Arzt, ___ mich untersuchen zu lassen.（目的连词）', a: ['um'] },
      { type: '语法填空', q: 'Er hat mir geholfen, ___ ich das Problem loesen konnte.（结果连词）', a: ['sodass', 'so dass'] },
      { type: '词汇', q: '“经验”用德语怎么说？', a: ['erfahrung'] },
      { type: '词汇', q: '“决定”用德语怎么说？（名词）', a: ['entscheidung'] },
      { type: '词汇', q: '“环境”用德语怎么说？', a: ['umwelt'] },
      { type: '词汇', q: '“健康”用德语怎么说？', a: ['gesundheit'] },
      { type: '词汇', q: '“教育”用德语怎么说？', a: ['bildung', 'erziehung'] },
      { type: '词汇', q: '“机会”用德语怎么说？', a: ['gelegenheit', 'chance'] },
      { type: '词汇', q: '“发展”用德语怎么说？', a: ['entwicklung'] },
      { type: '词汇', q: '“关系”用德语怎么说？', a: ['beziehung'] },
      { type: '词汇', q: '“原因”用德语怎么说？', a: ['grund', 'ursache'] },
      { type: '词汇', q: '“结果”用德语怎么说？', a: ['ergebnis', 'folge'] },
      { type: '词汇', q: '“此外”用德语怎么说？', a: ['ausserdem', 'zudem'] },
      { type: '词汇', q: '“因此”用德语怎么说？', a: ['deshalb', 'daher', 'deswegen'] },
      { type: '词汇', q: '“尽管如此”用德语怎么说？', a: ['trotzdem'] },
      { type: '词汇', q: '“一般来说”用德语怎么说？', a: ['im allgemeinen', 'normalerweise'] },
      { type: '词汇', q: '“另一方面”用德语怎么说？', a: ['andererseits'] },
      { type: '词汇', q: '“解决问题”用德语怎么说？（动词短语）', a: ['ein problem loesen', 'probleme loesen'] },
      { type: '词汇', q: '“参加”用德语怎么说？（动词）', a: ['teilnehmen', 'mitmachen'] },
      { type: '词汇', q: '“影响”用德语怎么说？（名词）', a: ['einfluss', 'auswirkung'] },
      { type: '翻译', q: '尽管下雨，他还是出去了。', a: ['obwohl es regnete, ging er trotzdem raus', 'obwohl es regnete, ist er trotzdem rausgegangen'] },
      { type: '翻译', q: '如果我早知道，我就会来了。', a: ['wenn ich das frueher gewusst haette, waere ich gekommen'] },
      { type: '翻译', q: '这本书是我上周买的。', a: ['dieses buch habe ich letzte woche gekauft', 'ich habe dieses buch letzte woche gekauft'] },
      { type: '翻译', q: '他告诉我他明天不来。', a: ['er hat mir gesagt, dass er morgen nicht kommt', 'er hat mir gesagt, er kommt morgen nicht'] },
      { type: '翻译', q: '这个问题必须尽快解决。', a: ['dieses problem muss so schnell wie moeglich geloest werden'] },
      { type: '翻译', q: '我正在考虑换工作。', a: ['ich denke daran, die arbeit zu wechseln', 'ich ueberlege, die arbeit zu wechseln'] },
      { type: '翻译', q: '为了通过考试，他每天学习。', a: ['um die pruefung zu bestehen, lernt er jeden tag'] },
      { type: '翻译', q: '我不确定他是否会来。', a: ['ich bin nicht sicher, ob er kommt', 'ich weiss nicht, ob er kommt'] },
      { type: '翻译', q: '越是练习，说得越好。', a: ['je mehr man uebt, desto besser spricht man'] },
      { type: '翻译', q: '这栋房子是 1990 年建的。', a: ['dieses haus wurde 1990 gebaut'] },
      { type: '翻译', q: '他让我等了一个小时。', a: ['er hat mich eine stunde warten lassen'] },
      { type: '翻译', q: '因为身体不舒服，他今天没来。', a: ['weil er krank war, ist er heute nicht gekommen'] },
      { type: '翻译', q: '我想找一个安静的住处。', a: ['ich moechte eine ruhige wohnung finden'] },
      { type: '翻译', q: '这件事对我来说很重要。', a: ['das ist mir wichtig', 'diese sache ist mir wichtig', 'das ist wichtig fuer mich'] },
      { type: '翻译', q: '我认识那个帮我找工作的朋友。', a: ['ich kenne den freund, der mir geholfen hat, arbeit zu finden'] },
      { type: '选择', q: '填入正确介词：Er interessiert sich ___ Kunst.', a: ['fuer'] },
      { type: '选择', q: '填入正确介词：Ich freue mich ___ das Wiedersehen.', a: ['auf'] },
      { type: '选择', q: '填入正确介词：Das haengt ___ Wetter ab.', a: ['vom', 'von dem'] },
      { type: '选择', q: '填入正确介词：Ich warte ___ ihn.', a: ['auf'] },
      { type: '选择', q: '填入正确关系代词：Die Leute, ___ ich kenne, sind nett.', a: ['die'] },
      { type: '选择', q: '填入正确形式：Es ist nicht noetig, das ___ machen.', a: ['zu'] },
      { type: '选择', q: '填入正确连词：___ ich Zeit haette, wuerde ich kommen.', a: ['wenn'] },
      { type: '选择', q: '填入正确形式：Ich habe ___ gelernt, als ich dachte.', a: ['mehr'] },
      { type: '改错', q: '改错：Obwohl es regnete, aber er ging raus.', a: ['obwohl es regnete, ging er raus'] },
      { type: '改错', q: '改错：Wenn ich mehr Zeit haette, ich wuerde mehr lesen.', a: ['wenn ich mehr zeit haette, wuerde ich mehr lesen'] },
      { type: '改错', q: '改错：Das ist der Mann, den ich mit gesprochen habe.', a: ['das ist der mann, mit dem ich gesprochen habe'] },
      { type: '改错', q: '改错：Das Problem muss geloest worden.', a: ['das problem muss geloest werden'] },
      { type: '改错', q: '改错：Er hat gesagt, dass er kommt morgen.', a: ['er hat gesagt, dass er morgen kommt'] },
      { type: '改错', q: '改错：Ich habe vor, nach Berlin zu fahren morgen.', a: ['ich habe vor, morgen nach berlin zu fahren'] },
      { type: '改错', q: '改错：Je mehr ich arbeite, mehr ich verdiene.', a: ['je mehr ich arbeite, desto mehr verdiene ich'] },
      {
        "id": "zb1_lesen_energie",
        "type": "阅读长文",
        "level": "B1",
        "source": "ÖSD Zertifikat B1 / ZB1",
        "module": "Lesen Teil 2",
        "passage": "Ein Dorf für grüne Energie\nDas Dorf Feldheim in Brandenburg macht sich unabhängig von Öl und Kohle.\nSeit Kurzem deckt das Dorf seinen kompletten Strombedarf und drei Viertel des Wärmebedarfs durch moderne Energien. „Das funktioniert mithilfe einer modernen Anlage für Bio-Gas“, erklärt der Diplom-Physiker Eckhard Meier. „Da kommen Abfall von den Tieren, Getreide und Holz rein und werden erwärmt. Ein Motor verbrennt das Gas und erzeugt dabei Wärme. Der Motor treibt dann einen Generator an, der Strom produziert.“\nEntstanden ist die Idee des „Bio-Energiedorfs“ an der Universität Göttingen. Ziel der Wissenschaftler war es, zu zeigen, dass es möglich ist, ein Dorf komplett mit erneuerbaren Energien zu versorgen und damit einen Beitrag zum Klimaschutz zu leisten. Tatsächlich: Die Bio-Gasanlage erzeugt jährlich doppelt so viel Strom wie die Gemeinde verbraucht. Der Rest wird in das Stromnetz abgegeben und kostenlos anderen Dörfern zur Verfügung gestellt. Passt das Konzept auch für andere Dörfer? „Im Prinzip schon“, meint Eckhard Meier. Die technischen Anlagen könnten an anderen Orten genauso aufgebaut werden – der Raumbedarf ist gering. Man benötigt allerdings vor allem eines: aktive und begeisterte Einwohner!",
        "questions": [
          {
            "q": "In diesem Text geht es um ...",
            "a": [
              "die umweltfreundliche Stromproduktion in Feldheim."
            ],
            "distractors": [
              "die neue Technologie von Eckhard Meier.",
              "einen Studiengang an der Universität Göttingen."
            ]
          },
          {
            "q": "Die Bio-Gasanlage …",
            "a": [
              "produziert Strom und Wärme."
            ],
            "distractors": [
              "gehört Eckhard Meier.",
              "gibt es seit einem Dreivierteljahr."
            ]
          },
          {
            "q": "Die Wissenschaftler wollten zeigen, dass ...",
            "a": [
              "ein ganzes Dorf von modernen Energien leben kann."
            ],
            "distractors": [
              "eine Bio-Gasanlage mehr Strom produziert, als ein Dorf braucht.",
              "man größere Mengen Strom sparen kann."
            ]
          },
          {
            "q": "Damit die Idee auch in anderen Dörfern funktioniert, ...",
            "a": [
              "muss die Bevölkerung dafür sein."
            ],
            "distractors": [
              "benötigt man viel Geld.",
              "braucht man genug Platz für die Technik."
            ]
          }
        ],
        "q": "ÖSD B1 · Lesen Teil 2（4 小题）",
        "a": [
          "[大组题，请展开作答]"
        ]
      },
      {
        "id": "zb1_lesen_murten",
        "type": "阅读长文",
        "level": "B1",
        "source": "ÖSD Zertifikat B1 / ZB1",
        "module": "Lesen",
        "passage": "Tour durch Murtens Geschichte\nMit der Rundfahrt «Zeitreise per Velo*» können Touristen das Städtchen Murten und seine Geschichte sportlich neu entdecken.\nDie Tour startet am Bahnhof von Murten, wo die sportlichen Teilnehmer auf das eigene oder ein gemietetes Velo steigen. Die weniger sportlichen und jene, die es schon immer ausprobieren wollten, steigen aufs Elektro-Velo. Dieses kann ebenfalls am Bahnhof gemietet werden.\nVom Bahnhof führt der Weg auf den historischen Hügel, wo Karl der Kühne sein Hauptquartier aufbaute, bevor sein Heer im Jahr 1476 besiegt wurde. Die Sportlichen kommen bei der Fahrt auf den Hügel ins Schwitzen, während die E-Biker ganz einfach den Elektromotor nutzen.\nOben angekommen kann man die wunderbare Aussicht auf den Murtensee geniessen. Nach einer kurzen Pause geht es weiter nach Merlach. Dort steht ein Denkmal für Soldaten, die in der Schlacht bei Murten 1476 umgekommen sind. Danach geht die Fahrt zum Hafen und in die Altstadt. Unterwegs erfahren die Velofahrer vieles über die Region.\n«Mit der Velorundfahrt für Gruppen wollen wir unser Angebot für aktive Radfahrer erweitern», sagt der Geschäftsführer von Murten Tourismus. Damit soll sowohl das Gebiet für Velo-Touristen interessant gemacht als auch der Trend zum E-Bike unterstützt werden.\n* Velo = Schweizer Standard für „Fahrrad“",
        "questions": [
          {
            "q": "Der Geschäftsführer von Murten Tourismus will, dass ...",
            "a": [
              "mehr Velo-Touristen in die Region kommen."
            ],
            "distractors": [
              "es in Murten mehr Stadtführungen für Gruppen gibt.",
              "die Leute normale Velos statt Elektro-Velos benutzen."
            ]
          }
        ],
        "q": "ÖSD B1 · Lesen（1 小题）",
        "a": [
          "[大组题，请展开作答]"
        ]
      },
      {
        "id": "zb1_lesen_hausordnung",
        "type": "阅读长文",
        "level": "B1",
        "source": "ÖSD Zertifikat B1 / ZB1",
        "module": "Lesen Teil 5",
        "passage": "HAUSORDNUNG\nUnterrichtszeiten: Die vereinbarten Unterrichtszeiten sind verbindlich. Ist die Lehrperson zehn Minuten nach Unterrichtsbeginn nicht da, informiert die Klassenvertretung das Sekretariat.\nOrdnung: In sämtlichen Räumen und Anlagen unserer Schule ist auf Ordnung und Sauberkeit zu achten. Schulräume, Einrichtungen und Anlagen sind sorgfältig zu benützen. Außerhalb der Unterrichtszeiten dürfen sich Lernende nicht in den Klassenräumen aufhalten. Es ist untersagt, in den Klassenräumen etwas an die Wände zu kleben oder zu schreiben und Schulmöbel in andere Räume zu bringen. Mitarbeitende und Lernende, die Schäden feststellen, melden diese dem Sekretariat.\nStörungen: Mitarbeitende und Lernende sorgen dafür, dass der Schulbetrieb nicht gestört wird.\nAlkohol- und Drogenkonsum: Der Konsum von Alkohol, illegalen Drogen sowie anderen psychoaktiven Substanzen ist auf dem gesamten Schulareal und während schulischer Veranstaltungen (einschließlich aller Pausen) verboten. In Ausnahmefällen kann die Schulleitung den Konsum von Alkohol erlauben.\nRauchen: Rauchen ist nur im Freien beziehungsweise in den dafür vorgesehenen Zonen gestattet. Wir bitten darum, die aufgestellten Aschenbecher zu benutzen.\nDiebstahl: Es empfiehlt sich, Wertsachen und Bargeld sorgfältig aufzubewahren. Die Schule stellt den Lernenden und Mitarbeitenden kostenlos Schließfächer zur Verfügung. Für verlorene Schlüssel wird eine Gebühr von Euro 50,– erhoben. Die Schule übernimmt für Diebstähle keine Haftung.\nFundgegenstände: Fundgegenstände bitte im Sekretariat abgeben.\nParkplätze: Auf dem Schulareal stehen keine Gratis-Autoparkplätze zur Verfügung. Fahrräder müssen in den dafür vorgesehenen Fahrradkeller gebracht und abgeschlossen werden. Mopeds und Motorräder sind auf dem Schulareal nicht erlaubt.",
        "questions": [
          {
            "q": "Schüler …",
            "a": [
              "müssen ihre Fahrräder in einen speziellen Raum stellen."
            ],
            "distractors": [
              "dürfen keine Fahrräder mit zur Schule bringen.",
              "dürfen ihre Fahrräder auf den Schulhof stellen."
            ]
          },
          {
            "q": "Um die verschließbaren Fächer benutzen zu können, muss man …",
            "a": [
              "Schüler sein oder im BZW arbeiten."
            ],
            "distractors": [
              "einen Schlüssel im Sekretariat verlangen.",
              "einmalig 50,– Euro zahlen."
            ]
          }
        ],
        "q": "ÖSD B1 · Lesen Teil 5（2 小题）",
        "a": [
          "[大组题，请展开作答]"
        ]
      },
      {
        "id": "zb1j_lesen_lesefieber",
        "type": "阅读长文",
        "level": "B1",
        "source": "ÖSD Zertifikat B1 Jugendliche / ZB1 J",
        "module": "Lesen",
        "passage": "«Lesefieber» – Eine spannende Leseaktion für die Schule\nRund vierzig Romane, Krimis, Sachbücher und Comics in unterschiedlichen Schwierigkeitsgraden sollen dazu dienen, in einem Projekt Kinder und Jugendliche zum Lesen zu bringen. Jedes Jahr werden ausgewählte, neu erschienene Bücher in zwei gleichen Rucksäcken auf die Reise zu zahlreichen Schulklassen geschickt. Die Bücher-Rucksäcke bleiben etwa fünf Wochen in jeder Klasse. Während der «Lesefieberwochen» dürfen die Schülerinnen und Schüler die Bücher frei benützen. Das heisst, sie sollen während des Unterrichts Zeit für die Lektüre erhalten und sie dürfen die Bücher auch nach Hause nehmen. Ziel ist es, den Schülerinnen und Schülern zu zeigen, wie viel Spass Lesen machen kann.\nUnd wie gehen die Rucksäcke auf die Reise? Das geht so: Jede Lehrperson wählt – nach Zufallsprinzip – zwei Bücher aus den Rucksäcken aus, ohne den Schülern den Titel zu verraten. Am Ende der Projektwochen wird den Schülern gesagt, um welche Bücher es sich handelt. Die zwei Kinder oder Jugendlichen, welche als Erste diese Bücher gelesen haben, sollen die Rucksäcke in die nächste Klasse bringen. Die Lehrperson sucht den Kontakt zu einer anderen Schulklasse und verabredet einen Termin für die Übergabe. Das Projekt, an dem Schulen kostenlos teilnehmen können, wird im ganzen Land mit zunehmendem Erfolg durchgeführt, seit es 2000 in der deutschsprachigen Schweiz von Lehrpersonen gestartet wurde.",
        "questions": [
          {
            "q": "In diesem Text geht es darum, dass Schüler …",
            "a": [
              "Freude am Lesen bekommen sollen."
            ],
            "distractors": [
              "in anderen Schulklassen Bücher vorstellen.",
              "neue Bücher geschenkt bekommen."
            ]
          },
          {
            "q": "Am Projekt nehmen …",
            "a": [
              "Schulen gratis teil."
            ],
            "distractors": [
              "Schulen aus deutschsprachigen Ländern teil.",
              "zweitausend Schulen teil."
            ]
          }
        ],
        "q": "ÖSD B1 · Lesen（2 小题）",
        "a": [
          "[大组题，请展开作答]"
        ]
      },
      {
        "id": "zb1j_lesen_sport",
        "type": "阅读长文",
        "level": "B1",
        "source": "ÖSD Zertifikat B1 Jugendliche / ZB1 J",
        "module": "Lesen",
        "passage": "Projekttag Behindertensport\nSportunterricht mal anders erlebten die Schüler der siebten Klasse der Ferdinand-Hüttner-Schule beim Projekttag „Neue Sporterfahrung“. Einen Vormittag lang lernten sie die Grundlagen von Rollstuhl-Basketball und Blinden-Fußball kennen.\nIm Basketball sind die Schüler eigentlich recht fit. Dribbeln, den Ball fangen und gezielt werfen – alles kein Problem. Doch heute trifft selten ein Schüler den Korb. Kein Wunder, denn im Rollstuhl übers Spielfeld zu fahren und dabei den Ball unter Kontrolle zu halten, ist mühevoll und anstrengend für die 18 Jugendlichen.\nBeim Projekttag der Schule steht genau diese Erfahrung im Mittelpunkt. Man möchte, dass die Jugendlichen ein Gefühl dafür bekommen, welche Leistungen behinderte Sportler erbringen.\nIn der größeren Turnhalle der Schule wird Fußball gespielt. Die meisten Schüsse der 14 Spieler laufen allerdings ins Leere. Den Ball zu treffen, ist schließlich ziemlich schwierig, wenn man nichts sieht. Für das Blindenfußballtraining hat der Lehrer große, mit dunkler Folie abgeklebte Skibrillen vorbereitet. Die ungewöhnliche Situation, plötzlich nichts mehr sehen zu können, ist für das Team völlig neu. „Ihr müsst genau hinhören. Sonst könnt ihr den Ball nicht hören“, erklärt der Trainer Tobias Heim. Er spielt als Blindenfußballer in der Nationalmannschaft.",
        "questions": [
          {
            "q": "In diesem Text geht es darum, dass Schüler ...",
            "a": [
              "Sportarten für Behinderte ausprobieren."
            ],
            "distractors": [
              "bei einem Projekt behinderte Sportler kennenlernen.",
              "zusammen mit Behinderten Sport machen."
            ]
          },
          {
            "q": "Beim Projekttag haben die Schüler ...",
            "a": [
              "erlebt, wie Basketball für Behinderte ist."
            ],
            "distractors": [
              "kein Problem gehabt, im Rollstuhl Basketball zu spielen.",
              "schlecht gespielt, weil sie selten Sport machen."
            ]
          }
        ],
        "q": "ÖSD B1 · Lesen（2 小题）",
        "a": [
          "[大组题，请展开作答]"
        ]
      },
      {
        "id": "zb1j_lesen_campordnung",
        "type": "阅读长文",
        "level": "B1",
        "source": "ÖSD Zertifikat B1 Jugendliche / ZB1 J",
        "module": "Lesen",
        "passage": "CAMPORDNUNG\nLieber Teilnehmer/Liebe Teilnehmerin!\nDu bekommst diese Campordnung zugeschickt, damit du dich schon jetzt über die Regeln unseres Zelt-Camps informieren kannst. Die Anweisungen der Campleitung sind unbedingt zu befolgen.\nAllgemeines\nInformiere die Campleitung immer, wenn du den Zeltplatz verlassen möchtest.\nHilf mit, die Gemeinschaftszelte, Duschen und WCs sowie das gesamte Campgelände sauber zu halten.\nSchalte dein Mobiltelefon bei gemeinsamen Aktivitäten unbedingt aus.\nVierbeinige Freunde müssen zu Hause bleiben.\nLeben und Verhalten im Camp\nNimm Rücksicht auf andere Campbewohner.\nBetritt ein fremdes Zelt nur, wenn du eingeladen bist.\nNachtruhe ist von 23.00 Uhr bis 7.00 Uhr. In dieser Zeit ist Spielen und Lärmen nicht erlaubt.\nStarke alkoholische Getränke sind im Camp generell verboten. Leichte alkoholische Getränke (wie Bier) dürfen nur über 16-Jährige konsumieren.\nAchte bei den Mahlzeiten auf gutes Benehmen.\nEntsorge biologischen Abfall nur in den dafür vorgesehenen Behältern.\nSpare Wasser und Energie und schalte beim Verlassen der Gemeinschaftszelte immer das Licht aus.\nBesondere Hinweise\nFür den Verlust von Gegenständen oder für Schäden an mitgebrachten elektronischen Geräten (Handys, CD-Player etc.) übernimmt die Campleitung keine Haftung.\nDas Rauchen ist auf dem gesamten Campgelände streng verboten.\nOffenes Feuer ist nur an dafür vorgesehenen und speziell gekennzeichneten Stellen erlaubt.\nBei groben Verletzungen der Campordnung kann dich die Campleitung nach Hause schicken.\nWenn sich alle an diese Regeln halten, werden wir im Zelt-Camp eine schöne Zeit verbringen.\nDie Campleitung",
        "questions": [
          {
            "q": "Die Campleitung weist darauf hin, dass die Jugendlichen ...",
            "a": [
              "nirgendwo auf dem Campgelände rauchen dürfen."
            ],
            "distractors": [
              "keine elektronischen Geräte ins Camp bringen dürfen.",
              "kein Feuer im Camp machen dürfen."
            ]
          }
        ],
        "q": "ÖSD B1 · Lesen（1 小题）",
        "a": [
          "[大组题，请展开作答]"
        ]
      },
      {
        "id": "zb1_hoeren_teil1",
        "type": "听力选择",
        "level": "B1",
        "source": "ÖSD Zertifikat B1 / ZB1",
        "module": "Hören Teil 1",
        "audioUrl": "data/audio/b1/ZB1%20MS%20HV%201-converted.mp3",
        "audioFile": "ZB1 MS HV 1-converted.mp3",
        "audioUrls": [
          "data/audio/b1/ZB1%20MS%20HV%201-converted.mp3",
          "data/audio/b1/ZB1%20MS%20HV%202-converted.mp3",
          "data/audio/b1/ZB1%20MS%20HV%203-converted.mp3",
          "data/audio/b1/ZB1%20MS%20HV%204-converted.mp3"
        ],
        "audioText": "",
        "audioTextNote": "源 PDF 为 Kandidatenblätter（考生卷），不含听力原文 Hörtexte；如需无障碍文本/提示，须另行获取 Prüferblätter 或人工转写。",
        "audioNote": "HV 编号按卷内 Teil 1–4 顺序对应；本组含 Text 1–5（含页上示例题）。",
        "questions": [
          {
            "q": "Frank schlägt Jan vor, nach Sizilien zu fliegen.",
            "a": [
              "richtig"
            ],
            "distractors": [
              "falsch"
            ]
          },
          {
            "q": "Frau Stein soll …",
            "a": [
              "zurückrufen."
            ],
            "distractors": [
              "die Chipkarte mitbringen.",
              "zehn Euro bezahlen."
            ]
          },
          {
            "q": "Auf der Autobahn gibt es Stau wegen ...",
            "a": [
              "eines Unfalls."
            ],
            "distractors": [
              "einer Baustelle.",
              "des Berufsverkehrs."
            ]
          },
          {
            "q": "Welcher Zug fällt aus? Der Zug nach ...",
            "a": [
              "Genf."
            ],
            "distractors": [
              "Bern.",
              "Lausanne."
            ]
          },
          {
            "q": "Vorausgesagt werden ...",
            "a": [
              "Gewitter an der Elbe."
            ],
            "distractors": [
              "Temperaturen unter 10 Grad.",
              "starke Regenfälle im Westen."
            ]
          }
        ],
        "q": "ÖSD B1 · Hören Teil 1（5 小题）",
        "a": [
          "[大组题，请展开作答]"
        ]
      },
      {
        "id": "zb1_hoeren_teil2",
        "type": "听力选择",
        "level": "B1",
        "source": "ÖSD Zertifikat B1 / ZB1",
        "module": "Hören Teil 2",
        "audioUrl": "data/audio/b1/ZB1%20MS%20HV%202-converted.mp3",
        "audioFile": "ZB1 MS HV 2-converted.mp3",
        "audioUrls": [
          "data/audio/b1/ZB1%20MS%20HV%201-converted.mp3",
          "data/audio/b1/ZB1%20MS%20HV%202-converted.mp3",
          "data/audio/b1/ZB1%20MS%20HV%203-converted.mp3",
          "data/audio/b1/ZB1%20MS%20HV%204-converted.mp3"
        ],
        "audioText": "",
        "audioTextNote": "源 PDF 为 Kandidatenblätter（考生卷），不含听力原文 Hörtexte；如需无障碍文本/提示，须另行获取 Prüferblätter 或人工转写。",
        "audioNote": "对应 PDF Page 13 的 Stadtmuseum-Führung（题 15）。",
        "questions": [
          {
            "q": "Der Museumsführer empfiehlt den Teilnehmern einen ...",
            "a": [
              "Biergartenbesuch."
            ],
            "distractors": [
              "Restaurantbesuch.",
              "Cafébesuch."
            ]
          }
        ],
        "q": "ÖSD B1 · Hören Teil 2（1 小题）",
        "a": [
          "[大组题，请展开作答]"
        ]
      },
      {
        "id": "zb1j_hoeren",
        "type": "听力选择",
        "level": "B1",
        "source": "ÖSD Zertifikat B1 Jugendliche / ZB1 J",
        "module": "Hören Teil 1–2",
        "audioUrl": "data/audio/b1/M8_H10_110124-komprimiert.mp3",
        "audioFile": "M8_H10_110124-komprimiert.mp3",
        "audioUrls": [
          "data/audio/b1/M8_H10_110124-komprimiert.mp3"
        ],
        "audioText": "",
        "audioTextNote": "源 PDF 为 Kandidatenblätter（考生卷），不含听力原文 Hörtexte；如需无障碍文本/提示，须另行获取 Prüferblätter 或人工转写。",
        "audioNote": "该卷 zip 只提供 1 个合并听力音频，覆盖整卷 Teil 1–4；本组题目跨 Teil 1 与 Teil 2，共用此音频。",
        "questions": [
          {
            "q": "Im Lehrerzimmer ...",
            "a": [
              "bekommen die Gewinner einen Preis."
            ],
            "distractors": [
              "kann man sich für das Sportfest anmelden.",
              "gibt es Informationen zum Sportfest."
            ]
          },
          {
            "q": "Jasmin wird ...",
            "a": [
              "später kommen."
            ],
            "distractors": [
              "einen Kuchen backen.",
              "jemanden mitbringen."
            ]
          },
          {
            "q": "Thomas muss Geld mitbringen für ...",
            "a": [
              "Zugticket und Verpflegung."
            ],
            "distractors": [
              "den Eintritt zum Olympiapark.",
              "eine Stadtrundfahrt."
            ]
          },
          {
            "q": "Die Badegäste sollen ...",
            "a": [
              "sich umziehen gehen."
            ],
            "distractors": [
              "das Restaurant verlassen.",
              "vergessene Gegenstände abholen."
            ]
          },
          {
            "q": "Wenn man den „Gong“ hört, ...",
            "a": [
              "bekommt man eine Aufgabe."
            ],
            "distractors": [
              "darf man sich ein Lied wünschen.",
              "soll man im Studio anrufen."
            ]
          },
          {
            "q": "Auf den Wanderungen sollen die Jugendlichen ...",
            "a": [
              "ihren Abfall mitnehmen."
            ],
            "distractors": [
              "Tiere und Pflanzen beobachten.",
              "ihr Handy ausschalten."
            ]
          }
        ],
        "q": "ÖSD B1 · Hören Teil 1–2（6 小题）",
        "a": [
          "[大组题，请展开作答]"
        ]
      }
    ],
    4: [
      { type: '语法填空', q: 'Haette ich mehr Zeit, ___ ich mehr lesen.（werden 虚拟式II）', a: ['wuerde'] },
      { type: '语法填空', q: 'Wenn ich reich ___, wuerde ich um die Welt reisen.（sein 虚拟式II）', a: ['waere'] },
      { type: '语法填空', q: 'Ich ___ das anders gemacht.（haben 虚拟式II）', a: ['haette'] },
      { type: '语法填空', q: 'Wir ___ diesen Fehler vermeiden koennen.（haben 虚拟式II）', a: ['haetten'] },
      { type: '语法填空', q: 'Der Mann, ___ Auto gestohlen wurde, erstattete Anzeige.（属格关系代词）', a: ['dessen'] },
      { type: '语法填空', q: 'Die Firma, ___ Mitarbeiter streiken, ist gross.（属格关系代词复数）', a: ['deren'] },
      { type: '语法填空', q: 'Das ist das Thema, ___ wir diskutiert haben.（关系代词 + 介词）', a: ['ueber das'] },
      { type: '语法填空', q: 'Das Konzept, ___ man sich einigen konnte, war neu.（关系代词 + 介词）', a: ['auf das'] },
      { type: '语法填空', q: 'Die ___ Kosten bereiten Sorgen.（steigen，第一分词作定语）', a: ['steigenden'] },
      { type: '语法填空', q: 'Das ___ Auto steht vor der Tuer.（reparieren，第二分词作定语）', a: ['reparierte'] },
      { type: '语法填空', q: 'So schwierig es auch ___, gab er nicht auf.（sein 过去时）', a: ['war'] },
      { type: '语法填空', q: 'Angesichts ___ Lage muessen wir handeln.（属格定冠词）', a: ['der'] },
      { type: '语法填空', q: '___ der hohen Kosten wurde das Projekt gestoppt.（原因介词）', a: ['wegen'] },
      { type: '语法填空', q: 'Er wurde ___ Diebstahls verurteilt.（属格介词）', a: ['wegen'] },
      { type: '语法填空', q: 'Die ___ Massnahme wurde kritisiert.（treffen，第二分词作定语）', a: ['getroffene'] },
      { type: '语法填空', q: 'Es handelt sich ___ ein Missverstaendnis.（固定搭配）', a: ['um'] },
      { type: '语法填空', q: 'Kaum ___ er angekommen, begann die Sitzung.（时间从句倒装）', a: ['war'] },
      { type: '语法填空', q: 'Nicht nur er, ___ auch seine Kollegen waren anwesend.（并列连词）', a: ['sondern'] },
      { type: '语法填空', q: 'Er ist ___ guter Lehrer bekannt.（介词）', a: ['als'] },
      { type: '语法填空', q: 'Das Problem laesst sich ___ loesen.（副词：这样）', a: ['so'] },
      { type: '语法填空', q: 'Die Zahl der Betroffenen ___ auf eine Million geschaetzt.（被动现在时）', a: ['wird'] },
      { type: '语法填空', q: 'Im Vergleich ___ Vorjahr stiegen die Preise.（介词）', a: ['zum'] },
      { type: '词汇', q: '“可持续性”用德语怎么说？', a: ['nachhaltigkeit'] },
      { type: '词汇', q: '“考虑到”用德语怎么说？（介词）', a: ['angesichts'] },
      { type: '词汇', q: '“责任”用德语怎么说？', a: ['verantwortung'] },
      { type: '词汇', q: '“效率”用德语怎么说？', a: ['effizienz'] },
      { type: '词汇', q: '“竞争”用德语怎么说？', a: ['wettbewerb', 'konkurrenz'] },
      { type: '词汇', q: '“证据”用德语怎么说？', a: ['beweis'] },
      { type: '词汇', q: '“前提”用德语怎么说？', a: ['voraussetzung'] },
      { type: '词汇', q: '“后果”用德语怎么说？', a: ['konsequenz', 'folge'] },
      { type: '词汇', q: '“措施”用德语怎么说？', a: ['massnahme'] },
      { type: '词汇', q: '“趋势”用德语怎么说？', a: ['tendenz', 'trend'] },
      { type: '词汇', q: '“涉及”用德语怎么说？（动词）', a: ['betreffen'] },
      { type: '词汇', q: '“强调”用德语怎么说？（动词）', a: ['betonen', 'unterstreichen'] },
      { type: '词汇', q: '“评估”用德语怎么说？（动词）', a: ['einschaetzen', 'bewerten'] },
      { type: '词汇', q: '“实现”用德语怎么说？（动词）', a: ['verwirklichen', 'erreichen', 'umsetzen'] },
      { type: '词汇', q: '“尽管”用德语怎么说？（介词）', a: ['trotz'] },
      { type: '词汇', q: '“而不是”用德语怎么说？', a: ['statt', 'anstatt'] },
      { type: '词汇', q: '“在一定程度上”用德语怎么说？', a: ['gewissermassen', 'bis zu einem gewissen grad'] },
      { type: '词汇', q: '“值得”用德语怎么说？（形容词）', a: ['wert', 'lohnenswert'] },
      { type: '翻译', q: '这个问题亟待解决。', a: ['dieses problem muss dringend geloest werden'] },
      { type: '翻译', q: '据说他搬家了。', a: ['er soll umgezogen sein', 'man sagt, dass er umgezogen ist'] },
      { type: '翻译', q: '考虑到当前形势，我们必须谨慎。', a: ['angesichts der lage muessen wir vorsichtig sein'] },
      { type: '翻译', q: '尽管有困难，项目还是按时完成了。', a: ['trotz der schwierigkeiten wurde das projekt rechtzeitig abgeschlossen'] },
      { type: '翻译', q: '我们本可以避免这个错误。', a: ['wir haetten diesen fehler vermeiden koennen'] },
      { type: '翻译', q: '他装作什么都没发生。', a: ['er tat so, als ob nichts passiert waere'] },
      { type: '翻译', q: '这项措施被认为很有效。', a: ['diese massnahme gilt als sehr wirksam'] },
      { type: '翻译', q: '不仅成本高，而且耗时长。', a: ['es ist nicht nur teuer, sondern auch zeitaufwendig', 'es ist nicht nur teuer, sondern auch zeitaufwaendig'] },
      { type: '翻译', q: '越来越多的人意识到环保的重要性。', a: ['immer mehr menschen erkennen, wie wichtig umweltschutz ist'] },
      { type: '翻译', q: '他因盗窃被判刑。', a: ['er wurde wegen diebstahls verurteilt'] },
      { type: '翻译', q: '这取决于你如何定义成功。', a: ['das haengt davon ab, wie man erfolg definiert'] },
      { type: '翻译', q: '值得强调的是，这只是一个假设。', a: ['es ist hervorzuheben, dass dies nur eine annahme ist'] },
      { type: '翻译', q: '如果没有他的帮助，我不可能成功。', a: ['ohne seine hilfe haette ich keinen erfolg gehabt'] },
      { type: '翻译', q: '该方案在实施过程中遇到了阻力。', a: ['das konzept stiess bei der umsetzung auf widerstand'] },
      { type: '翻译', q: '应当把长期影响也考虑在内。', a: ['die langfristigen auswirkungen sollten ebenfalls beruecksichtigt werden'] },
      { type: '选择', q: '填入正确形式：Es handelt sich ___ ein Problem.', a: ['um'] },
      { type: '选择', q: '填入正确形式：Das gilt ___ sicher.', a: ['als'] },
      { type: '选择', q: '填入正确介词：___ hoher Kosten wurde es gestoppt.', a: ['trotz'] },
      { type: '选择', q: '填入正确形式：Die ___ Kosten steigen.（steigen 第一分词作定语）', a: ['steigenden'] },
      { type: '选择', q: '填入正确关系代词：Der Autor, ___ Werke bekannt sind, lebt hier.', a: ['dessen'] },
      { type: '选择', q: '填入正确连词：___ ich Zeit gehabt haette, waere ich gekommen.', a: ['wenn'] },
      { type: '选择', q: '填入正确形式：Es ist wichtig, dass alle ___ teilnehmen.', a: ['daran'] },
      { type: '选择', q: '填入正确形式：Nicht nur er, ___ auch sie kam.', a: ['sondern'] },
      { type: '改错', q: '改错：Trotz es regnete, gingen wir spazieren.', a: ['trotz des regens gingen wir spazieren'] },
      { type: '改错', q: '改错：Der Mann, dessen Auto gestohlen wurde, er erstattete Anzeige.', a: ['der mann, dessen auto gestohlen wurde, erstattete anzeige'] },
      { type: '改错', q: '改错：Wenn ich reich waere, ich wuerde um die Welt reisen.', a: ['wenn ich reich waere, wuerde ich um die welt reisen'] },
      { type: '改错', q: '改错：Das ist nicht nur teuer, aber auch langsam.', a: ['das ist nicht nur teuer, sondern auch langsam'] },
      { type: '改错', q: '改错：Wegen dem Regen blieben wir zu Hause.', a: ['wegen des regens blieben wir zu hause'] },
      { type: '改错', q: '改错：Er wurde fuer Diebstahl verurteilt.', a: ['er wurde wegen diebstahls verurteilt'] },
      { type: '改错', q: '改错：Kaum er war angekommen, begann die Sitzung.', a: ['kaum war er angekommen, begann die sitzung'] }
    ],
    5: [
      { type: '语法填空', q: 'Er tat so, ___ er nichts wuesste.（als ob 省略形式）', a: ['als'] },
      { type: '语法填空', q: 'Dem Bericht ___ sei die Lage entspannt.（介词：按照）', a: ['zufolge', 'nach'] },
      { type: '语法填空', q: 'Kaum ___ die Rede begonnen, wurde er unterbrochen.（时间从句倒装）', a: ['hatte'] },
      { type: '语法填空', q: 'Es sei denn, dass er ___.（kommen 虚拟式I）', a: ['komme', 'kommt'] },
      { type: '语法填空', q: 'Er ___ die Absicht, das Projekt zu beenden.（功能动词）', a: ['hat', 'hegt'] },
      { type: '语法填空', q: 'Die Kritik ___ sich gegen die Regierung.（richten sich gegen）', a: ['richtet'] },
      { type: '语法填空', q: 'Das Ergebnis laesst ___ wuenschen.（固定搭配）', a: ['zu'] },
      { type: '语法填空', q: 'Die Massnahme stiess ___ Widerstand.（介词）', a: ['auf'] },
      { type: '语法填空', q: 'Er gilt ___ einer der besten Fachleute.（介词）', a: ['als'] },
      { type: '语法填空', q: '___ allem Bemuehen blieb der Erfolg aus.（让步介词）', a: ['trotz'] },
      { type: '语法填空', q: 'Die These laesst sich ___ belegen.（副词：几乎不）', a: ['kaum'] },
      { type: '语法填空', q: 'Es liegt ___ der Hand, dass er zustimmt.（固定搭配）', a: ['auf'] },
      { type: '语法填空', q: 'Nicht zuletzt ___ dieses Argument ueberzeugt.（haben 现在时）', a: ['hat'] },
      { type: '语法填空', q: 'Die Diskussion ___ hitzig gefuehrt.（werden 过去时 + 被动）', a: ['wurde'] },
      { type: '语法填空', q: 'Im ___ auf das Vorjahr stiegen die Zahlen.（名词：比较）', a: ['vergleich'] },
      { type: '语法填空', q: 'Die Frage, ___ es sich handelt, ist komplex.（关系代词 + 介词）', a: ['um die'] },
      { type: '语法填空', q: 'Man ___ davon ausgehen, dass die Lage stabil bleibt.（情态动词）', a: ['kann', 'darf'] },
      { type: '语法填空', q: 'Die Zahl der Betroffenen ___ auf eine Million geschaetzt.（被动现在时）', a: ['wird'] },
      { type: '语法填空', q: 'Das Phaenomen laesst sich ___ mehrere Faktoren zurueckfuehren.（介词）', a: ['auf'] },
      { type: '语法填空', q: 'Er stimmte oberflaechlich ___, hatte aber Vorbehalte.（可分前缀）', a: ['zu'] },
      { type: '语法填空', q: 'Diese Daten spiegeln die Wirklichkeit nur bedingt ___.（可分前缀）', a: ['wider'] },
      { type: '语法填空', q: 'Der Bericht weist darauf ___, dass sich die Lage verbessert.（可分前缀）', a: ['hin'] },
      { type: '词汇', q: '“无可替代”用德语怎么说？', a: ['unersetzlich'] },
      { type: '词汇', q: '“权衡”用德语怎么说？', a: ['abwaegung'] },
      { type: '词汇', q: '“共识”用德语怎么说？', a: ['konsens'] },
      { type: '词汇', q: '“争议”用德语怎么说？', a: ['kontroverse', 'streit'] },
      { type: '词汇', q: '“潜在”用德语怎么说？（形容词）', a: ['potenziell'] },
      { type: '词汇', q: '“显著”用德语怎么说？（形容词）', a: ['erheblich', 'deutlich'] },
      { type: '词汇', q: '“逐渐”用德语怎么说？', a: ['allmaehlich', 'nach und nach'] },
      { type: '词汇', q: '“与此同时”用德语怎么说？', a: ['gleichzeitig', 'zugleich'] },
      { type: '词汇', q: '“归根结底”用德语怎么说？', a: ['letztlich', 'im grunde genommen'] },
      { type: '词汇', q: '“不容忽视”用德语怎么说？', a: ['nicht zu uebersehen'] },
      { type: '词汇', q: '“阐明”用德语怎么说？（动词）', a: ['erlaeutern', 'darlegen'] },
      { type: '词汇', q: '“归结为”用德语怎么说？', a: ['zurueckfuehren auf', 'zurueckgehen auf'] },
      { type: '词汇', q: '“前提是”用德语怎么说？（连词）', a: ['sofern', 'vorausgesetzt'] },
      { type: '词汇', q: '“就……而言”用德语怎么说？', a: ['hinsichtlich', 'was betrifft'] },
      { type: '词汇', q: '“由此可见”用德语怎么说？', a: ['somit', 'daraus folgt'] },
      { type: '词汇', q: '“缺口 / 漏洞”用德语怎么说？', a: ['luecke'] },
      { type: '词汇', q: '“可行性”用德语怎么说？', a: ['machbarkeit', 'durchfuehrbarkeit'] },
      { type: '词汇', q: '“保留意见”用德语怎么说？', a: ['vorbehalt', 'vorbehalte'] },
      { type: '翻译', q: '这一决定引发了广泛争议。', a: ['diese entscheidung hat breite kontroversen ausgeloest'] },
      { type: '翻译', q: '我们本可以避免这个错误。', a: ['wir haetten diesen fehler vermeiden koennen'] },
      { type: '翻译', q: '就目前掌握的信息而言，还无法定论。', a: ['was die derzeitigen informationen betrifft, ist kein endgueltiges urteil moeglich'] },
      { type: '翻译', q: '该数据只能在一定程度上反映真实情况。', a: ['diese daten spiegeln die wirklichkeit nur bedingt wider'] },
      { type: '翻译', q: '归根结底，这是一个价值判断问题。', a: ['letztlich handelt es sich um eine frage der werturteile'] },
      { type: '翻译', q: '不容忽视的是，成本正在上升。', a: ['nicht zu uebersehen ist, dass die kosten steigen'] },
      { type: '翻译', q: '这一现象可归结为多种因素。', a: ['dieses phaenomen laesst sich auf mehrere faktoren zurueckfuehren'] },
      { type: '翻译', q: '前提是所有人都同意。', a: ['vorausgesetzt, dass alle zustimmen'] },
      { type: '翻译', q: '由此可见，该方案并不可行。', a: ['daraus folgt, dass das konzept nicht durchfuehrbar ist'] },
      { type: '翻译', q: '与其说这是错误，不如说是误解。', a: ['das ist weniger ein fehler als vielmehr ein missverstaendnis'] },
      { type: '翻译', q: '该报告指出，情况正在好转。', a: ['der bericht weist darauf hin, dass sich die lage verbessert', 'der bericht zeigt, dass sich die lage verbessert'] },
      { type: '翻译', q: '尽管做了很多努力，成效仍然有限。', a: ['trotz grosser bemuehungen blieben die ergebnisse begrenzt'] },
      { type: '翻译', q: '应当把长期后果纳入考量。', a: ['die langfristigen konsequenzen sollten beruecksichtigt werden'] },
      { type: '翻译', q: '他表面上同意，实际上持保留态度。', a: ['er stimmte oberflaechlich zu, hatte aber tatsaechlich vorbehalte'] },
      { type: '翻译', q: '这一点值得进一步讨论。', a: ['dieser punkt verdient eine weitere diskussion'] },
      { type: '选择', q: '填入正确形式：Es handelt sich ___ eine Ausnahme.', a: ['um'] },
      { type: '选择', q: '填入正确介词：___ des Regens blieb der Erfolg aus.', a: ['trotz'] },
      { type: '选择', q: '填入正确形式：Dem Bericht ___ ist die Lage stabil.', a: ['zufolge'] },
      { type: '选择', q: '填入正确介词：Die Kritik richtet sich ___ die Regierung.', a: ['gegen'] },
      { type: '选择', q: '填入正确形式：Das Ergebnis laesst ___ wuenschen uebrig.', a: ['zu'] },
      { type: '选择', q: '填入正确介词：Er gilt ___ Experte.', a: ['als'] },
      { type: '选择', q: '填入正确介词：___ allem Bemuehen blieb er erfolglos.', a: ['trotz'] },
      { type: '选择', q: '填入正确副词：Diese Annahme laesst sich ___ belegen.', a: ['kaum'] },
      { type: '改错', q: '改错：Es handelt sich um ein Problem, dass geloest werden muss.', a: ['es handelt sich um ein problem, das geloest werden muss'] },
      { type: '改错', q: '改错：Trotz allem Bemuehungen blieb der Erfolg aus.', a: ['trotz aller bemuehungen blieb der erfolg aus'] },
      { type: '改错', q: '改错：Dem Bericht zufolge die Lage ist stabil.', a: ['dem bericht zufolge ist die lage stabil'] },
      { type: '改错', q: '改错：Das Phaenomen laesst sich auf mehrere Faktoren zurueckfuehren werden.', a: ['das phaenomen laesst sich auf mehrere faktoren zurueckfuehren'] },
      { type: '改错', q: '改错：Er stimmte zu oberflaechlich, hatte aber Vorbehalte.', a: ['er stimmte oberflaechlich zu, hatte aber vorbehalte'] },
      { type: '改错', q: '改错：Nicht zu uebersehen ist, das die Kosten steigen.', a: ['nicht zu uebersehen ist, dass die kosten steigen'] },
      { type: '改错', q: '改错：Diese Daten spiegeln die Wirklichkeit nur bedingt wieder.', a: ['diese daten spiegeln die wirklichkeit nur bedingt wider'] }
    ]
  };
