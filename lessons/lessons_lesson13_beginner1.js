addLesson({
  level: "beginner1",
  lesson: "lesson13",
  name: "Урок 13 (Часть 1)",
  introExamples: [
    "I live in Astana. (Я живу в Астане.)",
    "You don't play basketball. (Ты не играешь в баскетбол.)",
    "They speak Russian. (Они говорят по-русски.)",
    "Do we live in London? (Мы живём в Лондоне?)",
    "Yes, I live in London. (Да, я живу в Лондоне.)"
  ],
  structures: [
    { 
      structure: "I _____", 
      pattern: ["i"], 
      translations: ["Я ______."], 
      examples: [
        "I live in Almaty. (Я живу в Алматы.)"
      ], 
      id: "i-positive", 
      hasName: true 
    },
    { 
      structure: "You _____.", 
      pattern: ["you"], 
      translations: ["Ты ______."], 
      examples: [
        "You play football. (Ты играешь в футбол.)"
      ], 
      id: "you-positive", 
      hasName: true 
    },
    { 
      structure: "We _____.", 
      pattern: ["we"], 
      translations: ["Мы ______."], 
      examples: [
        "We speak English. (Мы говорим по-английски.)"
      ], 
      id: "we-positive", 
      hasName: true 
    },
    { 
      structure: "They _____.", 
      pattern: ["they"], 
      translations: ["Они ______."], 
      examples: [
        "They live in Astana. (Они живут в Астане.)"
      ], 
      id: "they-positive", 
      hasName: true 
    },
    { 
      structure: "I do not _____.", 
      pattern: ["i", "do", "not"], 
      translations: ["Я не ______."], 
      examples: [
        "I do not play tennis. (Я не играю в теннис.)"
      ], 
      id: "i-negative", 
      hasName: true 
    },
    { 
      structure: "You do not _____.", 
      pattern: ["you", "do", "not"], 
      translations: ["Ты не ______."], 
      examples: [
        "You do not speak French. (Ты не говоришь по-французски.)"
      ], 
      id: "you-negative", 
      hasName: true 
    },
    { 
      structure: "We do not _____.", 
      pattern: ["we", "do", "not"], 
      translations: ["Мы не ______."], 
      examples: [
        "We do not live in London. (Мы не живём в Лондоне.)"
      ], 
      id: "we-negative", 
      hasName: true 
    },
    { 
      structure: "They do not _____.", 
      pattern: ["they", "do", "not"], 
      translations: ["Они не ______."], 
      examples: [
        "They do not play chess. (Они не играют в шахматы.)"
      ], 
      id: "they-negative", 
      hasName: true 
    },
    { 
      structure: "Do you ____?", 
      pattern: ["do", "you"], 
      translations: ["Ты ______?"], 
      examples: [
        "Do you live in Almaty? (Ты живёшь в Алматы?)"
      ], 
      id: "do-you-question", 
      hasName: false 
    },
    { 
      structure: "Do we ____?", 
      pattern: ["do", "we"], 
      translations: ["Мы ______?"], 
      examples: [
        "Do we speak English? (Мы говорим по-английски?)"
      ], 
      id: "do-we-question", 
      hasName: false 
    },
    { 
      structure: "Do they ____?", 
      pattern: ["do", "they"], 
      translations: ["Они ______?"], 
      examples: [
        "Do they play football? (Они играют в футбол?)"
      ], 
      id: "do-they-question", 
      hasName: false 
    }
  ],
  requiredCorrect: 10, // Общее количество правильных примеров на структуру
  parts: { // Разделение структур на части
    "i-positive": 1,
    "you-positive": 1,
    "we-positive": 1,
    "they-positive": 1,
    "i-negative": 2,
    "you-negative": 2,
    "we-negative": 2,
    "they-negative": 2,
    "do-you-question": 2,
    "do-we-question": 2,
    "do-they-question": 2
  },
  validateStructure: function(text, structure) {
    const words = text.split(' ').filter(word => word.length > 0);
    let wordIndex = 0;

    // Проверяем существование глобальных переменных для вопросов и ответов
    if (!window.lastAskedVerb) window.lastAskedVerb = null;
    if (!window.lastAskedSubject) window.lastAskedSubject = null;

    // Доступ к usedNames через this (объект урока)
    let usedNames = this.usedNames || [];
    // Дополнительный сброс usedNames в начале валидации
    if (usedNames.length > 0 && this.usedNames.length !== 0) {
      this.usedNames.length = 0;
      usedNames = this.usedNames;
      console.log('usedNames reset at start of validation:', usedNames);
    }

    function normalizeWord(word) {
      word = word.toLowerCase();
      if (word === "don't") return ["do", "not"];
      return [word];
    }

    let normalizedWords = [];
    for (let word of words) {
      normalizedWords.push(...normalizeWord(word));
    }

    console.log(`Validating text: "${text}" for structure: "${structure ? structure.structure : 'answer'}"`);
    console.log('usedNames before validation:', usedNames);

    // Проверяем, является ли текст ответом на вопрос (Yes/No)
    if (!structure && window.lastAskedVerb && window.lastAskedSubject) {
      console.log('Checking Yes/No answer...');
      if (normalizedWords[0] === "yes") {
        if (normalizedWords.length < 3) {
          console.log("Answer too short for 'Yes' response");
          return false; // Должно быть хотя бы "Yes, I like ..."
        }
        const expectedPronoun = window.lastAskedSubject === "you" ? "i" : window.lastAskedSubject;
        if (normalizedWords[1] !== expectedPronoun || normalizedWords[2] !== window.lastAskedVerb) {
          console.log(`Expected "${expectedPronoun} ${window.lastAskedVerb}", got "${normalizedWords[1]} ${normalizedWords[2]}"`);
          return false;
        }
        console.log(`Recognized 'Yes' answer with verb: "${window.lastAskedVerb}"`);
        return true;
      } else if (normalizedWords[0] === "no") {
        if (normalizedWords.length < 4) {
          console.log("Answer too short for 'No' response");
          return false; // Должно быть хотя бы "No, we don't play ..."
        }
        const expectedPronoun = window.lastAskedSubject === "you" ? "i" : window.lastAskedSubject;
        if (normalizedWords[1] !== expectedPronoun || normalizedWords[2] !== "do" || normalizedWords[3] !== "not") {
          console.log(`Expected "${expectedPronoun} do not", got "${normalizedWords[1]} ${normalizedWords[2]} ${normalizedWords[3]}"`);
          return false;
        }
        if (normalizedWords[4] !== window.lastAskedVerb) {
          console.log(`Expected verb "${window.lastAskedVerb}", got "${normalizedWords[4]}"`);
          return false;
        }
        console.log(`Recognized 'No' answer with verb: "${window.lastAskedVerb}"`);
        return true;
      }
      console.log("No matching answer structure found");
      return false;
    }

    const pattern = structure.pattern;

    // Проверяем, что начало текста соответствует шаблону
    for (let part of pattern) {
      if (!normalizedWords[wordIndex] || normalizedWords[wordIndex] !== part) {
        console.log(`Pattern mismatch at index ${wordIndex}: expected "${part}", got "${normalizedWords[wordIndex]}"`);
        return false;
      }
      wordIndex++;
    }

    // Список известных форм Past Simple и Past Participle для исключения
    const pastForms = [
      // Нерегулярные глаголы: Past Simple и Past Participle
      "was", "were", "been", "did", "done", "had", "ate", "eaten", "drank", "drunk", "drove", "driven",
      "saw", "seen", "went", "gone", "took", "taken", "gave", "given", "wrote", "written", "spoke", "spoken",
      "stood", "said", "knew", "known", "thought", "bought", "brought", "fought", "caught", "taught",
      "built", "sent", "spent", "left", "met", "got", "gotten", "made", "found", "felt", "heard", "held",
      "kept", "slept", "sat", "ran", "run", "swam", "swum", "won", "became", "become",
      // Регулярные глаголы с окончанием -ed
      "worked", "played", "walked", "talked", "lived", "loved", "moved", "called", "asked", "answered",
      "watched", "listened", "started", "finished", "helped", "needed", "wanted", "opened", "closed",
      "stopped", "jumped", "laughed", "cried", "tried", "studied", "carried", "hurried", "married",
      // Добавим формы с -d (например, "made" уже есть выше)
      "lived", "loved", "moved", "hated", "smiled", "saved", "proved"
    ];

    // Для отрицательной формы (I do not, You do not, We do not, They do not + глагол)
    if (["i-negative", "you-negative", "we-negative", "they-negative"].includes(structure.id)) {
      if (wordIndex >= normalizedWords.length) {
        console.log("No verb provided after 'do not'");
        return false; // Должен быть глагол после шаблона
      }
      const verb = normalizedWords[wordIndex];
      // Проверяем, что слово после "do not" не является числом, вспомогательным глаголом или формой прошедшего времени
      const auxiliaryVerbs = ["am", "is", "are", "was", "were", "be", "been", "being", "will", "shall", "would", "should", "can", "could", "may", "might", "must"];
      const isNumber = /^\d+$/.test(verb);
      if (isNumber) {
        console.log(`"${verb}" is a number, not a verb`);
        return false;
      }
      if (auxiliaryVerbs.includes(verb)) {
        console.log(`"${verb}" is an auxiliary verb, not a main verb`);
        return false;
      }
      if (pastForms.includes(verb)) {
        console.log(`"${verb}" is a past tense form, not a base form`);
        return false;
      }
      wordIndex++;
      // Дополнение необязательно
      const complement = wordIndex < normalizedWords.length ? normalizedWords.slice(wordIndex).join(' ') : '';
      const subject = structure.id.split('-')[0]; // "i", "you", "we", "they"
      const fullAction = `${subject} not ${verb}${complement ? ` ${complement}` : ''}`; // Добавляем "not" в fullAction
      
      console.log(`Recognized negative action: "${fullAction}"`);
      
      // Проверяем уникальность действия
      if (structure.hasName) {
        if (usedNames.includes(fullAction)) {
          console.log(`Action "${fullAction}" is a duplicate`);
          return false; // Действие уже использовалось
        }
        this.usedNames.push(fullAction);
        console.log(`Added "${fullAction}" to usedNames:`, this.usedNames);
      }
      return true;
    }

    // Для утвердительной формы (I, You, We, They + глагол)
    if (["i-positive", "you-positive", "we-positive", "they-positive"].includes(structure.id)) {
      // Исключаем фразы, начинающиеся с "do not" или "don't"
      if (normalizedWords.length >= 3 && normalizedWords[1] === "do" && normalizedWords[2] === "not") {
        console.log("Text starts with 'do not', should match negative structure");
        return false; // Это отрицательная форма, не принимаем
      }
      if (normalizedWords.length >= 2 && normalizedWords[1] === "don't") {
        console.log("Text starts with 'don't', should match negative structure");
        return false; // Это отрицательная форма, не принимаем
      }

      if (wordIndex >= normalizedWords.length) {
        console.log("No verb provided after subject");
        return false; // Должен быть глагол после шаблона
      }
      const verb = normalizedWords[wordIndex];
      // Проверяем, что слово после подлежащего не является числом, вспомогательным глаголом или формой прошедшего времени
      const auxiliaryVerbs = ["am", "is", "are", "was", "were", "be", "been", "being", "will", "shall", "would", "should", "can", "could", "may", "might", "must"];
      const isNumber = /^\d+$/.test(verb);
      if (isNumber) {
        console.log(`"${verb}" is a number, not a verb`);
        return false;
      }
      if (auxiliaryVerbs.includes(verb)) {
        console.log(`"${verb}" is an auxiliary verb, not a main verb`);
        return false;
      }
      if (pastForms.includes(verb)) {
        console.log(`"${verb}" is a past tense form, not a base form`);
        return false;
      }
      wordIndex++;
      // Дополнение необязательно
      const complement = wordIndex < normalizedWords.length ? normalizedWords.slice(wordIndex).join(' ') : '';
      const subject = structure.id.split('-')[0]; // "i", "you", "we", "they"
      const fullAction = `${subject} ${verb}${complement ? ` ${complement}` : ''}`;
      
      console.log(`Recognized positive action: "${fullAction}"`);
      
      // Проверяем уникальность действия
      if (structure.hasName) {
        if (usedNames.includes(fullAction)) {
          console.log(`Action "${fullAction}" is a duplicate`);
          return false; // Действие уже использовалось
        }
        this.usedNames.push(fullAction);
        console.log(`Added "${fullAction}" to usedNames:`, this.usedNames);
      }
      return true;
    }

    // Для вопросительной формы (Do you, Do we, Do they + глагол)
    if (["do-you-question", "do-we-question", "do-they-question"].includes(structure.id)) {
      if (wordIndex >= normalizedWords.length) {
        console.log("No verb provided after 'do [subject]'");
        return false; // Должен быть глагол после шаблона
      }
      const verb = normalizedWords[wordIndex];
      // Проверяем, что слово после "do [subject]" не является формой прошедшего времени
      if (pastForms.includes(verb)) {
        console.log(`"${verb}" is a past tense form, not a base form`);
        return false;
      }
      const subject = normalizedWords[1]; // "you", "we", или "they"
      window.lastAskedVerb = verb; // Сохраняем глагол для проверки ответа
      window.lastAskedSubject = subject; // Сохраняем местоимение для ответа
      wordIndex++;
      // Дополнение необязательно
      console.log(`Recognized question with verb: "${verb}" and subject: "${subject}"`);
      return true;
    }

    console.log("No matching structure found");
    return false;
  }
});
