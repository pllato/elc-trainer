(function() {
  addLesson({
    level: "elementary",
    lesson: "lesson4",
    name: "Урок 4: How much is a/the ___________? / It is _____.",
    structures: [
      {
        structure: "How much is a/the ___________?",
        pattern: ["how", "much", "is"],
        translations: ["Сколько стоит ______?"],
        examples: [
          "How much is a hamburger? (Сколько стоит гамбургер?) Example answer: It is 7 pounds",
          "How much is a coffee? (Сколько стоит кофе?) Example answer: It is 3 pounds",
          "How much is the car? (Сколько стоит машина?) Example answer: It is 20000 pounds",
          "How much is a cup of tea? (Сколько стоит чашка чая?) Example answer: It is 2 pounds",
          "How much is a dog? (Сколько стоит собака?) Example answer: It is 500 pounds",
          "How much is a fish? (Сколько стоит рыба?) Example answer: It is 5 pounds"
        ],
        id: "how-much-is-a-the-noun",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "It is _____.",
        pattern: ["it", "is"],
        translations: ["Это ______."],
        examples: [
          "It is 7 pounds. (Это 7 фунтов.) Example question: How much is a hamburger?",
          "It is 3 pounds. (Это 3 фунта.) Example question: How much is a coffee?",
          "It is expensive. (Это дорого.) Example question: How much is the car?",
          "It is 2 pounds. (Это 2 фунта.) Example question: How much is a cup of tea?"
        ],
        id: "it-is-description",
        hasVerb: false,
        hasName: false
      }
    ],
    requiredCorrect: 10,
    validateStructure: function(text, structure) {
      console.log('Валидация структуры:', structure.id);
      console.log('Входной текст:', text);
      // Удаляем пунктуацию, нормализуем пробелы и приводим к нижнему регистру
      const cleanedText = text.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').toLowerCase().trim();
      console.log('Очищенный текст:', cleanedText);

      const words = cleanedText.split(/\s+/).filter(word => word.length > 0);
      console.log('Разделённые слова:', words);

      // Минимальное количество слов
      const minWords = structure.id === "how-much-is-a-the-noun" ? 5 : 3;
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;

      // Исключённые слова (модальные, стативные глаголы и неподходящие)
      const excludedWords = [
        'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought',
        'am', 'is', 'are', 'was', 'were', 'been', 'being', 'has', 'have', 'had', 'does', 'do', 'did',
        'like', 'love', 'hate', 'know', 'understand', 'want', 'need', 'believe', 'going'
      ];

      if (structure.id === "how-much-is-a-the-noun") {
        if (words[wordIndex] !== 'how') {
          console.log('Ожидалось "how" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'much') {
          console.log('Ожидалось "much" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'is') {
          console.log('Ожидалось "is" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!['a', 'the'].includes(words[wordIndex])) {
          console.log('Ожидалось "a/the" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        // Разрешаем любое слово или фразу, исключая неподходящие
        if (!words[wordIndex]) {
          console.log('Ожидалось существительное или фраза на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }

        // Проверяем все оставшиеся слова
        while (wordIndex < words.length) {
          const word = words[wordIndex];
          if (excludedWords.includes(word)) {
            console.log('Исключённое слово:', word);
            return false;
          }
          wordIndex++;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "it-is-description") {
        if (words[wordIndex] !== 'it') {
          console.log('Ожидалось "it" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'is') {
          console.log('Ожидалось "is" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        // Разрешаем любое слово или фразу, исключая неподходящие
        if (!words[wordIndex]) {
          console.log('Ожидалось описание или цена на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }

        // Проверяем все оставшиеся слова
        while (wordIndex < words.length) {
          const word = words[wordIndex];
          if (excludedWords.includes(word)) {
            console.log('Исключённое слово:', word);
            return false;
          }
          wordIndex++;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();
