(function() {
  addLesson({
    level: "elementary",
    lesson: "lesson14",
    name: "Урок 14: Asking and Answering About Birth Dates",
    structures: [
      {
        structure: "When were you born?",
        pattern: ["when", "were", "you", "born"],
        translations: ["Когда ты родился?"],
        examples: [
          "When were you born? (Когда ты родился?)"
        ],
        id: "when-were-you-born",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "I was born on the _________(th) of __________.",
        pattern: ["i", "was", "born", "on", "the"],
        translations: ["Я родился ___ числа ___."],
        examples: [
          "I was born on the 12th of July. (Я родился 12-го июля.)",
          "I was born on the first of January. (Я родился первого января.)",
          "I was born on the 25 of December. (Я родился 25-го декабря.)"
        ],
        id: "i-was-born-on-day-of-month",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "When was she/he born?",
        pattern: ["when", "was", "born"],
        translations: ["Когда она/он родился?"],
        examples: [
          "When was she born? (Когда она родилась?)",
          "When was he born? (Когда он родился?)"
        ],
        id: "when-was-she-he-born",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "She/he was born on the ___________(th) of ___________.",
        pattern: ["was", "born", "on", "the"],
        translations: ["Она/он родился ___ числа ___."],
        examples: [
          "She was born on the 12th of July. (Она родилась 12-го июля.)",
          "He was born on the second of March. (Он родился второго марта.)",
          "She was born on the 30 of August. (Она родилась 30-го августа.)"
        ],
        id: "she-he-was-born-on-day-of-month",
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
      let minWords = 4; // По умолчанию для вопросов
      if (structure.id === "i-was-born-on-day-of-month" || structure.id === "she-he-was-born-on-day-of-month") {
        minWords = 6; // I/she/he + was + born + on + the + день + месяц
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

      // Проверяем день (число или слово)
      const validateDay = () => {
        console.log('Валидация дня на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет дня');
          return false;
        }

        const day = words[wordIndex];
        // Проверяем числовой формат (1–31)
        if (day.match(/^\d{1,2}$/)) {
          const dayNum = parseInt(day);
          if (dayNum < 1 || dayNum > 31) {
            console.log('Недопустимый день:', day);
            return false;
          }
          wordIndex++;
        } else {
          // Проверяем текстовый формат (например, "first", "twelve")
          const validDays = [
            'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth',
            'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth',
            'eighteenth', 'nineteenth', 'twentieth', 'twenty-first', 'twenty-second', 'twenty-third',
            'twenty-fourth', 'twenty-fifth', 'twenty-sixth', 'twenty-seventh', 'twenty-eighth',
            'twenty-ninth', 'thirtieth', 'thirty-first'
          ];
          if (!validDays.includes(day)) {
            console.log('Недопустимый день:', day);
            return false;
          }
          wordIndex++;
        }

        // Проверяем опциональный суффикс (th, st, nd, rd)
        if (words[wordIndex] && ['th', 'st', 'nd', 'rd'].includes(words[wordIndex])) {
          wordIndex++;
        }

        return true;
      };

      // Проверяем месяц
      const validateMonth = () => {
        console.log('Валидация месяца на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет месяца');
          return false;
        }

        const month = words[wordIndex];
        const validMonths = [
          'january', 'february', 'march', 'april', 'may', 'june',
          'july', 'august', 'september', 'october', 'november', 'december'
        ];
        if (!validMonths.includes(month)) {
          console.log('Недопустимый месяц:', month);
          return false;
        }

        wordIndex++;
        return true;
      };

      if (structure.id === "when-were-you-born") {
        const expected = ['when', 'were', 'you', 'born'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "i-was-born-on-day-of-month") {
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

        if (words[wordIndex] !== 'born') {
          console.log('Ожидалось "born" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'on') {
          console.log('Ожидалось "on" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'the') {
          console.log('Ожидалось "the" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateDay()) return false;

        if (words[wordIndex] !== 'of') {
          console.log('Ожидалось "of" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateMonth()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "when-was-she-he-born") {
        if (words[wordIndex] !== 'when') {
          console.log('Ожидалось "when" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'was') {
          console.log('Ожидалось "was" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!['she', 'he'].includes(words[wordIndex])) {
          console.log('Ожидалось "she/he" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'born') {
          console.log('Ожидалось "born" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "she-he-was-born-on-day-of-month") {
        if (!['she', 'he'].includes(words[wordIndex])) {
          console.log('Ожидалось "she/he" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'was') {
          console.log('Ожидалось "was" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'born') {
          console.log('Ожидалось "born" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'on') {
          console.log('Ожидалось "on" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'the') {
          console.log('Ожидалось "the" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateDay()) return false;

        if (words[wordIndex] !== 'of') {
          console.log('Ожидалось "of" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateMonth()) return false;

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