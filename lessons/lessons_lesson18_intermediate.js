(function() {
  console.log('Загружен Урок 18 Intermediate v1');
  addLesson({
    level: "intermediate",
    lesson: "lesson18_intermediate",
    name: "Урок 18: Opinions and Reasons",
    structures: [
      {
        structure: "Do you think it is _____________ to _____________________?",
        pattern: ["do", "you", "think", "it", "is"],
        translations: ["Считаете ли вы, что это ______ ______?"],
        examples: [
          "Do you think it is important to spend time alone? (Считаете ли вы, что важно проводить время в одиночестве?)",
          "Do you think it is difficult to learn a new language? (Считаете ли вы, что сложно выучить новый язык?)",
          "Do you think it is fun to travel abroad? (Считаете ли вы, что весело путешествовать за границу?)"
        ],
        id: "do-you-think-it-is-adjective-to-infinitive",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "So all in all I guess my answer would have to be _________, because _______.",
        pattern: ["so", "all", "in", "all", "i", "guess", "my", "answer", "would", "have", "to", "be"],
        translations: ["В общем, я полагаю, мой ответ должен быть ______, потому что ______."],
        examples: [
          "So all in all I guess my answer would have to be yes, because it’s relaxing. (В общем, я полагаю, мой ответ должен быть да, потому что это расслабляет.)",
          "So all in all I guess my answer would have to be no, because it’s too challenging. (В общем, я полагаю, мой ответ должен быть нет, потому что это слишком сложно.)",
          "So all in all I guess my answer would have to be yes, because it’s exciting. (В общем, я полагаю, мой ответ должен быть да, потому что это захватывающе.)"
        ],
        id: "so-all-in-all-i-guess",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "So on the whole I suppose the answer has to be _________, because ________.",
        pattern: ["so", "on", "the", "whole", "i", "suppose", "the", "answer", "has", "to", "be"],
        translations: ["В целом, я полагаю, ответ должен быть ______, потому что ______."],
        examples: [
          "So on the whole I suppose the answer has to be yes, because it’s rewarding. (В целом, я полагаю, ответ должен быть да, потому что это приносит удовлетворение.)",
          "So on the whole I suppose the answer has to be no, because it’s too risky. (В целом, я полагаю, ответ должен быть нет, потому что это слишком рискованно.)",
          "So on the whole I suppose the answer has to be yes, because it’s fun. (В целом, я полагаю, ответ должен быть да, потому что это весело.)"
        ],
        id: "so-on-the-whole-i-suppose",
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
        case "do-you-think-it-is-adjective-to-infinitive":
          minWords = 7; // do you think it is important to
          break;
        case "so-all-in-all-i-guess":
          minWords = 13; // so all in all i guess my answer would have to be yes/no
          break;
        case "so-on-the-whole-i-suppose":
          minWords = 12; // so on the whole i suppose the answer has to be yes/no
          break;
        default:
          minWords = 7;
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
      const validAdverbs = ['well', 'better', 'fast', 'slowly', 'quickly', 'carefully', 'a lot', 'much', 'new', 'time', 'alone', 'abroad', 'a', 'the', 'an'];

      // Проверяем прилагательное и глагол в инфинитиве (V1)
      const validateAdjectiveAndInfinitive = () => {
        console.log('Валидация прилагательного и глагола в инфинитиве на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет прилагательного');
          return false;
        }

        const adjective = words[wordIndex];
        console.log('Проверка прилагательного:', adjective);
        if (excludedWords.includes(adjective)) {
          console.log('Исключённое прилагательное:', adjective);
          return false;
        }
        wordIndex++;

        if (!words[wordIndex] || words[wordIndex] !== 'to') {
          console.log('Ожидалось "to" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

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
        while (wordIndex < words.length) {
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

      // Проверяем ответ yes/no и причину
      const validateYesNoAndReason = () => {
        console.log('Валидация ответа yes/no и причины на позиции', wordIndex);
        if (!words[wordIndex] || !['yes', 'no'].includes(words[wordIndex])) {
          console.log('Ожидалось "yes" или "no" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!words[wordIndex] || words[wordIndex] !== 'because') {
          console.log('Ожидалось "because" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        let reasonWords = [];
        while (wordIndex < words.length) {
          reasonWords.push(words[wordIndex]);
          wordIndex++;
        }
        console.log('Причина:', reasonWords);
        if (reasonWords.length === 0) {
          console.log('Причина отсутствует');
          return false;
        }

        return true;
      };

      if (structure.id === "do-you-think-it-is-adjective-to-infinitive") {
        console.log('Начало проверки структуры Do you think it is adjective to infinitive');
        const expectedStart = ['do', 'you', 'think', 'it', 'is'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateAdjectiveAndInfinitive()) return false;

        return true;
      } else if (structure.id === "so-all-in-all-i-guess") {
        console.log('Начало проверки структуры So all in all I guess');
        const expectedStart = ['so', 'all', 'in', 'all', 'i', 'guess', 'my', 'answer', 'would', 'have', 'to', 'be'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateYesNoAndReason()) return false;

        return true;
      } else if (structure.id === "so-on-the-whole-i-suppose") {
        console.log('Начало проверки структуры So on the whole I suppose');
        const expectedStart = ['so', 'on', 'the', 'whole', 'i', 'suppose', 'the', 'answer', 'has', 'to', 'be'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateYesNoAndReason()) return false;

        return true;
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();