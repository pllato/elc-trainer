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
          "Did you drive your car yesterday? (Ты водил машину вчера?)",
          "Did you play football yesterday? (Ты играл в футбол вчера?)",
          "Did you do your homework yesterday? (Ты делал домашнюю работу вчера?)"
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
          "Yes, I drove my car yesterday. (Да, я водил машину вчера.)",
          "Yes, I played football yesterday. (Да, я играл в футбол вчера.)",
          "Yes, I did my homework. (Да, я сделал домашнюю работу.)",
          "Yes, I visited Paris last week. (Да, я посещал Париж на прошлой неделе.)"
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
          "No, I didn’t drive my car yesterday. (Нет, я не водил машину вчера.)",
          "No, I didn’t play football yesterday. (Нет, я не играл в футбол вчера.)",
          "No, I didn’t do my homework. (Нет, я не делал домашнюю работу.)",
          "No, I didn’t visit Paris. (Нет, я не посещал Париж.)"
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
      let minWords = 3; // Подлежащее + глагол + (опциональное дополнение)
      if (structure.id === "did-you-verb-object") {
        minWords = 3; // Did + you + глагол
      } else if (structure.id === "no-i-did-not-verb-object") {
        minWords = 4; // No + I + did + not
      }
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;

      // Исключённые слова (модальные, стативные глаголы и неподходящие, кроме "do")
      const excludedWords = [
        'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought',
        'am', 'is', 'are', 'was', 'were', 'been', 'being', 'has', 'have', 'had', 'does', 'did',
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
        // Разрешаем "do" и проверяем, что глагол не заканчивается на -ed или не является неправильной формой
        const irregularPast = [
          'drank', 'drove', 'ate', 'played', 'visited', 'went', 'saw', 'ran', 'swam', 'wrote',
          'read', 'bought', 'came', 'made', 'took', 'gave', 'did', 'cooked', 'swam', 'met'
        ];
        if ((verb.endsWith('ed') || irregularPast.includes(verb)) && verb !== 'do') {
          console.log('Глагол должен быть в базовой форме, а не в прошедшем времени:', verb);
          return false;
        }
        if (excludedWords.includes(verb) && verb !== 'do') {
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
        // Расширенный список неправильных глаголов, включая "did"
        const irregularPast = [
          'drank', 'drove', 'ate', 'played', 'visited', 'went', 'saw', 'ran', 'swam', 'wrote',
          'read', 'bought', 'came', 'made', 'took', 'gave', 'did', 'cooked', 'swam', 'met'
        ];
        if (!verb.endsWith('ed') && !irregularPast.includes(verb)) {
          console.log('Глагол должен быть в прошедшем времени (ожидалось -ed или неправильная форма):', verb);
          return false;
        }

        const baseVerb = verb.endsWith('ed') ? verb.slice(0, -2) : verb;
        if (excludedWords.includes(baseVerb) && baseVerb !== 'do') {
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
