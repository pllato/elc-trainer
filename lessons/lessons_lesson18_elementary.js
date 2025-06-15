(function() {
  addLesson({
    level: "elementary",
    lesson: "lesson18",
    name: "Урок 18: Expressing Opinions",
    structures: [
      {
        structure: "From my point of view ______",
        pattern: ["from", "my", "point", "of", "view"],
        translations: ["С моей точки зрения ______"],
        examples: [
          "From my point of view, learning English is fun. (С моей точки зрения, изучение английского — это весело.)",
          "From my point of view, summer is the best season. (С моей точки зрения, лето — лучшее время года.)"
        ],
        id: "from-my-point-of-view-sentence",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "I think/believe that ________",
        pattern: ["i"],
        translations: ["Я думаю/считаю, что ______"],
        examples: [
          "I think that reading books is important. (Я думаю, что чтение книг важно.)",
          "I believe that everyone can learn a new language. (Я считаю, что каждый может выучить новый язык.)"
        ],
        id: "i-think-believe-that-sentence",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "In my opinion, ______",
        pattern: ["in", "my", "opinion"],
        translations: ["По моему мнению, ______"],
        examples: [
          "In my opinion, traveling is exciting. (По моему мнению, путешествия — это захватывающе.)",
          "In my opinion, dogs are better than cats. (По моему мнению, собаки лучше кошек.)"
        ],
        id: "in-my-opinion-sentence",
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
      let minWords = 6; // Устанавливаем минимум 6 слов для осмысленного предложения
      if (structure.id === "from-my-point-of-view-sentence") {
        minWords = 6; // From + my + point + of + view + минимум 1 слово
      } else if (structure.id === "i-think-believe-that-sentence") {
        minWords = 5; // I + think/believe + that + минимум 2 слова
      } else if (structure.id === "in-my-opinion-sentence") {
        minWords = 5; // In + my + opinion + минимум 2 слова
      }
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;

      // Исключённые слова (модальные, стативные глаголы и неподходящие)
      const excludedWords = [
        'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought'
      ];

      // Проверяем предложение (минимальная проверка на осмысленность)
      const validateSentence = () => {
        console.log('Валидация предложения на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет слов для предложения');
          return false;
        }

        // Разрешаем любые слова, кроме исключённых модальных глаголов
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

      if (structure.id === "from-my-point-of-view-sentence") {
        const expected = ['from', 'my', 'point', 'of', 'view'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        return validateSentence();
      } else if (structure.id === "i-think-believe-that-sentence") {
        if (words[wordIndex] !== 'i') {
          console.log('Ожидалось "i" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!['think', 'believe'].includes(words[wordIndex])) {
          console.log('Ожидалось "think/believe" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'that') {
          console.log('Ожидалось "that" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        return validateSentence();
      } else if (structure.id === "in-my-opinion-sentence") {
        const expected = ['in', 'my', 'opinion'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        return validateSentence();
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();