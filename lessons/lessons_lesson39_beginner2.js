(function() {
  addLesson({
    level: "beginner2",
    lesson: "lesson39",
    name: "Урок 39: I am going to ______ / He/She/It is going to ______ / We/You/They are going to ______",
    structures: [
      {
        structure: "I am going to ______.",
        pattern: ["am", "going", "to"],
        translations: ["Я собираюсь ______."],
        examples: [
          "I am going to read. (Я собираюсь читать.)",
          "I'm going to work. (Я собираюсь работать.)",
          "I am going to dance. (Я собираюсь танцевать.)",
          "I am going to sit. (Я собираюсь сидеть.)"
        ],
        id: "i-am-going-to-verb",
        hasVerb: true,
        hasName: false
      },
      {
        structure: "He/She/It is going to ______.",
        pattern: ["is", "going", "to"],
        translations: ["Он/Она/Оно собирается ______."],
        examples: [
          "He is going to read. (Он собирается читать.)",
          "She's going to work. (Она собирается работать.)",
          "It is going to sit. (Оно собирается сидеть.)",
          "He is going to dance. (Он собирается танцевать.)"
        ],
        id: "he-she-it-is-going-to-verb",
        hasVerb: true,
        hasName: false
      },
      {
        structure: "We/You/They are going to ______.",
        pattern: ["are", "going", "to"],
        translations: ["Мы/Вы/Они собираются ______."],
        examples: [
          "We are going to read. (Мы собираемся читать.)",
          "You're going to work. (Вы собираетесь работать.)",
          "They are going to sit. (Они собираются сидеть.)",
          "We are going to dance. (Мы собираемся танцевать.)"
        ],
        id: "we-you-they-are-going-to-verb",
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
        .replace(/he's/gi, 'he is')
        .replace(/she's/gi, 'she is')
        .replace(/it's/gi, 'it is')
        .replace(/you're/gi, 'you are')
        .replace(/we're/gi, 'we are')
        .replace(/they're/gi, 'they are');
      if (processedText !== text) {
        console.log('Обработаны сокращения:', processedText);
      }
      // Удаляем пунктуацию, нормализуем пробелы и приводим к нижнему регистру
      const cleanedText = processedText.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').toLowerCase().trim();
      console.log('Очищенный текст:', cleanedText);

      const words = cleanedText.split(/\s+/).filter(word => word.length > 0);
      console.log('Разделённые слова:', words);

      // Минимальное количество слов
      const minWords = 4; // местоимение + am/are/is + going + to + глагол
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;

      // Исключённые глаголы (модальные, стативные и неподходящие)
      const excludedWords = [
        'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought',
        'am', 'is', 'are', 'was', 'were', 'been', 'being', 'has', 'have', 'had', 'does', 'do', 'did',
        'like', 'love', 'hate', 'know', 'understand', 'want', 'need', 'believe', 'going'
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

      if (structure.id === "i-am-going-to-verb") {
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

        const isValid = validateBaseVerb();
        if (isValid) {
          console.log('Валидация пройдена для:', text);
        }
        return isValid;
      } else if (structure.id === "he-she-it-is-going-to-verb") {
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
      } else if (structure.id === "we-you-they-are-going-to-verb") {
        if (!['we', 'you', 'they'].includes(words[wordIndex])) {
          console.log('Ожидалось "we/you/they" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'are') {
          console.log('Ожидалось "are" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
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
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();