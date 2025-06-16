(function() {
  addLesson({
    level: "elementary",
    lesson: "lesson24",
    name: "Урок 24: Present Perfect with Past Participle",
    structures: [
      {
        structure: "I/You/We/They have ____________________",
        pattern: [],
        translations: ["Я/Ты/Мы/Они ______"],
        examples: [
          "I have done the homework. (Я сделал домашнюю работу.)",
          "You have seen the movie. (Ты видел фильм.)",
          "They have eaten lunch. (Они поели обед.)"
        ],
        id: "i-you-we-they-have-past-participle",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "He/She/It has ________________",
        pattern: ["he", "she", "it"],
        translations: ["Он/Она/Оно ______"],
        examples: [
          "He has done the homework. (Он сделал домашнюю работу.)",
          "She has seen the movie. (Она видела фильм.)",
          "It has eaten lunch. (Оно поело обед.)"
        ],
        id: "he-she-it-has-past-participle",
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
      let minWords = 3; // Подлежащее + have/has + глагол
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

      // Список валидных глаголов в третьей форме (Past Participle)
      const validPastParticiples = [
        'done', 'seen', 'eaten', 'gone', 'written', 'read', 'spoken', 'taken', 'made', 'bought',
        'thought', 'known', 'been', 'had', 'got', 'heard', 'found', 'lost', 'met', 'broken'
      ];

      // Проверяем глагол в третьей форме
      const validatePastParticiple = () => {
        console.log('Валидация глагола на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет глагола');
          return false;
        }

        const verb = words[wordIndex];
        if (!validPastParticiples.includes(verb)) {
          console.log('Недопустимый глагол в третьей форме:', verb);
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

      if (structure.id === "i-you-we-they-have-past-participle") {
        if (!['i', 'you', 'we', 'they'].includes(words[wordIndex])) {
          console.log('Ожидалось "i/you/we/they" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'have') {
          console.log('Ожидалось "have" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validatePastParticiple()) return false;

        return validateObject();
      } else if (structure.id === "he-she-it-has-past-participle") {
        if (!['he', 'she', 'it'].includes(words[wordIndex])) {
          console.log('Ожидалось "he/she/it" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'has') {
          console.log('Ожидалось "has" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validatePastParticiple()) return false;

        return validateObject();
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();