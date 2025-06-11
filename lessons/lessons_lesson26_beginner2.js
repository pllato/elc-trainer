addLesson({
  level: "beginner2",
  lesson: "lesson26",
  name: "Урок 26: Вопросы с Where/What/When/Why и Ответы в Past Simple",
  structures: [
    {
      structure: "Where/What/When/Why did I/you/he/she/it/we/they _______?",
      pattern: ["where", "what", "when", "why"],
      translations: ["Где/Что/Когда/Почему я/ты/он/она/оно/мы/вы _______?"],
      examples: [
        "Where did you go? (Куда ты ходил?)",
        "What did she do? (Что она делала?)",
        "When did they play? (Когда они играли?)",
        "Why did he cry? (Почему он плакал?)"
      ],
      id: "wh-did-pronoun-verb",
      hasVerb: true,
      hasName: false
    },
    {
      structure: "I/you/he/she/it/we/they ______ed _______.",
      pattern: ["pronoun-verbed"],
      translations: ["Я/ты/он/она/оно/мы/вы _______ _______."],
      examples: [
        "I went home. (Я ходил домой.)",
        "She did homework. (Она делала домашнюю работу.)",
        "They played football. (Они играли в футбол.)",
        "He cried loudly. (Он плакал громко.)"
      ],
      id: "pronoun-verbed-adverb",
      hasVerb: true,
      hasName: false
    }
  ],
  requiredCorrect: 10,
  // Полный список неправильных глаголов (base → past)
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
    // Заменяем сокращение "didn't" на "did not" (хотя оно не ожидается в этом уроке)
    let processedText = text.replace(/didn't/gi, 'did not');
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
      'going', 'doing', 'saying', 'running', 'swimming', 'singing', // Примеры с -ing
      'likes', 'runs', 'swims', 'works', 'calls', 'plays', 'watches', 'studies' // Примеры с -s или -es
    ];

    // Список всех местоимений
    const validPronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they'];

    // Проверяем в зависимости от структуры
    if (structure.id === "wh-did-pronoun-verb") {
      // Структура "Where/What/When/Why did I/you/he/she/it/we/they _______?"
      // Проверяем вопросительное слово
      if (!words[wordIndex] || !['where', 'what', 'when', 'why'].includes(words[wordIndex])) {
        console.log('Ожидалось "where/what/when/why" на позиции', wordIndex, ', получено', words[wordIndex]);
        return false;
      }
      wordIndex++;

      // Проверяем "did"
      if (!words[wordIndex] || words[wordIndex] !== 'did') {
        console.log('Ожидалось "did" на позиции', wordIndex, ', получено', words[wordIndex]);
        return false;
      }
      wordIndex++;

      // Проверяем местоимение
      if (!words[wordIndex] || !validPronouns.includes(words[wordIndex])) {
        console.log('Ожидалось местоимение на позиции', wordIndex, ', получено', words[wordIndex]);
        return false;
      }
      wordIndex++;

      // Проверяем глагол
      if (!words[wordIndex]) {
        console.log('Нет глагола после местоимения');
        return false;
      }
      const verb = words[wordIndex];
      // Проверяем, что глагол в базовой форме
      if (verb.endsWith('ing') || verb.endsWith('s') || verb.endsWith('es') || verb.endsWith('ed')) {
        console.log('Недопустимая форма глагола (должна быть базовая):', verb);
        return false;
      }
      // Проверяем, что глагол не является неправильной формой Past Simple
      if (Object.values(this.irregularVerbs).includes(verb)) {
        console.log('Недопустимо использовать форму Past Simple в вопросе:', verb);
        return false;
      }
      if (excludedWords.includes(verb)) {
        console.log('Запрещённый глагол:', verb);
        return false;
      }
      wordIndex++;

      // Проверяем, что нет лишних слов
      if (wordIndex < words.length) {
        console.log('Лишние слова:', words.slice(wordIndex));
        return false;
      }
    } else if (structure.id === "pronoun-verbed-adverb") {
      // Структура "I/you/he/she/it/we/they ______ed _______."
      // Проверяем местоимение
      if (!words[wordIndex] || !validPronouns.includes(words[wordIndex])) {
        console.log('Ожидалось местоимение на позиции', wordIndex, ', получено', words[wordIndex]);
        return false;
      }
      wordIndex++;

      // Проверяем глагол
      if (!words[wordIndex]) {
        console.log('Нет глагола после местоимения');
        return false;
      }
      const verb = words[wordIndex];
      // Проверяем, является ли глагол регулярным (заканчивается на -ed) или неправильным
      const isRegular = verb.endsWith('ed');
      const isIrregular = Object.values(this.irregularVerbs).includes(verb);
      if (!isRegular && !isIrregular) {
        console.log('Глагол не в форме Past Simple:', verb);
        return false;
      }
      // Проверяем, что базовая форма глагола не в списке исключённых
      let baseVerb = verb;
      if (isRegular) {
        // Для регулярных глаголов убираем -ed
        baseVerb = verb.replace(/ed$/, '');
        if (baseVerb.endsWith('i')) baseVerb += 'y'; // Например, studied → study
        else if (baseVerb.endsWith('pp')) baseVerb = baseVerb.slice(0, -1); // stopped → stop
        else if (baseVerb.endsWith('rr')) baseVerb = baseVerb.slice(0, -1); // referred → refer
      } else {
        // Для неправильных глаголов ищем базовую форму
        baseVerb = Object.keys(this.irregularVerbs).find(key => this.irregularVerbs[key] === verb);
      }
      if (!baseVerb) {
        console.log('Не удалось определить базовую форму глагола:', verb);
        return false;
      }
      if (excludedWords.includes(baseVerb)) {
        console.log('Запрещённый глагол (базовая форма):', baseVerb);
        return false;
      }
      wordIndex++;

      // Проверяем наличие дополнительного слова (например, наречия или существительного)
      if (!words[wordIndex]) {
        console.log('Нет дополнительного слова после глагола');
        return false;
      }
      const extraWord = words[wordIndex];
      // Проверяем, что дополнительное слово не является глаголом или местоимением
      if (validPronouns.includes(extraWord) || excludedWords.includes(extraWord) || Object.keys(this.irregularVerbs).includes(extraWord) || Object.values(this.irregularVerbs).includes(extraWord)) {
        console.log('Недопустимое дополнительное слово:', extraWord);
        return false;
      }
      wordIndex++;

      // Проверяем, что нет лишних слов
      if (wordIndex < words.length) {
        console.log('Лишние слова:', words.slice(wordIndex));
        return false;
      }
    }

    console.log('Валидация пройдена для:', text);
    return true;
  }
});
