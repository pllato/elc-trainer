addLesson({
  level: "beginner2",
  lesson: "lesson32",
  name: "Урок 32: Would you like some ______? / Yes, I would like some _______ / No, I would not like any ________.",
  structures: [
    {
      structure: "Would you like some ______?",
      pattern: ["would", "like"],
      translations: ["Хотел бы ты немного ______?"],
      examples: [
        "Would you like some books? (Хотел бы ты книги?)",
        "Would you like some water? (Хотел бы ты воды?)",
        "Would you like some pencils? (Хотел бы ты карандаши?)",
        "Would you like some food? (Хотел бы ты еды?)"
      ],
      id: "would-you-like-some-noun",
      hasVerb: true,
      hasName: false
    },
    {
      structure: "Yes, I would like some ______.",
      pattern: ["yes", "would", "like"],
      translations: ["Да, я хотел бы немного ______."],
      examples: [
        "Yes, I would like some books. (Да, я хотел бы книги.)",
        "Yes, I would like some water. (Да, я хотел бы воды.)",
        "Yes, I would like some pencils. (Да, я хотел бы карандаши.)",
        "Yes, I would like some food. (Да, я хотел бы еды.)"
      ],
      id: "yes-i-would-like-some-noun",
      hasVerb: true,
      hasName: false
    },
    {
      structure: "No, I would not like any ______.",
      pattern: ["no", "would", "not", "like"],
      translations: ["Нет, я не хотел бы никаких ______."],
      examples: [
        "No, I would not like any books. (Нет, я не хотел бы книг.)",
        "No, I wouldn't like any water. (Нет, я не хотел бы воды.)",
        "No, I would not like any pencils. (Нет, я не хотел бы карандашей.)",
        "No, I wouldn't like any food. (Нет, я не хотел бы еды.)"
      ],
      id: "no-i-would-not-like-any-noun",
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
    // Заменяем сокращение "wouldn't" на "would not"
    let processedText = text.replace(/wouldn't/gi, 'would not');
    if (processedText !== text) {
      console.log('Expanded contractions:', processedText);
    }
    // Удаляем пунктуацию и приводим к нижнему регистру
    const cleanedText = processedText.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase().trim();
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
      'am', 'is', 'are', 'was', 'were', 'been', 'being', 'has', 'have', 'had', 'does', 'do', 'did',
      'going', 'doing', 'saying', 'running', 'swimming', 'singing',
      'likes', 'runs', 'swims', 'works', 'calls', 'plays', 'watches', 'studies'
    ];

    // Список всех местоимений
    const validPronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they'];

    // Проверяем существительное (может быть с артиклем или количественным словом)
    const validateNoun = () => {
      console.log('Validating noun at index', wordIndex);
      if (!words[wordIndex]) {
        console.log('Нет существительного');
        return false;
      }

      const nounWord = words[wordIndex];
      // Запрещаем исключённые слова и глаголы в Past Simple
      if (excludedWords.includes(nounWord) || Object.values(this.irregularVerbs).includes(nounWord)) {
        console.log('Недопустимое существительное:', nounWord);
        return false;
      }
      wordIndex++;

      // Разрешаем дополнительные слова для существительного (например, "some new books")
      while (wordIndex < words.length) {
        const extraNounWord = words[wordIndex];
        if (excludedWords.includes(extraNounWord) || Object.values(this.irregularVerbs).includes(extraNounWord)) {
          console.log('Недопустимое дополнительное слово в существительном:', extraNounWord);
          return false;
        }
        wordIndex++;
      }

      return true;
    };

    if (structure.id === "would-you-like-some-noun") {
      // Проверяем "would"
      if (!words[wordIndex] || words[wordIndex] !== 'would') {
        console.log('Ожидалось "would" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
        return false;
      }
      wordIndex++;

      // Проверяем "you"
      if (!words[wordIndex] || words[wordIndex] !== 'you') {
        console.log('Ожидалось "you" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
        return false;
      }
      wordIndex++;

      // Проверяем "like"
      if (!words[wordIndex] || words[wordIndex] !== 'like') {
        console.log('Ожидалось "like" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
        return false;
      }
      wordIndex++;

      // Проверяем "some"
      if (!words[wordIndex] || words[wordIndex] !== 'some') {
        console.log('Ожидалось "some" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
        return false;
      }
      wordIndex++;

      // Проверяем существительное
      return validateNoun();
    } else if (structure.id === "yes-i-would-like-some-noun") {
      // Проверяем "yes"
      if (!words[wordIndex] || words[wordIndex] !== 'yes') {
        console.log('Ожидалось "yes" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
        return false;
      }
      wordIndex++;

      // Проверяем "i"
      if (!words[wordIndex] || words[wordIndex] !== 'i') {
        console.log('Ожидалось "i" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
        return false;
      }
      wordIndex++;

      // Проверяем "would"
      if (!words[wordIndex] || words[wordIndex] !== 'would') {
        console.log('Ожидалось "would" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
        return false;
      }
      wordIndex++;

      // Проверяем "like"
      if (!words[wordIndex] || words[wordIndex] !== 'like') {
        console.log('Ожидалось "like" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
        return false;
      }
      wordIndex++;

      // Проверяем "some"
      if (!words[wordIndex] || words[wordIndex] !== 'some') {
        console.log('Ожидалось "some" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
        return false;
      }
      wordIndex++;

      // Проверяем существительное
      return validateNoun();
    } else if (structure.id === "no-i-would-not-like-any-noun") {
      // Проверяем "no"
      if (!words[wordIndex] || words[wordIndex] !== 'no') {
        console.log('Ожидалось "no" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
        return false;
      }
      wordIndex++;

      // Проверяем "i"
      if (!words[wordIndex] || words[wordIndex] !== 'i') {
        console.log('Ожидалось "i" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
        return false;
      }
      wordIndex++;

      // Проверяем "would"
      if (!words[wordIndex] || words[wordIndex] !== 'would') {
        console.log('Ожидалось "would" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
        return false;
      }
      wordIndex++;

      // Проверяем "not"
      if (!words[wordIndex] || words[wordIndex] !== 'not') {
        console.log('Ожидалось "not" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
        return false;
      }
      wordIndex++;

      // Проверяем "like"
      if (!words[wordIndex] || words[wordIndex] !== 'like') {
        console.log('Ожидалось "like" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
        return false;
      }
      wordIndex++;

      // Проверяем "any"
      if (!words[wordIndex] || words[wordIndex] !== 'any') {
        console.log('Ожидалось "any" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
        return false;
      }
      wordIndex++;

      // Проверяем существительное
      return validateNoun();
    }

    console.log('Валидация пройдена для:', text);
    return true;
  }
});
