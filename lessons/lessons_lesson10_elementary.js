(function() {
  addLesson({
    level: "elementary",
    lesson: "lesson10",
    name: "Урок 10: Asking and Answering about Plural Objects and Locations",
    structures: [
      {
        structure: "Are there any ________ on/in/at __________?",
        pattern: ["are", "there", "any"],
        translations: ["Есть ли какие-либо ______ на/в/у ______?"],
        examples: [
          "Are there any books on the table? (Есть ли книги на столе?)",
          "Are there any apples in the fridge? (Есть ли яблоки в холодильнике?)",
          "Are there any cars at the station? (Есть ли машины на станции?)"
        ],
        id: "are-there-any-noun-on-in-at-location",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Yes, there are some ________ on/in/at __________.",
        pattern: ["yes", "there", "are", "some"],
        translations: ["Да, есть несколько ______ на/в/у ______."],
        examples: [
          "Yes, there are some books on the table. (Да, есть несколько книг на столе.)",
          "Yes, there are some apples in the fridge. (Да, есть несколько яблок в холодильнике.)",
          "Yes, there are some cars at the station. (Да, есть несколько машин на станции.)"
        ],
        id: "yes-there-are-some-noun-on-in-at-location",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "No, there are not any _________ on/in/at __________.",
        pattern: ["no", "there", "are", "not", "any"],
        translations: ["Нет, нет никаких ______ на/в/у ______."],
        examples: [
          "No, there aren’t any books on the table. (Нет, нет никаких книг на столе.)",
          "No, there are not any apples in the fridge. (Нет, нет никаких яблок в холодильнике.)",
          "No, there are not any cars at the station. (Нет, нет никаких машин на станции.)"
        ],
        id: "no-there-are-not-any-noun-on-in-at-location",
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
        .replace(/aren't/gi, 'are not')
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
      let minWords = structure.id === "are-there-any-noun-on-in-at-location" ? 5 : 6;
      if (structure.id === "no-there-are-not-any-noun-on-in-at-location") {
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

      // Проверяем существительное во множественном числе
      const validatePluralNoun = () => {
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

        // Проверяем, что существительное выглядит как множественное число (грубая проверка на -s/es)
        if (!noun.endsWith('s') && !noun.endsWith('es')) {
          console.log('Существительное должно быть во множественном числе (ожидалось -s/es):', noun);
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

      if (structure.id === "are-there-any-noun-on-in-at-location") {
        if (words[wordIndex] !== 'are') {
          console.log('Ожидалось "are" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'there') {
          console.log('Ожидалось "there" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'any') {
          console.log('Ожидалось "any" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validatePluralNoun()) return false;
        return validatePrepositionAndLocation();
      } else if (structure.id === "yes-there-are-some-noun-on-in-at-location") {
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

        if (words[wordIndex] !== 'are') {
          console.log('Ожидалось "are" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'some') {
          console.log('Ожидалось "some" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validatePluralNoun()) return false;
        return validatePrepositionAndLocation();
      } else if (structure.id === "no-there-are-not-any-noun-on-in-at-location") {
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

        if (words[wordIndex] !== 'are') {
          console.log('Ожидалось "are" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'not') {
          console.log('Ожидалось "not" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'any') {
          console.log('Ожидалось "any" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validatePluralNoun()) return false;
        return validatePrepositionAndLocation();
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();