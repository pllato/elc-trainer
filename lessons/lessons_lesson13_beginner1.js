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
    console.log('Validating:', text, 'for structure:', structure.structure);

    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const pattern = structure.pattern;
    let wordIndex = 0;

    // Сбрасываем usedVerbs при старте урока
    if (!window.lessonStarted) {
      window.usedVerbs = [];
      window.lessonStarted = true;
      console.log('Reset usedVerbs');
    }

    function normalizeWord(word) {
      return word.toLowerCase().replace(/[.,!?]/g, '');
    }

    const normalizedWords = words.map(normalizeWord);
    console.log('Normalized words:', normalizedWords);

    // Проверяем местоимение
    for (let part of pattern) {
      if (!normalizedWords[wordIndex] || normalizedWords[wordIndex] !== part) {
        console.log('Pattern mismatch:', normalizedWords[wordIndex], '!==', part);
        return false;
      }
      wordIndex++;
    }

    // Проверяем наличие слов после местоимения
    if (wordIndex >= normalizedWords.length) {
      console.log('No words after pronoun');
      return false;
    }

    // Формируем фразу после местоимения
    const verbPhrase = normalizedWords.slice(wordIndex).join(' ');
    console.log('Verb phrase:', verbPhrase);

    // Проверяем уникальность фразы
    if (structure.hasVerb && window.usedVerbs.includes(verbPhrase)) {
      console.log('Verb phrase already used:', verbPhrase);
      return false;
    }

    // Добавляем фразу в использованные
    window.usedVerbs.push(verbPhrase);
    console.log('Validation passed for:', text);
    return true;
  }
});
