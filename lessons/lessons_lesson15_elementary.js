(function() {
  addLesson({
    level: "elementary",
    lesson: "lesson15",
    name: "Урок 15: Past Simple Questions with When/Where and Answers",
    structures: [
      {
        structure: "When/Where did I/you/he/she/it/we/they ____________?",
        pattern: ["did"],
        translations: ["Когда/Где я/ты/он/она/оно/мы/они ______?"],
        examples: [
          "When did you go? (Когда ты ходил?)",
          "Where did she go? (Куда она ходила?)",
          "When did they play? (Когда они играли?)",
          "Where did you sleep? (Где ты спал?)",
          "When did you do your homework? (Когда ты делал домашнюю работу?)",
          "When did you eat fish? (Когда ты ел рыбу?)"
        ],
        id: "when-where-did-subject-verb",
        hasVerb: true,
        hasName: false
      },
      {
        structure: "I/you/he/she/it/we/they _______________(ed) _______________.",
        pattern: [],
        translations: ["Я/Ты/Он/Она/Оно/Мы/Они ______ ______."],
        examples: [
          "I went home. (Я ходил домой.)",
          "I ate yesterday. (Я ел вчера.)",
          "I stood on the sofa. (Я стоял на диване.)",
          "I slept at home. (Я спал дома.)",
          "I came yesterday. (Я пришел вчера.)",
          "She had breakfast. (Она завтракала.)",
          "They knew the answer. (Они знали ответ.)",
          "You did your homework. (Ты сделал домашнюю работу.)"
        ],
        id: "subject-past-verb-object",
        hasVerb: true,
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
      let minWords = 4; // Для вопросов: When/Where + did + подлежащее + глагол
      if (structure.id === "subject-past-verb-object") {
        minWords = 2; // Подлежащее + глагол (дополнение опционально)
      }
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;

      // Исключённые слова (модальные, стативные глаголы и неподходящие, кроме "do")
      const excludedWords = [
        'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought',
        'am', 'is', 'are', 'was', 'were', 'been', 'being', 'has', 'have', 'does',
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
        // Проверяем, что глагол не в прошедшем времени
        if (verb.endsWith('ed')) {
          const baseVerb = verb.slice(0, -2);
          if (excludedWords.includes(baseVerb) && baseVerb !== 'do') {
            console.log('Глагол должен быть в базовой форме, а не в прошедшем времени:', verb);
            return false;
          }
        }
        // Разрешаем распространённые глаголы, включая "do" и "eat"
        if (excludedWords.includes(verb) && verb !== 'do') {
          console.log('Исключённый глагол:', verb);
          return false;
        }

        wordIndex++;
        return true;
      };

      // Проверяем глагол в прошедшем времени
      const validatePastVerb = () => {
        console.log('Валидация глагола в прошедшем времени на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет глагола');
          return false;
        }

        const verb = words[wordIndex];
        // Принимаем глаголы, заканчивающиеся на -ed, или любые слова, не являющиеся базовой формой исключённых глаголов
        if (verb.endsWith('ed')) {
          const baseVerb = verb.slice(0, -2);
          if (excludedWords.includes(baseVerb) && baseVerb !== 'do') {
            console.log('Исключённый глагол:', baseVerb);
            return false;
          }
        } else {
          // Для неправильных глаголов проверяем, что это не базовая форма исключённых слов
          const allowedIrregular = ['had', 'did'];
          if (excludedWords.includes(verb) && !allowedIrregular.includes(verb)) {
            console.log('Исключённый глагол:', verb);
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

        // Разрешаем любые слова, кроме исключённых
        while (wordIndex < words.length) {
          const word = words[wordIndex];
          if (excludedWords.includes(word)) {
            console.log('Исключённое слово:', word);
            return false;
          }
          wordIndex++;
        }

        return true;
      };

      if (structure.id === "when-where-did-subject-verb") {
        if (!['when', 'where'].includes(words[wordIndex])) {
          console.log('Ожидалось "when/where" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'did') {
          console.log('Ожидалось "did" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!['i', 'you', 'he', 'she', 'it', 'we', 'they'].includes(words[wordIndex])) {
          console.log('Ожидалось "i/you/he/she/it/we/they" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateBaseVerb()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "subject-past-verb-object") {
        if (!['i', 'you', 'he', 'she', 'it', 'we', 'they'].includes(words[wordIndex])) {
          console.log('Ожидалось "i/you/he/she/it/we/they" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validatePastVerb()) return false;
        return validateObject();
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();
