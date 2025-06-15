(function() {
  addLesson({
    level: "elementary",
    lesson: "lesson5",
    name: "Урок 5: Present Simple - Regular Actions",
    structures: [
      {
        structure: "I / You / We / They ____________ every day.",
        pattern: [],
        translations: ["Я/Ты/Мы/Они ______ каждый день."],
        examples: [
          "I work every day. (Я работаю каждый день.)",
          "You jump everyday. (Ты прыгаешь каждый день.)",
          "We play every day. (Мы играем каждый день.)",
          "They read every day. (Они читают каждый день.)"
        ],
        id: "i-you-we-they-verb-every-day",
        hasVerb: true,
        hasName: false
      },
      {
        structure: "He / She / It _____________ every day.",
        pattern: [],
        translations: ["Он/Она/Оно ______ каждый день."],
        examples: [
          "She works every day. (Она работает каждый день.)",
          "He jumps everyday. (Он прыгает каждый день.)",
          "It runs every day. (Оно бегает каждый день.)"
        ],
        id: "he-she-it-verbs-every-day",
        hasVerb: true,
        hasName: false
      },
      {
        structure: "I / You / We / They do not (don’t) ___________ every day.",
        pattern: ["do", "not"],
        translations: ["Я/Ты/Мы/Они не ______ каждый день."],
        examples: [
          "I don’t work every day. (Я не работаю каждый день.)",
          "You do not jump everyday. (Ты не прыгаешь каждый день.)",
          "We don’t play every day. (Мы не играем каждый день.)",
          "They do not work everyday. (Они не работают каждый день.)"
        ],
        id: "i-you-we-they-do-not-verb-every-day",
        hasVerb: true,
        hasName: false
      },
      {
        structure: "He / She / It does not (doesn’t) _________ every day.",
        pattern: ["does", "not"],
        translations: ["Он/Она/Оно не ______ каждый день."],
        examples: [
          "She doesn’t work every day. (Она не работает каждый день.)",
          "He does not jump everyday. (Он не прыгает каждый день.)",
          "It doesn’t run every day. (Оно не бегает каждый день.)"
        ],
        id: "he-she-it-does-not-verb-every-day",
        hasVerb: true,
        hasName: false
      },
      {
        structure: "Do I / You / We / They _____________ every day?",
        pattern: ["do"],
        translations: ["______ ли я/ты/мы/они каждый день?"],
        examples: [
          "Do I work every day? (Работаю ли я каждый день?)",
          "Do you jump everyday? (Прыгаешь ли ты каждый день?)",
          "Do we play every day? (Играем ли мы каждый день?)"
        ],
        id: "do-i-you-we-they-verb-every-day",
        hasVerb: true,
        hasName: false
      },
      {
        structure: "Does he/she/it ____________ every day?",
        pattern: ["does"],
        translations: ["______ ли он/она/оно каждый день?"],
        examples: [
          "Does she work every day? (Работает ли она каждый день?)",
          "Does he jump everyday? (Прыгает ли он каждый день?)",
          "Does it run every day? (Бегает ли оно каждый день?)"
        ],
        id: "does-he-she-it-verb-every-day",
        hasVerb: true,
        hasName: false
      }
    ],
    requiredCorrect: 10,
    validateStructure: function(text, structure) {
      console.log('Валидация структуры:', structure.id);
      console.log('Входной текст:', text);
      // Обрабатываем сокращения и нормализуем "everyday"
      let processedText = text
        .replace(/don't/gi, 'do not')
        .replace(/doesn't/gi, 'does not')
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
      let minWords = 3; // Местоимение + глагол + everyday/every day
      if (structure.id.includes('do-not') || structure.id.includes('does-not')) {
        minWords = 4; // Местоимение + do/does + not + глагол + everyday/every day
      } else if (structure.id.includes('do-') || structure.id.includes('does-')) {
        minWords = 4; // Do/Does + местоимение + глагол + everyday/every day
      }
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;

      // Исключённые глаголы (модальные, стативные и неподходящие)
      const excludedWords = [
        'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought',
        'am', 'is', 'are', 'was', 'were', 'been', 'being', 'has', 'have', 'had', 'does', 'do', 'did',
        'like', 'love', 'hate', 'know', 'understand', 'want', 'need', 'believe'
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
        return true;
      };

      // Проверяем глагол с окончанием -s/es
      const validateSVerb = () => {
        console.log('Валидация глагола с -s/es на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет глагола');
          return false;
        }

        const verb = words[wordIndex];
        if (!verb.endsWith('s') && !verb.endsWith('es')) {
          console.log('Глагол должен заканчиваться на -s/es:', verb);
          return false;
        }

        const baseVerb = verb.endsWith('es') ? verb.slice(0, -2) : verb.slice(0, -1);
        if (excludedWords.includes(baseVerb)) {
          console.log('Исключённый глагол:', baseVerb);
          return false;
        }

        wordIndex++;
        return true;
      };

      // Проверяем "every day" или "everyday" в конце
      const validateEveryDay = () => {
        if (words[wordIndex] === 'every' && words[wordIndex + 1] === 'day') {
          wordIndex += 2;
        } else if (words[wordIndex] === 'everyday') {
          wordIndex++;
        } else {
          console.log('Ожидалось "every day" или "everyday" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }

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

      if (structure.id === "i-you-we-they-verb-every-day") {
        if (!['i', 'you', 'we', 'they'].includes(words[wordIndex])) {
          console.log('Ожидалось "i/you/we/they" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateBaseVerb()) return false;
        return validateEveryDay();
      } else if (structure.id === "he-she-it-verbs-every-day") {
        if (!['he', 'she', 'it'].includes(words[wordIndex])) {
          console.log('Ожидалось "he/she/it" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateSVerb()) return false;
        return validateEveryDay();
      } else if (structure.id === "i-you-we-they-do-not-verb-every-day") {
        if (!['i', 'you', 'we', 'they'].includes(words[wordIndex])) {
          console.log('Ожидалось "i/you/we/they" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'do') {
          console.log('Ожидалось "do" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'not') {
          console.log('Ожидалось "not" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateBaseVerb()) return false;
        return validateEveryDay();
      } else if (structure.id === "he-she-it-does-not-verb-every-day") {
        if (!['he', 'she', 'it'].includes(words[wordIndex])) {
          console.log('Ожидалось "he/she/it" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'does') {
          console.log('Ожидалось "does" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'not') {
          console.log('Ожидалось "not" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateBaseVerb()) return false;
        return validateEveryDay();
      } else if (structure.id === "do-i-you-we-they-verb-every-day") {
        if (words[wordIndex] !== 'do') {
          console.log('Ожидалось "do" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!['i', 'you', 'we', 'they'].includes(words[wordIndex])) {
          console.log('Ожидалось "i/you/we/they" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateBaseVerb()) return false;
        return validateEveryDay();
      } else if (structure.id === "does-he-she-it-verb-every-day") {
        if (words[wordIndex] !== 'does') {
          console.log('Ожидалось "does" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!['he', 'she', 'it'].includes(words[wordIndex])) {
          console.log('Ожидалось "he/she/it" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateBaseVerb()) return false;
        return validateEveryDay();
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();
