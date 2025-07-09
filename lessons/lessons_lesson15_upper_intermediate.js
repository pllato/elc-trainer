(function() {
  console.log('Загружен Урок 15 Upper-Intermediate v3');
  console.log('Регистрация урока с уровнем: upperintermediate');
  addLesson({
    level: "upperintermediate",
    lesson: "lesson15_upper_intermediate",
    name: "Урок 15: Reported Speech",
    structures: [
      {
        structure: "__________ said that __________ __________ (V2/V3).",
        pattern: ["said", "that"],
        translations: ["______ сказал, что ______ ______ (в прошлом)."],
        examples: [
          "She said that she had finished the project. (Она сказала, что закончила проект.)",
          "He said that he was tired yesterday. (Он сказал, что вчера был уставшим.)",
          "They said that they had gone to the party. (Они сказали, что ходили на вечеринку.)"
        ],
        id: "reported-statements",
        hasVerb: true,
        hasName: false
      },
      {
        structure: "__________ asked if/whether __________ __________ (V2/V3).",
        pattern: ["asked", "if", "whether"],
        translations: ["______ спросил, ______ ли ______ (в прошлом)."],
        examples: [
          "He asked if I had seen the movie. (Он спросил, видел ли я фильм.)",
          "She asked whether we were coming to the meeting. (Она спросила, придём ли мы на собрание.)",
          "They asked if she had finished her homework. (Они спросили, закончила ли она домашнюю работу.)"
        ],
        id: "reported-questions",
        hasVerb: true,
        hasName: false
      },
      {
        structure: "__________ told __________ to __________.",
        pattern: ["told", "to"],
        translations: ["______ сказал ______ сделать ______."],
        examples: [
          "She told me to close the door. (Она сказала мне закрыть дверь.)",
          "He told us to be quiet. (Он сказал нам быть тише.)",
          "They told him to hurry up. (Они сказали ему поторопиться.)"
        ],
        id: "reported-commands",
        hasVerb: true,
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
        .replace(/don't/gi, 'do not')
        .replace(/didn't/gi, 'did not')
        .replace(/that's/gi, 'that is')
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
        case "reported-statements":
          minWords = 5; // subject said that subject V2/V3
          break;
        case "reported-questions":
          minWords = 5; // subject asked if/whether subject V2/V3
          break;
        case "reported-commands":
          minWords = 5; // subject told object to V1
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
        'does', 'did'
      ];

      // Полный список неправильных глаголов (базовая форма → V2 → V3)
      const irregularVerbs = {
        'arise': { past: 'arose', pastParticiple: 'arisen' },
        'awake': { past: 'awoke', pastParticiple: 'awoken' },
        'be': { past: 'was', pastParticiple: 'been' },
        'bear': { past: 'bore', pastParticiple: 'borne' },
        'beat': { past: 'beat', pastParticiple: 'beaten' },
        'become': { past: 'became', pastParticiple: 'become' },
        'begin': { past: 'began', pastParticiple: 'begun' },
        'bend': { past: 'bent', pastParticiple: 'bent' },
        'bet': { past: 'bet', pastParticiple: 'bet' },
        'bind': { past: 'bound', pastParticiple: 'bound' },
        'bite': { past: 'bit', pastParticiple: 'bitten' },
        'bleed': { past: 'bled', pastParticiple: 'bled' },
        'blow': { past: 'blew', pastParticiple: 'blown' },
        'break': { past: 'broke', pastParticiple: 'broken' },
        'breed': { past: 'bred', pastParticiple: 'bred' },
        'bring': { past: 'brought', pastParticiple: 'brought' },
        'build': { past: 'built', pastParticiple: 'built' },
        'burn': { past: 'burnt', pastParticiple: 'burnt' },
        'burst': { past: 'burst', pastParticiple: 'burst' },
        'buy': { past: 'bought', pastParticiple: 'bought' },
        'cast': { past: 'cast', pastParticiple: 'cast' },
        'catch': { past: 'caught', pastParticiple: 'caught' },
        'choose': { past: 'chose', pastParticiple: 'chosen' },
        'cling': { past: 'clung', pastParticiple: 'clung' },
        'come': { past: 'came', pastParticiple: 'come' },
        'cost': { past: 'cost', pastParticiple: 'cost' },
        'creep': { past: 'crept', pastParticiple: 'crept' },
        'cut': { past: 'cut', pastParticiple: 'cut' },
        'deal': { past: 'dealt', pastParticiple: 'dealt' },
        'dig': { past: 'dug', pastParticiple: 'dug' },
        'do': { past: 'did', pastParticiple: 'done' },
        'draw': { past: 'drew', pastParticiple: 'drawn' },
        'drink': { past: 'drank', pastParticiple: 'drunk' },
        'drive': { past: 'drove', pastParticiple: 'driven' },
        'eat': { past: 'ate', pastParticiple: 'eaten' },
        'fall': { past: 'fell', pastParticiple: 'fallen' },
        'feed': { past: 'fed', pastParticiple: 'fed' },
        'feel': { past: 'felt', pastParticiple: 'felt' },
        'fight': { past: 'fought', pastParticiple: 'fought' },
        'find': { past: 'found', pastParticiple: 'found' },
        'flee': { past: 'fled', pastParticiple: 'fled' },
        'fly': { past: 'flew', pastParticiple: 'flown' },
        'forbid': { past: 'forbade', pastParticiple: 'forbidden' },
        'forget': { past: 'forgot', pastParticiple: 'forgotten' },
        'forgive': { past: 'forgave', pastParticiple: 'forgiven' },
        'freeze': { past: 'froze', pastParticiple: 'frozen' },
        'get': { past: 'got', pastParticiple: 'got' },
        'give': { past: 'gave', pastParticiple: 'given' },
        'go': { past: 'went', pastParticiple: 'gone' },
        'grow': { past: 'grew', pastParticiple: 'grown' },
        'hang': { past: 'hung', pastParticiple: 'hung' },
        'have': { past: 'had', pastParticiple: 'had' },
        'hear': { past: 'heard', pastParticiple: 'heard' },
        'hide': { past: 'hid', pastParticiple: 'hidden' },
        'hit': { past: 'hit', pastParticiple: 'hit' },
        'hold': { past: 'held', pastParticiple: 'held' },
        'hurt': { past: 'hurt', pastParticiple: 'hurt' },
        'keep': { past: 'kept', pastParticiple: 'kept' },
        'know': { past: 'knew', pastParticiple: 'known' },
        'lay': { past: 'laid', pastParticiple: 'laid' },
        'lead': { past: 'led', pastParticiple: 'led' },
        'leave': { past: 'left', pastParticiple: 'left' },
        'lend': { past: 'lent', pastParticiple: 'lent' },
        'let': { past: 'let', pastParticiple: 'let' },
        'lie': { past: 'lay', pastParticiple: 'lain' },
        'light': { past: 'lit', pastParticiple: 'lit' },
        'lose': { past: 'lost', pastParticiple: 'lost' },
        'make': { past: 'made', pastParticiple: 'made' },
        'mean': { past: 'meant', pastParticiple: 'meant' },
        'meet': { past: 'met', pastParticiple: 'met' },
        'pay': { past: 'paid', pastParticiple: 'paid' },
        'put': { past: 'put', pastParticiple: 'put' },
        'read': { past: 'read', pastParticiple: 'read' },
        'ride': { past: 'rode', pastParticiple: 'ridden' },
        'ring': { past: 'rang', pastParticiple: 'rung' },
        'rise': { past: 'rose', pastParticiple: 'risen' },
        'run': { past: 'ran', pastParticiple: 'run' },
        'say': { past: 'said', pastParticiple: 'said' },
        'see': { past: 'saw', pastParticiple: 'seen' },
        'sell': { past: 'sold', pastParticiple: 'sold' },
        'send': { past: 'sent', pastParticiple: 'sent' },
        'set': { past: 'set', pastParticiple: 'set' },
        'shake': { past: 'shook', pastParticiple: 'shaken' },
        'shine': { past: 'shone', pastParticiple: 'shone' },
        'shoot': { past: 'shot', pastParticiple: 'shot' },
        'show': { past: 'showed', pastParticiple: 'shown' },
        'shut': { past: 'shut', pastParticiple: 'shut' },
        'sing': { past: 'sang', pastParticiple: 'sung' },
        'sink': { past: 'sank', pastParticiple: 'sunk' },
        'sit': { past: 'sat', pastParticiple: 'sat' },
        'sleep': { past: 'slept', pastParticiple: 'slept' },
        'slide': { past: 'slid', pastParticiple: 'slid' },
        'speak': { past: 'spoke', pastParticiple: 'spoken' },
        'spend': { past: 'spent', pastParticiple: 'spent' },
        'stand': { past: 'stood', pastParticiple: 'stood' },
        'steal': { past: 'stole', pastParticiple: 'stolen' },
        'stick': { past: 'stuck', pastParticiple: 'stuck' },
        'sting': { past: 'stung', pastParticiple: 'stung' },
        'strike': { past: 'struck', pastParticiple: 'struck' },
        'swear': { past: 'swore', pastParticiple: 'sworn' },
        'sweep': { past: 'swept', pastParticiple: 'swept' },
        'swim': { past: 'swam', pastParticiple: 'swum' },
        'take': { past: 'took', pastParticiple: 'taken' },
        'teach': { past: 'taught', pastParticiple: 'taught' },
        'tear': { past: 'tore', pastParticiple: 'torn' },
        'tell': { past: 'told', pastParticiple: 'told' },
        'think': { past: 'thought', pastParticiple: 'thought' },
        'throw': { past: 'threw', pastParticiple: 'thrown' },
        'understand': { past: 'understood', pastParticiple: 'understood' },
        'wake': { past: 'woke', pastParticiple: 'woken' },
        'wear': { past: 'wore', pastParticiple: 'worn' },
        'win': { past: 'won', pastParticiple: 'won' },
        'write': { past: 'wrote', pastParticiple: 'written' }
      };

      // Проверяем подлежащее
      const validateSubject = () => {
        console.log('Валидация подлежащего на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет подлежащего');
          return false;
        }

        const subjectWords = [];
        while (wordIndex < words.length && !['said', 'asked', 'told'].includes(words[wordIndex])) {
          const word = words[wordIndex];
          if (excludedWords.includes(word) && !['i', 'you', 'he', 'she', 'it', 'we', 'they', 'the', 'a', 'an'].includes(word)) {
            console.log('Исключённое слово в подлежащем:', word);
            return false;
          }
          subjectWords.push(word);
          wordIndex++;
        }

        if (subjectWords.length === 0) {
          console.log('Подлежащее отсутствует');
          return false;
        }
        console.log('Подлежащее:', subjectWords.join(' '));
        return true;
      };

      // Проверяем объект (для told)
      const validateObject = () => {
        console.log('Валидация объекта на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет объекта');
          return false;
        }

        const objectWords = [];
        while (wordIndex < words.length && !['to'].includes(words[wordIndex])) {
          const word = words[wordIndex];
          if (excludedWords.includes(word) && !['i', 'you', 'he', 'she', 'it', 'we', 'them', 'him', 'her', 'us', 'me', 'the', 'a', 'an'].includes(word)) {
            console.log('Исключённое слово в объекте:', word);
            return false;
          }
          objectWords.push(word);
          wordIndex++;
        }

        if (objectWords.length === 0) {
          console.log('Объект отсутствует');
          return false;
        }
        console.log('Объект:', objectWords.join(' '));
        return true;
      };

      // Проверяем глагол в Past Simple (V2) или Past Perfect (had + V3)
      const validatePastVerb = () => {
        console.log('Валидация глагола V2/V3 на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет глагола');
          return false;
        }

        let verb = words[wordIndex];
        let isPastPerfect = false;

        if (verb === 'had') {
          console.log('Обнаружено "had", проверка Past Perfect');
          isPastPerfect = true;
          wordIndex++;
          if (!words[wordIndex]) {
            console.log('Нет глагола V3 после "had"');
            return false;
          }
          verb = words[wordIndex];
        }

        const isIrregularV2 = Object.values(irregularVerbs).some(v => v.past === verb);
        const isIrregularV3 = Object.values(irregularVerbs).some(v => v.pastParticiple === verb);
        const isRegularV2orV3 = verb.endsWith('ed') && !excludedWords.includes(verb);
        const isAdjective = ['tired', 'coming', 'ready'].includes(verb); // Добавлен 'ready'
        if (!isIrregularV2 && !isIrregularV3 && !isRegularV2orV3 && !isAdjective) {
          console.log('Глагол не является V2, V3 или допустимым прилагательным:', verb);
          return false;
        }
        if (isPastPerfect && !isIrregularV3 && !isRegularV2orV3) {
          console.log('Глагол после "had" не является V3:', verb);
          return false;
        }

        wordIndex++;

        // Проверяем опциональное дополнение
        let actionWords = [];
        while (wordIndex < words.length) {
          const word = words[wordIndex];
          if (excludedWords.includes(word) && !['the', 'a', 'an', 'yesterday', 'to', 'her', 'his'].includes(word)) {
            console.log('Исключённое слово в дополнении:', word);
            return false;
          }
          actionWords.push(word);
          wordIndex++;
        }
        console.log('Дополнение:', actionWords.join(' '));

        return true;
      };

      // Проверяем глагол в базовой форме (V1)
      const validateBaseVerb = () => {
        console.log('Валидация глагола V1 на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет глагола');
          return false;
        }

        const verb = words[wordIndex];
        console.log('Проверка глагола V1:', verb);
        if (verb.endsWith('ing')) {
          console.log('Глагол не должен быть в форме -ing:', verb);
          return false;
        }
        const isIrregularPast = Object.values(irregularVerbs).some(v => v.past === verb || v.pastParticiple === verb);
        if (isIrregularPast && !Object.keys(irregularVerbs).includes(verb)) {
          console.log('Глагол в прошедшем времени или V3, ожидается базовая форма:', verb);
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
          if (excludedWords.includes(word) && !['the', 'a', 'an', 'up'].includes(word)) {
            console.log('Исключённое слово в дополнении:', word);
            return false;
          }
          actionWords.push(word);
          wordIndex++;
        }
        console.log('Дополнение:', actionWords.join(' '));

        return true;
      };

      if (structure.id === "reported-statements") {
        console.log('Начало проверки структуры Reported Statements');
        if (!validateSubject()) return false;

        if (!words[wordIndex] || words[wordIndex] !== 'said') {
          console.log('Ожидалось "said" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!words[wordIndex] || words[wordIndex] !== 'that') {
          console.log('Ожидалось "that" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateSubject()) return false;

        if (!validatePastVerb()) return false;

        console.log('Валидация пройдена для:', cleanedText);
        return true;
      } else if (structure.id === "reported-questions") {
        console.log('Начало проверки структуры Reported Questions');
        if (!validateSubject()) return false;

        if (!words[wordIndex] || words[wordIndex] !== 'asked') {
          console.log('Ожидалось "asked" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!words[wordIndex] || !['if', 'whether'].includes(words[wordIndex])) {
          console.log('Ожидалось "if" или "whether" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateSubject()) return false;

        if (!validatePastVerb()) return false;

        console.log('Валидация пройдена для:', cleanedText);
        return true;
      } else if (structure.id === "reported-commands") {
        console.log('Начало проверки структуры Reported Commands');
        if (!validateSubject()) return false;

        if (!words[wordIndex] || words[wordIndex] !== 'told') {
          console.log('Ожидалось "told" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateObject()) return false;

        if (!words[wordIndex] || words[wordIndex] !== 'to') {
          console.log('Ожидалось "to" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateBaseVerb()) return false;

        console.log('Валидация пройдена для:', cleanedText);
        return true;
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();