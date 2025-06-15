(function() {
  addLesson({
    level: "elementary",
    lesson: "lesson3",
    name: "Урок 3: What is her/his ________? / Where is/are ____________ from? / Who is _________?",
    structures: [
      {
        structure: "What is her/his ________?",
        pattern: ["what", "is"],
        translations: ["Что такое его/её ______?"],
        examples: [
          "What is her surname? (Как её фамилия?) Example answer: Jefferson",
          "What is his job? (Какая у него работа?) Example answer: He’s a policeman",
          "What is her address? (Какой у неё адрес?) Example answer: 34, Church Street"
        ],
        id: "what-is-her-his-noun",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Where is/are ____________ from?",
        pattern: ["where"],
        translations: ["Откуда ______?"],
        examples: [
          "Where is she from? (Откуда она?) Example answer: Mexico",
          "Where are you from? (Откуда ты?) Example answer: Mexico",
          "Where are they from? (Откуда они?) Example answer: Mexico"
        ],
        id: "where-is-are-pronoun-from",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Who is _________?",
        pattern: ["who", "is"],
        translations: ["Кто ______?"],
        examples: [
          "Who is Lara? (Кто такая Лара?) Example answer: She is Patrick’s daughter",
          "Who is she? (Кто она?) Example answer: She is Patrick’s daughter"
        ],
        id: "who-is-name-pronoun",
        hasVerb: false,
        hasName: false
      }
    ],
    requiredCorrect: 10,
    validateStructure: function(text, structure) {
      console.log('Валидация структуры:', structure.id);
      console.log('Входной текст:', text);
      // Удаляем пунктуацию, нормализуем пробелы и приводим к нижнему регистру
      const cleanedText = text.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').toLowerCase().trim();
      console.log('Очищенный текст:', cleanedText);

      const words = cleanedText.split(/\s+/).filter(word => word.length > 0);
      console.log('Разделённые слова:', words);

      // Минимальное количество слов
      const minWords = structure.id === "where-is-are-pronoun-from" ? 4 : 3;
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;

      if (structure.id === "what-is-her-his-noun") {
        if (words[wordIndex] !== 'what') {
          console.log('Ожидалось "what" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'is') {
          console.log('Ожидалось "is" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!['her', 'his'].includes(words[wordIndex])) {
          console.log('Ожидалось "her/his" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!['surname', 'job', 'address'].includes(words[wordIndex])) {
          console.log('Ожидалось "surname/job/address" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (wordIndex < words.length) {
          console.log('Лишние слова после заполнения:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "where-is-are-pronoun-from") {
        if (words[wordIndex] !== 'where') {
          console.log('Ожидалось "where" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!['is', 'are'].includes(words[wordIndex])) {
          console.log('Ожидалось "is/are" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        const auxVerb = words[wordIndex];
        wordIndex++;

        const pronoun = words[wordIndex];
        if (
          (auxVerb === 'is' && !['she', 'he', 'it'].includes(pronoun)) ||
          (auxVerb === 'are' && !['you', 'we', 'they'].includes(pronoun))
        ) {
          console.log(`Ожидалось правильное местоимение для "${auxVerb}" на позиции ${wordIndex}, получено`, pronoun || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'from') {
          console.log('Ожидалось "from" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (wordIndex < words.length) {
          console.log('Лишние слова после "from":', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "who-is-name-pronoun") {
        if (words[wordIndex] !== 'who') {
          console.log('Ожидалось "who" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'is') {
          console.log('Ожидалось "is" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!['lara', 'she', 'he'].includes(words[wordIndex])) {
          console.log('Ожидалось "lara/she/he" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (wordIndex < words.length) {
          console.log('Лишние слова после заполнения:', words.slice(wordIndex));
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