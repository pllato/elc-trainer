(function() {
  addLesson({
    level: "preintermediate",
    lesson: "lesson3",
    name: "Урок 3: Present Continuous Questions and Answers",
    structures: [
      {
        structure: "What is he/she/it _________ing?",
        pattern: ["what", "is"],
        translations: ["Что он/она/оно ______?"],
        examples: [
          "What is he drawing? (Что он рисует?)",
          "What is she sleeping? (Что она спит?)",
          "What is it doing? (Что оно делает?)"
        ],
        id: "what-is-he-she-it-verb-ing",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "He/she/it is (not) _______ing _______.",
        pattern: [],
        translations: ["Он/она/оно (не) ______ ______."],
        examples: [
          "He is drawing a tree. (Он рисует дерево.)",
          "She is not sleeping now. (Она сейчас не спит.)",
          "It is doing homework. (Оно делает домашнюю работу.)"
        ],
        id: "he-she-it-is-not-verb-ing-object",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "What are you/we/they ____________ing?",
        pattern: ["what", "are"],
        translations: ["Что ты/мы/они ______?"],
        examples: [
          "What are you eating? (Что ты ешь?)",
          "What are we watching? (Что мы смотрим?)",
          "What are they doing? (Что они делают?)"
        ],
        id: "what-are-you-we-they-verb-ing",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "You/we/they are (not) _______ing _________.",
        pattern: [],
        translations: ["Ты/мы/они (не) ______ ______."],
        examples: [
          "You are eating a pizza. (Ты ешь пиццу.)",
          "We are not watching a movie. (Мы не смотрим фильм.)",
          "They are sleeping now. (Они сейчас спят.)"
        ],
        id: "you-we-they-are-not-verb-ing-object",
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
        .replace(/isn't/gi, 'is not')
        .replace(/aren't/gi, 'are not')
        .replace(/we're/gi, 'we are')
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
      let minWords = 4; // Для вопроса: What + is/are + he/she/it/you/we/they + глагол
      if (structure.id === "he-she-it-is-not-verb-ing-object") {
        minWords = 3; // He/she/it + is + not (опционально) + глагол
      } else if (structure.id === "you-we-they-are-not-verb-ing-object") {
        minWords = 3; // You/we/they + are + not (опционально) + глагол
      }
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;

      // Исключённые слова (модальные, стативные глаголы и неподходящие)
      const excludedWords = [
        'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought',
        'am', 'is', 'are', 'was', 'were', 'been', 'being', 'has', 'have', 'had', 'does', 'did',
        'like', 'love', 'hate', 'know', 'understand', 'want', 'need', 'believe', 'stand'
      ];

      // Проверяем глагол в форме -ing
      const validateVerbIng = () => {
        console.log('Валидация глагола на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет глагола');
          return false;
        }

        const verb = words[wordIndex];
        if (!verb.endsWith('ing')) {
          console.log('Глагол должен заканчиваться на -ing:', verb);
          return false;
        }

        // Базовая форма глагола (без -ing)
        let baseVerb = verb.slice(0, -3);
        // Учитываем удвоение согласной (например, running → run)
        if (baseVerb.endsWith('n') && verb.endsWith('nning')) {
          baseVerb = baseVerb.slice(0, -1);
        } else if (baseVerb.endsWith('t') && verb.endsWith('tting')) {
          baseVerb = baseVerb.slice(0, -1);
        }
        // Учитываем изменение -ie на -y (например, lying → lie)
        if (baseVerb.endsWith('y') && verb.endsWith('ying')) {
          baseVerb = baseVerb.slice(0, -1) + 'ie';
        }

        if (excludedWords.includes(baseVerb)) {
          console.log('Исключённый глагол:', baseVerb);
          return false;
        }

        wordIndex++;
        return true;
      };

      // Проверяем дополнение (опционально)
      const validateObject = () => {
        console.log('Валидация дополнения на позиции', wordIndex);
        // Дополнение опционально
        if (!words[wordIndex]) {
          console.log('Дополнение отсутствует, допустимо');
          return true;
        }

        // Разрешаем любые слова, кроме исключённых
        while (wordIndex < words.length) {
          const word = words[wordIndex];
          if (excludedWords.includes(word)) {
            console.log('Исключённое слово в дополнении:', word);
            return false;
          }
          wordIndex++;
        }

        return true;
      };

      if (structure.id === "what-is-he-she-it-verb-ing") {
        const expected = ['what', 'is'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!['he', 'she', 'it'].includes(words[wordIndex])) {
          console.log('Ожидалось "he/she/it" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateVerbIng()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "he-she-it-is-not-verb-ing-object") {
        if (!['he', 'she', 'it'].includes(words[wordIndex])) {
          console.log('Ожидалось "he/she/it" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'is') {
          console.log('Ожидалось "is" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] === 'not') {
          wordIndex++;
        }

        if (!validateVerbIng()) return false;

        if (!validateObject()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "what-are-you-we-they-verb-ing") {
        const expected = ['what', 'are'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!['you', 'we', 'they'].includes(words[wordIndex])) {
          console.log('Ожидалось "you/we/they" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateVerbIng()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "you-we-they-are-not-verb-ing-object") {
        if (!['you', 'we', 'they'].includes(words[wordIndex])) {
          console.log('Ожидалось "you/we/they" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'are') {
          console.log('Ожидалось "are" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] === 'not') {
          wordIndex++;
        }

        if (!validateVerbIng()) return false;

        if (!validateObject()) return false;

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
