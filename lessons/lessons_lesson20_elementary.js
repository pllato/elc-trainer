(function() {
  addLesson({
    level: "elementary",
    lesson: "lesson20",
    name: "Урок 20: Making Polite Requests and Responding",
    structures: [
      {
        structure: "Can I have ___________, please.",
        pattern: ["can", "i", "have"],
        translations: ["Можно мне ______, пожалуйста?"],
        examples: [
          "Can I have water, please. (Можно мне воды, пожалуйста?)",
          "Can I have a chair, please. (Можно мне стул, пожалуйста?)",
          "Can I have a pen, please. (Можно мне ручку, пожалуйста?)"
        ],
        id: "can-i-have-item-please",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Yes, sure.",
        pattern: ["yes", "sure"],
        translations: ["Да, конечно."],
        examples: [
          "Yes, sure. (Да, конечно.)"
        ],
        id: "yes-sure",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "No, I’m sorry.",
        pattern: ["no", "i", "am", "sorry"],
        translations: ["Нет, извините."],
        examples: [
          "No, I’m sorry. (Нет, извините.)"
        ],
        id: "no-im-sorry",
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
      let minWords = 2; // Для "Yes, sure"
      if (structure.id === "can-i-have-item-please") {
        minWords = 5; // Can + I + have + минимум 1 слово + please
      } else if (structure.id === "no-im-sorry") {
        minWords = 4; // No + I + am + sorry
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

      // Проверяем элемент (любое слово, кроме исключённых)
      const validateItem = () => {
        console.log('Валидация элемента на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет элемента');
          return false;
        }

        let item = words[wordIndex];
        let itemWords = [item];
        wordIndex++;
        // Разрешаем составные названия (например, "ice cream", "dark blue")
        while (wordIndex < words.length && !excludedWords.includes(words[wordIndex]) && words[wordIndex] !== 'please') {
          itemWords.push(words[wordIndex]);
          wordIndex++;
        }
        item = itemWords.join(' ');

        // Проверяем, что элемент не является исключённым словом
        if (excludedWords.includes(item.split(' ')[0])) {
          console.log('Исключённый элемент:', item);
          return false;
        }

        return true;
      };

      if (structure.id === "can-i-have-item-please") {
        const expected = ['can', 'i', 'have'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateItem()) return false;

        if (words[wordIndex] !== 'please') {
          console.log('Ожидалось "please" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "yes-sure") {
        const expected = ['yes', 'sure'];
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
      } else if (structure.id === "no-im-sorry") {
        const expected = ['no', 'i', 'am', 'sorry'];
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
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();