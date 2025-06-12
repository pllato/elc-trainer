(function() {
  addLesson({
    level: "beginner2",
    lesson: "lesson37",
    name: "Урок 37: What am/are/is I/you/he/she/it _____ing? / I am _____ing / He/She/It _____ing / We/You/They _____ing",
    structures: [
      {
        structure: "What am/are/is I/you/he/she/it _____ing?",
        pattern: ["what"],
        translations: ["Что я/ты/он/она/оно ______ю/ешь/ит?"],
        examples: [
          "What am I reading? (Что я читаю?)",
          "What are you working? (Что ты работаешь?)",
          "What is he sitting? (Что он сидит?)",
          "What is she dancing? (Что она танцует?)"
        ],
        id: "what-am-are-is-verbing",
        hasVerb: true,
        hasName: false
      },
      {
        structure: "I am _____ing.",
        pattern: ["am"],
        translations: ["Я ______ю."],
        examples: [
          "I am reading. (Я читаю.)",
          "I'm working. (Я работаю.)",
          "I am sitting. (Я сижу.)",
          "I am dancing. (Я танцую.)"
        ],
        id: "i-am-verbing",
        hasVerb: true,
        hasName: false
      },
      {
        structure: "He/She/It _____ing.",
        pattern: ["is"],
        translations: ["Он/Она/Оно ______ит."],
        examples: [
          "He is reading. (Он читает.)",
          "She's working. (Она работает.)",
          "It is sitting. (Оно сидит.)",
          "He is dancing. (Он танцует.)"
        ],
        id: "he-she-it-verbing",
        hasVerb: true,
        hasName: false
      },
      {
        structure: "We/You/They _____ing.",
        pattern: ["are"],
        translations: ["Мы/Вы/Они ______ем/ете/ют."],
        examples: [
          "We are reading. (Мы читаем.)",
          "You are working. (Вы работаете.)",
          "They are sitting. (Они сидят.)",
          "We are dancing. (Мы танцуем.)"
        ],
        id: "we-you-they-verbing",
        hasVerb: true,
        hasName: false
      }
    ],
    requiredCorrect: 10,
    validateStructure: function(text, structure) {
      console.log('Валидация структуры:', structure.id);
      console.log('Входной текст:', text);
      // Обрабатываем сокращения
      let processedText = text
        .replace(/I'm/gi, 'I am')
        .replace(/he's/gi, 'he is')
        .replace(/she's/gi, 'she is')
        .replace(/it's/gi, 'it is')
        .replace(/you're/gi, 'you are')
        .replace(/we're/gi, 'we are')
        .replace(/they're/gi, 'they are');
      if (processedText !== text) {
        console.log('Обработаны сокращения:', processedText);
      }
      // Удаляем пунктуацию, нормализуем пробелы и приводим к нижнему регистру
      const cleanedText = processedText.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').toLowerCase().trim();
      console.log('Очищенный текст:', cleanedText);

      const words = cleanedText.split(/\s+/).filter(word => word.length > 0);
      console.log('Разделённые слова:', words);

      // Минимальное количество слов
      const minWords = structure.id === "what-am-are-is-verbing" ? 4 : 3;
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;

      // Исключённые глаголы (модальные и стативные)
      const excludedWords = [
        'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought',
        'am', 'is', 'are', 'was', 'were', 'been', 'being', 'has', 'have', 'had', 'does', 'did',
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

        if (excludedWords.includes(verb)) {
          console.log('Исключённый глагол:', verb);
          return false;
        }

        wordIndex++;
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

      if (structure.id === "what-am-are-is-verbing") {
        if (words[wordIndex] !== 'what') {
          console.log('Ожидалось "what" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!['am', 'are', 'is'].includes(words[wordIndex])) {
          console.log('Ожидалось "am/are/is" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        const auxVerb = words[wordIndex];
        wordIndex++;

        const pronoun = words[wordIndex];
        if (
          (auxVerb === 'am' && pronoun !== 'i') ||
          (auxVerb === 'are' && !['you', 'we', 'they'].includes(pronoun)) ||
          (auxVerb === 'is' && !['he', 'she', 'it'].includes(pronoun))
        ) {
          console.log(`Ожидалось правильное местоимение для "${auxVerb}" на позиции ${wordIndex}, получено`, pronoun || 'ничего');
          return false;
        }
        wordIndex++;

        const isValid = validateVerbIng();
        if (isValid) {
          console.log('Валидация пройдена для:', text);
        }
        return isValid;
      } else if (structure.id === "i-am-verbing") {
        if (words[wordIndex] !== 'i') {
          console.log('Ожидалось "i" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'am') {
          console.log('Ожидалось "am" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        const isValid = validateVerbIng();
        if (isValid) {
          console.log('Валидация пройдена для:', text);
        }
        return isValid;
      } else if (structure.id === "he-she-it-verbing") {
        if (!['he', 'she', 'it'].includes(words[wordIndex])) {
          console.log('Ожидалось "he/she/it" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'is') {
          console.log('Ожидалось "is" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        const isValid = validateVerbIng();
        if (isValid) {
          console.log('Валидация пройдена для:', text);
        }
        return isValid;
      } else if (structure.id === "we-you-they-verbing") {
        if (!['we', 'you', 'they'].includes(words[wordIndex])) {
          console.log('Ожидалось "we/you/they" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'are') {
          console.log('Ожидалось "are" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        const isValid = validateVerbIng();
        if (isValid) {
          console.log('Валидация пройдена для:', text);
        }
        return isValid;
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();