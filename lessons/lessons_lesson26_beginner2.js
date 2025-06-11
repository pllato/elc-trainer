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
        "Why did he cry? (Почему он плакал?)",
        "Where did you go yesterday? (Куда ты ходил вчера?)",
        "Why did you do that? (Почему ты это сделал?)",
        "When did you do it? (Когда ты это сделал?)"
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
        "He cried loudly. (Он плакал громко.)",
        "I ate because I was hungry. (Я ел, потому что был голоден.)",
        "I drank it. (Я это выпил.)",
        "I did it right. (Я сделал это правильно.)"
      ],
      id: "pronoun-verbed-adverb",
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
    let processedText = text.replace(/didn't/gi, 'did not');
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

    const validPronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they'];

    if (structure.id === "wh-did-pronoun-verb") {
      if (!words[wordIndex] || !['where', 'what', 'when', 'why'].includes(words[wordIndex])) {
        console.log('Ожидалось "where/what/when/why" на позиции', wordIndex, ', получено', words[wordIndex]);
        return false;
      }
      wordIndex++;

      if (!words[wordIndex] || words[wordIndex] !== 'did') {
        console.log('Ожидалось "did" на позиции', wordIndex, ', получено', words[wordIndex]);
        return false;
      }
      wordIndex++;

      if (!words[wordIndex] || !validPronouns.includes(words[wordIndex])) {
        console.log('Ожидалось местоимение на позиции', wordIndex, ', получено', words[wordIndex]);
        return false;
      }
      wordIndex++;

      if (!words[wordIndex]) {
        console.log('Нет глагола после местоимения');
        return false;
      }
      const verb = words[wordIndex];
      if (verb.endsWith('ing') || verb.endsWith('s') || verb.endsWith('es') || verb.endsWith('ed')) {
        console.log('Недопустимая форма глагола (должна быть базовая):', verb);
        return false;
      }
      if (Object.values(this.irregularVerbs).includes(verb)) {
        console.log('Недопустимо использовать форму Past Simple в вопросе:', verb);
        return false;
      }
      if (excludedWords.includes(verb) && verb !== 'do') {
        console.log('Запрещённый глагол:', verb);
        return false;
      }
      wordIndex++;

      // Разрешаем дополнительные слова, но проверяем, что они не являются глаголами или исключёнными словами
      while (wordIndex < words.length) {
        const extraWord = words[wordIndex];
        if (excludedWords.includes(extraWord) || 
            Object.keys(this.irregularVerbs).includes(extraWord) || 
            Object.values(this.irregularVerbs).includes(extraWord)) {
          console.log('Недопустимое дополнительное слово:', extraWord);
          return false;
        }
        wordIndex++;
      }
    } else if (structure.id === "pronoun-verbed-adverb") {
      if (!words[wordIndex] || !validPronouns.includes(words[wordIndex])) {
        console.log('Ожидалось местоимение на позиции', wordIndex, ', получено', words[wordIndex]);
        return false;
      }
      wordIndex++;

      if (!words[wordIndex]) {
        console.log('Нет глагола после местоимения');
        return false;
      }
      const verb = words[wordIndex];
      const isRegular = verb.endsWith('ed');
      const isIrregular = Object.values(this.irregularVerbs).includes(verb);
      if (!isRegular && !isIrregular) {
        console.log('Глагол не в форме Past Simple:', verb);
        return false;
      }
      let baseVerb = verb;
      if (isRegular) {
        baseVerb = verb.replace(/ed$/, '');
        if (baseVerb.endsWith('i')) baseVerb += 'y';
        else if (baseVerb.endsWith('pp')) baseVerb = baseVerb.slice(0, -1);
        else if (baseVerb.endsWith('rr')) baseVerb = baseVerb.slice(0, -1);
      } else {
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

      if (!words[wordIndex]) {
        console.log('Нет дополнительного слова после глагола');
        return false;
      }

      // Проверяем, начинается ли дополнительная часть с "because"
      if (words[wordIndex] === 'because') {
        wordIndex++;
        if (!words[wordIndex]) {
          console.log('Нет слов после "because"');
          return false;
        }
        // Разрешаем любое количество слов после "because", включая местоимения и глаголы
        wordIndex = words.length; // Пропускаем проверку оставшихся слов
      } else {
        // Обычная проверка для ответов без "because"
        while (wordIndex < words.length) {
          const extraWord = words[wordIndex];
          if (excludedWords.includes(extraWord) || 
              Object.keys(this.irregularVerbs).includes(extraWord) || 
              Object.values(this.irregularVerbs).includes(extraWord)) {
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
