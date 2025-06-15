(function() {
  addLesson({
    level: "elementary",
    lesson: "lesson19",
    name: "Урок 19: Talking About Favourite Foods, Drinks, Vegetables, Colors, and More",
    structures: [
      {
        structure: "What’s your favourite ______________?",
        pattern: ["whats", "your", "favourite"],
        translations: ["Какой твой любимый ______?"],
        examples: [
          "What’s your favourite food? (Какая твоя любимая еда?)",
          "What’s your favourite drink? (Какой твой любимый напиток?)",
          "What’s your favourite vegetable? (Какой твой любимый овощ?)",
          "What’s your favourite color? (Какой твой любимый цвет?)",
          "What’s your favourite car? (Какая твоя любимая машина?)",
          "What’s your favourite pen? (Какая твоя любимая ручка?)",
          "What’s your favourite box? (Какая твоя любимая коробка?)"
        ],
        id: "whats-your-favourite-category",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "My favourite _______________ is ________.",
        pattern: ["my", "favourite"],
        translations: ["Мой любимый ______ — это ______."],
        examples: [
          "My favourite food is pasta. (Моя любимая еда — паста.)",
          "My favourite drink is Cola. (Мой любимый напиток — Кола.)",
          "My favourite vegetable is tomato. (Мой любимый овощ — помидор.)",
          "My favourite color is black. (Мой любимый цвет — чёрный.)",
          "My favourite car is BMW. (Моя любимая машина — БМВ.)",
          "My favourite car is blue. (Моя любимая машина — синяя.)",
          "My favourite pen is ballpoint. (Моя любимая ручка — шариковая.)",
          "My favourite box is wooden. (Моя любимая коробка — деревянная.)",
          "My favourite box is square. (Моя любимая коробка — квадратная.)"
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
          "Would you like some juice? (Хочешь немного сока?)",
          "Would you like some coffee? (Хочешь немного кофе?)",
          "Would you like some bread? (Хочешь немного хлеба?)"
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
          "Yes, I would like some juice. (Да, я хочу немного сока.)",
          "Yes, I would like some coffee. (Да, я хочу немного кофе.)",
          "Yes, I would like some bread. (Да, я хочу немного хлеба.)"
        ],
        id: "yes-i-would-like-some-food",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "I would like some ____________.",
        pattern: ["i", "would", "like", "some"],
        translations: ["Я хочу немного ______."],
        examples: [
          "I would like some cheese. (Я хочу немного сыра.)",
          "I would like some juice. (Я хочу немного сока.)",
          "I would like some coffee. (Я хочу немного кофе.)",
          "I would like some bread. (Я хочу немного хлеба.)"
        ],
        id: "i-would-like-some-food",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "No, I wouldn’t like any ____________.",
        pattern: ["no", "i", "would", "not", "like", "any"],
        translations: ["Нет, я не хочу ______."],
        examples: [
          "No, I wouldn’t like any cheese. (Нет, я не хочу сыра.)",
          "No, I wouldn’t like any juice. (Нет, я не хочу сока.)",
          "No, I wouldn’t like any coffee. (Нет, я не хочу кофе.)",
          "No, I wouldn’t like any bread. (Нет, я не хочу хлеба.)"
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
        .replace(/favorite/gi, 'favourite')
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
      } else if (structure.id === "i-would-like-some-food") {
        minWords = 5; // I + would + like + some + минимум 1 слово
      } else if (structure.id === "no-i-would-not-like-any-food") {
        minWords = 7; // No + I + would + not + like + any + минимум 1 слово
      }
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;
      let currentCategory = null;

      // Исключённые слова (модальные, стативные глаголы и неподходящие)
      const excludedWords = [
        'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought',
        'am', 'are', 'was', 'were', 'been', 'being', 'has', 'have', 'had', 'does', 'do', 'did'
      ];

      // Допустимые элементы для каждой категории
      const validItems = {
        food: ['pasta', 'pizza', 'burger', 'ice cream', 'cheese', 'bread', 'cake'],
        drink: ['cola', 'juice', 'water', 'tea', 'coffee', 'milk'],
        vegetable: ['tomato', 'carrot', 'cucumber', 'potato', 'onion'],
        color: ['black', 'blue', 'red', 'green', 'yellow', 'white', 'purple', 'orange'],
        car: ['bmw', 'toyota', 'ford', 'mercedes', 'tesla', 'black', 'blue', 'red', 'green', 'yellow', 'white'],
        pen: ['ballpoint', 'fountain', 'gel', 'marker', 'black', 'blue', 'red'],
        box: ['wooden', 'cardboard', 'metal', 'plastic', 'square', 'black', 'blue', 'red']
      };

      // Проверяем категорию (food, drink, vegetable, color, car, pen, box)
      const validateCategory = () => {
        console.log('Валидация категории на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет категории');
          return false;
        }

        const category = words[wordIndex];
        const validCategories = ['food', 'drink', 'vegetable', 'color', 'car', 'pen', 'box'];
        if (!validCategories.includes(category)) {
          console.log('Недопустимая категория:', category);
          return false;
        }

        currentCategory = category; // Сохраняем категорию для проверки элемента
        wordIndex++;
        return true;
      };

      // Проверяем элемент (еда, напиток, овощ, цвет, машина, ручка, коробка)
      const validateItem = (restrictToFoodDrink = false) => {
        console.log('Валидация элемента на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет элемента');
          return false;
        }

        let item = words[wordIndex];
        let itemWords = [item];
        wordIndex++;
        // Разрешаем составные названия (например, "ice cream", "dark blue")
        while (wordIndex < words.length && !excludedWords.includes(words[wordIndex])) {
          itemWords.push(words[wordIndex]);
          wordIndex++;
        }
        item = itemWords.join(' ');

        // Для структур, связанных с едой/напитками, ограничиваем список
        if (restrictToFoodDrink) {
          const allowedItems = [...validItems.food, ...validItems.drink];
          if (!allowedItems.includes(item)) {
            console.log('Недопустимый элемент для еды/напитка:', item);
            return false;
          }
        } else {
          // Для "my favourite", проверяем соответствие категории
          if (!currentCategory) {
            console.log('Категория не определена');
            return false;
          }
          if (!validItems[currentCategory].includes(item)) {
            console.log(`Недопустимый элемент для категории ${currentCategory}:`, item);
            return false;
          }
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

        if (!validateItem(true)) return false;

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

        if (!validateItem(true)) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "i-would-like-some-food") {
        const expected = ['i', 'would', 'like', 'some'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateItem(true)) return false;

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

        if (!validateItem(true)) return false;

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
