addLesson({
  level: "beginner2",
  lesson: "lesson29",
  name: "Урок 29: I would like / I'd like ______ / There is / There's ______ in/on/at ________.",
  structures: [
    {
      structure: "I would like / I'd like ______.",
      pattern: ["would", "like"],
      translations: ["Я хотел бы ______."],
      examples: [
        "I would like to go. (Я хотел бы пойти.)",
        "I'd like a coffee. (Я хотел бы кофе.)",
        "I would like to do something. (Я хотел бы сделать что-нибудь.)",
        "I'd like it. (Я хотел бы это.)",
        "I would like dancing. (Я хотел бы танцевать.)",
        "I'd like to play football. (Я хотел бы играть в футбол.)",
        "I would like a new book. (Я хотел бы новую книгу.)"
      ],
      id: "would-like-object",
      hasVerb: true,
      hasName: false
    },
    {
      structure: "There is / There's ______ in/on/at ________.",
      pattern: ["there", "is"],
      translations: ["Есть ______ в/на/в ________."],
      examples: [
        "There is a book on the table. (Есть книга на столе.)",
        "There's a cat in the room. (Есть кошка в комнате.)",
        "There is a party at the house. (Есть вечеринка в доме.)",
        "There's water in the glass. (Есть вода в стакане.)",
        "There is a new book on the shelf. (Есть новая книга на полке.)",
        "There's a dog in the park. (Есть собака в парке.)",
        "There is a pen on the desk. (Есть ручка на столе.)"
      ],
      id: "there-is-noun-prep-place",
      hasVerb: false,
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
    // Заменяем сокращения
    let processedText = text
      .replace(/I'd/gi, 'I would')
      .replace(/There's/gi, 'There is')
      .replace(/wouldn't/gi, 'would not');
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
      'am', 'is', 'are', 'was', 'were', 'been', 'being', 'has', 'have', 'had', 'does', 'did',
      'going', 'doing', 'saying', 'running', 'swimming', 'singing',
      'likes', 'runs', 'swims', 'works', 'calls', 'plays', 'watches', 'studies'
    ];

    // Список всех местоимений
    const validPronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they'];

    // Проверяем объект для "would like" (глагольная фраза или существительное)
    const validateWouldLikeObject = () => {
      console.log('Validating "would like" object at index', wordIndex);
      if (!words[wordIndex]) {
        console.log('Нет объекта после "like"');
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
      return true;
    };

    // Проверяем объект для "there is" (существительное + предлог + место)
    const validateThereIsObject = () => {
      console.log('Validating "there is" object at index', wordIndex);
      if (!words[wordIndex]) {
        console.log('Нет существительного после "is"');
        return false;
      }

      // Проверяем существительное (может начинаться с артикля)
      const nounWord = words[wordIndex];
      if (excludedWords.includes(nounWord) || Object.values(this.irregularVerbs).includes(nounWord)) {
        console.log('Недопустимое существительное:', nounWord);
        return false;
      }
      wordIndex++;

      // Разрешаем дополнительные слова для существительного (например, "a new book")
      while (wordIndex < words.length && !['in', 'on', 'at'].includes(words[wordIndex])) {
        const extraNounWord = words[wordIndex];
        if (excludedWords.includes(extraNounWord) || Object.values(this.irregularVerbs).includes(extraNounWord)) {
          console.log('Недопустимое дополнительное слово в существительном:', extraNounWord);
          return false;
        }
        wordIndex++;
      }

      // Проверяем предлог
      if (!words[wordIndex] || !['in', 'on', 'at'].includes(words[wordIndex])) {
        console.log('Ожидался предлог "in/on/at" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
        return false;
      }
      wordIndex++;

      // Проверяем место
      if (!words[wordIndex]) {
        console.log('Нет места после предлога');
        return false;
      }
      const placeWord = words[wordIndex];
      if (excludedWords.includes(placeWord) || Object.values(this.irregularVerbs).includes(placeWord)) {
        console.log('Недопустимое слово для места:', placeWord);
        return false;
      }
      wordIndex++;

      // Разрешаем дополнительные слова для места (например, "the living room")
      while (wordIndex < words.length) {
        const extraPlaceWord = words[wordIndex];
        if (excludedWords.includes(extraPlaceWord) || Object.values(this.irregularVerbs).includes(extraPlaceWord)) {
          console.log('Недопустимое дополнительное слово для места:', extraPlaceWord);
          return false;
        }
        wordIndex++;
      }

      return true;
    };

    if (structure.id === "would-like-object") {
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

      // Проверяем объект
      return validateWouldLikeObject();
    } else if (structure.id === "there-is-noun-prep-place") {
      // Проверяем "there"
      if (!words[wordIndex] || words[wordIndex] !== 'there') {
        console.log('Ожидалось "there" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
        return false;
      }
      wordIndex++;

      // Проверяем "is"
      if (!words[wordIndex] || words[wordIndex] !== 'is') {
        console.log('Ожидалось "is" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
        return false;
      }
      wordIndex++;

      // Проверяем существительное и место
      return validateThereIsObject();
    }

    console.log('Валидация пройдена для:', text);
    return true;
  }
});
