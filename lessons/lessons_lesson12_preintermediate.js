(function() {
  addLesson({
    level: "preintermediate",
    lesson: "lesson12",
    name: "Урок 12: Present Perfect Questions and Answers",
    structures: [
      {
        structure: "Have you _______________(ed)?",
        pattern: ["have", "you"],
        translations: ["Ты ______?"],
        examples: [
          "Have you watched the TV? (Ты смотрел телевизор?)",
          "Have you eaten dinner? (Ты поел ужин?)",
          "Have you been to Paris? (Ты был в Париже?)"
        ],
        id: "have-you-past-participle",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Yes, I have _______________(ed).",
        pattern: ["yes", "i", "have"],
        translations: ["Да, я ______."],
        examples: [
          "Yes, I have watched the TV. (Да, я смотрел телевизор.)",
          "Yes, I have eaten dinner. (Да, я поел ужин.)",
          "Yes, I have been to Paris. (Да, я был в Париже.)"
        ],
        id: "yes-i-have-past-participle",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "No, I haven’t _______________(ed).",
        pattern: ["no", "i"],
        translations: ["Нет, я не ______."],
        examples: [
          "No, I haven’t watched the TV. (Нет, я не смотрел телевизор.)",
          "No, I haven’t eaten dinner. (Нет, я не поел ужин.)",
          "No, I haven’t been to Paris. (Нет, я не был в Париже.)"
        ],
        id: "no-i-havent-past-participle",
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
      let minWords = 3; // Для вопроса: Have + you + глагол
      if (structure.id === "yes-i-have-past-participle") {
        minWords = 4; // Yes + I + have + глагол
      } else if (structure.id === "no-i-havent-past-participle") {
        minWords = 5; // No + I + have + not + глагол
      }
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;

      // Исключённые слова (модальные, стативные глаголы и неподходящие)
      const excludedWords = [
        'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought',
        'am', 'is', 'are', 'was', 'were', 'being', 'has', 'had', 'does', 'did'
      ];

      // Полный список неправильных глаголов (базовая форма → {V2, V3})
      const irregularVerbs = {
        'arise': { v2: 'arose', v3: 'arisen' },
        'awake': { v2: 'awoke', v3: 'awoken' },
        'be': { v2: 'was/were', v3: 'been' },
        'bear': { v2: 'bore', v3: 'borne' },
        'beat': { v2: 'beat', v3: 'beaten' },
        'become': { v2: 'became', v3: 'become' },
        'begin': { v2: 'began', v3: 'begun' },
        'bend': { v2: 'bent', v3: 'bent' },
        'bet': { v2: 'bet', v3: 'bet' },
        'bind': { v2: 'bound', v3: 'bound' },
        'bite': { v2: 'bit', v3: 'bitten' },
        'bleed': { v2: 'bled', v3: 'bled' },
        'blow': { v2: 'blew', v3: 'blown' },
        'break': { v2: 'broke', v3: 'broken' },
        'breed': { v2: 'bred', v3: 'bred' },
        'bring': { v2: 'brought', v3: 'brought' },
        'build': { v2: 'built', v3: 'built' },
        'burn': { v2: 'burnt/burned', v3: 'burnt/burned' },
        'burst': { v2: 'burst', v3: 'burst' },
        'buy': { v2: 'bought', v3: 'bought' },
        'cast': { v2: 'cast', v3: 'cast' },
        'catch': { v2: 'caught', v3: 'caught' },
        'choose': { v2: 'chose', v3: 'chosen' },
        'cling': { v2: 'clung', v3: 'clung' },
        'come': { v2: 'came', v3: 'come' },
        'cost': { v2: 'cost', v3: 'cost' },
        'creep': { v2: 'crept', v3: 'crept' },
        'cut': { v2: 'cut', v3: 'cut' },
        'deal': { v2: 'dealt', v3: 'dealt' },
        'dig': { v2: 'dug', v3: 'dug' },
        'do': { v2: 'did', v3: 'done' },
        'draw': { v2: 'drew', v3: 'drawn' },
        'drink': { v2: 'drank', v3: 'drunk' },
        'drive': { v2: 'drove', v3: 'driven' },
        'eat': { v2: 'ate', v3: 'eaten' },
        'fall': { v2: 'fell', v3: 'fallen' },
        'feed': { v2: 'fed', v3: 'fed' },
        'feel': { v2: 'felt', v3: 'felt' },
        'fight': { v2: 'fought', v3: 'fought' },
        'find': { v2: 'found', v3: 'found' },
        'flee': { v2: 'fled', v3: 'fled' },
        'fly': { v2: 'flew', v3: 'flown' },
        'forbid': { v2: 'forbade', v3: 'forbidden' },
        'forget': { v2: 'forgot', v3: 'forgotten' },
        'forgive': { v2: 'forgave', v3: 'forgiven' },
        'freeze': { v2: 'froze', v3: 'frozen' },
        'get': { v2: 'got', v3: 'got/gotten' },
        'give': { v2: 'gave', v3: 'given' },
        'go': { v2: 'went', v3: 'gone' },
        'grow': { v2: 'grew', v3: 'grown' },
        'hang': { v2: 'hung', v3: 'hung' },
        'have': { v2: 'had', v3: 'had' },
        'hear': { v2: 'heard', v3: 'heard' },
        'hide': { v2: 'hid', v3: 'hidden' },
        'hit': { v2: 'hit', v3: 'hit' },
        'hold': { v2: 'held', v3: 'held' },
        'hurt': { v2: 'hurt', v3: 'hurt' },
        'keep': { v2: 'kept', v3: 'kept' },
        'know': { v2: 'knew', v3: 'known' },
        'lay': { v2: 'laid', v3: 'laid' },
        'lead': { v2: 'led', v3: 'led' },
        'leave': { v2: 'left', v3: 'left' },
        'lend': { v2: 'lent', v3: 'lent' },
        'let': { v2: 'let', v3: 'let' },
        'lie': { v2: 'lay', v3: 'lain' },
        'light': { v2: 'lit', v3: 'lit' },
        'lose': { v2: 'lost', v3: 'lost' },
        'make': { v2: 'made', v3: 'made' },
        'mean': { v2: 'meant', v3: 'meant' },
        'meet': { v2: 'met', v3: 'met' },
        'pay': { v2: 'paid', v3: 'paid' },
        'put': { v2: 'put', v3: 'put' },
        'read': { v2: 'read', v3: 'read' },
        'ride': { v2: 'rode', v3: 'ridden' },
        'ring': { v2: 'rang', v3: 'rung' },
        'rise': { v2: 'rose', v3: 'risen' },
        'run': { v2: 'ran', v3: 'run' },
        'say': { v2: 'said', v3: 'said' },
        'see': { v2: 'saw', v3: 'seen' },
        'sell': { v2: 'sold', v3: 'sold' },
        'send': { v2: 'sent', v3: 'sent' },
        'set': { v2: 'set', v3: 'set' },
        'shake': { v2: 'shook', v3: 'shaken' },
        'shine': { v2: 'shone', v3: 'shone' },
        'shoot': { v2: 'shot', v3: 'shot' },
        'show': { v2: 'showed', v3: 'shown' },
        'shut': { v2: 'shut', v3: 'shut' },
        'sing': { v2: 'sang', v3: 'sung' },
        'sink': { v2: 'sank', v3: 'sunk' },
        'sit': { v2: 'sat', v3: 'sat' },
        'sleep': { v2: 'slept', v3: 'slept' },
        'slide': { v2: 'slid', v3: 'slid' },
        'speak': { v2: 'spoke', v3: 'spoken' },
        'spend': { v2: 'spent', v3: 'spent' },
        'stand': { v2: 'stood', v3: 'stood' },
        'steal': { v2: 'stole', v3: 'stolen' },
        'stick': { v2: 'stuck', v3: 'stuck' },
        'sting': { v2: 'stung', v3: 'stung' },
        'strike': { v2: 'struck', v3: 'struck' },
        'swear': { v2: 'swore', v3: 'sworn' },
        'sweep': { v2: 'swept', v3: 'swept' },
        'swim': { v2: 'swam', v3: 'swum' },
        'take': { v2: 'took', v3: 'taken' },
        'teach': { v2: 'taught', v3: 'taught' },
        'tear': { v2: 'tore', v3: 'torn' },
        'tell': { v2: 'told', v3: 'told' },
        'think': { v2: 'thought', v3: 'thought' },
        'throw': { v2: 'threw', v3: 'thrown' },
        'understand': { v2: 'understood', v3: 'understood' },
        'wake': { v2: 'woke', v3: 'woken' },
        'wear': { v2: 'wore', v3: 'worn' },
        'win': { v2: 'won', v3: 'won' },
        'write': { v2: 'wrote', v3: 'written' }
      };

      // Проверяем глагол в третьей форме (Past Participle)
      const validatePastParticiple = () => {
        console.log('Валидация глагола в третьей форме на позиции', wordIndex);
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
          let isIrregular = false;
          for (const [base, forms] of Object.entries(irregularVerbs)) {
            if (forms.v3 === verb || (typeof forms.v3 === 'string' && forms.v3.includes('/') && forms.v3.split('/').includes(verb))) {
              isIrregular = true;
              break;
            }
          }
          if (!isIrregular) {
            console.log('Глагол не является валидным в третьей форме:', verb);
            return false;
          }
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

      if (structure.id === "have-you-past-participle") {
        const expected = ['have', 'you'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validatePastParticiple()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "yes-i-have-past-participle") {
        const expected = ['yes', 'i', 'have'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validatePastParticiple()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "no-i-havent-past-participle") {
        const expected = ['no', 'i', 'have', 'not'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validatePastParticiple()) return false;

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