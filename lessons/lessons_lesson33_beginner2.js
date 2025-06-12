(function() {
  let lastValidatedText = null; // Track last validated input within lesson scope

  addLesson({
    level: "beginner2",
    lesson: "lesson33",
    name: "Урок 33: I am ____ing / You/We/They are ____ing / He/She/It is ____ing",
    structures: [
      {
        structure: "I am ____ing.",
        pattern: ["am"],
        translations: ["Я ______ю."],
        examples: [
          "I am reading. (Я читаю.)",
          "I am sitting. (Я сижу.)",
          "I'm doing. (Я делаю.)",
          "I am standing. (Я стою.)"
        ],
        id: "i-am-verbing",
        hasVerb: true,
        hasName: false
      },
      {
        structure: "You/We/They are ____ing.",
        pattern: ["are"],
        translations: ["Ты/Мы/Вы ______ете/ем."],
        examples: [
          "You are reading. (Ты читаешь.)",
          "We are dancing. (Мы танцуем.)",
          "They are working. (Они работают.)",
          "You are sitting. (Вы сидите.)"
        ],
        id: "you-we-they-verbing",
        hasVerb: true,
        hasName: false
      },
      {
        structure: "He/She/It is ____ing.",
        pattern: ["is"],
        translations: ["Он/Она/Оно ______ет."],
        examples: [
          "He is reading. (Он читает.)",
          "She is working. (Она работает.)",
          "It is standing. (Оно стоит.)",
          "She is doing. (Она делает.)"
        ],
        id: "he-she-it-verbing",
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
      console.log('Validating structure:', structure.id);
      console.log('Raw input:', text);
      // Заменяем сокращение "I'm" на "I am"
      let processedText = text.replace(/I'm/gi, 'I am');
      if (processedText !== text) {
        console.log('Expanded contractions:', processedText);
      }
      // Удаляем пунктуацию и приводим к нижнему регистру
      const cleanedText = processedText.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase().trim();
      console.log('Cleaned text:', cleanedText);

      // Проверяем на повторный ввод
      if (cleanedText === lastValidatedText) {
        console.log('Повторный ввод пропущен:', cleanedText);
        return false;
      }

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
        // Stative verbs not typically used in continuous form
        'like', 'love', 'hate', 'know', 'understand', 'want', 'need', 'believe'
      ];

      // Список всех местоимений
      const validPronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they'];

      // Проверяем глагол в форме -ing
      const validateVerbIng = () => {
        console.log('Validating verb at index', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет глагола');
          return false;
        }

        const verb = words[wordIndex];
        // Проверяем, что глагол заканчивается на -ing
        if (!verb.endsWith('ing')) {
          console.log('Глагол должен заканчиваться на -ing:', verb);
          return false;
        }

        // Проверяем базовую форму глагола (удаляем -ing)
        const baseVerb = verb.replace(/ing$/, '');
        if (excludedWords.includes(baseVerb)) {
          console.log('Недопустимый глагол:', baseVerb);
          return false;
        }

        wordIndex++;

        // Разрешаем дополнительные слова (например, "working on a project")
        while (wordIndex < words.length) {
          const extraWord = words[wordIndex];
          if (excludedWords.includes(extraWord)) {
            console.log('Недопустимое дополнительное слово:', extraWord);
            return false;
          }
          wordIndex++;
        }

        return true;
      };

      if (structure.id === "i-am-verbing") {
        // Проверяем "i"
        if (!words[wordIndex] || words[wordIndex] !== 'i') {
          console.log('Ожидалось "i" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        // Проверяем "am"
        if (!words[wordIndex] || words[wordIndex] !== 'am') {
          console.log('Ожидалось "am" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        // Проверяем глагол
        const isValid = validateVerbIng();
        if (isValid) {
          lastValidatedText = cleanedText; // Update only on successful validation
        }
        return isValid;
      } else if (structure.id === "you-we-they-verbing") {
        // Проверяем местоимение
        if (!words[wordIndex] || !['you', 'we', 'they'].includes(words[wordIndex])) {
          console.log('Ожидалось "you/we/they" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        // Проверяем "are"
        if (!words[wordIndex] || words[wordIndex] !== 'are') {
          console.log('Ожидалось "are" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        // Проверяем глагол
        const isValid = validateVerbIng();
        if (isValid) {
          lastValidatedText = cleanedText; // Update only on successful validation
        }
        return isValid;
      } else if (structure.id === "he-she-it-verbing") {
        // Проверяем местоимение
        if (!words[wordIndex] || !['he', 'she', 'it'].includes(words[wordIndex])) {
          console.log('Ожидалось "he/she/it" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        // Проверяем "is"
        if (!words[wordIndex] || words[wordIndex] !== 'is') {
          console.log('Ожидалось "is" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        // Проверяем глагол
        const isValid = validateVerbIng();
        if (isValid) {
          lastValidatedText = cleanedText; // Update only on successful validation
        }
        return isValid;
      }

      console.log('Валидация пройдена для:', text);
      return true;
    }
  });
})();
