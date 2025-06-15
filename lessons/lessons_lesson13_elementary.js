(function() {
  addLesson({
    level: "elementary",
    lesson: "lesson13",
    name: "Урок 13: Past Simple Questions and Answers with Did",
    structures: [
      {
        structure: "Did you _________ ___________?",
        pattern: ["did", "you"],
        translations: ["Ты ______ ______?"],
        examples: [
          "Did you drink tea yesterday? (Ты пил чай вчера?)",
          "Did you play football last week? (Ты играл в футбол на прошлой неделе?)",
          "Did you visit Paris last year? (Ты посещал Париж в прошлом году?)"
        ],
        id: "did-you-verb-object",
        hasVerb: true,
        hasName: false
      },
      {
        structure: "Yes, I _________(ed) ____________.",
        pattern: ["yes", "i"],
        translations: ["Да, я ______ ______."],
        examples: [
          "Yes, I drank tea yesterday. (Да, я пил чай вчера.)",
          "Yes, I played football last week. (Да, я играл в футбол на прошлой неделе.)",
          "Yes, I visited Paris last year. (Да, я посещал Париж в прошлом году.)"
        ],
        id: "yes-i-past-verb-object",
        hasVerb: true,
        hasName: false
      },
      {
        structure: "No, I did not __________ __________.",
        pattern: ["no", "i", "did", "not"],
        translations: ["Нет, я не ______ ______."],
        examples: [
          "No, I didn’t drink tea yesterday. (Нет, я не пил чай вчера.)",
          "No, I did not play football last week. (Нет, я не играл в футбол на прошлой неделе.)",
          "No, I did not visit Paris last year. (Нет, я не посещал Париж в прошлом году.)"
        ],
        id: "no-i-did-not-verb-object",
        hasVerb: true,
        hasName: false
      }
    ],
    requiredCorrect: 10,
    validateStructure: function(text, structure) {
      console.log('Валидация структуры:', structure.id);
      console.log('Входной текст:', text);
      // Нормализуем сокращения и "everyday"
      let processedText = text
        .replace(/didn't/gi, 'did not')
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
      let minWords = structure.id === "did-you-verb-object" ? 4 : 5;
      if (structure.id === "no-i-did-not-verb-object") {
        minWords = 6;
      }
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;

      // Исключённые слова (модальные, стативные глаголы и неподходящие)
      const excludedWords = [
        'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought',
        'am', 'is', 'are', 'was', 'were', 'been', 'being', 'has', 'have', 'had', 'does', 'do', 'did',
        'like', 'love', 'hate', 'know', 'understand', 'want', 'need', 'believe'
      ];

      // Проверяем глагол в базовой форме
      const validateBaseVerb = () => {
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

      // Проверяем глагол в прошедшем времени
      const validatePastVerb = () => {
        console.log('Валидация глагола в прошедшем времени на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет глагола');
          return false;
        }

        const verb = words[wordIndex];
        // Грубая проверка на прошедшее время: заканчивается на -ed или известный неправильный глагол
        const irregularPast = ['drank', 'played', 'visited', 'went', 'saw', 'ate', 'ran', 'swam', 'wrote', 'read'];
        if (!verb.endsWith('ed') && !irregularPast.includes(verb)) {
          console.log('Глагол должен быть в прошедшем времени (ожидалось -ed или неправильная форма):', verb);
          return false;
        }

        const baseVerb = verb.endsWith('ed') ? verb.slice(0, -2) : verb;
        if (excludedWords.includes(baseVerb)) {
          console.log('Исключённый глагол:', baseVerb);
          return false;
        }

        wordIndex++;
        return true;
      };

      // Проверяем дополнение
      const validateObject = () => {
        console.log('Валидация дополнения на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет дополнения');
          return false;
        }

        // Разрешаем любые слова, кроме исключённых
        while (wordIndex < words.length) {
          const word = words[wordIndex];
          if (excludedWords.includes(word)) {
            console.log('Исключённое слово:', word);
            return false;
          }
          wordIndex++;
        }

        return true;
      };

      if (structure.id === "did-you-verb-object") {
        if (words[wordIndex] !== 'did') {
          console.log('Ожидалось "did" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'you') {
          console.log('Ожидалось "you" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateBaseVerb()) return false;
        return validateObject();
      } else if (structure.id === "yes-i-past-verb-object") {
        if (words[wordIndex] !== 'yes') {
          console.log('Ожидалось "yes" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'i') {
          console.log('Ожидалось "i" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validatePastVerb()) return false;
        return validateObject();
      } else if (structure.id === "no-i-did-not-verb-object") {
        if (words[wordIndex] !== 'no') {
          console.log('Ожидалось "no" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'i') {
          console.log('Ожидалось "i" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'did') {
          console.log('Ожидалось "did" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'not') {
          console.log('Ожидалось "not" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateBaseVerb()) return false;
        return validateObject();
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();