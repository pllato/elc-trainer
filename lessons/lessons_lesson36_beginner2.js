(function() {
  addLesson({
    level: "beginner2",
    lesson: "lesson36",
    name: "Урок 36: Is he/she/it ____ing? / Yes, he/she/it is ____ing / No, he/she/it is not ____ing",
    structures: [
      {
        structure: "Is he/she/it ____ing?",
        pattern: ["is"],
        translations: ["Он/она/оно ______ит?"],
        examples: [
          "Is he reading? (Он читает?)",
          "Is she working? (Она работает?)",
          "Is it sitting? (Оно сидит?)",
          "Is he dancing? (Он танцует?)"
        ],
        id: "is-he-she-it-verbing",
        hasVerb: true,
        hasName: false
      },
      {
        structure: "Yes, he/she/it is ____ing.",
        pattern: ["yes", "is"],
        translations: ["Да, он/она/оно ______ит."],
        examples: [
          "Yes, he is reading. (Да, он читает.)",
          "Yes, she's working. (Да, она работает.)",
          "Yes, it is sitting. (Да, оно сидит.)",
          "Yes, he is dancing. (Да, он танцует.)"
        ],
        id: "yes-he-she-it-is-verbing",
        hasVerb: true,
        hasName: false
      },
      {
        structure: "No, he/she/it is not ____ing.",
        pattern: ["no", "is", "not"],
        translations: ["Нет, он/она/оно не ______ит."],
        examples: [
          "No, he is not reading. (Нет, он не читает.)",
          "No, she's not working. (Нет, она не работает.)",
          "No, it is not sitting. (Нет, оно не сидит.)",
          "No, he isn't dancing. (Нет, он не танцует.)"
        ],
        id: "no-he-she-it-is-not-verbing",
        hasVerb: true,
        hasName: false
      }
    ],
    requiredCorrect: 10,
    validateStructure: function(text, structure) {
      console.log('Валидация структуры:', structure.id);
      console.log('Входной текст:', text);
      // Обрабатываем сокращения
      let processedText = text
        .replace(/he's/gi, 'he is')
        .replace(/she's/gi, 'she is')
        .replace(/it's/gi, 'it is')
        .replace(/he isn't/gi, 'he is not')
        .replace(/she isn't/gi, 'she is not')
        .replace(/it isn't/gi, 'it is not');
      if (processedText !== text) {
        console.log('Обработаны сокращения:', processedText);
      }
      // Удаляем пунктуацию, нормализуем пробелы и приводим к нижнему регистру
      const cleanedText = processedText.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').toLowerCase().trim();
      console.log('Очищенный текст:', cleanedText);

      const words = cleanedText.split(/\s+/).filter(word => word.length > 0);
      console.log('Разделённые слова:', words);

      // Минимальное количество слов для каждой структуры
      const minWords = structure.id === "no-he-she-it-is-not-verbing" ? 4 : 3;
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;

      // Исключённые глаголы (модальные и стативные)
      const excludedWords = [
        'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought',
        'am', 'is', 'are', 'was', 'were', 'been', 'being', 'has', 'have', 'had', 'does', 'did',
        'like', 'love', 'hate', 'know', 'understand', 'want', 'need', 'believe'
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

        if (excludedWords.includes(verb)) {
          console.log('Исключённый глагол:', verb);
          return false;
        }

        wordIndex++;
        // Разрешаем дополнительные слова
        while (wordIndex < words.length) {
          const extraWord = words[wordIndex];
          if (excludedWords.includes(extraWord)) {
            console.log('Исключённое дополнительное слово:', extraWord);
            return false;
          }
          wordIndex++;
        }

        return true;
      };

      if (structure.id === "is-he-she-it-verbing") {
        if (words[wordIndex] !== 'is') {
          console.log('Ожидалось "is" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!['he', 'she', 'it'].includes(words[wordIndex])) {
          console.log('Ожидалось "he/she/it" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        const isValid = validateVerbIng();
        if (isValid) {
          console.log('Валидация пройдена для:', text);
        }
        return isValid;
      } else if (structure.id === "yes-he-she-it-is-verbing") {
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

        if (words[wordIndex] !== 'is') {
          console.log('Ожидалось "is" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        const isValid = validateVerbIng();
        if (isValid) {
          console.log('Валидация пройдена для:', text);
        }
        return isValid;
      } else if (structure.id === "no-he-she-it-is-not-verbing") {
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

        if (words[wordIndex] !== 'is') {
          console.log('Ожидалось "is" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'not') {
          console.log('Ожидалось "not" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        const isValid = validateVerbIng();
        if (isValid) {
          console.log('Валидация пройдена для:', text);
        }
        return isValid;
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();