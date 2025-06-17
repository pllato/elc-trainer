(function() {
  addLesson({
    level: "preintermediate",
    lesson: "lesson8",
    name: "Урок 8: Questions and Answers with How Many",
    structures: [
      {
        structure: "How many _______ do I/you/we/they ___________?",
        pattern: ["how", "many"],
        translations: ["Сколько ______ я/ты/мы/они ______?"],
        examples: [
          "How many chairs do you need? (Сколько стульев тебе нужно?)",
          "How many cookies do they eat? (Сколько печений они едят?)",
          "How many cars do we have? (Сколько машин у нас есть?)"
        ],
        id: "how-many-noun-do-subject-verb",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "I/You/We/They/My friends _________ ____________.",
        pattern: [],
        translations: ["Я/ты/мы/они/мои друзья ______ ______."],
        examples: [
          "You need two chairs. (Тебе нужно два стула.)",
          "We eat many cookies. (Мы едим много печений.)",
          "My friends have three cars. (Мои друзья имеют три машины.)"
        ],
        id: "subject-verb-quantity-noun",
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
      let minWords = 5; // Для вопроса: How + many + существительное + do + подлежащее + глагол
      if (structure.id === "subject-verb-quantity-noun") {
        minWords = 3; // Подлежащее + глагол + количество/существительное
      }
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;

      // Исключённые слова (модальные, стативные глаголы и неподходящие)
      const excludedWords = [
        'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought',
        'am', 'is', 'are', 'was', 'were', 'been', 'being', 'has', 'had', 'does', 'do', 'did'
      ];

      // Проверяем существительное
      const validateNoun = () => {
        console.log('Валидация существительного на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет существительного');
          return false;
        }

        const noun = words[wordIndex];
        if (excludedWords.includes(noun)) {
          console.log('Исключённое существительное:', noun);
          return false;
        }

        wordIndex++;
        return true;
      };

      // Проверяем глагол (любой, кроме исключённых)
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

      // Проверяем количество и существительное в ответе
      const validateQuantityNoun = () => {
        console.log('Валидация количества и существительного на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет количества');
          return false;
        }

        // Проверяем количество (число, числительное или "many")
        const quantity = words[wordIndex];
        const validQuantities = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'many', 'mini'];
        if (!validQuantities.includes(quantity)) {
          console.log('Недопустимое количество:', quantity);
          return false;
        }
        wordIndex++;

        // Проверяем существительное
        if (!validateNoun()) return false;

        return true;
      };

      if (structure.id === "how-many-noun-do-subject-verb") {
        const expected = ['how', 'many'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateNoun()) return false;

        if (words[wordIndex] !== 'do') {
          console.log('Ожидалось "do" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!['i', 'you', 'we', 'they'].includes(words[wordIndex])) {
          console.log('Ожидалось "i/you/we/they" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateVerb()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "subject-verb-quantity-noun") {
        if (!['i', 'you', 'we', 'they'].includes(words[wordIndex]) && !(words[wordIndex] === 'my' && words[wordIndex + 1] === 'friends')) {
          console.log('Ожидалось "i/you/we/they/my friends" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего', words[wordIndex + 1] || 'ничего');
          return false;
        }
        if (words[wordIndex] === 'my') {
          wordIndex += 2; // Пропускаем "my friends"
        } else {
          wordIndex++;
        }

        if (!validateVerb()) return false;

        if (!validateQuantityNoun()) return false;

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
