(function() {
  console.log('Загружен Урок 8 Upper-Intermediate v6');
  console.log('Регистрация урока с уровнем: upperintermediate');
  addLesson({
    level: "upperintermediate",
    lesson: "lesson8_upper_intermediate",
    name: "Урок 8: Used to / Would",
    structures: [
      {
        structure: "__________ used to __________.",
        pattern: ["used", "to"],
        translations: ["______ раньше ______ (регулярно/в прошлом)."],
        examples: [
          "I used to live in a small village. (Я раньше жил в маленькой деревне.)",
          "She used to play the piano every day. (Она раньше играла на пианино каждый день.)",
          "They used to walk to school together. (Они раньше ходили в школу вместе.)"
        ],
        id: "used-to-affirmative",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Didn’t __________ use to __________? / __________ didn’t use to __________.",
        pattern: ["did", "not", "use", "to"],
        translations: ["Не ______ ли раньше ______? / ______ не ______ раньше ______."],
        examples: [
          "Didn’t you use to play football? (Разве ты не играл раньше в футбол?)",
          "She didn’t use to like coffee. (Она раньше не любила кофе.)",
          "Didn’t they use to live in London? (Разве они не жили раньше в Лондоне?)"
        ],
        id: "used-to-negative-question",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "__________ would __________.",
        pattern: ["would"],
        translations: ["______ обычно ______ (в прошлом)."],
        examples: [
          "We would visit our grandparents every summer. (Мы обычно навещали бабушку и дедушку каждое лето.)",
          "He would tell stories every evening. (Он обычно рассказывал истории каждый вечер.)",
          "They would play cards after dinner. (Они обычно играли в карты после ужина.)"
        ],
        id: "would-affirmative",
        hasVerb: false,
        hasName: false
      }
    ],
    requiredCorrect: 10,
    validateStructure: function(text, structure) {
      console.log('Валидация структуры:', structure.id);
      console.log('Входной текст:', text);
      // Нормализуем сокращения и "used" для структуры used-to-negative-question
      let processedText = text
        .replace(/didn't/gi, 'did not')
        .replace(/didnt/gi, 'did not') // Дополнительная нормализация для ошибок распознавания
        .replace(/don't/gi, 'do not')
        .replace(/i'm/gi, 'i am');
      if (structure.id === "used-to-negative-question") {
        processedText = processedText.replace(/\bused\b/gi, 'use');
      }
      processedText = processedText.replace(/\beveryday\b/gi, 'every day');
      if (processedText !== text) {
        console.log('Обработаны сокращения, used и everyday:', processedText);
      }
      // Удаляем пунктуацию, нормализуем пробелы и приводим к нижнему регистру
      const cleanedText = processedText.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').toLowerCase().trim();
      console.log('Очищенный текст:', cleanedText);

      const words = cleanedText.split(/\s+/).filter(word => word.length > 0);
      console.log('Разделённые слова:', words);

      // Минимальное количество слов
      let minWords;
      switch (structure.id) {
        case "used-to-affirmative":
          minWords = 3; // subject used to V1
          break;
        case "used-to-negative-question":
          minWords = 4; // did not subject use to V1 or subject did not use to V1
          break;
        case "would-affirmative":
          minWords = 3; // subject would V1
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

      // Проверяем подлежащее
      const validateSubject = () => {
        console.log('Валидация подлежащего на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет подлежащего');
          return false;
        }

        const subjectWords = [];
        if (structure.id === "used-to-affirmative") {
          while (wordIndex < words.length && !['used'].includes(words[wordIndex])) {
            const word = words[wordIndex];
            if (excludedWords.includes(word) && !['i', 'you', 'he', 'she', 'it', 'we', 'they', 'the', 'a', 'an'].includes(word)) {
              console.log('Исключённое слово в подлежащем:', word);
              return false;
            }
            subjectWords.push(word);
            wordIndex++;
          }
        } else if (structure.id === "used-to-negative-question") {
          while (wordIndex < words.length && !['use', 'did'].includes(words[wordIndex])) {
            const word = words[wordIndex];
            if (excludedWords.includes(word) && !['i', 'you', 'he', 'she', 'it', 'we', 'they', 'the', 'a', 'an'].includes(word)) {
              console.log('Исключённое слово в подлежащем:', word);
              return false;
            }
            subjectWords.push(word);
            wordIndex++;
          }
        } else {
          while (wordIndex < words.length && !['would'].includes(words[wordIndex])) {
            const word = words[wordIndex];
            if (excludedWords.includes(word) && !['i', 'you', 'he', 'she', 'it', 'we', 'they', 'the', 'a', 'an'].includes(word)) {
              console.log('Исключённое слово в подлежащем:', word);
              return false;
            }
            subjectWords.push(word);
            wordIndex++;
          }
        }

        if (subjectWords.length === 0) {
          console.log('Подлежащее отсутствует');
          return false;
        }
        console.log('Подлежащее:', subjectWords.join(' '));
        return true;
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
        if (excludedWords.includes(verb) && !['use'].includes(verb)) {
          console.log('Исключённый глагол:', verb);
          return false;
        }

        wordIndex++;

        // Проверяем опциональное дополнение
        let actionWords = [];
        while (wordIndex < words.length) {
          const word = words[wordIndex];
          if (excludedWords.includes(word) && !['the', 'a', 'an', 'every', 'in', 'on', 'at', 'day'].includes(word)) {
            console.log('Исключённое слово в дополнении:', word);
            return false;
          }
          actionWords.push(word);
          wordIndex++;
        }
        console.log('Дополнение:', actionWords.join(' '));

        return true;
      };

      if (structure.id === "used-to-affirmative") {
        console.log('Начало проверки структуры Used to Affirmative');
        if (!validateSubject()) return false;

        if (!words[wordIndex] || words[wordIndex] !== 'used') {
          console.log('Ожидалось "used" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!words[wordIndex] || words[wordIndex] !== 'to') {
          console.log('Ожидалось "to" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateAction()) return false;

        console.log('Валидация пройдена для:', cleanedText);
        return true;
      } else if (structure.id === "used-to-negative-question") {
        console.log('Начало проверки структуры Used to Negative/Question');
        let isQuestion = words[0] === 'did';

        if (isQuestion) {
          if (!words[wordIndex] || words[wordIndex] !== 'did') {
            console.log('Ожидалось "did" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;

          if (!words[wordIndex] || words[wordIndex] !== 'not') {
            console.log('Ожидалось "not" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;

          if (!validateSubject()) return false;
        } else {
          if (!validateSubject()) return false;

          if (!words[wordIndex] || words[wordIndex] !== 'did') {
            console.log('Ожидалось "did" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;

          if (!words[wordIndex] || words[wordIndex] !== 'not') {
            console.log('Ожидалось "not" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!words[wordIndex] || words[wordIndex] !== 'use') {
          console.log('Ожидалось "use" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!words[wordIndex] || words[wordIndex] !== 'to') {
          console.log('Ожидалось "to" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateAction()) return false;

        console.log('Валидация пройдена для:', cleanedText);
        return true;
      } else if (structure.id === "would-affirmative") {
        console.log('Начало проверки структуры Would Affirmative');
        if (!validateSubject()) return false;

        if (!words[wordIndex] || words[wordIndex] !== 'would') {
          console.log('Ожидалось "would" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateAction()) return false;

        console.log('Валидация пройдена для:', cleanedText);
        return true;
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();