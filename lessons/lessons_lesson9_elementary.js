(function() {
  addLesson({
    level: "elementary",
    lesson: "lesson9",
    name: "Урок 9: Asking and Answering about Objects and Locations",
    structures: [
      {
        structure: "Is there (a/an) ________ on/in/at __________?",
        pattern: ["is", "there"],
        translations: ["Есть ли ______ на/в/у ______?"],
        examples: [
          "Is there a book on the table? (Есть ли книга на столе?)",
          "Is there an apple in the fridge? (Есть ли яблоко в холодильнике?)",
          "Is there a car at the station? (Есть ли машина на станции?)"
        ],
        id: "is-there-a-an-noun-on-in-at-location",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Yes, there is (a/an) ________ on/in/at __________.",
        pattern: ["yes", "there", "is"],
        translations: ["Да, есть ______ на/в/у ______."],
        examples: [
          "Yes, there is a book on the table. (Да, есть книга на столе.)",
          "Yes, there is an apple in the fridge. (Да, есть яблоко в холодильнике.)",
          "Yes, there is a car at the station. (Да, есть машина на станции.)"
        ],
        id: "yes-there-is-a-an-noun-on-in-at-location",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "No, there is not (a/an) _________ on/in/at __________.",
        pattern: ["no", "there", "is", "not"],
        translations: ["Нет, нет ______ на/в/у ______."],
        examples: [
          "No, there isn’t a book on the table. (Нет, нет книги на столе.)",
          "No, there is not an apple in the fridge. (Нет, нет яблока в холодильнике.)",
          "No, there is not a car at the station. (Нет, нет машины на станции.)"
        ],
        id: "no-there-is-not-a-an-noun-on-in-at-location",
        hasVerb: false,
        hasName: false
      }
    ],
    requiredCorrect: 10,
    validateStructure: function(text, structure) {
      console.log('Валидация структуры:', structure.id);
      console.log('Входной текст:', text);
      // Нормализуем сокращения и "everyday"
      let processedText = text
        .replace(/isn't/gi, 'is not')
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
      let minWords = structure.id === "is-there-a-an-noun-on-in-at-location" ? 5 : 6;
      if (structure.id === "no-there-is-not-a-an-noun-on-in-at-location") {
        minWords = 7;
      }
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

      // Проверяем существительное
      const validateNoun = () => {
        console.log('Валидация существительного на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет существительного');
          return false;
        }

        const noun = words[wordIndex];
        if (excludedWords.includes(noun)) {
          console.log('Исключённое существительное:', noun);
          return false;
        }

        wordIndex++;
        return true;
      };

      // Проверяем предлог и место
      const validatePrepositionAndLocation = () => {
        console.log('Валидация предлога на позиции', wordIndex);
        if (!['on', 'in', 'at'].includes(words[wordIndex])) {
          console.log('Ожидалось "on/in/at" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        console.log('Валидация места на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет места');
          return false;
        }

        // Разрешаем любые слова для места, кроме исключённых
        while (wordIndex < words.length) {
          const word = words[wordIndex];
          if (excludedWords.includes(word)) {
            console.log('Исключённое слово в месте:', word);
            return false;
          }
          wordIndex++;
        }

        return true;
      };

      if (structure.id === "is-there-a-an-noun-on-in-at-location") {
        if (words[wordIndex] !== 'is') {
          console.log('Ожидалось "is" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'there') {
          console.log('Ожидалось "there" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        // Артикль a/an опционален
        if (['a', 'an'].includes(words[wordIndex])) {
          wordIndex++;
        }

        if (!validateNoun()) return false;
        return validatePrepositionAndLocation();
      } else if (structure.id === "yes-there-is-a-an-noun-on-in-at-location") {
        if (words[wordIndex] !== 'yes') {
          console.log('Ожидалось "yes" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'there') {
          console.log('Ожидалось "there" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'is') {
          console.log('Ожидалось "is" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        // Артикль a/an опционален
        if (['a', 'an'].includes(words[wordIndex])) {
          wordIndex++;
        }

        if (!validateNoun()) return false;
        return validatePrepositionAndLocation();
      } else if (structure.id === "no-there-is-not-a-an-noun-on-in-at-location") {
        if (words[wordIndex] !== 'no') {
          console.log('Ожидалось "no" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'there') {
          console.log('Ожидалось "there" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
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

        // Артикль a/an опционален
        if (['a', 'an'].includes(words[wordIndex])) {
          wordIndex++;
        }

        if (!validateNoun()) return false;
        return validatePrepositionAndLocation();
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();