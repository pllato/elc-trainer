addLesson({
  level: "beginner1",
  lesson: "lesson15",
  name: "Урок 15",
  structures: [
    { 
      structure: "Are you a/an ____?", 
      pattern: ["are", "you"], 
      translations: ["Ты ______?"], 
      examples: [
        "Are you a teacher? (Ты учитель?)"
      ], 
      id: "are-you-a-noun", 
      hasVerb: false,
      hasName: false
    },
    { 
      structure: "Yes, I am a/an _____", 
      pattern: ["yes", "i", "am"], 
      translations: ["Да, я ______."], 
      examples: [
        "Yes, I am a doctor. (Да, я доктор.)"
      ], 
      id: "yes-i-am-a-noun", 
      hasVerb: false,
      hasName: false
    },
    { 
      structure: "No, I am not a/an _____", 
      pattern: ["no", "i", "am", "not"], 
      translations: ["Нет, я не ______."], 
      examples: [
        "No, I am not a student. (Нет, я не студент.)"
      ], 
      id: "no-i-am-not-a-noun", 
      hasVerb: false,
      hasName: false
    }
  ],
  requiredCorrect: 10,
  validateStructure: function(text, structure) {
    console.log('Raw input:', text);
    // Удаляем пунктуацию и приводим к нижнему регистру
    const cleanedText = text.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase().trim();
    console.log('Cleaned text:', cleanedText);

    const words = cleanedText.split(/\s+/).filter(word => word.length > 0);
    console.log('Split words:', words);

    const pattern = structure.pattern;
    let wordIndex = 0;

    // Проверяем начальные слова структуры (например, "are you", "yes i am", "no i am not")
    for (let part of pattern) {
      if (!words[wordIndex] || words[wordIndex] !== part) {
        console.log('Pattern mismatch:', words[wordIndex], '!==', part, 'at index', wordIndex);
        return false;
      }
      wordIndex++;
    }

    // Проверяем наличие артикля "a" или "an"
    if (!words[wordIndex] || (words[wordIndex] !== 'a' && words[wordIndex] !== 'an')) {
      console.log('No article "a" or "an" at index', wordIndex);
      return false;
    }
    wordIndex++;

    // Проверяем наличие существительного после артикля
    if (wordIndex >= words.length) {
      console.log('No noun after article');
      return false;
    }

    const noun = words[wordIndex];
    // Список допустимых существительных (профессии и роли)
    const validNouns = [
      'teacher', 'doctor', 'student', 'engineer', 'nurse', 'driver', 'lawyer', 'chef',
      'artist', 'writer', 'singer', 'actor', 'dancer', 'pilot', 'farmer', 'manager',
      'child', 'boy', 'girl', 'man', 'woman'
    ];
    if (!validNouns.includes(noun)) {
      console.log('Invalid noun:', noun);
      return false;
    }

    // Проверяем правильность артикля ("a" или "an") в зависимости от первого звука существительного
    const startsWithVowelSound = /^[aeiou]/i.test(noun);
    const article = words[wordIndex - 1];
    if (startsWithVowelSound && article !== 'an') {
      console.log('Incorrect article: expected "an" for', noun);
      return false;
    }
    if (!startsWithVowelSound && article !== 'a') {
      console.log('Incorrect article: expected "a" for', noun);
      return false;
    }

    // Проверяем, что после существительного нет лишних слов
    if (wordIndex + 1 < words.length) {
      console.log('Extra words after noun:', words.slice(wordIndex + 1));
      return false;
    }

    console.log('Validation passed for:', text);
    return true;
  }
});