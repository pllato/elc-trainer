(function() {
  console.log('Загружен Урок 19 Intermediate v1');
  addLesson({
    level: "intermediate",
    lesson: "lesson19_intermediate",
    name: "Урок 19: Expressing Opinions and Suggestions",
    structures: [
      {
        structure: "What are your views on ______?",
        pattern: ["what", "are", "your", "views", "on"],
        translations: ["Каковы ваши взгляды на ______?"],
        examples: [
          "What are your views on remote work? (Каковы ваши взгляды на удалённую работу?)",
          "What are your views on learning online? (Каковы ваши взгляды на обучение онлайн?)",
          "What are your views on team projects? (Каковы ваши взгляды на командные проекты?)"
        ],
        id: "what-are-your-views-on",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Do you have any suggestions for ______?",
        pattern: ["do", "you", "have", "any", "suggestions", "for"],
        translations: ["Есть ли у вас предложения по ______?"],
        examples: [
          "Do you have any suggestions for improving teamwork? (Есть ли у вас предложения по улучшению командной работы?)",
          "Do you have any suggestions for managing stress? (Есть ли у вас предложения по управлению стрессом?)",
          "Do you have any suggestions for learning English? (Есть ли у вас предложения по изучению английского?)"
        ],
        id: "do-you-have-any-suggestions-for",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Would you like to suggest a course of action for _____?",
        pattern: ["would", "you", "like", "to", "suggest", "a", "course", "of", "action", "for"],
        translations: ["Хотели бы вы предложить план действий для ______?"],
        examples: [
          "Would you like to suggest a course of action for reducing stress? (Хотели бы вы предложить план действий для снижения стресса?)",
          "Would you like to suggest a course of action for team building? (Хотели бы вы предложить план действий для сплочения команды?)",
          "Would you like to suggest a course of action for time management? (Хотели бы вы предложить план действий для управления временем?)"
        ],
        id: "would-you-like-to-suggest-a-course",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "How do you feel about _____?",
        pattern: ["how", "do", "you", "feel", "about"],
        translations: ["Что вы думаете о ______?"],
        examples: [
          "How do you feel about working from home? (Что вы думаете о работе из дома?)",
          "How do you feel about online classes? (Что вы думаете об онлайн-занятиях?)",
          "How do you feel about group projects? (Что вы думаете о групповых проектах?)"
        ],
        id: "how-do-you-feel-about",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "From my point of view ___________",
        pattern: ["from", "my", "point", "of", "view"],
        translations: ["С моей точки зрения ______"],
        examples: [
          "From my point of view remote work is flexible. (С моей точки зрения удалённая работа гибкая.)",
          "From my point of view learning online is convenient. (С моей точки зрения обучение онлайн удобно.)",
          "From my point of view team projects are challenging. (С моей точки зрения командные проекты сложные.)"
        ],
        id: "from-my-point-of-view",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "I suggest ____________",
        pattern: ["i", "suggest"],
        translations: ["Я предлагаю ______"],
        examples: [
          "I suggest working together. (Я предлагаю работать вместе.)",
          "I suggest taking breaks. (Я предлагаю делать перерывы.)",
          "I suggest setting clear goals. (Я предлагаю ставить чёткие цели.)"
        ],
        id: "i-suggest",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "I guess we should ____________",
        pattern: ["i", "guess", "we", "should"],
        translations: ["Я полагаю, нам следует ______"],
        examples: [
          "I guess we should collaborate more. (Я полагаю, нам следует больше сотрудничать.)",
          "I guess we should try new methods. (Я полагаю, нам следует попробовать новые методы.)",
          "I guess we should plan ahead. (Я полагаю, нам следует планировать заранее.)"
        ],
        id: "i-guess-we-should",
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
        case "what-are-your-views-on":
          minWords = 6; // what are your views on topic
          break;
        case "do-you-have-any-suggestions-for":
          minWords = 7; // do you have any suggestions for topic
          break;
        case "would-you-like-to-suggest-a-course":
          minWords = 11; // would you like to suggest a course of action for topic
          break;
        case "how-do-you-feel-about":
          minWords = 6; // how do you feel about topic
          break;
        case "from-my-point-of-view":
          minWords = 6; // from my point of view opinion
          break;
        case "i-suggest":
          minWords = 3; // i suggest suggestion
          break;
        case "i-guess-we-should":
          minWords = 5; // i guess we should action
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
      const validAdverbs = ['well', 'better', 'fast', 'slowly', 'quickly', 'carefully', 'a lot', 'much', 'remote', 'work', 'online', 'team', 'projects', 'teamwork', 'stress', 'english', 'time', 'management', 'home', 'classes', 'a', 'the', 'an'];

      // Проверяем тему (свободная часть)
      const validateTopic = () => {
        console.log('Валидация темы на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет темы');
          return false;
        }

        let topicWords = [];
        while (wordIndex < words.length) {
          const word = words[wordIndex];
          if (excludedWords.includes(word) && !validAdverbs.includes(word)) {
            console.log('Исключённое слово в теме:', word);
            return false;
          }
          topicWords.push(word);
          wordIndex++;
        }
        console.log('Тема:', topicWords);
        if (topicWords.length === 0) {
          console.log('Тема отсутствует');
          return false;
        }

        return true;
      };

      // Проверяем мнение, предложение или действие (свободная часть)
      const validateResponse = () => {
        console.log('Валидация ответа на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет ответа');
          return false;
        }

        let responseWords = [];
        while (wordIndex < words.length) {
          responseWords.push(words[wordIndex]);
          wordIndex++;
        }
        console.log('Ответ:', responseWords);
        if (responseWords.length === 0) {
          console.log('Ответ отсутствует');
          return false;
        }

        return true;
      };

      if (structure.id === "what-are-your-views-on") {
        console.log('Начало проверки структуры What are your views on');
        const expectedStart = ['what', 'are', 'your', 'views', 'on'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateTopic()) return false;

        return true;
      } else if (structure.id === "do-you-have-any-suggestions-for") {
        console.log('Начало проверки структуры Do you have any suggestions for');
        const expectedStart = ['do', 'you', 'have', 'any', 'suggestions', 'for'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateTopic()) return false;

        return true;
      } else if (structure.id === "would-you-like-to-suggest-a-course") {
        console.log('Начало проверки структуры Would you like to suggest a course');
        const expectedStart = ['would', 'you', 'like', 'to', 'suggest', 'a', 'course', 'of', 'action', 'for'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateTopic()) return false;

        return true;
      } else if (structure.id === "how-do-you-feel-about") {
        console.log('Начало проверки структуры How do you feel about');
        const expectedStart = ['how', 'do', 'you', 'feel', 'about'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateTopic()) return false;

        return true;
      } else if (structure.id === "from-my-point-of-view") {
        console.log('Начало проверки структуры From my point of view');
        const expectedStart = ['from', 'my', 'point', 'of', 'view'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateResponse()) return false;

        return true;
      } else if (structure.id === "i-suggest") {
        console.log('Начало проверки структуры I suggest');
        const expectedStart = ['i', 'suggest'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateResponse()) return false;

        return true;
      } else if (structure.id === "i-guess-we-should") {
        console.log('Начало проверки структуры I guess we should');
        const expectedStart = ['i', 'guess', 'we', 'should'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateResponse()) return false;

        return true;
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();