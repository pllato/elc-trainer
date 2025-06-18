(function() {
  addLesson({
    level: "preintermediate",
    lesson: "lesson11",
    name: "Урок 11: Predictions with Do You Think That",
    structures: [
      {
        structure: "Do you think that ____________ will __________?",
        pattern: ["do", "you", "think", "that"],
        translations: ["Ты думаешь, что ______ будет ______?"],
        examples: [
          "Do you think that Tom will pass the exam? (Ты думаешь, что Том сдаст экзамен?)",
          "Do you think that she will win the race? (Ты думаешь, что она выиграет гонку?)",
          "Do you think that they will come tomorrow? (Ты думаешь, что они придут завтра?)"
        ],
        id: "do-you-think-that-subject-will-action",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Of course he will! / Definitely! / Yes, absolutely! / He might do. / I think so. / Perhaps / Mmm… maybe. / Mmm… I’m not sure / I doubt it. / Anything’s possible / I don’t think so / No chance. / Definitely not. / Not a chance.",
        pattern: [],
        translations: ["Конечно, он будет! / Определённо! / Да, абсолютно! / Возможно, он сделает. / Я так думаю. / Возможно / Ммм… может быть. / Ммм… я не уверен / Сомневаюсь. / Всё возможно / Я так не думаю / Никаких шансов. / Точно нет. / Ни за что."],
        examples: [
          "Of course he will! (Конечно, он будет!)",
          "He might do. (Возможно, он сделает.)",
          "No chance. (Никаких шансов.)"
        ],
        id: "prediction-response",
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
        .replace(/i'm/gi, 'i am')
        .replace(/anything's/gi, 'anything is')
        .replace(/\beveryday\b/gi, 'every day');
      if (processedText !== text) {
        console.log('Обработаны сокращения и everyday:', processedText);
      }
      // Удаляем пунктуацию (кроме … для "Mmm…"), нормализуем пробелы и приводим к нижнему регистру
      const cleanedText = processedText.replace(/[^a-zA-Z0-9\s…]/g, '').replace(/\s+/g, ' ').toLowerCase().trim();
      console.log('Очищенный текст:', cleanedText);

      const words = cleanedText.split(/\s+/).filter(word => word.length > 0);
      console.log('Разделённые слова:', words);

      // Минимальное количество слов
      let minWords = 5; // Для вопроса: Do + you + think + that + подлежащее + will + глагол
      if (structure.id === "prediction-response") {
        minWords = 1; // Для ответов, таких как "Definitely!"
      }
      if (words.length < minWords && structure.id !== "prediction-response") {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;

      // Исключённые слова (модальные, стативные глаголы и неподходящие)
      const excludedWords = [
        'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought',
        'am', 'is', 'are', 'was', 'were', 'been', 'being', 'has', 'had', 'does', 'did'
      ];

      // Полный список неправильных глаголов (базовая форма → прошедшее время)
      const irregularVerbs = {
        'arise': 'arose', 'awake': 'awoke', 'be': 'was', 'bear': 'bore', 'beat': 'beat',
        'become': 'became', 'begin': 'began', 'bend': 'bent', 'bet': 'bet', 'bind': 'bound',
        'bite': 'bit', 'bleed': 'bled', 'blow': 'blew', 'break': 'broke', 'breed': 'bred',
        'bring': 'brought', 'build': 'built', 'burn': 'burnt', 'burst': 'burst', 'buy': 'bought',
        'cast': 'cast', 'catch': 'caught', 'choose': 'chose', 'cling': 'clung', 'come': 'came',
        'cost': 'cost', 'creep': 'crept', 'cut': 'cut', 'deal': 'dealt', 'dig': 'dug',
        'do': 'did', 'draw': 'drew', 'drink': 'drank', 'drive': 'drove', 'eat': 'ate',
        'fall': 'fell', 'feed': 'fed', 'feel': 'felt', 'fight': 'fought', 'find': 'found',
        'flee': 'fled', 'fly': 'flew', 'forbid': 'forbade', 'forget': 'forgot', 'forgive': 'forgave',
        'freeze': 'froze', 'get': 'got', 'give': 'gave', 'go': 'went', 'grow': 'grew',
        'hang': 'hung', 'have': 'had', 'hear': 'heard', 'hide': 'hid', 'hit': 'hit',
        'hold': 'held', 'hurt': 'hurt', 'keep': 'kept', 'know': 'knew', 'lay': 'laid',
        'lead': 'led', 'leave': 'left', 'lend': 'lent', 'let': 'let', 'lie': 'lay',
        'light': 'lit', 'lose': 'lost', 'make': 'made', 'mean': 'meant', 'meet': 'met',
        'pay': 'paid', 'put': 'put', 'read': 'read', 'ride': 'rode', 'ring': 'rang',
        'rise': 'rose', 'run': 'ran', 'say': 'said', 'see': 'saw', 'sell': 'sold',
        'send': 'sent', 'set': 'set', 'shake': 'shook', 'shine': 'shone', 'shoot': 'shot',
        'show': 'showed', 'shut': 'shut', 'sing': 'sang', 'sink': 'sank', 'sit': 'sat',
        'sleep': 'slept', 'slide': 'slid', 'speak': 'spoke', 'spend': 'spent', 'stand': 'stood',
        'steal': 'stole', 'stick': 'stuck', 'sting': 'stung', 'strike': 'struck', 'swear': 'swore',
        'sweep': 'swept', 'swim': 'swam', 'take': 'took', 'teach': 'taught', 'tear': 'tore',
        'tell': 'told', 'think': 'thought', 'throw': 'threw', 'understand': 'understood',
        'wake': 'woke', 'wear': 'wore', 'win': 'won', 'write': 'wrote'
      };

      // Проверяем подлежащее
      const validateSubject = () => {
        console.log('Валидация подлежащего на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет подлежащего');
          return false;
        }

        const subject = words[wordIndex];
        // Разрешаем имена, местоимения или существительные, не входящие в excludedWords
        if (excludedWords.includes(subject)) {
          console.log('Исключённое подлежащее:', subject);
          return false;
        }

        wordIndex++;
        return true;
      };

      // Проверяем действие (глагол в базовой форме + опциональное дополнение)
      const validateAction = () => {
        console.log('Валидация действия на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет глагола');
          return false;
        }

        // Проверяем глагол в базовой форме
        const verb = words[wordIndex];
        if (verb.endsWith('ing')) {
          console.log('Глагол не должен быть в форме -ing:', verb);
          return false;
        }
        const isIrregularPast = Object.values(irregularVerbs).includes(verb);
        if (isIrregularPast && !Object.keys(irregularVerbs).includes(verb)) {
          console.log('Глагол в прошедшем времени, ожидается базовая форма:', verb);
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

        return true;
      };

      if (structure.id === "do-you-think-that-subject-will-action") {
        const expected = ['do', 'you', 'think', 'that'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateSubject()) return false;

        if (words[wordIndex] !== 'will') {
          console.log('Ожидалось "will" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateAction()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "prediction-response") {
        // Список допустимых ответов
        const validResponses = [
          'of course he will',
          'definitely',
          'yes absolutely',
          'he might do',
          'i think so',
          'perhaps',
          'mmm… maybe',
          'mmm… i am not sure',
          'i doubt it',
          'anything is possible',
          'i do not think so',
          'no chance',
          'definitely not',
          'not a chance'
        ];

        const cleanedResponse = cleanedText.replace(/…/g, '…'); // Сохраняем … для mmm…
        if (validResponses.includes(cleanedResponse)) {
          console.log('Валидация пройдена для:', text);
          return true;
        }

        console.log('Недопустимый ответ:', cleanedResponse);
        return false;
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();