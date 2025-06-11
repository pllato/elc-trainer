addLesson({
  level: "beginner2",
  lesson: "lesson27",
  name: "Урок 27: I/You/He/She/It/We/They would like ________.",
  structures: [
    {
      structure: "I/You/He/She/It/We/They would like ________.",
      pattern: ["would", "like"],
      translations: ["Я/Ты/Он/Она/Оно/Мы/Вы хотел(и) бы ________."],
      examples: [
        "I would like to go. (Я хотел бы пойти.)",
        "I would like to do something. (Я хотел бы сделать что-нибудь.)",
        "I would like to dance. (Я хотел бы танцевать.)",
        "She would like it. (Она хотела бы это.)",
        "He would like a coffee. (Он хотел бы кофе.)",
        "They would like to play football. (Они хотели бы играть в футбол.)",
        "It would like dancing. (Оно хотело бы танцевать.)"
      ],
      id: "pronoun-would-like-object",
      hasVerb: true,
      hasName: false
    }
  ],
  requiredCorrect: 10,
  irregularVerbs: {
    "arise": "arose",
    "awake": "awoke",
    "be": "was",
    "bear": "bore",
    "beat": "beat",
    "become": "became",
    "begin": "began",
    "bend": "bent",
    "bet": "bet",
    "bind": "bound",
    "bite": "bit",
    "bleed": "bled",
    "blow": "blew",
    "break": "broke",
    "bring": "brought",
    "build": "built",
    "burn": "burnt",
    "burst": "burst",
    "buy": "bought",
    "catch": "caught",
    "choose": "chose",
    "cling": "clung",
    "come": "came",
    "cost": "cost",
    "creep": "crept",
    "cut": "cut",
    "deal": "dealt",
    "dig": "dug",
    "dive": "dove",
    "do": "did",
    "draw": "drew",
    "dream": "dreamt",
    "drink": "drank",
    "drive": "drove",
    "eat": "ate",
    "fall": "fell",
    "feed": "fed",
    "feel": "felt",
    "fight": "fought",
    "find": "found",
    "flee": "fled",
    "fly": "flew",
    "forbid": "forbade",
    "forget": "forgot",
    "forgive": "forgave",
    "freeze": "froze",
    "get": "got",
    "give": "gave",
    "go": "went",
    "grind": "ground",
    "grow": "grew",
    "hang": "hung",
    "have": "had",
    "hear": "heard",
    "hide": "hid",
    "hit": "hit",
    "hold": "held",
    "hurt": "hurt",
    "keep": "kept",
    "kneel": "knelt",
    "know": "knew",
    "lay": "laid",
    "lead": "led",
    "lean": "leant",
    "leap": "leapt",
    "learn": "learnt",
    "leave": "left",
    "lend": "lent",
    "let": "let",
    "lie": "lay",
    "light": "lit",
    "lose": "lost",
    "make": "made",
    "mean": "meant",
    "meet": "met",
    "mow": "mowed",
    "pay": "paid",
    "put": "put",
    "quit": "quit",
    "read": "read",
    "ride": "rode",
    "ring": "rang",
    "rise": "rose",
    "run": "ran",
    "say": "said",
    "see": "saw",
    "seek": "sought",
    "sell": "sold",
    "send": "sent",
    "set": "set",
    "shake": "shook",
    "shine": "shone",
    "shoot": "shot",
    "show": "showed",
    "shrink": "shrank",
    "shut": "shut",
    "sing": "sang",
    "sink": "sank",
    "sit": "sat",
    "sleep": "slept",
    "slide": "slid",
    "smell": "smelt",
    "speak": "spoke",
    "speed": "sped",
    "spell": "spelt",
    "spend": "spent",
    "spill": "spilt",
    "spin": "spun",
    "spit": "spat",
    "split": "split",
    "spoil": "spoilt",
    "spread": "spread",
    "spring": "sprang",
    "stand": "stood",
    "steal": "stole",
    "stick": "stuck",
    "sting": "stung",
    "stink": "stank",
    "strike": "struck",
    "strive": "strove",
    "swear": "swore",
    "sweep": "swept",
    "swim": "swam",
    "swing": "swung",
    "take": "took",
    "teach": "taught",
    "tear": "tore",
    "tell": "told",
    "think": "thought",
    "throw": "threw",
    "tread": "trod",
    "understand": "understood",
    "undo": "undid",
    "upset": "upset",
    "wake": "woke",
    "wear": "wore",
    "weave": "wove",
    "weep": "wept",
    "win": "won",
    "wind": "wound",
    "withdraw": "withdrew",
    "write": "wrote"
  },
  validateStructure: function(text, structure) {
    console.log('Raw input:', text);
    // Удаляем пунктуацию и приводим к нижнему регистру
    const cleanedText = text.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase().trim();
    console.log('Cleaned text:', cleanedText);

    const words = cleanedText.split(/\s+/).filter(word => word.length > 0);
    console.log('Split words:', words);

    if (words.length === 0) {
      console.log('Пустая строка');
      return false;
    }

    let wordIndex = 0;

    // Список исключённых глаголов и модальных глаголов
    const excludedWords = [
      'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought',
      'am', 'is', 'are', 'was', 'were', 'been', 'being', 'has', 'have', 'had', 'does', 'did',
      'going', 'doing', 'saying', 'running', 'swimming', 'singing', // Примеры с -ing
      'likes', 'runs', 'swims', 'works', 'calls', 'plays', 'watches', 'studies' // Примеры с -s или -es
    ];

    // Список всех местоимений
    const validPronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they'];

    if (structure.id === "pronoun-would-like-object") {
      // Проверяем местоимение
      if (!words[wordIndex] || !validPronouns.includes(words[wordIndex])) {
        console.log('Ожидалось местоимение на позиции', wordIndex, ', получено', words[wordIndex]);
        return false;
      }
      wordIndex++;

      // Проверяем "would"
      if (!words[wordIndex] || words[wordIndex] !== 'would') {
        console.log('Ожидалось "would" на позиции', wordIndex, ', получено', words[wordIndex]);
        return false;
      }
      wordIndex++;

      // Проверяем "like"
      if (!words[wordIndex] || words[wordIndex] !== 'like') {
        console.log('Ожидалось "like" на позиции', wordIndex, ', получено', words[wordIndex]);
        return false;
      }
      wordIndex++;

      // Проверяем наличие объекта
      if (!words[wordIndex]) {
        console.log('Нет объекта после "would like"');
        return false;
      }

      // Вариант 1: Глагольная фраза с "to"
      if (words[wordIndex] === 'to') {
        wordIndex++;
        if (!words[wordIndex]) {
          console.log('Нет глагола после "to"');
          return false;
        }
        const verb = words[wordIndex];
        // Проверяем, что глагол в базовой форме
        if (verb.endsWith('ing') || verb.endsWith('s') || verb.endsWith('es') || verb.endsWith('ed')) {
          console.log('Недопустимая форма глагола (должна быть базовая):', verb);
          return false;
        }
        // Проверяем, что глагол не является исключённым словом (кроме "do")
        if (excludedWords.includes(verb) && verb !== 'do') {
          console.log('Запрещённый глагол:', verb);
          return false;
        }
        wordIndex++;
        // Разрешаем дополнительные слова (например, "something", "football")
        while (wordIndex < words.length) {
          const extraWord = words[wordIndex];
          if (excludedWords.includes(extraWord)) {
            console.log('Недопустимое дополнительное слово:', extraWord);
            return false;
          }
          wordIndex++;
        }
      } else {
        // Вариант 2: Существительное, местоимение или герундий
        const objectWord = words[wordIndex];
        // Разрешаем местоимения (например, "it"), герундии (например, "dancing") или другие слова
        // Запрещаем только исключённые слова и глаголы в Past Simple
        if (excludedWords.includes(objectWord) || Object.values(this.irregularVerbs).includes(objectWord)) {
          console.log('Недопустимое слово в объекте:', objectWord);
          return false;
        }
        wordIndex++;
        // Разрешаем дополнительные слова (например, "a new car")
        while (wordIndex < words.length) {
          const extraWord = words[wordIndex];
          if (excludedWords.includes(extraWord) || Object.values(this.irregularVerbs).includes(extraWord)) {
            console.log('Недопустимое дополнительное слово:', extraWord);
            return false;
          }
          wordIndex++;
        }
      }
    }

    console.log('Валидация пройдена для:', text);
    return true;
  }
});