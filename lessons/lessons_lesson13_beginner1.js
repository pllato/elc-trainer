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
  requiredCorrect: 10,
  validateStructure: function(text, structure) {
    const words = text.split(' ').filter(word => word.length > 0);
    const pattern = structure.pattern;
    let wordIndex = 0;

    // Сбрасываем window.usedNames и window.lastAskedVerb при старте урока
    window.usedNames = [];
    window.lastAskedVerb = null;

    function normalizeWord(word) {
      word = word.toLowerCase();
      if (word === "don't") return ["do", "not"];
      return [word];
    }

    let normalizedWords = [];
    for (let word of words) {
      normalizedWords.push(...normalizeWord(word));
    }

    // Проверяем, что начало текста соответствует шаблону
    for (let part of pattern) {
      if (!normalizedWords[wordIndex] || normalizedWords[wordIndex] !== part) {
        return false;
      }
      wordIndex++;
    }

    // Для утвердительной формы (I, You, We, They + глагол)
    if (["i-positive", "you-positive", "we-positive", "they-positive"].includes(structure.id)) {
      if (wordIndex >= normalizedWords.length) {
        return false; // Должен быть глагол после шаблона
      }
      const verb = normalizedWords[wordIndex];
      wordIndex++;
      if (wordIndex >= normalizedWords.length) {
        return false; // Должно быть дополнение после глагола
      }
      const complement = normalizedWords.slice(wordIndex).join(' ');
      const fullAction = `${verb} ${complement}`;
      
      // Проверяем уникальность действия
      if (structure.hasName) {
        if (window.usedNames && window.usedNames.includes(fullAction)) {
          return false; // Действие уже использовалось
        }
        window.usedNames.push(fullAction);
      }
      return true;
    }

    // Для отрицательной формы (I do not, You do not, We do not, They do not + глагол)
    if (["i-negative", "you-negative", "we-negative", "they-negative"].includes(structure.id)) {
      if (wordIndex >= normalizedWords.length) {
        return false; // Должен быть глагол после шаблона
      }
      const verb = normalizedWords[wordIndex];
      wordIndex++;
      if (wordIndex >= normalizedWords.length) {
        return false; // Должно быть дополнение после глагола
      }
      const complement = normalizedWords.slice(wordIndex).join(' ');
      const fullAction = `${verb} ${complement}`;
      
      // Проверяем уникальность действия
      if (structure.hasName) {
        if (window.usedNames && window.usedNames.includes(fullAction)) {
          return false; // Действие уже использовалось
        }
        window.usedNames.push(fullAction);
      }
      return true;
    }

    // Для вопросительной формы (Do you, Do we, Do they + глагол)
    if (["do-you-question", "do-we-question", "do-they-question"].includes(structure.id)) {
      if (wordIndex >= normalizedWords.length) {
        return false; // Должен быть глагол после шаблона
      }
      const verb = normalizedWords[wordIndex];
      window.lastAskedVerb = verb; // Сохраняем глагол для проверки ответа
      wordIndex++;
      if (wordIndex >= normalizedWords.length) {
        return false; // Должно быть дополнение после глагола
      }
      return true;
    }

    // Для ответов (например, "Yes, I like to go to the cinema" или "No, I don't play football")
    if (!structure.hasName && window.lastAskedVerb) {
      if (normalizedWords[0] === "yes") {
        if (normalizedWords.length < 3) return false; // Должно быть хотя бы "Yes, I like ..."
        if (normalizedWords[1] !== "i" || normalizedWords[2] !== window.lastAskedVerb) return false;
        return true;
      } else if (normalizedWords[0] === "no") {
        if (normalizedWords.length < 4) return false; // Должно быть хотя бы "No, I don't play ..."
        if (normalizedWords[1] !== "i" || normalizedWords[2] !== "do" || normalizedWords[3] !== "not") return false;
        if (normalizedWords[4] !== window.lastAskedVerb) return false;
        return true;
      }
    }

    return false;
  }
});
