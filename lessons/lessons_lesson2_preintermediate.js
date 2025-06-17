(function() {
  addLesson({
    level: "preintermediate",
    lesson: "lesson2",
    name: "Урок 2: Questions and Answers in Past Simple",
    structures: [
      {
        structure: "When/Where/What/Why did you ___________?",
        pattern: [],
        translations: ["Когда/Где/Что/Почему ты ______?"],
        examples: [
          "When did you eat? (Когда ты ел?)",
          "Where did you eat? (Где ты ел?)",
          "What did you eat? (Что ты ел?)"
        ],
        id: "question-word-did-you-verb",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "I ______(ed) _______________",
        pattern: ["i"],
        translations: ["Я ______ ______."],
        examples: [
          "I ate in the morning. (Я ел утром.)",
          "I ate at home. (Я ел дома.)",
          "I ate a sandwich. (Я ел сэндвич.)"
        ],
        id: "i-verb-past-circumstance",
        hasVerb: false,
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
      let minWords = 4; // Для вопроса: When/Where/What/Why + did + you + глагол
      if (structure.id === "i-verb-past-circumstance") {
        minWords = 3; // I + глагол + минимум 1 слово обстоятельства
      }
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;
      let questionWord = null;

      // Исключённые слова (модальные, стативные глаголы и неподходящие)
      const excludedWords = [
        'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought',
        'am', 'is', 'are', 'was', 'were', 'been', 'being', 'has', 'have', 'had', 'does', 'do', 'did',
        'like', 'love', 'hate', 'know', 'understand', 'want', 'need', 'believe'
      ];

      // Полный список неправильных глаголов (базовая форма → прошедшее время)
      const irregularVerbs = {
        'arise': 'arose',
        'awake': 'awoke',
        'be': 'was',
        'bear': 'bore',
        'beat': 'beat',
        'become': 'became',
        'begin': 'began',
        'bend': 'bent',
        'bet': 'bet',
        'bind': 'bound',
        'bite': 'bit',
        'bleed': 'bled',
        'blow': 'blew',
        'break': 'broke',
        'breed': 'bred',
        'bring': 'brought',
        'build': 'built',
        'burn': 'burnt',
        'burst': 'burst',
        'buy': 'bought',
        'cast': 'cast',
        'catch': 'caught',
        'choose': 'chose',
        'cling': 'clung',
        'come': 'came',
        'cost': 'cost',
        'creep': 'crept',
        'cut': 'cut',
        'deal': 'dealt',
        'dig': 'dug',
        'do': 'did',
        'draw': 'drew',
        'drink': 'drank',
        'drive': 'drove',
        'eat': 'ate',
        'fall': 'fell',
        'feed': 'fed',
        'feel': 'felt',
        'fight': 'fought',
        'find': 'found',
        'flee': 'fled',
        'fly': 'flew',
        'forbid': 'forbade',
        'forget': 'forgot',
        'forgive': 'forgave',
        'freeze': 'froze',
        'get': 'got',
        'give': 'gave',
        'go': 'went',
        'grow': 'grew',
        'hang': 'hung',
        'have': 'had',
        'hear': 'heard',
        'hide': 'hid',
        'hit': 'hit',
        'hold': 'held',
        'hurt': 'hurt',
        'keep': 'kept',
        'know': 'knew',
        'lay': 'laid',
        'lead': 'led',
        'leave': 'left',
        'lend': 'lent',
        'let': 'let',
        'lie': 'lay',
        'light': 'lit',
        'lose': 'lost',
        'make': 'made',
        'mean': 'meant',
        'meet': 'met',
        'pay': 'paid',
        'put': 'put',
        'read': 'read',
        'ride': 'rode',
        'ring': 'rang',
        'rise': 'rose',
        'run': 'ran',
        'say': 'said',
        'see': 'saw',
        'sell': 'sold',
        'send': 'sent',
        'set': 'set',
        'shake': 'shook',
        'shine': 'shone',
        'shoot': 'shot',
        'show': 'showed',
        'shut': 'shut',
        'sing': 'sang',
        'sink': 'sank',
        'sit': 'sat',
        'sleep': 'slept',
        'slide': 'slid',
        'speak': 'spoke',
        'spend': 'spent',
        'stand': 'stood',
        'steal': 'stole',
        'stick': 'stuck',
        'sting': 'stung',
        'strike': 'struck',
        'swear': 'swore',
        'sweep': 'swept',
        'swim': 'swam',
        'take': 'took',
        'teach': 'taught',
        'tear': 'tore',
        'tell': 'told',
        'think': 'thought',
        'throw': 'threw',
        'understand': 'understood',
        'wake': 'woke',
        'wear': 'wore',
        'win': 'won',
        'write': 'wrote'
      };

      // Проверяем глагол в вопросе (базовая форма)
      const validateVerbBase = () => {
        console.log('Валидация глагола (базовая форма) на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет глагола');
          return false;
        }

        const verb = words[wordIndex];
        // Проверяем, является ли глагол базовой формой из irregularVerbs или допустимым регулярным глаголом
        const isIrregularBase = Object.keys(irregularVerbs).includes(verb);
        const isIrregularPast = Object.values(irregularVerbs).includes(verb);
        if (isIrregularPast && !isIrregularBase) {
          console.log('Глагол в прошедшем времени, ожидается базовая форма:', verb);
          return false;
        }
        if (!isIrregularBase && excludedWords.includes(verb)) {
          console.log('Исключённый глагол:', verb);
          return false;
        }

        wordIndex++;
        return true;
      };

      // Проверяем глагол в прошедшем времени (для ответа)
      const validateVerbPast = () => {
        console.log('Валидация глагола (прошедшее время) на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет глагола');
          return false;
        }

        const verb = words[wordIndex];
        // Проверяем регулярные глаголы (заканчивающиеся на -ed)
        if (verb.endsWith('ed')) {
          const baseVerb = verb.slice(0, -2);
          if (excludedWords.includes(baseVerb)) {
            console.log('Исключённый глагол:', baseVerb);
            return false;
          }
        } else {
          // Проверяем нерегулярные глаголы
          const isIrregular = Object.values(irregularVerbs).includes(verb);
          if (!isIrregular) {
            console.log('Глагол не является валидным в прошедшем времени:', verb);
            return false;
          }
        }

        wordIndex++;
        return true;
      };

      // Проверяем обстоятельство (время, место, объект, причина)
      const validateCircumstance = (expectedType) => {
        console.log('Валидация обстоятельства на позиции', wordIndex, 'для типа', expectedType);
        if (!words[wordIndex]) {
          console.log('Нет обстоятельства');
          return false;
        }

        // Разрешаем составные обстоятельства (например, "in the morning")
        let circumstanceWords = [];
        while (wordIndex < words.length) {
          const word = words[wordIndex];
          if (excludedWords.includes(word)) {
            console.log('Исключённое слово в обстоятельстве:', word);
            return false;
          }
          circumstanceWords.push(word);
          wordIndex++;
        }

        const circumstance = circumstanceWords.join(' ');
        // Простая проверка соответствия типу вопроса
        if (expectedType === 'when') {
          // Ожидаем выражения времени
          const timeIndicators = ['morning', 'evening', 'night', 'yesterday', 'last', 'ago'];
          if (!timeIndicators.some(indicator => circumstance.includes(indicator))) {
            console.log('Обстоятельство не соответствует времени:', circumstance);
            // Разрешаем для гибкости
          }
        } else if (expectedType === 'where') {
          // Ожидаем выражения места
          const placeIndicators = ['home', 'school', 'park', 'city', 'at', 'in', 'on'];
          if (!placeIndicators.some(indicator => circumstance.includes(indicator))) {
            console.log('Обстоятельство не соответствует месту:', circumstance);
            // Разрешаем для гибкости
          }
        } else if (expectedType === 'what') {
          // Ожидаем объект
          const objectIndicators = ['sandwich', 'book', 'movie', 'food', 'drink', 'the'];
          if (!objectIndicators.some(indicator => circumstance.includes(indicator))) {
            console.log('Обстоятельство не соответствует объекту:', circumstance);
            // Разрешаем для гибкости
          }
        } else if (expectedType === 'why') {
          // Ожидаем причину, начинающуюся с "because"
          if (!circumstance.startsWith('because')) {
            console.log('Обстоятельство не начинается с "because":', circumstance);
            return false;
          }
        }

        return true;
      };

      if (structure.id === "question-word-did-you-verb") {
        if (!['when', 'where', 'what', 'why'].includes(words[wordIndex])) {
          console.log('Ожидалось "when/where/what/why" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        questionWord = words[wordIndex];
        wordIndex++;

        const expected = ['did', 'you'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateVerbBase()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "i-verb-past-circumstance") {
        if (words[wordIndex] !== 'i') {
          console.log('Ожидалось "i" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateVerbPast()) return false;

        // Используем questionWord из контекста, если доступно, иначе предполагаем любой тип
        const expectedType = questionWord || 'any';
        if (!validateCircumstance(expectedType)) return false;

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
