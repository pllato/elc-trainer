addLesson({
  level: "beginner1",
  lesson: "lesson13",
  name: "Урок 13",
  structures: [
    { 
      structure: "I ____.", 
      pattern: ["i"], 
      translations: ["Я ______."], 
      examples: [
        "I like to walk. (Я люблю гулять.)",
        "I work. (Я работаю.)"
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
        "You study. (Ты учишься.)"
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
        "We live here. (Мы живём здесь.)"
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
        "They run fast. (Они бегают быстро.)"
      ], 
      id: "they-verb", 
      hasVerb: true 
    }
  ],
  requiredCorrect: 10,
  validateStructure: function(text, structure) {
    const words = text.split(' ').filter(word => word.length > 0);
    const pattern = structure.pattern;
    let wordIndex = 0;

    // Initialize window.usedVerbs at lesson start
    window.usedVerbs = window.usedVerbs || [];

    function normalizeWord(word) {
      return word.toLowerCase();
    }

    let normalizedWords = words.map(normalizeWord);

    // Check if text starts with the correct pronoun
    for (let part of pattern) {
      if (!normalizedWords[wordIndex] || normalizedWords[wordIndex] !== part) {
        return false;
      }
      wordIndex++;
    }

    // Ensure there's at least one word (verb) after the pronoun
    if (wordIndex >= normalizedWords.length) {
      return false;
    }

    const verbPhrase = normalizedWords.slice(wordIndex).join(' ');
    const mainVerb = normalizedWords[wordIndex]; // Assume first word after pronoun is the main verb

    // Check for unique verb phrase
    if (structure.hasVerb) {
      if (window.usedVerbs.includes(verbPhrase)) {
        return false; // Verb phrase already used
      }
      window.usedVerbs.push(verbPhrase);
    }

    // Basic verb validation (not empty and reasonable length)
    if (mainVerb.length < 2) {
      return false;
    }

    return true;
  }
});