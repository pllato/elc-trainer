(function() {
  console.log('Загружен Урок 17 Intermediate v4');
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
        structure: "Well, quite honestly I don’t think I’ve ever thought about that. I guess _______",
        pattern: ["well", "quite", "honestly", "i", "do", "not", "think", "i", "have", "ever", "thought", "about", "that", "i", "guess"],
        translations: ["Честно говоря, я не думаю, что когда-либо об этом задумывался, но, полагаю, ______"],
        examples: [
          "Well, quite honestly I don’t think I’ve ever thought about that. I guess it would be fun. (Честно говоря, я не думаю, что когда-либо об этом задумывался, но, полагаю, это было бы весело.)",
          "Well, quite honestly I don’t think I’ve ever thought about that. I guess it’s a good idea. (Честно говоря, я не думаю, что когда-либо об этом задумывался, но, полагаю, это хорошая идея.)",
          "Well, quite honestly I don’t think I’ve ever thought about that. I guess I’d enjoy it. (Честно говоря, я не думаю, что когда-либо об этом задумывался, но, полагаю, мне бы это понравилось.)"
        ],
        id: "well-quite-honestly-i-dont-think",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Actually, this isn’t something that I’ve ever considered. In short ________",
        pattern: ["actually", "this", "is", "not", "something", "that", "i", "have", "ever", "considered", "in", "short"],
        translations: ["На самом деле, это не то, о чём я когда-либо думал, но, вкратце, ______"],
        examples: [
          "Actually, this isn’t something that I’ve ever considered. In short it sounds exciting. (На самом деле, это не то, о чём я когда-либо думал, но, вкратце, это звучит захватывающе.)",
          "Actually, this isn’t something that I’ve ever Considered. In short it’s worth trying. (На самом деле, это не то, о чём я когда-либо думал, но, вкратце, это стоит попробовать.)",
          "Actually, this isn’t something that I’ve ever Considered. In short I’d give it a shot. (На самом деле, это не то, о чём я когда-либо думал, но, вкратце, я бы попробовал.)"
        ],
        id: "actually-this-isnt-something",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "I am not really sure how to put this. I suppose generally speaking ________",
        pattern: ["i", "am", "not", "really", "sure", "how", "to", "put", "this", "i", "suppose", "generally", "speaking"],
        translations: ["Я не совсем уверен, как это выразить, но, в общем, полагаю, ______"],
        examples: [
          "I am not really sure how to put this. I suppose generally speaking it would be great. (Я не совсем уверен, как это выразить, но, в общем, полагаю, это было бы здорово.)",
          "I am not really sure how to put this. I suppose generally speaking it’s interesting. (Я не совсем уверен, как это выразить, но, в общем, полагаю, это интересно.)",
          "I am not really sure how to put this. I suppose generally speaking I’d try it. (Я не совсем уверен, как это выразить, но, в общем, полагаю, я бы попробовал.)"
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

      // Минимальное количество слов
      let minWords;
      switch (structure.id) {
        case "would-you-like-to-infinitive":
          minWords = 5; // would you like to try
          break;
        case "well-quite-honestly-i-dont-think":
          minWords = 16; // well quite honestly i do not think i have ever thought about that i guess reason
          break;
        case "actually-this-isnt-something":
          minWords = 13; // actually this is not something that i have ever considered in short reason
          break;
        case "i-am-not-really-sure":
          minWords = 14; // i am not really sure how to put this i suppose generally speaking reason
          break;
        default:
          minWords = 5;
      }
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
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
        const expectedStart = ['well', 'quite', 'honestly', 'i', 'do', 'not', 'think', 'i', 'have', 'ever', 'thought', 'about', 'that', 'i', 'guess'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateReason()) return false;

        return true;
      } else if (structure.id === "actually-this-isnt-something") {
        console.log('Начало проверки структуры Actually this isnt something');
        const expectedStart = ['actually', 'this', 'is', 'not', 'something', 'that', 'i', 'have', 'ever', 'considered', 'in', 'short'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateReason()) return false;

        return true;
      } else if (structure.id === "i-am-not-really-sure") {
        console.log('Начало проверки структуры I am not really sure');
        const expectedStart = ['i', 'am', 'not', 'really', 'sure', 'how', 'to', 'put', 'this', 'i', 'suppose', 'generally', 'speaking'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateReason()) return false;

        return true;
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();