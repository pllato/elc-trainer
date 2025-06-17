(function() {
  addLesson({
    level: "preintermediate",
    lesson: "lesson9",
    name: "Урок 9: Questions and Answers with How Much",
    structures: [
      {
        structure: "How much _______ do I/you/we/they ___________?",
        pattern: ["how", "much"],
        translations: ["Сколько ______ я/ты/мы/они ______?"],
        examples: [
          "How much milk do you need? (Сколько молока тебе нужно?)",
          "How much water do we want? (Сколько воды мы хотим?)",
          "How much sugar do they have? (Сколько сахара у них есть?)"
        ],
        id: "how-much-noun-do-subject-verb",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "I/You/We/They/My friends _________ ________________.",
        pattern: [],
        translations: ["Я/ты/мы/они/мои друзья ______ ______."],
        examples: [
          "You need a bottle of milk. (Тебе нужна бутылка молока.)",
          "We want a lot of water. (Мы хотим много воды.)",
          "My friends have a little sugar. (Мои друзья имеют немного сахара.)"
        ],
        id: "subject-verb-quantity-noun",
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
      let minWords = 5; // Для вопроса: How + much + существительное + do + подлежащее + глагол
      if (structure.id === "subject-verb-quantity-noun") {
        minWords = 3; // Подлежащее + глагол + количество/существительное
      }
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;

      // Исключённые слова (модальные, стативные глаголы и неподходящие)
      const excludedWords = [
        'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought',
        'am', 'is', 'are', 'was', 'were', 'been', 'being', 'has', 'had', 'does', 'did'
      ];

      // Проверяем неисчисляемое существительное
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

      // Проверяем глагол (любой, кроме исключённых)
      const validateVerb = () => {
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

      // Проверяем количество и существительное в ответе
      const validateQuantityNoun = () => {
        console.log('Валидация количества и существительного на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет количества');
          return false;
        }

        // Проверяем количество (число, числительное, "many", "much", "some", или составные фразы)
        let quantityWords = [];
        let isComposite = false;

        // Проверяем составные выражения (a lot of, lots of, a little, a bit of)
        if (wordIndex + 2 < words.length && words[wordIndex] === 'a' && words[wordIndex + 1] === 'lot' && words[wordIndex + 2] === 'of') {
          quantityWords.push('a', 'lot', 'of');
          wordIndex += 3;
          isComposite = true;
        } else if (wordIndex + 1 < words.length && words[wordIndex] === 'lots' && words[wordIndex + 1] === 'of') {
          quantityWords.push('lots', 'of');
          wordIndex += 2;
          isComposite = true;
        } else if (wordIndex + 2 < words.length && words[wordIndex] === 'a' && words[wordIndex + 1] === 'little' && words[wordIndex + 2] === 'of') {
          quantityWords.push('a', 'little', 'of');
          wordIndex += 3;
          isComposite = true;
        } else if (wordIndex + 2 < words.length && words[wordIndex] === 'a' && words[wordIndex + 1] === 'bit' && words[wordIndex + 2] === 'of') {
          quantityWords.push('a', 'bit', 'of');
          wordIndex += 3;
          isComposite = true;
        } else if (wordIndex + 2 < words.length && words[wordIndex] === 'a' && ['bottle', 'cup', 'glass'].includes(words[wordIndex + 1]) && words[wordIndex + 2] === 'of') {
          quantityWords.push('a', words[wordIndex + 1], 'of');
          wordIndex += 3;
          isComposite = true;
        } else {
          // Проверяем одиночные слова или числа
          const word = words[wordIndex];
          if (excludedWords.includes(word)) {
            console.log('Исключённое слово в количестве:', word);
            return false;
          }
          const validQuantities = ['many', 'much', 'some', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
          if (validQuantities.includes(word) || /^\d+$/.test(word)) {
            quantityWords.push(word);
            wordIndex++;
          } else {
            console.log('Недопустимое количество:', word);
            return false;
          }
        }

        // Проверяем существительное после количества
        if (isComposite) {
          if (!validateNoun()) return false;
        } else {
          // Для одиночных количеств существительное уже проверено или является последним словом
          if (wordIndex < words.length && !validateNoun()) return false;
        }

        return true;
      };

      if (structure.id === "how-much-noun-do-subject-verb") {
        const expected = ['how', 'much'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateNoun()) return false;

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

        if (!validateVerb()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "subject-verb-quantity-noun") {
        if (!['i', 'you', 'we', 'they'].includes(words[wordIndex]) && !(words[wordIndex] === 'my' && words[wordIndex + 1] === 'friends')) {
          console.log('Ожидалось "i/you/we/they/my friends" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего', words[wordIndex + 1] || 'ничего');
          return false;
        }
        if (words[wordIndex] === 'my') {
          wordIndex += 2; // Пропускаем "my friends"
        } else {
          wordIndex++;
        }

        if (!validateVerb()) return false;

        if (!validateQuantityNoun()) return false;

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
