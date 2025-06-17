(function() {
  addLesson({
    level: "preintermediate",
    lesson: "lesson1",
    name: "Урок 1: Questions and Answers in Present Simple",
    structures: [
      {
        structure: "When/Where/What/Why do you ___________?",
        pattern: [],
        translations: ["Когда/Где/Что/Почему ты ______?"],
        examples: [
          "When do you eat? (Когда ты ешь?)",
          "Where do you eat? (Где ты ешь?)",
          "What do you eat? (Что ты ешь?)"
        ],
        id: "question-word-do-you-verb",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "I __________ _______________",
        pattern: ["i"],
        translations: ["Я ______ ______."],
        examples: [
          "I eat in the morning. (Я ем утром.)",
          "I eat at home. (Я ем дома.)",
          "I eat a sandwich. (Я ем сэндвич.)"
        ],
        id: "i-verb-circumstance",
        hasVerb: false,
        hasName: false
      }
    ],
    requiredCorrect: 10,
    validateStructure: function(text, structure) {
      console.log('Валидация структуры:', structure.id);
      console.log('Входной текст:', text);
      // Нормализуем "everyday"
      let processedText = text.replace(/\beveryday\b/gi, 'every day');
      if (processedText !== text) {
        console.log('Обработан everyday:', processedText);
      }
      // Удаляем пунктуацию, нормализуем пробелы и приводим к нижнему регистру
      const cleanedText = processedText.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').toLowerCase().trim();
      console.log('Очищенный текст:', cleanedText);

      const words = cleanedText.split(/\s+/).filter(word => word.length > 0);
      console.log('Разделённые слова:', words);

      // Минимальное количество слов
      let minWords = 4; // Для вопроса: When/Where/What/Why + do + you + глагол
      if (structure.id === "i-verb-circumstance") {
        minWords = 3; // I + глагол + минимум 1 слово обстоятельства
      }
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;
      let questionWord = null;

      // Исключённые слова (модальные, стативные глаголы и неподходящие)
      const excludedWords = [
        'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought',
        'am', 'is', 'are', 'was', 'were', 'been', 'being', 'has', 'have', 'had', 'does', 'do', 'did'
      ];

      // Проверяем глагол в базовой форме
      const validateVerb = () => {
        console.log('Валидация глагола на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет глагола');
          return false;
        }

        const verb = words[wordIndex];
        if (excludedWords.includes(verb)) {
          console.log('Исключённый глагол:', verb);
          return false;
        }

        wordIndex++;
        return true;
      };

      // Проверяем обстоятельство (время, место, объект, причина)
      const validateCircumstance = (expectedType) => {
        console.log('Валидация обстоятельства на позиции', wordIndex, 'для типа', expectedType);
        if (!words[wordIndex]) {
          console.log('Нет обстоятельства');
          return false;
        }

        // Разрешаем составные обстоятельства (например, "in the morning")
        let circumstanceWords = [];
        while (wordIndex < words.length) {
          const word = words[wordIndex];
          if (excludedWords.includes(word)) {
            console.log('Исключённое слово в обстоятельстве:', word);
            return false;
          }
          circumstanceWords.push(word);
          wordIndex++;
        }

        const circumstance = circumstanceWords.join(' ');
        // Простая проверка соответствия типу вопроса
        if (expectedType === 'when') {
          // Ожидаем выражения времени (гибкая проверка)
          const timeIndicators = ['morning', 'evening', 'night', 'today', 'yesterday', 'tomorrow', 'always', 'never', 'sometimes'];
          if (!timeIndicators.some(indicator => circumstance.includes(indicator))) {
            console.log('Обстоятельство не соответствует времени:', circumstance);
            // Разрешаем, если нет явных ошибок, для гибкости
          }
        } else if (expectedType === 'where') {
          // Ожидаем выражения места
          const placeIndicators = ['home', 'school', 'park', 'city', 'at', 'in', 'on'];
          if (!placeIndicators.some(indicator => circumstance.includes(indicator))) {
            console.log('Обстоятельство не соответствует месту:', circumstance);
            // Разрешаем, если нет явных ошибок
          }
        } else if (expectedType === 'what') {
          // Ожидаем объект
          const objectIndicators = ['sandwich', 'book', 'movie', 'food', 'drink'];
          if (!objectIndicators.some(indicator => circumstance.includes(indicator))) {
            console.log('Обстоятельство не соответствует объекту:', circumstance);
            // Разрешаем, если нет явных ошибок
          }
        } else if (expectedType === 'why') {
          // Ожидаем причину, начинающуюся с "because"
          if (!circumstance.startsWith('because')) {
            console.log('Обстоятельство не начинается с "because":', circumstance);
            return false;
          }
        }

        return true;
      };

      if (structure.id === "question-word-do-you-verb") {
        if (!['when', 'where', 'what', 'why'].includes(words[wordIndex])) {
          console.log('Ожидалось "when/where/what/why" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        questionWord = words[wordIndex];
        wordIndex++;

        const expected = ['do', 'you'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateVerb()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "i-verb-circumstance") {
        if (words[wordIndex] !== 'i') {
          console.log('Ожидалось "i" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateVerb()) return false;

        // Используем questionWord из контекста, если доступно, иначе предполагаем любой тип
        const expectedType = questionWord || 'any';
        if (!validateCircumstance(expectedType)) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();