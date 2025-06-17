(function() {
  addLesson({
    level: "preintermediate",
    lesson: "lesson4",
    name: "Урок 4: Have Got/Has Got for Possession",
    structures: [
      {
        structure: "I/You/We/They have got __________.",
        pattern: [],
        translations: ["У меня/тебя/нас/их есть ______."],
        examples: [
          "I have got 2 sisters. (У меня есть 2 сестры.)",
          "You have got a new car. (У тебя есть новая машина.)",
          "They have got a dog. (У них есть собака.)"
        ],
        id: "i-you-we-they-have-got-object",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Have you/we/they got __________?",
        pattern: ["have"],
        translations: ["Есть ли у тебя/нас/их ______?"],
        examples: [
          "Have you got a new car? (Есть ли у тебя новая машина?)",
          "Have we got a dog? (Есть ли у нас собака?)",
          "Have they got 2 sisters? (Есть ли у них 2 сестры?)"
        ],
        id: "have-you-we-they-got-object",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Yes, I/you/we/they have got _____________.",
        pattern: ["yes"],
        translations: ["Да, у меня/тебя/нас/их есть ______."],
        examples: [
          "Yes, I have got a new car. (Да, у меня есть новая машина.)",
          "Yes, you have got a dog. (Да, у тебя есть собака.)",
          "Yes, we have got 2 sisters. (Да, у нас есть 2 сестры.)"
        ],
        id: "yes-i-you-we-they-have-got-object",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "No, I/you/we/they have not got _____________.",
        pattern: ["no"],
        translations: ["Нет, у меня/тебя/нас/их нет ______."],
        examples: [
          "No, I have not got a new car. (Нет, у меня нет новой машины.)",
          "No, you have not got a dog. (Нет, у тебя нет собаки.)",
          "No, we have not got 2 sisters. (Нет, у нас нет 2 сестёр.)"
        ],
        id: "no-i-you-we-they-have-not-got-object",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "She/He/It has got ___________.",
        pattern: [],
        translations: ["У неё/него/этого есть ______."],
        examples: [
          "She has got a dog. (У неё есть собака.)",
          "He has got a new car. (У него есть новая машина.)",
          "It has got 2 sisters. (У этого есть 2 сестры.)"
        ],
        id: "she-he-it-has-got-object",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Has he/she/it got _____________?",
        pattern: ["has"],
        translations: ["Есть ли у неё/него/этого ______?"],
        examples: [
          "Has she got a dog? (Есть ли у неё собака?)",
          "Has he got a new car? (Есть ли у него новая машина?)",
          "Has it got 2 sisters? (Есть ли у этого 2 сестры?)"
        ],
        id: "has-he-she-it-got-object",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Yes, he/she/it has got ___________.",
        pattern: ["yes"],
        translations: ["Да, у неё/него/этого есть ______."],
        examples: [
          "Yes, she has got a dog. (Да, у неё есть собака.)",
          "Yes, he has got a new car. (Да, у него есть новая машина.)",
          "Yes, it has got 2 sisters. (Да, у этого есть 2 сестры.)"
        ],
        id: "yes-he-she-it-has-got-object",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "No, he/she/it has not got _________.",
        pattern: ["no"],
        translations: ["Нет, у неё/него/этого нет ______."],
        examples: [
          "No, she has not got a dog. (Нет, у неё нет собаки.)",
          "No, he has not got a new car. (Нет, у него нет новой машины.)",
          "No, it has not got 2 sisters. (Нет, у этого нет 2 сестёр.)"
        ],
        id: "no-he-she-it-has-not-got-object",
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
        .replace(/haven't/gi, 'have not')
        .replace(/hasn't/gi, 'has not')
        .replace(/we're/gi, 'we are')
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
      let minWords = 4; // Для утверждений и вопросов: Подлежащее + have/has + got + минимум 1 слово
      if (structure.id === "yes-i-you-we-they-have-got-object" || structure.id === "yes-he-she-it-has-got-object") {
        minWords = 5; // Yes + подлежащее + have/has + got + минимум 1 слово
      } else if (structure.id === "no-i-you-we-they-have-not-got-object" || structure.id === "no-he-she-it-has-not-got-object") {
        minWords = 6; // No + подлежащее + have/has + not + got + минимум 1 слово
      }
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;

      // Исключённые слова (модальные, стативные глаголы и неподходящие)
      const excludedWords = [
        'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought',
        'am', 'is', 'are', 'was', 'were', 'been', 'being', 'has', 'have', 'had', 'does', 'do', 'did',
        'like', 'love', 'hate', 'know', 'understand', 'want', 'need', 'believe', 'stand'
      ];

      // Проверяем дополнение
      const validateObject = () => {
        console.log('Валидация дополнения на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет дополнения');
          return false;
        }

        // Разрешаем любые слова, кроме исключённых
        while (wordIndex < words.length) {
          const word = words[wordIndex];
          if (excludedWords.includes(word)) {
            console.log('Исключённое слово в дополнении:', word);
            return false;
          }
          wordIndex++;
        }

        return true;
      };

      if (structure.id === "i-you-we-they-have-got-object") {
        if (!['i', 'you', 'we', 'they'].includes(words[wordIndex])) {
          console.log('Ожидалось "i/you/we/they" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'have' || words[wordIndex + 1] !== 'got') {
          console.log('Ожидалось "have got" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего', words[wordIndex + 1] || 'ничего');
          return false;
        }
        wordIndex += 2;

        if (!validateObject()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "have-you-we-they-got-object") {
        if (words[wordIndex] !== 'have') {
          console.log('Ожидалось "have" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!['you', 'we', 'they'].includes(words[wordIndex])) {
          console.log('Ожидалось "you/we/they" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'got') {
          console.log('Ожидалось "got" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateObject()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "yes-i-you-we-they-have-got-object") {
        if (words[wordIndex] !== 'yes') {
          console.log('Ожидалось "yes" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!['i', 'you', 'we', 'they'].includes(words[wordIndex])) {
          console.log('Ожидалось "i/you/we/they" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'have' || words[wordIndex + 1] !== 'got') {
          console.log('Ожидалось "have got" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего', words[wordIndex + 1] || 'ничего');
          return false;
        }
        wordIndex += 2;

        if (!validateObject()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "no-i-you-we-they-have-not-got-object") {
        if (words[wordIndex] !== 'no') {
          console.log('Ожидалось "no" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!['i', 'you', 'we', 'they'].includes(words[wordIndex])) {
          console.log('Ожидалось "i/you/we/they" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'have' || words[wordIndex + 1] !== 'not' || words[wordIndex + 2] !== 'got') {
          console.log('Ожидалось "have not got" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего', words[wordIndex + 1] || 'ничего', words[wordIndex + 2] || 'ничего');
          return false;
        }
        wordIndex += 3;

        if (!validateObject()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "she-he-it-has-got-object") {
        if (!['she', 'he', 'it'].includes(words[wordIndex])) {
          console.log('Ожидалось "she/he/it" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'has' || words[wordIndex + 1] !== 'got') {
          console.log('Ожидалось "has got" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего', words[wordIndex + 1] || 'ничего');
          return false;
        }
        wordIndex += 2;

        if (!validateObject()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "has-he-she-it-got-object") {
        if (words[wordIndex] !== 'has') {
          console.log('Ожидалось "has" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!['he', 'she', 'it'].includes(words[wordIndex])) {
          console.log('Ожидалось "he/she/it" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'got') {
          console.log('Ожидалось "got" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateObject()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "yes-he-she-it-has-got-object") {
        if (words[wordIndex] !== 'yes') {
          console.log('Ожидалось "yes" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!['he', 'she', 'it'].includes(words[wordIndex])) {
          console.log('Ожидалось "he/she/it" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'has' || words[wordIndex + 1] !== 'got') {
          console.log('Ожидалось "has got" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего', words[wordIndex + 1] || 'ничего');
          return false;
        }
        wordIndex += 2;

        if (!validateObject()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "no-he-she-it-has-not-got-object") {
        if (words[wordIndex] !== 'no') {
          console.log('Ожидалось "no" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!['he', 'she', 'it'].includes(words[wordIndex])) {
          console.log('Ожидалось "he/she/it" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'has' || words[wordIndex + 1] !== 'not' || words[wordIndex + 2] !== 'got') {
          console.log('Ожидалось "has not got" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего', words[wordIndex + 1] || 'ничего', words[wordIndex + 2] || 'ничего');
          return false;
        }
        wordIndex += 3;

        if (!validateObject()) return false;

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