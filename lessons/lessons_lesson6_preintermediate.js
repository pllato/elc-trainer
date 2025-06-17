(function() {
  addLesson({
    level: "preintermediate",
    lesson: "lesson6",
    name: "Урок 6: Past Simple Statements, Questions, and Negations",
    structures: [
      {
        structure: "I/he/she/it/we/you/they _______ed.",
        pattern: [],
        translations: ["Я/он/она/оно/мы/вы/они ______."],
        examples: [
          "I played. (Я играл.)",
          "She sang. (Она пела.)",
          "They ate. (Они ели.)"
        ],
        id: "subject-past-verb",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Did I/he/she/it/we/you/they _______?",
        pattern: ["did"],
        translations: ["Я/он/она/оно/мы/вы/они ______?"],
        examples: [
          "Did I play? (Я играл?)",
          "Did she sing? (Она пела?)",
          "Did they eat? (Они ели?)"
        ],
        id: "did-subject-base-verb",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "I/he/she/it/we/you/they did not (didn't) ________.",
        pattern: [],
        translations: ["Я/он/она/оно/мы/вы/они не ______."],
        examples: [
          "I did not play. (Я не играл.)",
          "She didn't sing. (Она не пела.)",
          "They did not eat. (Они не ели.)"
        ],
        id: "subject-did-not-base-verb",
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
        .replace(/didn't/gi, 'did not')
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
      let minWords = 2; // Для утверждения: Подлежащее + глагол
      if (structure.id === "did-subject-base-verb") {
        minWords = 3; // Did + подлежащее + глагол
      } else if (structure.id === "subject-did-not-base-verb") {
        minWords = 4; // Подлежащее + did + not + глагол
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

      // Проверяем глагол в прошедшем времени (для утверждений)
      const validatePastVerb = () => {
        console.log('Валидация глагола в прошедшем времени на позиции', wordIndex);
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

      // Проверяем глагол в базовой форме (для вопросов и отрицаний)
      const validateBaseVerb = () => {
        console.log('Валидация глагола в базовой форме на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет глагола');
          return false;
        }

        const verb = words[wordIndex];
        // Проверяем, является ли глагол базовой формой из irregularVerbs или допустимым регулярным глаголом
        const isIrregularBase = Object.keys(irregularVerbs).includes(verb);
        if (!isIrregularBase && excludedWords.includes(verb)) {
          console.log('Исключённый глагол:', verb);
          return false;
        }

        wordIndex++;
        return true;
      };

      if (structure.id === "subject-past-verb") {
        if (!['i', 'he', 'she', 'it', 'we', 'you', 'they'].includes(words[wordIndex])) {
          console.log('Ожидалось "i/he/she/it/we/you/they" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validatePastVerb()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "did-subject-base-verb") {
        if (words[wordIndex] !== 'did') {
          console.log('Ожидалось "did" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!['i', 'he', 'she', 'it', 'we', 'you', 'they'].includes(words[wordIndex])) {
          console.log('Ожидалось "i/he/she/it/we/you/they" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateBaseVerb()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "subject-did-not-base-verb") {
        if (!['i', 'he', 'she', 'it', 'we', 'you', 'they'].includes(words[wordIndex])) {
          console.log('Ожидалось "i/he/she/it/we/you/they" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'did' || words[wordIndex + 1] !== 'not') {
          console.log('Ожидалось "did not" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего', words[wordIndex + 1] || 'ничего');
          return false;
        }
        wordIndex += 2;

        if (!validateBaseVerb()) return false;

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