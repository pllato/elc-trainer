(function() {
  addLesson({
    level: "intermediate",
    lesson: "lesson1",
    name: "Урок 1: First Conditional",
    structures: [
      {
        structure: "If I/you/we/they ______(me/you/they, etc.), I/you/he/she/it/we/they will _________.",
        pattern: ["if"],
        translations: ["Если я/ты/мы/они ______, я/ты/он/она/оно/мы/они ______."],
        examples: [
          "If I see you, I will call you. (Если я увижу тебя, я позвоню тебе.)",
          "If you help them, they will thank you. (Если ты поможешь им, они поблагодарят тебя.)",
          "If we meet him, we will invite him. (Если мы встретим его, мы пригласим его.)"
        ],
        id: "if-i-you-we-they-present-simple-will-base",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "If he/she/it _____s ____(me/you/they, etc.), I/you/he/she/it/we/they will _________.",
        pattern: ["if"],
        translations: ["Если он/она/оно ______, я/ты/он/она/оно/мы/они ______."],
        examples: [
          "If he sees you, he will call you. (Если он увидит тебя, он позвонет тебе.)",
          "If she helps us, we will thank her. (Если она поможет нам, мы поблагодарим её.)",
          "If it rains tomorrow, I will stay home. (Если завтра пойдёт дождь, я останусь дома.)"
        ],
        id: "if-he-she-it-present-simple-s-will-base",
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
        .replace(/i'll/gi, 'i will')
        .replace(/you'll/gi, 'you will')
        .replace(/he'll/gi, 'he will')
        .replace(/she'll/gi, 'she will')
        .replace(/it'll/gi, 'it will')
        .replace(/we'll/gi, 'we will')
        .replace(/they'll/gi, 'they will')
        .replace(/\beveryday\b/gi, 'every day');
      if (processedText !== text) {
        console.log('Обработаны сокращения и everyday:', processedText);
      }
      // Удаляем пунктуацию (кроме запятой), нормализуем пробелы и приводим к нижнему регистру
      const cleanedText = processedText.replace(/[^a-zA-Z0-9\s,]/g, '').replace(/\s+/g, ' ').toLowerCase().trim();
      console.log('Очищенный текст:', cleanedText);

      const words = cleanedText.split(/\s+/).filter(word => word.length > 0);
      console.log('Разделённые слова:', words);

      // Минимальное количество слов
      const minWords = 6; // If + подлежащее + глагол + объект + подлежащее + will + V1
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

      // Допустимые местоимения как дополнение
      const validObjects = ['me', 'you', 'him', 'her', 'it', 'us', 'them'];

      // Проверяем глагол в Present Simple
      const validatePresentSimple = (expectS = false) => {
        console.log('Валидация глагола в Present Simple на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет глагола');
          return false;
        }

        const verb = words[wordIndex];
        console.log('Проверка глагола:', verb);
        if (excludedWords.includes(verb)) {
          console.log('Исключённый глагол:', verb);
          return false;
        }

        // Проверяем окончание -s для he/she/it
        if (expectS) {
          if (!verb.endsWith('s') && verb !== 'has') { // Исключение для "have" → "has"
            console.log('Глагол не заканчивается на -s для he/she/it:', verb);
            return false;
          }
          // Проверяем, что базовая форма валидна
          const baseVerb = verb === 'has' ? 'have' : verb.slice(0, -1);
          if (excludedWords.includes(baseVerb)) {
            console.log('Исключённый базовый глагол:', baseVerb);
            return false;
          }
        } else {
          // Для I/you/we/they не должно быть -s (кроме исключений)
          if (verb.endsWith('s') && verb !== 'pass' && verb !== 'watch') { // Исключения для слов, оканчивающихся на -s
            console.log('Глагол не должен заканчиваться на -s для I/you/we/they:', verb);
            return false;
          }
        }

        wordIndex++;

        // Проверяем обязательное дополнение (объект или другое)
        if (!words[wordIndex]) {
          console.log('Нет дополнения после глагола');
          return false;
        }
        let actionWords = [];
        const validSubjects = ['i', 'you', 'he', 'she', 'it', 'we', 'they'];
        while (wordIndex < words.length && words[wordIndex] !== ',' && !validSubjects.includes(words[wordIndex])) {
          const word = words[wordIndex];
          if (excludedWords.includes(word) && !validObjects.includes(word)) {
            console.log('Исключённое слово в дополнении:', word);
            return false;
          }
          actionWords.push(word);
          wordIndex++;
        }
        console.log('Дополнение:', actionWords);
        if (actionWords.length === 0) {
          console.log('Дополнение отсутствует');
          return false;
        }

        return true;
      };

      // Проверяем глагол в базовой форме (V1)
      const validateBaseVerb = () => {
        console.log('Валидация глагола в базовой форме на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет глагола');
          return false;
        }

        const verb = words[wordIndex];
        console.log('Проверка глагола V1:', verb);
        if (verb.endsWith('ing')) {
          console.log('Глагол не должен быть в форме -ing:', verb);
          return false;
        }
        if (excludedWords.includes(verb)) {
          console.log('Исключённый глагол:', verb);
          return false;
        }

        wordIndex++;

        // Проверяем опциональное дополнение
        let actionWords = [];
        while (wordIndex < words.length) {
          const word = words[wordIndex];
          if (excludedWords.includes(word)) {
            console.log('Исключённое слово в дополнении:', word);
            return false;
          }
          actionWords.push(word);
          wordIndex++;
        }
        console.log('Дополнение для V1:', actionWords);

        return true;
      };

      if (structure.id === "if-i-you-we-they-present-simple-will-base") {
        console.log('Начало проверки структуры If I/you/we/they present simple, ... will base');
        // Проверяем if
        if (wordIndex >= words.length || words[wordIndex] !== 'if') {
          console.log('Ожидалось "if" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        // Проверяем подлежащее
        if (!['i', 'you', 'we', 'they'].includes(words[wordIndex])) {
          console.log('Ожидалось "i/you/we/they" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        const firstSubject = words[wordIndex];
        wordIndex++;

        if (!validatePresentSimple(false)) return false;

        // Проверяем запятую (опционально)
        let hasComma = false;
        if (wordIndex < words.length && words[wordIndex] === ',') {
          hasComma = true;
          wordIndex++;
        }
        console.log('Запятая обнаружена:', hasComma);

        // Проверяем второе подлежащее
        if (!['i', 'you', 'he', 'she', 'it', 'we', 'they'].includes(words[wordIndex])) {
          console.log('Ожидалось подлежащее на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        // Проверяем will
        if (wordIndex >= words.length || words[wordIndex] !== 'will') {
          console.log('Ожидалось "will" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
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
      } else if (structure.id === "if-he-she-it-present-simple-s-will-base") {
        console.log('Начало проверки структуры If he/she/it present simple -s, ... will base');
        // Проверяем if
        if (wordIndex >= words.length || words[wordIndex] !== 'if') {
          console.log('Ожидалось "if" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        // Проверяем подлежащее
        if (!['he', 'she', 'it'].includes(words[wordIndex])) {
          console.log('Ожидалось "he/she/it" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validatePresentSimple(true)) return false;

        // Проверяем запятую (опционально)
        let hasComma = false;
        if (wordIndex < words.length && words[wordIndex] === ',') {
          hasComma = true;
          wordIndex++;
        }
        console.log('Запятая обнаружена:', hasComma);

        // Проверяем второе подлежащее
        if (!['i', 'you', 'he', 'she', 'it', 'we', 'they'].includes(words[wordIndex])) {
          console.log('Ожидалось подлежащее на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        // Проверяем will
        if (wordIndex >= words.length || words[wordIndex] !== 'will') {
          console.log('Ожидалось "will" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
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
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();