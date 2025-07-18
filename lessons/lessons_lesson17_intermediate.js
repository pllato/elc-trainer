(function() {
  console.log('Загружен Урок 17 Intermediate v5');
  addLesson({
    level: "intermediate",
    lesson: "lesson17_intermediate",
    name: "Урок 17: Questions and Speculative Answers about Desires",
    structures: [
      {
        structure: "Would you like to ___________?",
        pattern: ["would", "you", "like", "to"],
        translations: ["Хотели бы вы ______?"],
        examples: [
          "Would you like to try new food? (Хотели бы вы попробовать новую еду?)",
          "Would you like to visit Paris? (Хотели бы вы посетить Париж?)",
          "Would you like to learn coding? (Хотели бы вы научиться программировать?)"
        ],
        id: "would-you-like-to-infinitive",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "I guess _______",
        pattern: ["i", "guess"],
        translations: ["Я полагаю, ______"],
        examples: [
          "I guess it would be fun. (Я полагаю, это было бы весело.)",
          "I guess it’s a good idea. (Я полагаю, это хорошая идея.)",
          "I guess I’d enjoy it. (Я полагаю, мне бы это понравилось.)"
        ],
        id: "i-guess",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "In short _______",
        pattern: ["in", "short"],
        translations: ["Вкратце, ______"],
        examples: [
          "In short it sounds exciting. (Вкратце, это звучит захватывающе.)",
          "In short it’s worth trying. (Вкратце, это стоит попробовать.)",
          "In short I’d give it a shot. (Вкратце, я бы попробовал.)"
        ],
        id: "in-short",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "I suppose generally speaking ________",
        pattern: ["i", "suppose", "generally", "speaking"],
        translations: ["В общем, полагаю, ______"],
        examples: [
          "I suppose generally speaking it would be great. (В общем, полагаю, это было бы здорово.)",
          "I suppose generally speaking it’s interesting. (В общем, полагаю, это интересно.)",
          "I suppose generally speaking I’d try it. (В общем, полагаю, я бы попробовал.)"
        ],
        id: "i-suppose-generally-speaking",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Well, quite honestly I don’t think I’ve ever thought about that.",
        pattern: ["well", "quite", "honestly", "i", "do", "not", "think", "i", "have", "ever", "thought", "about", "that"],
        translations: ["Честно говоря, я не думаю, что когда-либо об этом задумывался."],
        examples: [
          "Well, quite honestly I don’t think I’ve ever thought about that. (Честно говоря, я не думаю, что когда-либо об этом задумывался.)",
          "Well, quite honestly I don’t think I’ve ever thought about that. (Честно говоря, я не думаю, что когда-либо об этом задумывался.)",
          "Well, quite honestly I don’t think I’ve ever thought about that. (Честно говоря, я не думаю, что когда-либо об этом задумывался.)"
        ],
        id: "well-quite-honestly-i-dont-think",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Actually, this isn’t something that I’ve ever considered.",
        pattern: ["actually", "this", "is", "not", "something", "that", "i", "have", "ever", "considered"],
        translations: ["На самом деле, это не то, о чём я когда-либо думал."],
        examples: [
          "Actually, this isn’t something that I’ve ever considered. (На самом деле, это не то, о чём я когда-либо думал.)",
          "Actually, this isn’t something that I’ve ever Considered. (На самом деле, это не то, о чём я когда-либо думал.)",
          "Actually, this isn’t something that I’ve ever Considered. (На самом деле, это не то, о чём я когда-либо думал.)"
        ],
        id: "actually-this-isnt-something",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "I am not really sure how to put this.",
        pattern: ["i", "am", "not", "really", "sure", "how", "to", "put", "this"],
        translations: ["Я не совсем уверен, как это выразить."],
        examples: [
          "I am not really sure how to put this. (Я не совсем уверен, как это выразить.)",
          "I am not really sure how to put this. (Я не совсем уверен, как это выразить.)",
          "I am not really sure how to put this. (Я не совсем уверен, как это выразить.)"
        ],
        id: "i-am-not-really-sure",
        hasVerb: false,
        hasName: false
      }
    ],
    requiredCorrect: 10,
    validateStructure: function(text, structure) {
      console.log('Валидация структуры:', structure.id);
      console.log('Входной текст:', text);
      // Нормализуем сокращения и "everyday"
      let processedText = text
        .replace(/don't/gi, 'do not')
        .replace(/dont/gi, 'do not')
        .replace(/i've/gi, 'i have')
        .replace(/i'm/gi, 'i am')
        .replace(/isn't/gi, 'is not')
        .replace(/isnt/gi, 'is not')
        .replace(/\beveryday\b/gi, 'every day');
      if (processedText !== text) {
        console.log('Обработаны сокращения и everyday:', processedText);
      }
      // Удаляем пунктуацию, нормализуем пробелы и приводим к нижнему регистру
      const cleanedText = processedText.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').toLowerCase().trim();
      console.log('Очищенный текст:', cleanedText);

      const words = cleanedText.split(/\s+/).filter(word => word.length > 0);
      console.log('Разделённые слова:', words);

      // Минимальное и точное количество слов
      let expectedWords;
      switch (structure.id) {
        case "would-you-like-to-infinitive":
          expectedWords = 5; // would you like to try (минимум)
          break;
        case "i-guess":
          expectedWords = 3; // i guess reason (минимум)
          break;
        case "in-short":
          expectedWords = 3; // in short reason (минимум)
          break;
        case "i-suppose-generally-speaking":
          expectedWords = 5; // i suppose generally speaking reason (минимум)
          break;
        case "well-quite-honestly-i-dont-think":
          expectedWords = 13; // well quite honestly i do not think i have ever thought about that
          break;
        case "actually-this-isnt-something":
          expectedWords = 10; // actually this is not something that i have ever considered
          break;
        case "i-am-not-really-sure":
          expectedWords = 9; // i am not really sure how to put this
          break;
        default:
          expectedWords = 5;
      }
      if (["well-quite-honestly-i-dont-think", "actually-this-isnt-something", "i-am-not-really-sure"].includes(structure.id) && words.length !== expectedWords) {
        console.log(`Ожидалось ${expectedWords} слов, получено:`, words.length);
        return false;
      }
      if (!["well-quite-honestly-i-dont-think", "actually-this-isnt-something", "i-am-not-really-sure"].includes(structure.id) && words.length < expectedWords) {
        console.log(`Недостаточно слов (минимум ${expectedWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;

      // Исключённые слова (модальные, стативные глаголы и неподходящие)
      const excludedWords = [
        'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought',
        'am', 'is', 'are', 'was', 'were', 'been', 'being', 'has', 'had', 'does', 'did'
      ];

      // Допустимые наречия и слова для дополнений
      const validAdverbs = ['well', 'better', 'fast', 'slowly', 'quickly', 'carefully', 'a lot', 'much', 'new', 'paris', 'coding', 'abroad', 'a', 'the', 'an'];

      // Проверяем глагол в инфинитиве (V1)
      const validateInfinitive = () => {
        console.log('Валидация глагола в инфинитиве на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет глагола');
          return false;
        }

        const verb = words[wordIndex];
        console.log('Проверка глагола V1:', verb);
        if (excludedWords.includes(verb)) {
          console.log('Исключённый глагол:', verb);
          return false;
        }

        wordIndex++;

        // Проверяем опциональное дополнение
        let actionWords = [];
        while (wordIndex < words.length) {
          const word = words[wordIndex];
          if (excludedWords.includes(word) && !validAdverbs.includes(word)) {
            console.log('Исключённое слово в дополнении:', word);
            return false;
          }
          actionWords.push(word);
          wordIndex++;
        }
        console.log('Дополнение:', actionWords);

        return true;
      };

      // Проверяем причину (свободная фраза)
      const validateReason = () => {
        console.log('Валидация причины на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет причины');
          return false;
        }

        let reasonWords = [];
        while (wordIndex < words.length) {
          reasonWords.push(words[wordIndex]);
          wordIndex++;
        }
        console.log('Причина:', reasonWords);
        if (reasonWords.length === 0) {
          console.log('Причина отсутствует');
          return false;
        }

        return true;
      };

      // Проверяем точное совпадение фиксированной фразы
      const validateFixedPhrase = (expectedStart) => {
        console.log('Валидация фиксированной фразы на позиции', wordIndex);
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }
        console.log('Фиксированная фраза принята');
        return true;
      };

      if (structure.id === "would-you-like-to-infinitive") {
        console.log('Начало проверки структуры Would you like to infinitive');
        const expectedStart = ['would', 'you', 'like', 'to'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateInfinitive()) return false;

        return true;
      } else if (structure.id === "i-guess") {
        console.log('Начало проверки структуры I guess');
        const expectedStart = ['i', 'guess'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateReason()) return false;

        return true;
      } else if (structure.id === "in-short") {
        console.log('Начало проверки структуры In short');
        const expectedStart = ['in', 'short'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateReason()) return false;

        return true;
      } else if (structure.id === "i-suppose-generally-speaking") {
        console.log('Начало проверки структуры I suppose generally speaking');
        const expectedStart = ['i', 'suppose', 'generally', 'speaking'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateReason()) return false;

        return true;
      } else if (structure.id === "well-quite-honestly-i-dont-think") {
        console.log('Начало проверки структуры Well quite honestly I dont think');
        const expectedStart = ['well', 'quite', 'honestly', 'i', 'do', 'not', 'think', 'i', 'have', 'ever', 'thought', 'about', 'that'];
        return validateFixedPhrase(expectedStart);
      } else if (structure.id === "actually-this-isnt-something") {
        console.log('Начало проверки структуры Actually this isnt something');
        const expectedStart = ['actually', 'this', 'is', 'not', 'something', 'that', 'i', 'have', 'ever', 'considered'];
        return validateFixedPhrase(expectedStart);
      } else if (structure.id === "i-am-not-really-sure") {
        console.log('Начало проверки структуры I am not really sure');
        const expectedStart = ['i', 'am', 'not', 'really', 'sure', 'how', 'to', 'put', 'this'];
        return validateFixedPhrase(expectedStart);
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();