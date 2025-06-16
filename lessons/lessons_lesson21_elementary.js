(function() {
  addLesson({
    level: "elementary",
    lesson: "lesson21",
    name: "Урок 21: Comparative Adjectives with -er",
    structures: [
      {
        structure: "What is ___________(er) than ____________?",
        pattern: ["what", "is"],
        translations: ["Что ______ чем ______?"],
        examples: [
          "What is bigger than Almaty? (Что больше, чем Алматы?)",
          "What is faster than a car? (Что быстрее, чем машина?)",
          "What is taller than John? (Что выше, чем Джон?)"
        ],
        id: "what-is-comparative-than-noun",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "______________ is ______________ (er) than ______________.",
        pattern: [],
        translations: ["______ ______ чем ______."],
        examples: [
          "London is bigger than Almaty. (Лондон больше, чем Алматы.)",
          "A plane is faster than a car. (Самолёт быстрее, чем машина.)",
          "Mary is taller than John. (Мэри выше, чем Джон.)"
        ],
        id: "noun-is-comparative-than-noun",
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
      let minWords = 5; // Для вопроса: What + is + прилагательное + than + существительное
      if (structure.id === "noun-is-comparative-than-noun") {
        minWords = 6; // Существительное + is + прилагательное + than + существительное
      }
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;

      // Исключённые слова (модальные, стативные глаголы и неподходящие)
      const excludedWords = [
        'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought',
        'am', 'is', 'are', 'was', 'were', 'been', 'being', 'has', 'have', 'had', 'does', 'do', 'did'
      ];

      // Проверяем прилагательное в сравнительной степени
      const validateComparativeAdjective = () => {
        console.log('Валидация прилагательного на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет прилагательного');
          return false;
        }

        const adjective = words[wordIndex];
        if (!adjective.endsWith('er')) {
          console.log('Прилагательное должно заканчиваться на -er:', adjective);
          return false;
        }

        // Базовая форма прилагательного (без -er)
        const baseAdjective = adjective.slice(0, -2);
        if (excludedWords.includes(baseAdjective)) {
          console.log('Исключённое прилагательное:', baseAdjective);
          return false;
        }

        wordIndex++;
        return true;
      };

      // Проверяем существительное
      const validateNoun = () => {
        console.log('Валидация существительного на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет существительного');
          return false;
        }

        let noun = words[wordIndex];
        let nounWords = [noun];
        wordIndex++;
        // Разрешаем составные существительные (например, "New York")
        while (wordIndex < words.length && !excludedWords.includes(words[wordIndex]) && words[wordIndex] !== 'than') {
          nounWords.push(words[wordIndex]);
          wordIndex++;
        }

        if (excludedWords.includes(nounWords[0])) {
          console.log('Исключённое существительное:', nounWords.join(' '));
          return false;
        }

        return true;
      };

      if (structure.id === "what-is-comparative-than-noun") {
        const expected = ['what', 'is'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateComparativeAdjective()) return false;

        if (words[wordIndex] !== 'than') {
          console.log('Ожидалось "than" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateNoun()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "noun-is-comparative-than-noun") {
        if (!validateNoun()) return false; // Первое существительное

        if (words[wordIndex] !== 'is') {
          console.log('Ожидалось "is" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateComparativeAdjective()) return false;

        if (words[wordIndex] !== 'than') {
          console.log('Ожидалось "than" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateNoun()) return false; // Второе существительное

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