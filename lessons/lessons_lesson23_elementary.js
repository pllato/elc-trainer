(function() {
  addLesson({
    level: "elementary",
    lesson: "lesson23",
    name: "Урок 23: Present Continuous Questions and Answers",
    structures: [
      {
        structure: "Are you _________ing?",
        pattern: ["are", "you"],
        translations: ["Ты ______?"],
        examples: [
          "Are you eating? (Ты ешь?)",
          "Are you running? (Ты бежишь?)",
          "Are you reading? (Ты читаешь?)"
        ],
        id: "are-you-verb-ing",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Yes, I am _________ing.",
        pattern: ["yes", "i", "am"],
        translations: ["Да, я ______."],
        examples: [
          "Yes, I am eating. (Да, я ем.)",
          "Yes, I am running. (Да, я бегу.)",
          "Yes, I am reading. (Да, я читаю.)"
        ],
        id: "yes-i-am-verb-ing",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "No, I am not _________ing.",
        pattern: ["no", "i", "am", "not"],
        translations: ["Нет, я не ______."],
        examples: [
          "No, I am not eating. (Нет, я не ем.)",
          "No, I am not running. (Нет, я не бегу.)",
          "No, I am not reading. (Нет, я не читаю.)"
        ],
        id: "no-i-am-not-verb-ing",
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
        .replace(/i'm/gi, 'i am')
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
      let minWords = 3; // Для вопроса: Are + you + глагол
      if (structure.id === "yes-i-am-verb-ing") {
        minWords = 4; // Yes + I + am + глагол
      } else if (structure.id === "no-i-am-not-verb-ing") {
        minWords = 5; // No + I + am + not + глагол
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

      // Проверяем глагол в форме -ing
      const validateVerbIng = () => {
        console.log('Валидация глагола на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет глагола');
          return false;
        }

        const verb = words[wordIndex];
        if (!verb.endsWith('ing')) {
          console.log('Глагол должен заканчиваться на -ing:', verb);
          return false;
        }

        // Базовая форма глагола (без -ing)
        const baseVerb = verb.slice(0, -3);
        if (excludedWords.includes(baseVerb)) {
          console.log('Исключённый глагол:', baseVerb);
          return false;
        }

        wordIndex++;
        return true;
      };

      if (structure.id === "are-you-verb-ing") {
        const expected = ['are', 'you'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateVerbIng()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "yes-i-am-verb-ing") {
        const expected = ['yes', 'i', 'am'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateVerbIng()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "no-i-am-not-verb-ing") {
        const expected = ['no', 'i', 'am', 'not'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateVerbIng()) return false;

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