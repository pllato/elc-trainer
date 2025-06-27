(function() {
  console.log('Загружен Урок 17 Intermediate v3');
  addLesson({
    level: "intermediate",
    lesson: "lesson17_intermediate",
    name: "Урок 17: Questions and Fixed Responses about Desires",
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
        structure: "Well, quite honestly I don’t think I’ve ever thought about that, but I guess.",
        pattern: ["well", "quite", "honestly", "i", "do", "not", "think", "i", "have", "ever", "thought", "about", "that", "but", "i", "guess"],
        translations: ["Честно говоря, я не думаю, что когда-либо об этом задумывался, но, полагаю."],
        examples: [
          "Well, quite honestly I don’t think I’ve ever thought about that, but I guess. (Честно говоря, я не думаю, что когда-либо об этом задумывался, но, полагаю.)",
          "Well, quite honestly I don’t think I’ve ever thought about that, but I guess. (Честно говоря, я не думаю, что когда-либо об этом задумывался, но, полагаю.)",
          "Well, quite honestly I don’t think I’ve ever thought about that, but I guess. (Честно говоря, я не думаю, что когда-либо об этом задумывался, но, полагаю.)"
        ],
        id: "well-quite-honestly-i-dont-think",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Actually, this isn’t something that I’ve ever considered, but in short.",
        pattern: ["actually", "this", "is", "not", "something", "that", "i", "have", "ever", "considered", "but", "in", "short"],
        translations: ["На самом деле, это не то, о чём я когда-либо думал, но, вкратце."],
        examples: [
          "Actually, this isn’t something that I’ve ever considered, but in short. (На самом деле, это не то, о чём я когда-либо думал, но, вкратце.)",
          "Actually, this isn’t something that I’ve ever Considered, but in short. (На самом деле, это не то, о чём я когда-либо думал, но, вкратце.)",
          "Actually, this isn’t something that I’ve ever considered, but in short. (На самом деле, это не то, о чём я когда-либо думал, но, вкратце.)"
        ],
        id: "actually-this-isnt-something",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "I am not really sure how to put this, but I suppose generally speaking.",
        pattern: ["i", "am", "not", "really", "sure", "how", "to", "put", "this", "but", "i", "suppose", "generally", "speaking"],
        translations: ["Я не совсем уверен, как это выразить, но, в общем, полагаю."],
        examples: [
          "I am not really sure how to put this, but I suppose generally speaking. (Я не совсем уверен, как это выразить, но, в общем, полагаю.)",
          "I am not really sure how to put this, but I suppose generally speaking. (Я не совсем уверен, как это выразить, но, в общем, полагаю.)",
          "I am not really sure how to put this, but I suppose generally speaking. (Я не совсем уверен, как это выразить, но, в общем, полагаю.)"
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
        case "well-quite-honestly-i-dont-think":
          expectedWords = 16; // well quite honestly i do not think i have ever thought about that but i guess
          break;
        case "actually-this-isnt-something":
          expectedWords = 13; // actually this is not something that i have ever considered but in short
          break;
        case "i-am-not-really-sure":
          expectedWords = 14; // i am not really sure how to put this but i suppose generally speaking
          break;
        default:
          expectedWords = 5;
      }
      if (structure.id !== "would-you-like-to-infinitive" && words.length !== expectedWords) {
        console.log(`Ожидалось ${expectedWords} слов, получено:`, words.length);
        return false;
      }
      if (structure.id === "would-you-like-to-infinitive" && words.length < expectedWords) {
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
      } else if (structure.id === "well-quite-honestly-i-dont-think") {
        console.log('Начало проверки структуры Well quite honestly I dont think');
        const expectedStart = ['well', 'quite', 'honestly', 'i', 'do', 'not', 'think', 'i', 'have', 'ever', 'thought', 'about', 'that', 'but', 'i', 'guess'];
        return validateFixedPhrase(expectedStart);
      } else if (structure.id === "actually-this-isnt-something") {
        console.log('Начало проверки структуры Actually this isnt something');
        const expectedStart = ['actually', 'this', 'is', 'not', 'something', 'that', 'i', 'have', 'ever', 'considered', 'but', 'in', 'short'];
        return validateFixedPhrase(expectedStart);
      } else if (structure.id === "i-am-not-really-sure") {
        console.log('Начало проверки структуры I am not really sure');
        const expectedStart = ['i', 'am', 'not', 'really', 'sure', 'how', 'to', 'put', 'this', 'but', 'i', 'suppose', 'generally', 'speaking'];
        return validateFixedPhrase(expectedStart);
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();