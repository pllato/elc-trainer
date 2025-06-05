addLesson({
  level: "beginner1",
  lesson: "lesson13",
  name: "Урок 13 Часть 1",
  structures: [
    { 
      structure: "I ____.", 
      pattern: ["i"], 
      translations: ["Я ______."], 
      examples: [
        "I like to walk. (Я люблю гулять.)",
        "I work. (Я работаю.)",
        "I drink. (Я пью.)"
      ], 
      id: "i-verb", 
      hasVerb: true 
    },
    { 
      structure: "You ____.", 
      pattern: ["you"], 
      translations: ["Ты ______."], 
      examples: [
        "You drink too much. (Ты пьёшь слишком много.)",
        "You study. (Ты учишься.)",
        "You drink. (Ты пьёшь.)"
      ], 
      id: "you-verb", 
      hasVerb: true 
    },
    { 
      structure: "We ____.", 
      pattern: ["we"], 
      translations: ["Мы ______."], 
      examples: [
        "We play football. (Мы играем в футбол.)",
        "We live here. (Мы живём здесь.)",
        "We drink. (Мы пьём.)"
      ], 
      id: "we-verb", 
      hasVerb: true 
    },
    { 
      structure: "They ____.", 
      pattern: ["they"], 
      translations: ["Они ______."], 
      examples: [
        "They watch TV. (Они смотрят телевизор.)",
        "They run fast. (Они бегают быстро.)",
        "They do not drink. (Они не пьют.)"
      ], 
      id: "they-verb", 
      hasVerb: true 
    }
  ],
  requiredCorrect: 10,
  validateStructure: function(text, structure) {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const pattern = structure.pattern;
    let wordIndex = 0;

    // Сбрасываем usedVerbs при старте урока
    if (!window.lessonStarted) {
      window.usedVerbs = [];
      window.lessonStarted = true;
    }

    function normalizeWord(word) {
      return word.toLowerCase().replace(/[.,!?]/g, '');
    }

    let normalizedWords = words.map(normalizeWord);

    console.log('Input text:', text);
    console.log('Normalized words:', normalizedWords);
    console.log('Expected pattern:', pattern);

    // Проверяем, начинается ли текст с нужного местоимения
    for (let part of pattern) {
      if (!normalizedWords[wordIndex] || normalizedWords[wordIndex] !== part) {
        console.log('Pattern mismatch at index', wordIndex, ':', normalizedWords[wordIndex], '!==', part);
        return false;
      }
      wordIndex++;
    }

    // Проверяем, есть ли слова после местоимения
    if (wordIndex >= normalizedWords.length) {
      console.log('No verb provided after pronoun');
      return false;
    }

    // Проверяем наличие глагола (первое слово после местоимения)
    const verbPhrase = normalizedWords.slice(wordIndex).join(' ');
    const mainVerb = normalizedWords[wordIndex];

    console.log('Verb phrase:', verbPhrase, 'Main verb:', mainVerb);

    // Проверяем уникальность фразы
    if (structure.hasVerb) {
      if (window.usedVerbs.includes(verbPhrase)) {
        console.log('Verb phrase already used:', verbPhrase);
        return false;
      }
      window.usedVerbs.push(verbPhrase);
    }

    // Проверяем, что глагол — это слово длиной хотя бы 2 символа
    if (mainVerb.length < 2) {
      console.log('Main verb too short:', mainVerb);
      return false;
    }

    console.log('Validation passed for:', text);
    return true;
  }
});
