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
    const article = words[wordIndex];
    wordIndex++;

    // Проверяем наличие слов после артикля
    if (wordIndex >= words.length) {
      console.log('No words after article');
      return false;
    }

    // Проверяем, есть ли прилагательное перед существительным (например, "good dog")
    let adjective = null;
    let noun = words[wordIndex];
    wordIndex++;

    // Если есть ещё одно слово, считаем первое прилагательным, а второе — существительным
    if (wordIndex < words.length) {
      adjective = noun;
      noun = words[wordIndex];
      wordIndex++;
    }

    // Проверяем правильность артикля ("a" или "an") в зависимости от первого звука следующего слова
    const wordAfterArticle = adjective || noun; // Проверяем "a/an" относительно первого слова после артикля
    const startsWithVowelSound = /^[aeiou]/i.test(wordAfterArticle);
    if (startsWithVowelSound && article !== 'an') {
      console.log('Incorrect article: expected "an" for', wordAfterArticle);
      return false;
    }
    if (!startsWithVowelSound && article !== 'a') {
      console.log('Incorrect article: expected "a" for', wordAfterArticle);
      return false;
    }

    // Список исключений (неправильные слова)
    const invalidWords = [
      // Глаголы с окончаниями
      'is', 'are', 'am', 'was', 'were', 'been', 'being',
      'will', 'would', 'can', 'could', 'should', 'must', 'may', 'might', 'shall', 'ought',
      'going', 'doing', 'saying', 'running', 'swimming', // Примеры с -ing
      'likes', 'runs', 'swims', 'works', 'does', 'has', // Примеры с -s или -es
      // Временные наречия и другие неподходящие слова
      'tomorrow', 'yesterday', 'today', 'now', 'later'
    ];

    // Проверяем прилагательное (если есть)
    if (adjective) {
      // Список допустимых прилагательных
      const validAdjectives = [
        'good', 'bad', 'big', 'small', 'tall', 'short', 'young', 'old',
        'happy', 'sad', 'kind', 'smart', 'brave', 'funny', 'serious'
      ];
      if (!validAdjectives.includes(adjective) || invalidWords.includes(adjective)) {
        console.log('Invalid adjective:', adjective);
        return false;
      }
    }

    // Проверяем существительное
    if (invalidWords.includes(noun)) {
      console.log('Invalid noun:', noun);
      return false;
    }

    // Проверяем, что после существительного нет лишних слов
    if (wordIndex < words.length) {
      console.log('Extra words after noun:', words.slice(wordIndex));
      return false;
    }

    console.log('Validation passed for:', text);
    return true;
  }
});
