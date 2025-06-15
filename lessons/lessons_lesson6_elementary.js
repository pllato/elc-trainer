(function() {
  addLesson({
    level: "elementary",
    lesson: "lesson6",
    name: "Урок 6: Questions and Answers with Does - He/She/It",
    structures: [
      {
        structure: "Does he/she/it ________ _____________?",
        pattern: ["does"],
        translations: ["______ ли он/она/оно ______?"],
        examples: [
          "Does she live in Australia? (Живёт ли она в Австралии?)",
          "Does he work in London? (Работает ли он в Лондоне?)",
          "Does it run fast? (Бегает ли оно быстро?)"
        ],
        id: "does-he-she-it-verb-object",
        hasVerb: true,
        hasName: false
      },
      {
        structure: "Yes, he/she/it does.",
        pattern: ["yes", "does"],
        translations: ["Да, он/она/оно ______."],
        examples: [
          "Yes, she does. (Да, живёт.) Example question: Does she live in Australia?",
          "Yes, he does. (Да, работает.) Example question: Does he work in London?"
        ],
        id: "yes-he-she-it-does",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "No, he/she/it doesn’t.",
        pattern: ["no", "doesn’t"],
        translations: ["Нет, он/она/оно не ______."],
        examples: [
          "No, she doesn’t. (Нет, не живёт.) Example question: Does she live in Australia?",
          "No, he doesn’t. (Нет, не работает.) Example question: Does he work in London?"
        ],
        id: "no-he-she-it-doesnt",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Where does he/she/it ________?",
        pattern: ["where", "does"],
        translations: ["Где ______ он/она/оно?"],
        examples: [
          "Where does he live? (Где он живёт?)",
          "Where does she work? (Где она работает?)",
          "Where does it sleep? (Где оно спит?)"
        ],
        id: "where-does-he-she-it-verb",
        hasVerb: true,
        hasName: false
      },
      {
        structure: "He/She/It _________ _____________.",
        pattern: [],
        translations: ["Он/Она/Оно ______ ______."],
        examples: [
          "She lives in Australia. (Она живёт в Австралии.) Example question: Where does she live?",
          "He works in London. (Он работает в Лондоне.) Example question: Where does he work?",
          "It runs in the park. (Оно бегает в парке.) Example question: Where does it run?"
        ],
        id: "he-she-it-verbs-object",
        hasVerb: true,
        hasName: false
      }
    ],
    requiredCorrect: 10,
    validateStructure: function(text, structure) {
      console.log('Валидация структуры:', structure.id);
      console.log('Входной текст:', text);
      // Обрабатываем сокращения и нормализуем "everyday"
      let processedText = text
        .replace(/doesn't/gi, 'does not')
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
      let minWords = 4; // По умолчанию для большинства структур
      if (structure.id === "yes-he-she-it-does" || structure.id === "no-he-she-it-doesnt") {
        minWords = 3; // Yes/No + he/she/it + does/does not
      } else if (structure.id === "where-does-he-she-it-verb") {
        minWords = 4; // Where + does + he/she/it + глагол
      }
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;

      // Исключённые глаголы (модальные, стативные и неподходящие)
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

      // Проверяем глагол с окончанием -s/es
      const validateSVerb = () => {
        console.log('Валидация глагола с -s/es на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет глагола');
          return false;
        }

        const verb = words[wordIndex];
        if (!verb.endsWith('s') && !verb.endsWith('es')) {
          console.log('Глагол должен заканчиваться на -s/es:', verb);
          return false;
        }

        const baseVerb = verb.endsWith('es') ? verb.slice(0, -2) : verb.slice(0, -1);
        if (excludedWords.includes(baseVerb)) {
          console.log('Исключённый глагол:', baseVerb);
          return false;
        }

        wordIndex++;
        return true;
      };

      // Проверяем наличие дополнения (обязательно минимум одно слово)
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

      if (structure.id === "does-he-she-it-verb-object") {
        if (words[wordIndex] !== 'does') {
          console.log('Ожидалось "does" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!['he', 'she', 'it'].includes(words[wordIndex])) {
          console.log('Ожидалось "he/she/it" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateBaseVerb()) return false;
        return validateObject();
      } else if (structure.id === "yes-he-she-it-does") {
        if (words[wordIndex] !== 'yes') {
          console.log('Ожидалось "yes" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!['he', 'she', 'it'].includes(words[wordIndex])) {
          console.log('Ожидалось "he/she/it" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'does') {
          console.log('Ожидалось "does" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "no-he-she-it-doesnt") {
        if (words[wordIndex] !== 'no') {
          console.log('Ожидалось "no" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!['he', 'she', 'it'].includes(words[wordIndex])) {
          console.log('Ожидалось "he/she/it" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'does' || words[wordIndex + 1] !== 'not') {
          console.log('Ожидалось "does not" на позициях', wordIndex, wordIndex + 1, ', получено', words[wordIndex] || 'ничего', words[wordIndex + 1] || 'ничего');
          return false;
        }
        wordIndex += 2;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "where-does-he-she-it-verb") {
        if (words[wordIndex] !== 'where') {
          console.log('Ожидалось "where" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'does') {
          console.log('Ожидалось "does" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!['he', 'she', 'it'].includes(words[wordIndex])) {
          console.log('Ожидалось "he/she/it" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateBaseVerb()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "he-she-it-verbs-object") {
        if (!['he', 'she', 'it'].includes(words[wordIndex])) {
          console.log('Ожидалось "he/she/it" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateSVerb()) return false;
        return validateObject();
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();