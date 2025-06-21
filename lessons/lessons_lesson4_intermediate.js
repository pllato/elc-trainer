(function() {
  addLesson({
    level: "intermediate",
    lesson: "lesson4",
    name: "Урок 4: Polite Requests and Responses",
    structures: [
      {
        structure: "Would you mind if I __________ (ed) ___________?",
        pattern: ["would", "you", "mind", "if", "i"],
        translations: ["Не возражаете, если я ______?"],
        examples: [
          "Would you mind if I opened the window? (Не возражаете, если я открою окно?)",
          "Would you mind if I smoked here? (Не возражаете, если я закурю здесь?)",
          "Would you mind if I took a break? (Не возражаете, если я сделаю перерыв?)"
        ],
        id: "would-you-mind-if-i-past-simple",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Yes, of course/ No, that’s fine/ No, I don’t mind/ I don’t mind it a bit",
        pattern: [],
        translations: ["Да, конечно/ Нет, всё в порядке/ Нет, я не против/ Я совсем не против"],
        examples: [
          "Yes, of course. (Да, конечно.)",
          "No, that’s fine. (Нет, всё в порядке.)",
          "No, I don’t mind. (Нет, я не против.)"
        ],
        id: "positive-response",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Sorry, but .../ No, sorry/ I’m afraid you can’t/ I’d rather you didn’t",
        pattern: [],
        translations: ["Извините, но .../ Нет, извините/ Боюсь, нельзя/ Я бы предпочёл, чтобы вы этого не делали"],
        examples: [
          "Sorry, but you can’t. (Извините, но нельзя.)",
          "No, sorry. (Нет, извините.)",
          "I’d rather you didn’t. (Я бы предпочёл, чтобы вы этого не делали.)"
        ],
        id: "negative-response",
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
        .replace(/i'd/gi, 'i would')
        .replace(/that's/gi, 'that is')
        .replace(/i'm/gi, 'i am')
        .replace(/can't/gi, 'cannot')
        .replace(/didn't/gi, 'did not')
        .replace(/don't/gi, 'do not')
        .replace(/dont/gi, 'do not')
        .replace(/\beveryday\b/gi, 'every day');
      if (processedText !== text) {
        console.log('Обработаны сокращения и everyday:', processedText);
      }
      // Удаляем пунктуацию, нормализуем пробелы и приводим к нижнему регистру
      const cleanedText = processedText.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').toLowerCase().trim();
      console.log('Очищенный текст:', cleanedText);

      const words = cleanedText.split(/\s+/).filter(word => word.length > 0);
      console.log('Разделённые слова:', words);

      // Инициализируем wordIndex
      let wordIndex = 0;

      // Минимальное количество слов
      const minWords = structure.id === "would-you-mind-if-i-past-simple" ? 7 : 2; // 7 для a, 2 для b и c
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      // Исключённые слова (модальные, стативные глаголы и неподходящие)
      const excludedWords = [
        'will', 'should', 'can', 'could', 'must', 'may', 'might', 'shall', 'ought',
        'am', 'is', 'are', 'was', 'were', 'been', 'being', 'has', 'had', 'does', 'did'
      ];

      // Допустимые наречия для дополнений
      const validAdverbs = ['hard', 'harder', 'well', 'better', 'fast', 'slowly', 'quickly', 'carefully', 'here', 'there'];

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
        'dream': { v2: 'dreamed/dreamt', v3: 'dreamed/dreamt' },
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

      // Проверяем глагол во второй форме (Past Simple)
      const validatePastSimple = () => {
        console.log('Валидация глагола во второй форме на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет глагола');
          return false;
        }

        const verb = words[wordIndex];
        console.log('Проверка глагола V2:', verb);
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
            if (forms.v2 === verb || (typeof forms.v2 === 'string' && forms.v2.includes('/') && forms.v2.split('/').includes(verb))) {
              isIrregular = true;
              break;
            }
          }
          if (!isIrregular) {
            console.log('Глагол не является валидным во второй форме:', verb);
            return false;
          }
        }

        wordIndex++;

        // Проверяем обязательное дополнение
        if (!words[wordIndex]) {
          console.log('Нет дополнения после глагола');
          return false;
        }
        let actionWords = [];
        while (wordIndex < words.length) {
          const word = words[wordIndex];
          if (excludedWords.includes(word) && !validAdverbs.includes(word)) {
            console.log('Исключённое слово в дополнении:', word);
            return false;
          }
          actionWords.push(word);
          wordIndex++;
        }
        console.log('Дополнение:', actionWords);
        if (actionWords.length === 0) {
          console.log('Дополнение отсутствует');
          return false;
        }

        return true;
      };

      if (structure.id === "would-you-mind-if-i-past-simple") {
        console.log('Начало проверки структуры Would you mind if I past simple');
        const expectedStart = ['would', 'you', 'mind', 'if', 'i'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validatePastSimple()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "positive-response") {
        console.log('Начало проверки структуры Positive response');
        const validResponses = [
          'yes of course',
          'no that is fine',
          'no i do not mind',
          'i do not mind it a bit'
        ];
        // Проверяем, содержит ли cleanedText один из допустимых ответов (игнорируем вводные слова, такие как "oh")
        let isValid = false;
        for (const response of validResponses) {
          if (cleanedText.includes(response)) {
            isValid = true;
            break;
          }
        }
        if (!isValid) {
          console.log('Ответ не соответствует допустимым положительным ответам:', cleanedText);
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "negative-response") {
        console.log('Начало проверки структуры Negative response');
        const validResponses = [
          'sorry but you cannot',
          'no sorry',
          'i am afraid you cannot',
          'i would rather you did not'
        ];
        // Проверяем, содержит ли cleanedText один из допустимых ответов
        let isValid = false;
        for (const response of validResponses) {
          if (cleanedText.includes(response)) {
            isValid = true;
            break;
          }
        }
        if (!isValid) {
          console.log('Ответ не соответствует допустимым отрицательным ответам:', cleanedText);
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