(function() {
  addLesson({
    level: "elementary",
    lesson: "lesson19",
    name: "Урок 19: Talking About Favourite Foods and Preferences",
    structures: [
      {
        structure: "What’s your favourite ______________?",
        pattern: ["whats", "your", "favourite"],
        translations: ["Какой твой любимый ______?"],
        examples: [
          "What’s your favourite food? (Какая твоя любимая еда?)",
          "What’s your favourite drink? (Какой твой любимый напиток?)",
          "What’s your favourite vegetable? (Какой твой любимый овощ?)"
        ],
        id: "whats-your-favourite-category",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "My favourite _______________ is ____________.",
        pattern: ["my", "favourite"],
        translations: ["Мой любимый ______ — это ______."],
        examples: [
          "My favourite food is pasta. (Моя любимая еда — паста.)",
          "My favourite drink is Cola. (Мой любимый напиток — Кола.)",
          "My favourite vegetable is tomato. (Мой любимый овощ — помидор.)"
        ],
        id: "my-favourite-category-is-item",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Would you like some __________?",
        pattern: ["would", "you", "like", "some"],
        translations: ["Хочешь немного ______?"],
        examples: [
          "Would you like some cheese? (Хочешь немного сыра?)",
          "Would you like some juice? (Хочешь немного сока?)"
        ],
        id: "would-you-like-some-food",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Yes, I would like some ____________.",
        pattern: ["yes", "i", "would", "like", "some"],
        translations: ["Да, я хочу немного ______."],
        examples: [
          "Yes, I would like some cheese. (Да, я хочу немного сыра.)",
          "Yes, I would like some juice. (Да, я хочу немного сока.)"
        ],
        id: "yes-i-would-like-some-food",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "No, I wouldn’t like any ____________.",
        pattern: ["no", "i", "would", "not", "like", "any"],
        translations: ["Нет, я не хочу ______."],
        examples: [
          "No, I wouldn’t like any cheese. (Нет, я не хочу сыра.)",
          "No, I wouldn’t like any juice. (Нет, я не хочу сока.)"
        ],
        id: "no-i-would-not-like-any-food",
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
        .replace(/wouldn't/gi, 'would not')
        .replace(/what's/gi, 'what is')
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
      let minWords = 4; // По умолчанию для вопроса "What’s your favourite"
      if (structure.id === "my-favourite-category-is-item") {
        minWords = 5; // My + favourite + категория + is + минимум 1 слово
      } else if (structure.id === "would-you-like-some-food") {
        minWords = 5; // Would + you + like + some + минимум 1 слово
      } else if (structure.id === "yes-i-would-like-some-food") {
        minWords = 6; // Yes + I + would + like + some + минимум 1 слово
      } else if (structure.id === "no-i-would-not-like-any-food") {
        minWords = 7; // No + I + would + not + like + any + минимум 1 слово
      }
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;

      // Исключённые слова (модальные, стативные глаголы и неподходящие)
      const excludedWords = [
        'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought',
        'am', 'are', 'was', 'were', 'been', 'being', 'has', 'have', 'had', 'does', 'do', 'did'
      ];

      // Проверяем категорию (food, drink, vegetable)
      const validateCategory = () => {
        console.log('Валидация категории на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет категории');
          return false;
        }

        const category = words[wordIndex];
        const validCategories = ['food', 'drink', 'vegetable'];
        if (!validCategories.includes(category)) {
          console.log('Недопустимая категория:', category);
          return false;
        }

        wordIndex++;
        return true;
      };

      // Проверяем элемент (еда, напиток, овощ)
      const validateItem = () => {
        console.log('Валидация элемента на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет элемента');
          return false;
        }

        const item = words[wordIndex];
        // Разрешаем любые слова, кроме исключённых, для гибкости
        if (excludedWords.includes(item)) {
          console.log('Исключённый элемент:', item);
          return false;
        }

        wordIndex++;
        // Разрешаем составные названия (например, "ice cream")
        while (wordIndex < words.length && !excludedWords.includes(words[wordIndex])) {
          wordIndex++;
        }

        return true;
      };

      if (structure.id === "whats-your-favourite-category") {
        const expected = ['what', 'is', 'your', 'favourite'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateCategory()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "my-favourite-category-is-item") {
        const expected = ['my', 'favourite'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateCategory()) return false;

        if (words[wordIndex] !== 'is') {
          console.log('Ожидалось "is" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateItem()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "would-you-like-some-food") {
        const expected = ['would', 'you', 'like', 'some'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateItem()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "yes-i-would-like-some-food") {
        const expected = ['yes', 'i', 'would', 'like', 'some'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateItem()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "no-i-would-not-like-any-food") {
        const expected = ['no', 'i', 'would', 'not', 'like', 'any'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateItem()) return false;

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