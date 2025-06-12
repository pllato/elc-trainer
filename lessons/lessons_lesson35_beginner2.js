(function() {
  addLesson({
    level: "beginner2",
    lesson: "lesson35",
    name: "Урок 35: Are you _____ing? / Yes, I am ____ing / No, I am not ____ing",
    structures: [
      {
        structure: "Are you _____ing?",
        pattern: ["are"],
        translations: ["Ты ______ешь?"],
        examples: [
          "Are you reading? (Ты читаешь?)",
          "Are you working? (Ты работаешь?)",
          "Are you sitting? (Ты сидишь?)",
          "Are you dancing? (Ты танцуешь?)"
        ],
        id: "are-you-verbing",
        hasVerb: true,
        hasName: false
      },
      {
        structure: "Yes, I am ____ing.",
        pattern: ["yes", "am"],
        translations: ["Да, я ______ю."],
        examples: [
          "Yes, I am reading. (Да, я читаю.)",
          "Yes, I'm working. (Да, я работаю.)",
          "Yes, I am sitting. (Да, я сижу.)",
          "Yes, I am dancing. (Да, я танцую.)"
        ],
        id: "yes-i-am-verbing",
        hasVerb: true,
        hasName: false
      },
      {
        structure: "No, I am not ____ing.",
        pattern: ["no", "am", "not"],
        translations: ["Нет, я не ______ю."],
        examples: [
          "No, I am not reading. (Нет, я не читаю.)",
          "No, I'm not working. (Нет, я не работаю.)",
          "No, I am not sitting. (Нет, я не сижу.)",
          "No, I am not dancing. (Нет, я не танцую.)"
        ],
        id: "no-i-am-not-verbing",
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
        .replace(/I'm/gi, 'I am')
        .replace(/aren't/gi, 'are not')
        .replace(/I'm not/gi, 'I am not');
      if (processedText !== text) {
        console.log('Обработаны сокращения:', processedText);
      }
      // Удаляем пунктуацию, нормализуем пробелы и приводим к нижнему регистру
      const cleanedText = processedText.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').toLowerCase().trim();
      console.log('Очищенный текст:', cleanedText);

      const words = cleanedText.split(/\s+/).filter(word => word.length > 0);
      console.log('Разделённые слова:', words);

      if (words.length < 3) {
        console.log('Недостаточно слов (минимум 3):', words.length);
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

      if (structure.id === "are-you-verbing") {
        if (words[wordIndex] !== 'are') {
          console.log('Ожидалось "are" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'you') {
          console.log('Ожидалось "you" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        return validateVerbIng();
      } else if (structure.id === "yes-i-am-verbing") {
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

        if (words[wordIndex] !== 'am') {
          console.log('Ожидалось "am" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        return validateVerbIng();
      } else if (structure.id === "no-i-am-not-verbin") {
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

        if (words[wordIndex] !== 'am') {
          console.log('Ожидалось "am" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'not') {
          console.log('Ожидалось "not" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        return validateVerbIng();
      }

      return false;
    }
  });
})();