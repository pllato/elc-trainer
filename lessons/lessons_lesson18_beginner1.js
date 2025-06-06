addLesson({
  level: "beginner1",
  lesson: "lesson18",
  name: "Урок 18",
  structures: [
    { 
      structure: "I/You/He/She/It/We/They ______", 
      pattern: [], // Проверяем местоимения отдельно
      translations: ["Я/Ты/Он/Она/Оно/Мы/Они ______."], 
      examples: [
        "I play. (Я играю.)"
      ], 
      id: "subject-pronoun-verb", 
      hasVerb: true,
      hasName: false
    },
    { 
      structure: "I/You/He/She/We/They help me/you/him/her/us/them", 
      pattern: [], // Проверяем местоимения отдельно
      translations: ["Я/Ты/Он/Она/Мы/Они помогает мне/тебе/ему/ей/нам/им."], 
      examples: [
        "She helps me. (Она помогает мне.)"
      ], 
      id: "subject-help-object", 
      hasVerb: true,
      hasName: false
    },
    { 
      structure: "This is my/your/his/her/its/our/their book", 
      pattern: ["this", "is"], 
      translations: ["Это моя/твоя/его/её/его/наша/их книга."], 
      examples: [
        "This is my book. (Это моя книга.)"
      ], 
      id: "this-is-possessive-book", 
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

    let wordIndex = 0;

    // Список исключённых глаголов и модальных глаголов
    const excludedWords = [
      'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought',
      'am', 'is', 'are', 'was', 'were', 'been', 'being', 'has', 'does',
      'going', 'doing', 'saying', 'running', 'swimming', // Примеры с -ing
      'likes', 'runs', 'swims', 'works', 'does', 'has', // Примеры с -s или -es
      'tomorrow', 'yesterday', 'today', 'now', 'later' // Временные наречия
    ];

    // Список местоимений
    const subjectPronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they'];
    const objectPronouns = ['me', 'you', 'him', 'her', 'us', 'them'];
    const possessivePronouns = ['my', 'your', 'his', 'her', 'its', 'our', 'their'];

    // Проверяем в зависимости от структуры
    if (structure.id === "subject-pronoun-verb") {
      // Структура "I/You/He/She/It/We/They ______"
      // Проверяем местоимение (подлежащее)
      if (!words[wordIndex] || !subjectPronouns.includes(words[wordIndex])) {
        console.log('Expected subject pronoun at index', wordIndex, 'got', words[wordIndex]);
        return false;
      }
      wordIndex++;

      // Проверяем глагол
      if (!words[wordIndex]) {
        console.log('No verb after pronoun');
        return false;
      }
      const verb = words[wordIndex];
      // Проверяем, что глагол в базовой форме (без -s, -es, -ing и т.д.), но для he/she/it допускаем -s
      if (verb.endsWith('ing')) {
        console.log('Invalid verb form (no -ing allowed):', verb);
        return false;
      }
      if (['he', 'she', 'it'].includes(words[0])) {
        // Для he/she/it глагол должен заканчиваться на -s или -es
        if (!verb.endsWith('s') && !verb.endsWith('es')) {
          console.log('Verb for he/she/it does not end with -s or -es:', verb);
          return false;
        }
      } else {
        // Для I/you/we/they глагол должен быть в базовой форме (без -s, -es)
        if (verb.endsWith('s') || verb.endsWith('es')) {
          console.log('Invalid verb form for I/you/we/they (should be base form):', verb);
          return false;
        }
      }
      if (excludedWords.includes(verb)) {
        console.log('Excluded verb:', verb);
        return false;
      }
      wordIndex++;

      // Проверяем, что нет лишних слов
      if (wordIndex < words.length) {
        console.log('Extra words after verb:', words.slice(wordIndex));
        return false;
      }
    } else if (structure.id === "subject-help-object") {
      // Структура "I/You/He/She/We/They help me/you/him/her/us/them"
      // Проверяем местоимение (подлежащее)
      if (!words[wordIndex] || !subjectPronouns.includes(words[wordIndex]) || words[wordIndex] === 'it') {
        console.log('Expected subject pronoun (not "it") at index', wordIndex, 'got', words[wordIndex]);
        return false;
      }
      wordIndex++;

      // Проверяем глагол "help"
      if (!words[wordIndex] || words[wordIndex] !== 'help') {
        console.log('Expected "help" at index', wordIndex, 'got', words[wordIndex]);
        return false;
      }
      wordIndex++;

      // Проверяем объектное местоимение
      if (!words[wordIndex] || !objectPronouns.includes(words[wordIndex])) {
        console.log('Expected object pronoun at index', wordIndex, 'got', words[wordIndex]);
        return false;
      }
      wordIndex++;

      // Проверяем, что нет лишних слов
      if (wordIndex < words.length) {
        console.log('Extra words after object pronoun:', words.slice(wordIndex));
        return false;
      }
    } else if (structure.id === "this-is-possessive-book") {
      // Структура "This is my/your/his/her/its/our/their book"
      // Проверяем "this is"
      if (!words[wordIndex] || words[wordIndex] !== 'this') {
        console.log('Expected "this" at index', wordIndex, 'got', words[wordIndex]);
        return false;
      }
      wordIndex++;
      if (!words[wordIndex] || words[wordIndex] !== 'is') {
        console.log('Expected "is" at index', wordIndex, 'got', words[wordIndex]);
        return false;
      }
      wordIndex++;

      // Проверяем притяжательное местоимение
      if (!words[wordIndex] || !possessivePronouns.includes(words[wordIndex])) {
        console.log('Expected possessive pronoun at index', wordIndex, 'got', words[wordIndex]);
        return false;
      }
      wordIndex++;

      // Проверяем слово "book"
      if (!words[wordIndex] || words[wordIndex] !== 'book') {
        console.log('Expected "book" at index', wordIndex, 'got', words[wordIndex]);
        return false;
      }
      wordIndex++;

      // Проверяем, что нет лишних слов
      if (wordIndex < words.length) {
        console.log('Extra words after "book":', words.slice(wordIndex));
        return false;
      }
    }

    console.log('Validation passed for:', text);
    return true;
  }
});