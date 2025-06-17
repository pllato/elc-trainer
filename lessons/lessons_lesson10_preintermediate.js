(function() {
  addLesson({
    level: "preintermediate",
    lesson: "lesson10",
    name: "Урок 10: Future Plans with Will and Be Going To",
    structures: [
      {
        structure: "I will _____________",
        pattern: ["i", "will"],
        translations: ["Я ______."],
        examples: [
          "I will drink tea. (Я буду пить чай.)",
          "I will visit Paris. (Я посещу Париж.)",
          "I will call you. (Я позвоню тебе.)"
        ],
        id: "i-will-action",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "I am going to _____________",
        pattern: ["i", "am", "going", "to"],
        translations: ["Я собираюсь ______."],
        examples: [
          "I am going to buy tickets. (Я собираюсь купить билеты.)",
          "I am going to watch a movie. (Я собираюсь посмотреть фильм.)",
          "I am going to learn English. (Я собираюсь учить английский.)"
        ],
        id: "i-am-going-to-action",
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
        .replace(/i'll/gi, 'i will')
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
      let minWords = 3; // Для I will: I + will + глагол
      if (structure.id === "i-am-going-to-action") {
        minWords = 5; // Для I am going to: I + am + going + to + глагол
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

      if (structure.id === "i-will-action") {
        const expected = ['i', 'will'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateAction()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      } else if (structure.id === "i-am-going-to-action") {
        const expected = ['i', 'am', 'going', 'to'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateAction()) return false;

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
