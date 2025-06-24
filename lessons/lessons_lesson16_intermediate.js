(function() {
  addLesson({
    level: "intermediate",
    lesson: "lesson16",
    name: "Урок 16: Questions and Speculations about Past Actions",
    structures: [
      {
        structure: "Why did you/he/she/it/we/they ___________?",
        pattern: ["why", "did"],
        translations: ["Почему ты/он/она/оно/мы/они ______?"],
        examples: [
          "Why did you leave early? (Почему ты ушёл рано?)",
          "Why did she cancel the meeting? (Почему она отменила встречу?)",
          "Why did they forget the keys? (Почему они забыли ключи?)"
        ],
        id: "why-did-subject-past-simple",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "I guess this was probably because _________",
        pattern: ["i", "guess", "this", "was", "probably", "because"],
        translations: ["Я предполагаю, это, вероятно, потому что ______"],
        examples: [
          "I guess this was probably because he was tired. (Я предполагаю, это, вероятно, потому что он устал.)",
          "I guess this was probably because of an emergency. (Я предполагаю, это, вероятно, из-за чрезвычайной ситуации.)",
          "I guess this was probably because they were busy. (Я предполагаю, это, вероятно, потому что они были заняты.)"
        ],
        id: "i-guess-this-was-probably-because",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "This could be because __________",
        pattern: ["this", "could", "be", "because"],
        translations: ["Это могло быть потому что ______"],
        examples: [
          "This could be because he was tired. (Это могло быть потому что он устал.)",
          "This could be because of an emergency. (Это могло быть из-за чрезвычайной ситуации.)",
          "This could be because they were busy. (Это могло быть потому что они были заняты.)"
        ],
        id: "this-could-be-because",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "This might be because ___________",
        pattern: ["this", "might", "be", "because"],
        translations: ["Это, возможно, потому что ______"],
        examples: [
          "This might be because he was tired. (Это, возможно, потому что он устал.)",
          "This might be because of an emergency. (Это, возможно, из-за чрезвычайной ситуации.)",
          "This might be because they were busy. (Это, возможно, потому что они были заняты.)"
        ],
        id: "this-might-be-because",
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
        .replace(/didnt/gi, 'did not')
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
        case "why-did-subject-past-simple":
          minWords = 4; // why did you leave
          break;
        case "i-guess-this-was-probably-because":
          minWords = 7; // i guess this was probably because reason
          break;
        case "this-could-be-because":
          minWords = 5; // this could be because reason
          break;
        case "this-might-be-because":
          minWords = 5; // this might be because reason
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

      // Допустимые наречия и предлоги для дополнений
      const validAdverbs = ['early', 'well', 'better', 'fast', 'slowly', 'quickly', 'carefully', 'a lot', 'much'];

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

        // Проверяем опциональное дополнение
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

        return true;
      };

      // Проверяем причину (свободная фраза)
      const validateReason = () => {
        console.log('Валидация причины на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет причины');
          return false;
        }

        let reasonWords = [];
        while (wordIndex < words.length) {
          reasonWords.push(words[wordIndex]);
          wordIndex++;
        }
        console.log('Причина:', reasonWords);
        if (reasonWords.length === 0) {
          console.log('Причина отсутствует');
          return false;
        }

        return true;
      };

      if (structure.id === "why-did-subject-past-simple") {
        console.log('Начало проверки структуры Why did subject past simple');
        const expectedStart = ['why', 'did'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        // Проверяем подлежащее
        if (!['you', 'he', 'she', 'it', 'we', 'they'].includes(words[wordIndex])) {
          console.log('Ожидалось "you/he/she/it/we/they" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validatePastSimple()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "i-guess-this-was-probably-because") {
        console.log('Начало проверки структуры I guess this was probably because');
        const expectedStart = ['i', 'guess', 'this', 'was', 'probably', 'because'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateReason()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "this-could-be-because") {
        console.log('Начало проверки структуры This could be because');
        const expectedStart = ['this', 'could', 'be', 'because'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateReason()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "this-might-be-because") {
        console.log('Начало проверки структуры This might be because');
        const expectedStart = ['this', 'might', 'be', 'because'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (wordIndex >= words.length || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateReason()) return false;

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