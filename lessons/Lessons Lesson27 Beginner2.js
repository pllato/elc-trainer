addLesson({
  level: "beginner2",
  lesson: "lesson27",
  name: "Урок 27: Отрицания в Past Simple с дополнением",
  structures: [
    { 
      structure: "I/you/he/she/it/we/they did not ______ _______.", 
      pattern: [], // Проверяем местоимения отдельно
      translations: ["Я/ты/мы/вы/он/она/оно не _______ _______."], 
      examples: [
        "I did not go to school. (Я не ходил в школу.)",
        "She did not eat pizza. (Она не ела пиццу.)",
        "They did not play football. (Они не играли в футбол.)"
      ], 
      id: "pronoun-did-not-verb-object", 
      hasVerb: true,
      hasName: false
    },
    { 
      structure: "I/you/he/she/it/we/they didn't ______ _______.", 
      pattern: [], // Проверяем местоимения отдельно
      translations: ["Я/ты/мы/вы/он/она/оно не _______ _______."], 
      examples: [
        "I didn't watch TV. (Я не смотрел телевизор.)",
        "He didn't buy a car. (Он не купил машину.)",
        "We didn't run fast. (Мы не бежали быстро.)"
      ], 
      id: "pronoun-didnt-verb-object", 
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
    // Заменяем сокращение "didn't" на "did not"
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
    if (structure.id === "pronoun-did-not-verb-object" || structure.id === "pronoun-didnt-verb-object") {
      // Структуры "I/you/he/she/it/we/they did not ______ _______." и "I/you/he/she/it/we/they didn't ______ _______."
      // Проверяем местоимение
      if (!words[wordIndex] || !validPronouns.includes(words[wordIndex])) {
        console.log('Ожидалось местоимение на позиции', wordIndex, ', получено', words[wordIndex]);
        return false;
      }
      wordIndex++;

      // Проверяем "did"
      if (!words[wordIndex] || words[wordIndex] !== 'did') {
        console.log('Ожидалось "did" на позиции', wordIndex, ', получено', words[wordIndex]);
        return false;
      }
      wordIndex++;

      // Проверяем "not"
      if (!words[wordIndex] || words[wordIndex] !== 'not') {
        console.log('Ожидалось "not" на позиции', wordIndex, ', получено', words[wordIndex]);
        return false;
      }
      wordIndex++;

      // Проверяем глагол
      if (!words[wordIndex]) {
        console.log('Нет глагола после "did not"');
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
        console.log('Недопустимо использовать форму Past Simple в отрицательном ответе:', verb);
        return false;
      }
      if (excludedWords.includes(verb)) {
        console.log('Запрещённый глагол:', verb);
        return false;
      }
      wordIndex++;

      // Проверяем наличие дополнения (хотя бы одно слово)
      if (wordIndex >= words.length) {
        console.log('Нет дополнения после глагола');
        return false;
      }
      // Дополнение может быть любым, но исключаем модальные глаголы и неподходящие слова
      const remainingWords = words.slice(wordIndex);
      for (const word of remainingWords) {
        if (excludedWords.includes(word)) {
          console.log('Запрещённое слово в дополнении:', word);
          return false;
        }
      }
    }

    console.log('Валидация пройдена для:', text);
    return true;
  }
});