(function() {
  addLesson({
    level: "preintermediate",
    lesson: "lesson17",
    name: "Урок 17: Present Perfect Continuous",
    structures: [
      {
        structure: "I/you/we/they have been ____ing.",
        pattern: [],
        translations: ["Я/ты/мы/они ______."],
        examples: [
          "I have been working all day. (Я работал весь день.)",
          "You have been studying English. (Ты изучал английский.)",
          "We have been playing football. (Мы играли в футбол.)"
        ],
        id: "i-you-we-they-have-been-ing",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "He/she/it has been ____ing.",
        pattern: [],
        translations: ["Он/она/оно ______."],
        examples: [
          "He has been running in the park. (Он бегал в парке.)",
          "She has been cooking dinner. (Она готовила ужин.)",
          "It has been raining all morning. (Дождь шел всё утро.)"
        ],
        id: "he-she-it-has-been-ing",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "How long have I/you/we/they been ___________ing?",
        pattern: ["how", "long", "have"],
        translations: ["Как долго я/ты/мы/они ______?"],
        examples: [
          "How long have I been working? (Как долго я работал?)",
          "How long have you been studying English? (Как долго ты изучал английский?)",
          "How long have they been playing football? (Как долго они играли в футбол?)"
        ],
        id: "how-long-have-i-you-we-they-been-ing",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "I/you/we/they have been ____________ing for ________ hours.",
        pattern: [],
        translations: ["Я/ты/мы/они ______ в течение ______ часов."],
        examples: [
          "I have been working for two hours. (Я работал два часа.)",
          "You have been studying for three hours. (Ты учился три часа.)",
          "They have been playing for five hours. (Они играли пять часов.)"
        ],
        id: "i-you-we-they-have-been-ing-for-hours",
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
        .replace(/i've/gi, 'i have')
        .replace(/you've/gi, 'you have')
        .replace(/we've/gi, 'we have')
        .replace(/they've/gi, 'they have')
        .replace(/he's/gi, 'he has')
        .replace(/she's/gi, 'she has')
        .replace(/it's/gi, 'it has')
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
      let minWords = 4; // Подлежащее + have/has + been + глагол
      if (structure.id === "how-long-have-i-you-we-they-been-ing") {
        minWords = 5; // How + long + have + подлежащее + been + глагол
      } else if (structure.id === "i-you-we-they-have-been-ing-for-hours") {
        minWords = 6; // Подлежащее + have + been + глагол + for + длительность
      }
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;

      // Исключённые стативные глаголы (не используются в Continuous)
      const excludedVerbs = [
        'be', 'know', 'think', 'love', 'like', 'hate', 'want', 'need', 'own', 'belong',
        'seem', 'appear', 'understand', 'believe', 'remember', 'forget'
      ];

      // Проверяем глагол в форме -ing
      const validateIngVerb = () => {
        console.log('Валидация глагола в форме -ing на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет глагола');
          return false;
        }

        const verb = words[wordIndex];
        console.log('Проверка глагола:', verb);
        if (!verb.endsWith('ing')) {
          console.log('Глагол не в форме -ing:', verb);
          return false;
        }

        const baseVerb = verb.slice(0, -3); // Удаляем -ing
        if (excludedVerbs.includes(baseVerb)) {
          console.log('Исключённый стативный глагол:', baseVerb);
          return false;
        }

        wordIndex++;

        // Проверяем опциональное дополнение
        let actionWords = [];
        let stopWords = ['for'];
        if (structure.id !== "i-you-we-they-have-been-ing-for-hours") {
          stopWords = [];
        }
        while (wordIndex < words.length && !stopWords.includes(words[wordIndex])) {
          const word = words[wordIndex];
          if (excludedVerbs.includes(word) || /^\d+$/.test(word)) {
            console.log('Исключённое слово или число в дополнении:', word);
            return false;
          }
          actionWords.push(word);
          wordIndex++;
        }
        console.log('Дополнение:', actionWords);

        return true;
      };

      // Проверяем длительность (for ________ hours)
      const validateDuration = () => {
        console.log('Валидация длительности на позиции', wordIndex);
        if (wordIndex >= words.length || words[wordIndex] !== 'for') {
          console.log('Ожидалось "for" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!words[wordIndex]) {
          console.log('Нет указания длительности');
          return false;
        }

        const duration = words[wordIndex];
        console.log('Проверка длительности:', duration);
        const validDurations = [
          'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
          '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
        ];
        if (!validDurations.includes(duration)) {
          console.log('Недопустимая длительность:', duration);
          return false;
        }
        wordIndex++;

        if (wordIndex >= words.length || words[wordIndex] !== 'hours') {
          console.log('Ожидалось "hours" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        return true;
      };

      if (structure.id === "i-you-we-they-have-been-ing") {
        console.log('Начало проверки структуры I/you/we/they have been ____ing');
        // Проверяем подлежащее
        if (!['i', 'you', 'we', 'they'].includes(words[wordIndex])) {
          console.log('Ожидалось "i/you/we/they" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        // Проверяем have
        if (wordIndex >= words.length || words[wordIndex] !== 'have') {
          console.log('Ожидалось "have" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        // Проверяем been
        if (wordIndex >= words.length || words[wordIndex] !== 'been') {
          console.log('Ожидалось "been" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateIngVerb()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "he-she-it-has-been-ing") {
        console.log('Начало проверки структуры he/she/it has been ____ing');
        // Проверяем подлежащее
        if (!['he', 'she', 'it'].includes(words[wordIndex])) {
          console.log('Ожидалось "he/she/it" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        // Проверяем has
        if (wordIndex >= words.length || words[wordIndex] !== 'has') {
          console.log('Ожидалось "has" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        // Проверяем been
        if (wordIndex >= words.length || words[wordIndex] !== 'been') {
          console.log('Ожидалось "been" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateIngVerb()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "how-long-have-i-you-we-they-been-ing") {
        console.log('Начало проверки структуры How long have I/you/we/they been ____ing');
        // Проверяем how long have
        const expectedStart = ['how', 'long', 'have'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        // Проверяем подлежащее
        if (!['i', 'you', 'we', 'they'].includes(words[wordIndex])) {
          console.log('Ожидалось "i/you/we/they" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        // Проверяем been
        if (wordIndex >= words.length || words[wordIndex] !== 'been') {
          console.log('Ожидалось "been" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateIngVerb()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "i-you-we-they-have-been-ing-for-hours") {
        console.log('Начало проверки структуры I/you/we/they have been ____ing for ____ hours');
        // Проверяем подлежащее
        if (!['i', 'you', 'we', 'they'].includes(words[wordIndex])) {
          console.log('Ожидалось "i/you/we/they" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        // Проверяем have
        if (wordIndex >= words.length || words[wordIndex] !== 'have') {
          console.log('Ожидалось "have" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        // Проверяем been
        if (wordIndex >= words.length || words[wordIndex] !== 'been') {
          console.log('Ожидалось "been" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateIngVerb()) return false;

        if (!validateDuration()) return false;

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