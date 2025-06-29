(function() {
  console.log('Загружен Урок 11 Upper-Intermediate v1');
  console.log('Регистрация урока с уровнем: upperintermediate');
  addLesson({
    level: "upperintermediate",
    lesson: "lesson11_upper_intermediate",
    name: "Урок 11: Expressing Agreement and Partial Disagreement",
    structures: [
      {
        structure: "I totally agree. / That's just what I think, too. / Absolutely.",
        pattern: [],
        translations: ["Я полностью согласен. / Это именно то, что я думаю. / Абсолютно."],
        examples: [
          "I totally agree. (Я полностью согласен.)",
          "That's just what I think, too. (Это именно то, что я думаю.)",
          "Absolutely. (Абсолютно.)"
        ],
        id: "full-agreement",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "I see your point, but ___________. / I see what you mean, but __________.",
        pattern: ["i", "see"],
        translations: ["Я понимаю твою точку зрения, но _______. / Я понимаю, что ты имеешь в виду, но _______."],
        examples: [
          "I see your point, but I think differently. (Я понимаю твою точку зрения, но я думаю иначе.)",
          "I see what you mean, but we should consider other options. (Я понимаю, что ты имеешь в виду, но мы должны рассмотреть другие варианты.)",
          "I see your point, but I prefer a different approach. (Я понимаю твою точку зрения, но я предпочитаю другой подход.)"
        ],
        id: "partial-disagreement-see",
        hasVerb: true,
        hasName: false
      },
      {
        structure: "I agree up to a point, but ___________.",
        pattern: ["i", "agree", "up", "to", "a", "point", "but"],
        translations: ["Я согласен до определённой степени, но _______."],
        examples: [
          "I agree up to a point, but we need more evidence. (Я согласен до определённой степени, но нам нужно больше доказательств.)",
          "I agree up to a point, but it depends on the situation. (Я согласен до определённой степени, но это зависит от ситуации.)",
          "I agree up to a point, but I have some concerns. (Я согласен до определённой степени, но у меня есть некоторые опасения.)"
        ],
        id: "partial-disagreement-agree",
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
        case "full-agreement":
          minWords = 1; // Absolutely
          break;
        case "partial-disagreement-see":
          minWords = 6; // i see your point but V1
          break;
        case "partial-disagreement-agree":
          minWords = 8; // i agree up to a point but V1
          break;
        default:
          minWords = 1;
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

      // Полный список неправильных глаголов (базовая форма → V2)
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

        const verb = words[wordIndex];
        console.log('Проверка глагола V1:', verb);
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
          if (excludedWords.includes(word) && !['the', 'a', 'an', 'other', 'different', 'more', 'some'].includes(word)) {
            console.log('Исключённое слово в дополнении:', word);
            return false;
          }
          actionWords.push(word);
          wordIndex++;
        }
        console.log('Дополнение:', actionWords.join(' '));

        return true;
      };

      if (structure.id === "full-agreement") {
        console.log('Начало проверки структуры Full Agreement');
        const validResponses = [
          'i totally agree',
          'that is just what i think too',
          'absolutely'
        ];
        if (validResponses.includes(cleanedText)) {
          console.log('Валидация пройдена для:', cleanedText);
          return true;
        }
        console.log('Недопустимый ответ:', cleanedText);
        return false;
      } else if (structure.id === "partial-disagreement-see") {
        console.log('Начало проверки структуры Partial Disagreement (See)');
        const expectedStarts = [
          ['i', 'see', 'your', 'point', 'but'],
          ['i', 'see', 'what', 'you', 'mean', 'but']
        ];
        let matchedStart = null;
        for (const start of expectedStarts) {
          if (words.slice(0, start.length).join(' ') === start.join(' ')) {
            matchedStart = start;
            break;
          }
        }
        if (!matchedStart) {
          console.log('Ожидалось начало "I see your point, but" или "I see what you mean, but", получено', words.slice(0, 5).join(' '));
          return false;
        }
        wordIndex = matchedStart.length;

        if (!validateAction()) return false;

        console.log('Валидация пройдена для:', cleanedText);
        return true;
      } else if (structure.id === "partial-disagreement-agree") {
        console.log('Начало проверки структуры Partial Disagreement (Agree)');
        const expectedStart = ['i', 'agree', 'up', 'to', 'a', 'point', 'but'];
        for (let i = 0; i < expectedStart.length; i++) {
          if (!words[wordIndex] || words[wordIndex] !== expectedStart[i]) {
            console.log(`Ожидалось "${expectedStart[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateAction()) return false;

        console.log('Валидация пройдена для:', cleanedText);
        return true;
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();