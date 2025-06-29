(function() {
  console.log('Загружен Урок 13 Upper-Intermediate v1');
  console.log('Регистрация урока с уровнем: upperintermediate');
  addLesson({
    level: "upperintermediate",
    lesson: "lesson13_upper_intermediate",
    name: "Урок 13: Mixed Conditionals",
    structures: [
      {
        structure: "If __________ had __________, __________ would __________.",
        pattern: ["if", "had", "would"],
        translations: ["Если бы ______ (прошлое), ______ был бы ______ сейчас."],
        examples: [
          "If I had studied harder, I would be successful now. (Если бы я учился усерднее, я был бы успешен сейчас.)",
          "If she had practiced more, she would play better today. (Если бы она больше практиковалась, она играла бы лучше сегодня.)",
          "If we had invested wisely, we would be rich now. (Если бы мы инвестировали с умом, мы были бы богаты сейчас.)"
        ],
        id: "past-condition-present-result",
        hasVerb: true,
        hasName: false
      },
      {
        structure: "If __________ were __________, __________ would have __________.",
        pattern: ["if", "were", "would", "have"],
        translations: ["Если бы ______ (настоящее), ______ сделал бы ______ в прошлом."],
        examples: [
          "If I were smarter, I would have passed the exam. (Если бы я был умнее, я сдал бы экзамен.)",
          "If he were more careful, he would have avoided the mistake. (Если бы он был осторожнее, он избежал бы ошибки.)",
          "If they were more organized, they would have finished on time. (Если бы они были организованнее, они закончили бы вовремя.)"
        ],
        id: "present-condition-past-result",
        hasVerb: true,
        hasName: false
      },
      {
        structure: "If __________ had __________, __________ would __________.",
        pattern: ["if", "had", "would"],
        translations: ["Если бы ______ (прошлое), ______ сделал бы ______ в будущем."],
        examples: [
          "If I had saved money, I would travel next year. (Если бы я сэкономил деньги, я поехал бы в путешествие в следующем году.)",
          "If she had learned Spanish, she would work abroad next month. (Если бы она выучила испанский, она работала бы за границей в следующем месяце.)",
          "If we had prepared better, we would succeed in the competition. (Если бы мы лучше подготовились, мы преуспели бы в соревновании.)"
        ],
        id: "past-condition-future-result",
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
        case "past-condition-present-result":
          minWords = 6; // if subject had V3 subject would V1
          break;
        case "present-condition-past-result":
          minWords = 6; // if subject were V2 subject would have V3
          break;
        case "past-condition-future-result":
          minWords = 6; // if subject had V3 subject would V1
          break;
        default:
          minWords = 6;
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
        while (wordIndex < words.length && !['had', 'were'].includes(words[wordIndex])) {
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

      // Проверяем глагол в Past Perfect (had + V3)
      const validatePastPerfect = () => {
        console.log('Валидация Past Perfect на позиции', wordIndex);
        if (!words[wordIndex] || words[wordIndex] !== 'had') {
          console.log('Ожидалось "had" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!words[wordIndex]) {
          console.log('Нет глагола V3');
          return false;
        }

        const verb = words[wordIndex];
        const isIrregularV3 = Object.values(irregularVerbs).some(v => v.pastParticiple === verb);
        const isRegularV3 = verb.endsWith('ed') && !excludedWords.includes(verb);
        if (!isIrregularV3 && !isRegularV3) {
          console.log('Глагол не является причастием прошедшего времени:', verb);
          return false;
        }

        wordIndex++;
        return true;
      };

      // Проверяем глагол в Past Simple (V2 или were)
      const validatePastSimple = () => {
        console.log('Валидация Past Simple на позиции', wordIndex);
        if (!words[wordIndex] || words[wordIndex] !== 'were') {
          console.log('Ожидалось "were" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!words[wordIndex]) {
          console.log('Нет прилагательного или глагола V2');
          return false;
        }

        const verb = words[wordIndex];
        const isIrregularV2 = Object.values(irregularVerbs).some(v => v.past === verb);
        const isRegularV2 = verb.endsWith('ed') && !excludedWords.includes(verb);
        const isAdjective = ['smarter', 'more', 'better', 'careful', 'organized'].includes(verb);
        if (!isIrregularV2 && !isRegularV2 && !isAdjective) {
          console.log('Глагол не является Past Simple или допустимым прилагательным:', verb);
          return false;
        }

        wordIndex++;
        return true;
      };

      // Проверяем главную часть (would V1)
      const validateMainClauseV1 = () => {
        console.log('Валидация главной части (would V1) на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет подлежащего в главной части');
          return false;
        }

        const mainSubjectWords = [];
        while (wordIndex < words.length && !['would'].includes(words[wordIndex])) {
          const word = words[wordIndex];
          if (excludedWords.includes(word) && !['i', 'you', 'he', 'she', 'it', 'we', 'they', 'the', 'a', 'an'].includes(word)) {
            console.log('Исключённое слово в подлежащем главной части:', word);
            return false;
          }
          mainSubjectWords.push(word);
          wordIndex++;
        }

        if (mainSubjectWords.length === 0) {
          console.log('Подлежащее главной части отсутствует');
          return false;
        }
        console.log('Подлежащее главной части:', mainSubjectWords.join(' '));

        if (!words[wordIndex] || words[wordIndex] !== 'would') {
          console.log('Ожидалось "would" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!words[wordIndex]) {
          console.log('Нет глагола V1');
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
          if (excludedWords.includes(word) && !['the', 'a', 'an', 'now', 'today', 'better', 'next', 'year', 'month', 'abroad', 'in'].includes(word)) {
            console.log('Исключённое слово в дополнении:', word);
            return false;
          }
          actionWords.push(word);
          wordIndex++;
        }
        console.log('Дополнение:', actionWords.join(' '));

        return true;
      };

      // Проверяем главную часть (would have V3)
      const validateMainClauseV3 = () => {
        console.log('Валидация главной части (would have V3) на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет подлежащего в главной части');
          return false;
        }

        const mainSubjectWords = [];
        while (wordIndex < words.length && !['would'].includes(words[wordIndex])) {
          const word = words[wordIndex];
          if (excludedWords.includes(word) && !['i', 'you', 'he', 'she', 'it', 'we', 'they', 'the', 'a', 'an'].includes(word)) {
            console.log('Исключённое слово в подлежащем главной части:', word);
            return false;
          }
          mainSubjectWords.push(word);
          wordIndex++;
        }

        if (mainSubjectWords.length === 0) {
          console.log('Подлежащее главной части отсутствует');
          return false;
        }
        console.log('Подлежащее главной части:', mainSubjectWords.join(' '));

        if (!words[wordIndex] || words[wordIndex] !== 'would') {
          console.log('Ожидалось "would" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!words[wordIndex] || words[wordIndex] !== 'have') {
          console.log('Ожидалось "have" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!words[wordIndex]) {
          console.log('Нет глагола V3');
          return false;
        }

        const verb = words[wordIndex];
        const isIrregularV3 = Object.values(irregularVerbs).some(v => v.pastParticiple === verb);
        const isRegularV3 = verb.endsWith('ed') && !excludedWords.includes(verb);
        if (!isIrregularV3 && !isRegularV3) {
          console.log('Глагол не является причастием прошедшего времени:', verb);
          return false;
        }

        wordIndex++;

        // Проверяем опциональное дополнение
        let actionWords = [];
        while (wordIndex < words.length) {
          const word = words[wordIndex];
          if (excludedWords.includes(word) && !['the', 'a', 'an', 'on', 'in', 'time'].includes(word)) {
            console.log('Исключённое слово в дополнении:', word);
            return false;
          }
          actionWords.push(word);
          wordIndex++;
        }
        console.log('Дополнение:', actionWords.join(' '));

        return true;
      };

      if (structure.id === "past-condition-present-result") {
        console.log('Начало проверки структуры Past Condition, Present Result');
        if (!words[wordIndex] || words[wordIndex] !== 'if') {
          console.log('Ожидалось "if" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateSubject()) return false;

        if (!validatePastPerfect()) return false;

        if (!validateMainClauseV1()) return false;

        console.log('Валидация пройдена для:', cleanedText);
        return true;
      } else if (structure.id === "present-condition-past-result") {
        console.log('Начало проверки структуры Present Condition, Past Result');
        if (!words[wordIndex] || words[wordIndex] !== 'if') {
          console.log('Ожидалось "if" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateSubject()) return false;

        if (!validatePastSimple()) return false;

        if (!validateMainClauseV3()) return false;

        console.log('Валидация пройдена для:', cleanedText);
        return true;
      } else if (structure.id === "past-condition-future-result") {
        console.log('Начало проверки структуры Past Condition, Future Result');
        if (!words[wordIndex] || words[wordIndex] !== 'if') {
          console.log('Ожидалось "if" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateSubject()) return false;

        if (!validatePastPerfect()) return false;

        if (!validateMainClauseV1()) return false;

        console.log('Валидация пройдена для:', cleanedText);
        return true;
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();