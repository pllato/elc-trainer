(function() {
  addLesson({
    level: "elementary",
    lesson: "lesson7",
    name: "Урок 7: Asking and Telling the Time",
    structures: [
      {
        structure: "Excuse me. Can you tell me the time, please?",
        pattern: ["excuse", "me", "can", "you", "tell", "me", "the", "time", "please"],
        translations: ["Извините, не подскажете, который час?"],
        examples: [
          "Excuse me. Can you tell me the time, please? (Извините, не подскажете, который час?)"
        ],
        id: "excuse-me-can-you-tell-me-the-time-please",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Yes, of course. It’s _____________________.",
        pattern: ["yes", "of", "course", "its"],
        translations: ["Да, конечно. Сейчас ______."],
        examples: [
          "Yes, of course. It’s just after six o’clock. (Да, конечно. Сейчас чуть позже шести часов.)",
          "Yes, of course. It’s half past seven. (Да, конечно. Сейчас полвосьмого.)",
          "Yes, of course. It’s 7:00. (Да, конечно. Сейчас семь часов.)",
          "Yes, of course. It’s 4:45. (Да, конечно. Сейчас без пятнадцати пять.)",
          "Yes, of course. It’s 10. (Да, конечно. Сейчас десять часов.)"
        ],
        id: "yes-of-course-its-time",
        hasVerb: false,
        hasName: false
      }
    ],
    requiredCorrect: 10,
    validateStructure: function(text, structure) {
      console.log('Валидация структуры:', structure.id);
      console.log('Входной текст:', text);
      // Нормализуем "it is" и "everyday"
      let processedText = text
        .replace(/it is/gi, 'its')
        .replace(/\beveryday\b/gi, 'every day');
      if (processedText !== text) {
        console.log('Обработаны it is и everyday:', processedText);
      }
      // Удаляем пунктуацию (кроме двоеточия для времени), нормализуем пробелы и приводим к нижнему регистру
      const cleanedText = processedText.replace(/[^a-zA-Z0-9\s:]/g, '').replace(/\s+/g, ' ').toLowerCase().trim();
      console.log('Очищенный текст:', cleanedText);

      const words = cleanedText.split(/\s+/).filter(word => word.length > 0);
      console.log('Разделённые слова:', words);

      // Минимальное количество слов
      let minWords = structure.id === "excuse-me-can-you-tell-me-the-time-please" ? 9 : 5;
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

      // Проверяем временное выражение
      const validateTimeExpression = () => {
        console.log('Валидация временного выражения на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет временного выражения');
          return false;
        }

        // Проверяем числовой формат (например, "7:00", "4:45") или одиночное число (например, "10")
        if (words[wordIndex].match(/^\d{1,2}:\d{2}$/) || words[wordIndex].match(/^[1-9]|1[0-2]$/)) {
          wordIndex++;
        } else {
          // Разрешаем любые слова, кроме исключённых
          while (wordIndex < words.length) {
            const word = words[wordIndex];
            if (excludedWords.includes(word)) {
              console.log('Исключённое слово:', word);
              return false;
            }
            wordIndex++;
          }
        }

        return true;
      };

      if (structure.id === "excuse-me-can-you-tell-me-the-time-please") {
        const expected = ['excuse', 'me', 'can', 'you', 'tell', 'me', 'the', 'time', 'please'];
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
      } else if (structure.id === "yes-of-course-its-time") {
        if (words[wordIndex] !== 'yes') {
          console.log('Ожидалось "yes" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'of') {
          console.log('Ожидалось "of" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'course') {
          console.log('Ожидалось "course" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'its') {
          console.log('Ожидалось "its" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateTimeExpression()) return false;

        console.log('Валидация пройдена для:', text);
        return true;
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();
