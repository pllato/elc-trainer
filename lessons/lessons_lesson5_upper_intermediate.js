(function() {
  console.log('Загружен Урок 5 Upper-Intermediate v1');
  console.log('Регистрация урока с уровнем: upperintermediate');
  addLesson({
    level: "upperintermediate",
    lesson: "lesson5_upper_intermediate",
    name: "Урок 5: Passive Voice",
    structures: [
      {
        structure: "__________ is/are __________ (by ________).",
        pattern: [],
        translations: ["______ делается ______ (кем-то)."],
        examples: [
          "The room is cleaned daily. (Комната убирается ежедневно.)",
          "The books are read by students. (Книги читаются студентами.)",
          "The car is repaired regularly. (Машина ремонтируется регулярно.)"
        ],
        id: "present-simple-passive",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "__________ was/were __________ (by ________).",
        pattern: [],
        translations: ["______ был/были ______ (кем-то)."],
        examples: [
          "The book was written by J.K. Rowling. (Книга была написана Дж. К. Роулинг.)",
          "The house was built in 1990. (Дом был построен в 1990 году.)",
          "The paintings were sold at the auction. (Картины были проданы на аукционе.)"
        ],
        id: "past-simple-passive",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "__________ will be __________ (by ________).",
        pattern: ["will", "be"],
        translations: ["______ будет ______ (кем-то)."],
        examples: [
          "The project will be completed next month. (Проект будет завершён в следующем месяце.)",
          "The event will be organized by the team. (Мероприятие будет организовано командой.)",
          "The report will be submitted tomorrow. (Отчёт будет представлен завтра.)"
        ],
        id: "future-simple-passive",
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
        .replace(/it's/gi, 'it is')
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
        case "present-simple-passive":
          minWords = 3; // subject is/are V3
          break;
        case "past-simple-passive":
          minWords = 3; // subject was/were V3
          break;
        case "future-simple-passive":
          minWords = 4; // subject will be V3
          break;
        default:
          minWords = 3;
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

      // Полный список неправильных глаголов (базовая форма → V3)
      const irregularVerbsV3 = {
        'arise': 'arisen', 'awake': 'awoken', 'be': 'been', 'bear': 'borne', 'beat': 'beaten',
        'become': 'become', 'begin': 'begun', 'bend': 'bent', 'bet': 'bet', 'bind': 'bound',
        'bite': 'bitten', 'bleed': 'bled', 'blow': 'blown', 'break': 'broken', 'breed': 'bred',
        'bring': 'brought', 'build': 'built', 'burn': 'burnt', 'burst': 'burst', 'buy': 'bought',
        'cast': 'cast', 'catch': 'caught', 'choose': 'chosen', 'cling': 'clung', 'come': 'come',
        'cost': 'cost', 'creep': 'crept', 'cut': 'cut', 'deal': 'dealt', 'dig': 'dug',
        'do': 'done', 'draw': 'drawn', 'drink': 'drunk', 'drive': 'driven', 'eat': 'eaten',
        'fall': 'fallen', 'feed': 'fed', 'feel': 'felt', 'fight': 'fought', 'find': 'found',
        'flee': 'fled', 'fly': 'flown', 'forbid': 'forbidden', 'forget': 'forgotten', 'forgive': 'forgiven',
        'freeze': 'frozen', 'get': 'got', 'give': 'given', 'go': 'gone', 'grow': 'grown',
        'hang': 'hung', 'have': 'had', 'hear': 'heard', 'hide': 'hidden', 'hit': 'hit',
        'hold': 'held', 'hurt': 'hurt', 'keep': 'kept', 'know': 'known', 'lay': 'laid',
        'lead': 'led', 'leave': 'left', 'lend': 'lent', 'let': 'let', 'lie': 'lain',
        'light': 'lit', 'lose': 'lost', 'make': 'made', 'mean': 'meant', 'meet': 'met',
        'pay': 'paid', 'put': 'put', 'read': 'read', 'ride': 'ridden', 'ring': 'rung',
        'rise': 'risen', 'run': 'run', 'say': 'said', 'see': 'seen', 'sell': 'sold',
        'send': 'sent', 'set': 'set', 'shake': 'shaken', 'shine': 'shone', 'shoot': 'shot',
        'show': 'shown', 'shut': 'shut', 'sing': 'sung', 'sink': 'sunk', 'sit': 'sat',
        'sleep': 'slept', 'slide': 'slid', 'speak': 'spoken', 'spend': 'spent', 'stand': 'stood',
        'steal': 'stolen', 'stick': 'stuck', 'sting': 'stung', 'strike': 'struck', 'swear': 'sworn',
        'sweep': 'swept', 'swim': 'swum', 'take': 'taken', 'teach': 'taught', 'tear': 'torn',
        'tell': 'told', 'think': 'thought', 'throw': 'thrown', 'understand': 'understood',
        'wake': 'woken', 'wear': 'worn', 'win': 'won', 'write': 'written'
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

      // Проверяем причастие прошедшего времени (V3)
      const validatePastParticiple = () => {
        console.log('Валидация причастия прошедшего времени на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет глагола');
          return false;
        }

        const verb = words[wordIndex];
        // Проверяем, является ли глагол V3 (для неправильных глаголов) или заканчивается на -ed (для правильных)
        const isIrregularV3 = Object.values(irregularVerbsV3).includes(verb);
        const isRegularV3 = verb.endsWith('ed') && !excludedWords.includes(verb);
        if (!isIrregularV3 && !isRegularV3) {
          console.log('Глагол не является причастием прошедшего времени:', verb);
          return false;
        }

        wordIndex++;
        return true;
      };

      // Проверяем опциональное by-дополнение
      const validateByClause = () => {
        if (wordIndex >= words.length) {
          console.log('Нет by-дополнения, валидация успешна');
          return true;
        }

        if (words[wordIndex] !== 'by') {
          console.log('Ожидалось "by" или конец фразы на позиции', wordIndex, ', получено', words[wordIndex]);
          return false;
        }
        wordIndex++;

        if (!words[wordIndex]) {
          console.log('Нет агента после "by"');
          return false;
        }

        // Проверяем агента (имя, местоимение или существительное)
        const agent = words[wordIndex];
        if (excludedWords.includes(agent)) {
          console.log('Исключённый агент:', agent);
          return false;
        }

        wordIndex++;
        // Проверяем опциональные слова в дополнении
        let agentWords = [];
        while (wordIndex < words.length) {
          const word = words[wordIndex];
          if (excludedWords.includes(word)) {
            console.log('Исключённое слово в дополнении:', word);
            return false;
          }
          agentWords.push(word);
          wordIndex++;
        }
        console.log('Дополнение агента:', agentWords);

        return true;
      };

      if (structure.id === "present-simple-passive") {
        console.log('Начало проверки структуры Present Simple Passive');
        if (!validateSubject()) return false;

        if (!words[wordIndex] || !['is', 'are'].includes(words[wordIndex])) {
          console.log('Ожидалось "is" или "are" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validatePastParticiple()) return false;

        if (!validateByClause()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', cleanedText);
        return true;
      } else if (structure.id === "past-simple-passive") {
        console.log('Начало проверки структуры Past Simple Passive');
        if (!validateSubject()) return false;

        if (!words[wordIndex] || !['was', 'were'].includes(words[wordIndex])) {
          console.log('Ожидалось "was" или "were" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validatePastParticiple()) return false;

        if (!validateByClause()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', cleanedText);
        return true;
      } else if (structure.id === "future-simple-passive") {
        console.log('Начало проверки структуры Future Simple Passive');
        if (!validateSubject()) return false;

        if (!words[wordIndex] || words[wordIndex] !== 'will') {
          console.log('Ожидалось "will" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!words[wordIndex] || words[wordIndex] !== 'be') {
          console.log('Ожидалось "be" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validatePastParticiple()) return false;

        if (!validateByClause()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', cleanedText);
        return true;
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();