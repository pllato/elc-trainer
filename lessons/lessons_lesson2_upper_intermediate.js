(function() {
  console.log('Загружен Урок 2 Upper-Intermediate v1');
  addLesson({
    level: "upper_intermediate",
    lesson: "lesson2_upper_intermediate",
    name: "Урок 2: Expressing Preferences",
    structures: [
      {
        structure: "I prefer __________ to ________",
        pattern: ["i", "prefer"],
        translations: ["Я предпочитаю ______ ______"],
        examples: [
          "I prefer watching TV to going out. (Я предпочитаю смотреть телевизор, а не гулять.)",
          "I prefer reading books to playing video games. (Я предпочитаю читать книги, а не играть в видеоигры.)",
          "I prefer staying home to traveling abroad. (Я предпочитаю оставаться дома, а не путешествовать за границу.)"
        ],
        id: "i-prefer-gerund-to-gerund",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "I would prefer to ______ than ______",
        pattern: ["i", "would", "prefer", "to"],
        translations: ["Я бы предпочёл ______ вместо ______"],
        examples: [
          "I would prefer to eat at home rather than go to a restaurant. (Я бы предпочёл есть дома, а не ходить в ресторан.)",
          "I would prefer to work remotely rather than commute to the office. (Я бы предпочёл работать удалённо, а не ездить в офис.)",
          "I would prefer to read a book rather than watch a movie. (Я бы предпочёл читать книгу, а не смотреть фильм.)"
        ],
        id: "i-would-prefer-to-infinitive",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "I would rather _____ than _____",
        pattern: ["i", "would", "rather"],
        translations: ["Я бы лучше ______ чем ______"],
        examples: [
          "I would rather look for a new flat than stay in this house any longer. (Я бы лучше искал новую квартиру, чем оставался в этом доме.)",
          "I would rather walk to work than drive in traffic. (Я бы лучше шёл пешком на работу, чем ехал в пробке.)",
          "I would rather learn online than attend classes in person. (Я бы лучше учился онлайн, чем посещал занятия лично.)"
        ],
        id: "i-would-rather-infinitive",
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
        .replace(/i'd/gi, 'i would')
        .replace(/don't/gi, 'do not')
        .replace(/dont/gi, 'do not')
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
      let minWords;
      switch (structure.id) {
        case "i-prefer-gerund-to-gerund":
          minWords = 5; // i prefer watching to going
          break;
        case "i-would-prefer-to-infinitive":
          minWords = 7; // i would prefer to eat rather than go
          break;
        case "i-would-rather-infinitive":
          minWords = 6; // i would rather look than stay
          break;
        default:
          minWords = 5;
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

      // Допустимые наречия и слова для дополнений
      const validAdverbs = ['well', 'better', 'fast', 'slowly', 'quickly', 'carefully', 'a lot', 'much', 'tv', 'out', 'books', 'video', 'games', 'home', 'abroad', 'in', 'traffic', 'online', 'classes', 'a', 'the', 'an'];

      // Проверяем герундий (V-ing)
      const validateGerund = () => {
        console.log('Валидация герундия на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет герундия');
          return false;
        }

        const gerund = words[wordIndex];
        console.log('Проверка герундия:', gerund);
        if (!gerund.endsWith('ing') || excludedolympus://www.englishclub.com/grammar/gerund.htm) excludedWords.includes(gerund)) {
          console.log('Глагол не является герундием или исключён:', gerund);
          return false;
        }

        wordIndex++;

        // Проверяем опциональное дополнение
        let actionWords = [];
        while (wordIndex < words.length && words[wordIndex] !== 'to') {
          const word = words[wordIndex];
          if (excludedWords.includes(word) && !validAdverbs.includes(word)) {
            console.log('Исключённое слово в дополнении:', word);
            return false;
          }
          actionWords.push(word);
          wordIndex++;
        }
        console.log('Дополнение:', actionWords);

        return true;
      };

      // Проверяем инфинитив (V1)
      const validateInfinitive = () => {
        console.log('Валидация инфинитива на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет глагола');
          return false;
        }

        const verb = words[wordIndex];
        console.log('Проверка глагола V1:', verb);
        if (excludedWords.includes(verb)) {
          console.log('Исключённый глагол:', verb);
          return false;
        }

        wordIndex++;

        // Проверяем опциональное дополнение
        let actionWords = [];
        while (wordIndex < words.length && (structure.id === "i-would-prefer-to-infinitive" ? words[wordIndex] !== 'rather' : words[wordIndex] !== 'than')) {
          const word = words[wordIndex];
          if (excludedWords.includes(word) && !validAdverbs.includes(word)) {
            console.log('Исключённое слово в дополнении:', word);
            return false;
          }
          actionWords.push(word);
          wordIndex++;
        }
        console.log('Дополнение:', actionWords);

        return true;
      };

      if (structure.id === "i-prefer-gerund-to-gerund") {
        console.log('Начало проверки структуры I prefer gerund to gerund');
        const expectedStart = ['i', 'prefer'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateGerund()) return false;

        if (!words[wordIndex] || words[wordIndex] !== 'to') {
          console.log('Ожидалось "to" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateGerund()) return false;

        return true;
      } else if (structure.id === "i-would-prefer-to-infinitive") {
        console.log('Начало проверки структуры I would prefer to infinitive');
        const expectedStart = ['i', 'would', 'prefer', 'to'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateInfinitive()) return false;

        if (!words[wordIndex] || words[wordIndex] !== 'rather') {
          console.log('Ожидалось "rather" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!words[wordIndex] || words[wordIndex] !== 'than') {
          console.log('Ожидалось "than" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateInfinitive()) return false;

        return true;
      } else if (structure.id === "i-would-rather-infinitive") {
        console.log('Начало проверки структуры I would rather infinitive');
        const expectedStart = ['i', 'would', 'rather'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateInfinitive()) return false;

        if (!words[wordIndex] || words[wordIndex] !== 'than') {
          console.log('Ожидалось "than" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateInfinitive()) return false;

        return true;
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();