(function() {
  addLesson({
    level: "elementary",
    lesson: "lesson12",
    name: "Урок 12: Describing Past States with Was/Were",
    structures: [
      {
        structure: "I was (a/an) ____________.",
        pattern: ["i", "was"],
        translations: ["Я был ______."],
        examples: [
          "I was a doctor. (Я был врачом.)",
          "I was 20. (Мне было 20.)",
          "I was funny. (Я был смешным.)",
          "I was at home. (Я был дома.)"
        ],
        id: "i-was-description",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "You were (a/an) ____________.",
        pattern: ["you", "were"],
        translations: ["Ты был/была ______."],
        examples: [
          "You were a doctor. (Ты был врачом.)",
          "You were 20. (Тебе было 20.)",
          "You were funny. (Ты был смешным.)",
          "You were at home. (Ты был дома.)"
        ],
        id: "you-were-description",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "He/she/it was (a/an) __________.",
        pattern: ["was"],
        translations: ["Он/Она/Оно был/была/было ______."],
        examples: [
          "She was a doctor. (Она была врачом.)",
          "He was 20. (Ему было 20.)",
          "It was funny. (Это было смешным.)",
          "She was at home. (Она была дома.)"
        ],
        id: "he-she-it-was-description",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "We/they were __________.",
        pattern: ["were"],
        translations: ["Мы/Они были ______."],
        examples: [
          "We were doctors. (Мы были врачами.)",
          "They were 20. (Им было 20.)",
          "We were funny. (Мы были смешными.)",
          "They were at home. (Они были дома.)"
        ],
        id: "we-they-were-description",
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
      const minWords = structure.id === "we-they-were-description" ? 3 : 3;
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

      // Проверяем описание (существительное, прилагательное, число или место)
      const validateDescription = () => {
        console.log('Валидация описания на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет описания');
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

      if (structure.id === "i-was-description") {
        if (words[wordIndex] !== 'i') {
          console.log('Ожидалось "i" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'was') {
          console.log('Ожидалось "was" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        // Артикль a/an опционален
        if (['a', 'an'].includes(words[wordIndex])) {
          wordIndex++;
        }

        return validateDescription();
      } else if (structure.id === "you-were-description") {
        if (words[wordIndex] !== 'you') {
          console.log('Ожидалось "you" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'were') {
          console.log('Ожидалось "were" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        // Артикль a/an опционален
        if (['a', 'an'].includes(words[wordIndex])) {
          wordIndex++;
        }

        return validateDescription();
      } else if (structure.id === "he-she-it-was-description") {
        if (!['he', 'she', 'it'].includes(words[wordIndex])) {
          console.log('Ожидалось "he/she/it" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'was') {
          console.log('Ожидалось "was" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        // Артикль a/an опционален
        if (['a', 'an'].includes(words[wordIndex])) {
          wordIndex++;
        }

        return validateDescription();
      } else if (structure.id === "we-they-were-description") {
        if (!['we', 'they'].includes(words[wordIndex])) {
          console.log('Ожидалось "we/they" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'were') {
          console.log('Ожидалось "were" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        // Артикль a/an не допускается
        if (['a', 'an'].includes(words[wordIndex])) {
          console.log('Артикль "a/an" не допускается на позиции', wordIndex);
          return false;
        }

        return validateDescription();
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();