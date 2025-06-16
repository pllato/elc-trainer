(function() {
  addLesson({
    level: "elementary",
    lesson: "lesson22",
    name: "Урок 22: Asking for and Giving Directions",
    structures: [
      {
        structure: "Excuse me, Sir/Ma’am, how do I get to _______?",
        pattern: ["excuse", "me"],
        translations: ["Извините, сэр/мадам, как мне попасть в ______?"],
        examples: [
          "Excuse me, Sir, how do I get to the park? (Извините, сэр, как мне попасть в парк?)",
          "Excuse me, Ma’am, how do I get to the station? (Извините, мадам, как мне попасть на вокзал?)",
          "Excuse me, Sir, how do I get to Almaty? (Извините, сэр, как мне попасть в Алматы?)"
        ],
        id: "excuse-me-sir-maam-how-do-i-get-to-place",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "You should go _________.",
        pattern: ["you", "should", "go"],
        translations: ["Вам следует идти ______."],
        examples: [
          "You should go straight. (Вам следует идти прямо.)",
          "You should go to the left. (Вам следует идти налево.)",
          "You should go through the park. (Вам следует идти через парк.)"
        ],
        id: "you-should-go-direction",
        hasVerb: false,
        hasName: false
      }
    ],
    requiredCorrect: 10,
    validateStructure: function(text, structure) {
      console.log('Валидация структуры:', structure.id);
      console.log('Входной текст:', text);
      // Нормализуем "Ma’am" и "everyday"
      let processedText = text
        .replace(/ma’am/gi, 'maam')
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
      let minWords = 7; // Для вопроса: Excuse + me + Sir/Maam + how + do + I + get + to + минимум 1 слово
      if (structure.id === "you-should-go-direction") {
        minWords = 4; // You + should + go + минимум 1 слово
      }
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;

      // Исключённые слова (модальные, стативные глаголы и неподходящие)
      const excludedWords = [
        'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought',
        'am', 'is', 'are', 'was', 'were', 'been', 'being', 'has', 'have', 'had', 'does', 'do', 'did'
      ];

      // Проверяем место (существительное)
      const validatePlace = () => {
        console.log('Валидация места на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет места');
          return false;
        }

        let place = words[wordIndex];
        let placeWords = [place];
        wordIndex++;
        // Разрешаем составные названия (например, "New York")
        while (wordIndex < words.length && !excludedWords.includes(words[wordIndex])) {
          placeWords.push(words[wordIndex]);
          wordIndex++;
        }

        if (excludedWords.includes(placeWords[0])) {
          console.log('Исключённое место:', placeWords.join(' '));
          return false;
        }

        return true;
      };

      // Проверяем указание (фразу)
      const validateDirection = () => {
        console.log('Валидация указания на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет указания');
          return false;
        }

        let direction = words[wordIndex];
        let directionWords = [direction];
        wordIndex++;
        // Разрешаем составные указания (например, "to the left")
        while (wordIndex < words.length && !excludedWords.includes(words[wordIndex])) {
          directionWords.push(words[wordIndex]);
          wordIndex++;
        }

        if (excludedWords.includes(directionWords[0])) {
          console.log('Исключённое указание:', directionWords.join(' '));
          return false;
        }

        return true;
      };

      if (structure.id === "excuse-me-sir-maam-how-do-i-get-to-place") {
        const expected = ['excuse', 'me'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!['sir', 'maam'].includes(words[wordIndex])) {
          console.log('Ожидалось "sir" или "maam" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        const expectedHowDoIGetTo = ['how', 'do', 'i', 'get', 'to'];
        for (let i = 0; i < expectedHowDoIGetTo.length; i++) {
          if (words[wordIndex] !== expectedHowDoIGetTo[i]) {
            console.log(`Ожидалось "${expectedHowDoIGetTo[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validatePlace()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "you-should-go-direction") {
        const expected = ['you', 'should', 'go'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateDirection()) return false;

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