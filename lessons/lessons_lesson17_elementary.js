(function() {
  addLesson({
    level: "elementary",
    lesson: "lesson17",
    name: "Урок 17: Asking and Answering About the Current Date",
    structures: [
      {
        structure: "What is the date today?",
        pattern: ["what", "is", "the", "date", "today"],
        translations: ["Какой сегодня день?"],
        examples: [
          "What is the date today? (Какой сегодня день?)"
        ],
        id: "what-is-the-date-today",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Today is the _____________ of ________.",
        pattern: ["today", "is", "the"],
        translations: ["Сегодня ___ число ___."],
        examples: [
          "Today is the 15th of May. (Сегодня 15-е мая.)",
          "Today is the first of January. (Сегодня первое января.)",
          "Today is the 31st of December. (Сегодня 31-е декабря.)"
        ],
        id: "today-is-the-day-of-month",
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
      let minWords = 5; // Для вопроса: What + is + the + date + today
      if (structure.id === "today-is-the-day-of-month") {
        minWords = 5; // Today + is + the + день + месяц
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

        let day = words[wordIndex];
        // Удаляем суффиксы (th, st, nd, rd) для проверки числа
        if (day.endsWith('th') || day.endsWith('st') || day.endsWith('nd') || day.endsWith('rd')) {
          day = day.slice(0, -2);
          wordIndex++;
        } else {
          wordIndex++;
        }

        // Проверяем числовой формат (1–31)
        if (day.match(/^\d{1,2}$/)) {
          const dayNum = parseInt(day);
          if (dayNum < 1 || dayNum > 31) {
            console.log('Недопустимый день:', day);
            return false;
          }
        } else {
          // Проверяем текстовый формат (например, "first", "fifteenth")
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

      if (structure.id === "what-is-the-date-today") {
        const expected = ['what', 'is', 'the', 'date', 'today'];
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
      } else if (structure.id === "today-is-the-day-of-month") {
        if (words[wordIndex] !== 'today') {
          console.log('Ожидалось "today" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'is') {
          console.log('Ожидалось "is" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'the') {
          console.log('Ожидалось "the" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateDay()) return false;

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