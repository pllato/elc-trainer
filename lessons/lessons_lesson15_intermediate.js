(function() {
  addLesson({
    level: "intermediate",
    lesson: "lesson15",
    name: "Урок 15: Expressing Preferences and Enthusiasm",
    structures: [
      {
        structure: "Do you like __________?",
        pattern: ["do", "you", "like"],
        translations: ["Тебе нравится ______?"],
        examples: [
          "Do you like drawing? (Тебе нравится рисовать?)",
          "Do you like singing? (Тебе нравится петь?)",
          "Do you like painting? (Тебе нравится рисование?)"
        ],
        id: "do-you-like-gerund",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Are you fond of ________ing?",
        pattern: ["are", "you", "fond", "of"],
        translations: ["Ты любишь ______?"],
        examples: [
          "Are you fond of drawing? (Ты любишь рисовать?)",
          "Are you fond of singing? (Ты любишь петь?)",
          "Are you fond of dancing? (Ты любишь танцевать?)"
        ],
        id: "are-you-fond-of-gerund",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "I’m fairly/pretty keen on ________",
        pattern: ["i", "am"],
        translations: ["Я довольно увлечён ______"],
        examples: [
          "I’m fairly keen on drawing. (Я довольно увлечён рисованием.)",
          "I’m pretty keen on singing. (Я довольно увлечён пением.)",
          "I’m fairly keen on painting. (Я довольно увлечён рисованием.)"
        ],
        id: "im-fairly-pretty-keen-on-gerund",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "I’m really into ________",
        pattern: ["i", "am", "really", "into"],
        translations: ["Я очень увлечён ______"],
        examples: [
          "I’m really into drawing. (Я очень увлечён рисованием.)",
          "I’m really into singing. (Я очень увлечён пением.)",
          "I’m really into dancing. (Я очень увлечён танцами.)"
        ],
        id: "im-really-into-gerund",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "I’m quite a big fan of ________",
        pattern: ["i", "am", "quite"],
        translations: ["Я большой поклонник ______"],
        examples: [
          "I’m quite a big fan of drawing. (Я большой поклонник рисования.)",
          "I’m quite a big fan of singing. (Я большой поклонник пения.)",
          "I’m quite a big fan of painting. (Я большой поклонник рисования.)"
        ],
        id: "im-quite-a-big-fan-of-gerund",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "I simply adore ________",
        pattern: ["i", "simply", "adore"],
        translations: ["Я просто обожаю ______"],
        examples: [
          "I simply adore drawing. (Я просто обожаю рисовать.)",
          "I simply adore singing. (Я просто обожаю петь.)",
          "I simply adore dancing. (Я просто обожаю танцевать.)"
        ],
        id: "i-simply-adore-gerund",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "I’m quite enthusiastic about _________",
        pattern: ["i", "am", "quite", "enthusiastic", "about"],
        translations: ["Я очень воодушевлён ______"],
        examples: [
          "I’m quite enthusiastic about drawing. (Я очень воодушевлён рисованием.)",
          "I’m quite enthusiastic about singing. (Я очень воодушевлён пением.)",
          "I’m quite enthusiastic about painting. (Я очень воодушевлён рисованием.)"
        ],
        id: "im-quite-enthusiastic-about-gerund",
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
        .replace(/i'm/gi, 'i am')
        .replace(/you're/gi, 'you are')
        .replace(/aren't/gi, 'are not')
        .replace(/arent/gi, 'are not')
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
        case "do-you-like-gerund":
          minWords = 4; // do you like drawing
          break;
        case "are-you-fond-of-gerund":
          minWords = 5; // are you fond of drawing
          break;
        case "im-fairly-pretty-keen-on-gerund":
          minWords = 5; // i am fairly keen on drawing
          break;
        case "im-really-into-gerund":
          minWords = 5; // i am really into drawing
          break;
        case "im-quite-a-big-fan-of-gerund":
          minWords = 7; // i am quite a big fan of drawing
          break;
        case "i-simply-adore-gerund":
          minWords = 4; // i simply adore drawing
          break;
        case "im-quite-enthusiastic-about-gerund":
          minWords = 6; // i am quite enthusiastic about drawing
          break;
        default:
          minWords = 4;
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

      // Проверяем герундий или существительное
      const validateGerundOrNoun = (requireGerund = false) => {
        console.log('Валидация герундия/существительного на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет герундия/существительного');
          return false;
        }

        const word = words[wordIndex];
        console.log('Проверка слова:', word);
        if (requireGerund && !word.endsWith('ing')) {
          console.log('Ожидался герундий (оканчивается на -ing):', word);
          return false;
        }
        if (excludedWords.includes(word)) {
          console.log('Исключённое слово:', word);
          return false;
        }

        wordIndex++;
        return true;
      };

      if (structure.id === "do-you-like-gerund") {
        console.log('Начало проверки структуры Do you like gerund');
        const expectedStart = ['do', 'you', 'like'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateGerundOrNoun()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "are-you-fond-of-gerund") {
        console.log('Начало проверки структуры Are you fond of gerund');
        const expectedStart = ['are', 'you', 'fond', 'of'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateGerundOrNoun(true)) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "im-fairly-pretty-keen-on-gerund") {
        console.log('Начало проверки структуры I’m fairly/pretty keen on gerund');
        const expectedStart = ['i', 'am'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        // Проверяем fairly или pretty
        if (wordIndex >= words.length || !['fairly', 'pretty'].includes(words[wordIndex])) {
          console.log('Ожидалось "fairly" или "pretty" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        // Проверяем keen
        if (wordIndex >= words.length || words[wordIndex] !== 'keen') {
          console.log('Ожидалось "keen" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        // Проверяем on
        if (wordIndex >= words.length || words[wordIndex] !== 'on') {
          console.log('Ожидалось "on" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateGerundOrNoun()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "im-really-into-gerund") {
        console.log('Начало проверки структуры I’m really into gerund');
        const expectedStart = ['i', 'am', 'really', 'into'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateGerundOrNoun()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "im-quite-a-big-fan-of-gerund") {
        console.log('Начало проверки структуры I’m quite a big fan of gerund');
        const expectedStart = ['i', 'am', 'quite', 'a', 'big', 'fan', 'of'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateGerundOrNoun()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "i-simply-adore-gerund") {
        console.log('Начало проверки структуры I simply adore gerund');
        const expectedStart = ['i', 'simply', 'adore'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateGerundOrNoun()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "im-quite-enthusiastic-about-gerund") {
        console.log('Начало проверки структуры I’m quite enthusiastic about gerund');
        const expectedStart = ['i', 'am', 'quite', 'enthusiastic', 'about'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateGerundOrNoun()) return false;

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