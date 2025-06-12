(function() {
  addLesson({
    level: "beginner2",
    lesson: "lesson40",
    name: "Урок 40: Where/What are you going to _____? / I am going to ______ ________",
    structures: [
      {
        structure: "Where/What are you going to _____?",
        pattern: ["where", "what"],
        translations: ["Где/Что ты собираешься ______?"],
        examples: [
          "Where are you going to read? (Где ты собираешься читать?)",
          "What are you going to buy? (Что ты собираешься купить?)",
          "Where are you going to dance? (Где ты собираешься танцевать?)",
          "What are you going to do? (Что ты собираешься делать?)"
        ],
        id: "where-what-are-you-going-to-verb",
        hasVerb: true,
        hasName: false
      },
      {
        structure: "I am going to ______ ________.",
        pattern: ["am", "going", "to"],
        translations: ["Я собираюсь ______ ________."],
        examples: [
          "I am going to read a book. (Я собираюсь читать книгу.)",
          "I'm going to buy a car. (Я собираюсь купить машину.)",
          "I am going to dance tonight. (Я собираюсь танцевать сегодня вечером.)",
          "I am going to work everyday. (Я собираюсь работать каждый день.)"
        ],
        id: "i-am-going-to-verb-object",
        hasVerb: true,
        hasName: false
      }
    ],
    requiredCorrect: 10,
    validateStructure: function(text, structure) {
      console.log('Валидация структуры:', structure.id);
      console.log('Входной текст:', text);
      // Обрабатываем сокращения
      let processedText = text.replace(/I'm/gi, 'I am');
      if (processedText !== text) {
        console.log('Обработаны сокращения:', processedText);
      }
      // Удаляем пунктуацию, нормализуем пробелы и приводим к нижнему регистру
      const cleanedText = processedText.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').toLowerCase().trim();
      console.log('Очищенный текст:', cleanedText);

      const words = cleanedText.split(/\s+/).filter(word => word.length > 0);
      console.log('Разделённые слова:', words);

      // Минимальное количество слов
      const minWords = structure.id === "where-what-are-you-going-to-verb" ? 5 : 4;
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;

      // Исключённые глаголы (модальные, стативные и неподходящие)
      const excludedWords = [
        'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought',
        'am', 'is', 'are', 'was', 'were', 'been', 'being', 'has', 'have', 'had', 'does', 'did',
        'like', 'love', 'hate', 'know', 'understand', 'want', 'need', 'believe', 'going'
      ];

      // Проверяем глагол в базовой форме (для вопросов)
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

      // Проверяем глагол в базовой форме и дополнение (для ответов)
      const validateBaseVerbAndObject = () => {
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
        // Требуется хотя бы одно дополнительное слово (дополнение)
        if (!words[wordIndex]) {
          console.log('Нет дополнения после глагола');
          return false;
        }

        // Проверяем дополнительные слова
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

      if (structure.id === "where-what-are-you-going-to-verb") {
        if (!['where', 'what'].includes(words[wordIndex])) {
          console.log('Ожидалось "where/what" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

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

        if (words[wordIndex] !== 'going') {
          console.log('Ожидалось "going" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'to') {
          console.log('Ожидалось "to" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        const isValid = validateBaseVerb();
        if (isValid) {
          console.log('Валидация пройдена для:', text);
        }
        return isValid;
      } else if (structure.id === "i-am-going-to-verb-object") {
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

        if (words[wordIndex] !== 'going') {
          console.log('Ожидалось "going" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'to') {
          console.log('Ожидалось "to" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        const isValid = validateBaseVerbAndObject();
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
