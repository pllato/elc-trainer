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
        while (wordIndex < words.length) {
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
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();