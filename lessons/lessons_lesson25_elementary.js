(function() {
  addLesson({
    level: "elementary",
    lesson: "lesson25",
    name: "Урок 25: Present Perfect Questions with Ever and Frequency",
    structures: [
      {
        structure: "Have you ever _______________(ed)?",
        pattern: ["have", "you", "ever"],
        translations: ["Ты когда-нибудь ______?"],
        examples: [
          "Have you ever watched Titanic? (Ты когда-нибудь смотрел Титаник?)",
          "Have you ever eaten sushi? (Ты когда-нибудь ел суши?)",
          "Have you ever visited Paris? (Ты когда-нибудь посещал Париж?)"
        ],
        id: "have-you-ever-past-participle",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Yes, I have _____________(ed) once/two times/three times.",
        pattern: ["yes", "i", "have"],
        translations: ["Да, я ______ один/два раза/три раза."],
        examples: [
          "Yes, I have watched Titanic once. (Да, я смотрел Титаник один раз.)",
          "Yes, I have eaten sushi two times. (Да, я ел суши два раза.)",
          "Yes, I have visited Paris three times. (Да, я посещал Париж три раза.)"
        ],
        id: "yes-i-have-past-participle-frequency",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "No, I have never ______________(ed).",
        pattern: ["no", "i", "have", "never"],
        translations: ["Нет, я никогда не ______."],
        examples: [
          "No, I have never watched Titanic. (Нет, я никогда не смотрел Титаник.)",
          "No, I have never eaten sushi. (Нет, я никогда не ел суши.)",
          "No, I have never visited Paris. (Нет, я никогда не посещал Париж.)"
        ],
        id: "no-i-have-never-past-participle",
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
      let minWords = 4; // Для вопроса: Have + you + ever + глагол
      if (structure.id === "yes-i-have-past-participle-frequency") {
        minWords = 5; // Yes + I + have + глагол + частота (минимум одно слово)
      } else if (structure.id === "no-i-have-never-past-participle") {
        minWords = 5; // No + I + have + never + глагол
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

      // Проверяем глагол в третьей форме
      const validatePastParticiple = () => {
        console.log('Валидация глагола на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет глагола');
          return false;
        }

        const verb = words[wordIndex];
        // Проверяем регулярные глаголы (-ed) или нерегулярные
        if (!verb.endsWith('ed')) {
          // Для нерегулярных глаголов проверяем, что базовая форма не в excludedWords
          const baseVerb = verb; // Предполагаем, что verb уже в третьей форме
          if (excludedWords.includes(baseVerb)) {
            console.log('Исключённый глагол:', baseVerb);
            return false;
          }
        } else {
          // Для регулярных глаголов проверяем базовую форму (без -ed)
          const baseVerb = verb.slice(0, -2);
          if (excludedWords.includes(baseVerb)) {
            console.log('Исключённый глагол:', baseVerb);
            return false;
          }
        }

        wordIndex++;
        return true;
      };

      // Проверяем дополнение (опционально)
      const validateObject = () => {
        console.log('Валидация дополнения на позиции', wordIndex);
        // Дополнение опционально
        if (!words[wordIndex]) {
          console.log('Дополнение отсутствует, допустимо');
          return true;
        }

        // Разрешаем любые слова, кроме исключённых, до частоты или конца фразы
        while (wordIndex < words.length && !['once', 'two', 'three'].includes(words[wordIndex])) {
          const word = words[wordIndex];
          if (excludedWords.includes(word)) {
            console.log('Исключённое слово в дополнении:', word);
            return false;
          }
          wordIndex++;
        }

        return true;
      };

      // Проверяем частоту (once, two times, three times)
      const validateFrequency = () => {
        console.log('Валидация частоты на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет частоты');
          return false;
        }

        if (words[wordIndex] === 'once') {
          wordIndex++;
          return true;
        } else if (words[wordIndex] === 'two' && words[wordIndex + 1] === 'times') {
          wordIndex += 2;
          return true;
        } else if (words[wordIndex] === 'three' && words[wordIndex + 1] === 'times') {
          wordIndex += 2;
          return true;
        }

        console.log('Недопустимая частота:', words[wordIndex]);
        return false;
      };

      if (structure.id === "have-you-ever-past-participle") {
        const expected = ['have', 'you', 'ever'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validatePastParticiple()) return false;

        if (!validateObject()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "yes-i-have-past-participle-frequency") {
        const expected = ['yes', 'i', 'have'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validatePastParticiple()) return false;

        if (!validateObject()) return false;

        if (!validateFrequency()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "no-i-have-never-past-participle") {
        const expected = ['no', 'i', 'have', 'never'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validatePastParticiple()) return false;

        if (!validateObject()) return false;

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