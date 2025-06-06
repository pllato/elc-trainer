addLesson({
  level: "beginner1",
  lesson: "lesson19",
  name: "Урок 19",
  structures: [
    { 
      structure: "Is there a/an _____ on/in/at _______?", 
      pattern: ["is", "there"], 
      translations: ["Есть ли ______ на/в/у _______?"], 
      examples: [
        "Is there a book on the table? (Есть ли книга на столе?)"
      ], 
      id: "is-there-a-noun-prep-place", 
      hasVerb: false,
      hasName: false
    },
    { 
      structure: "Yes, there is a/an _____ on/in/at ______", 
      pattern: ["yes", "there", "is"], 
      translations: ["Да, есть ______ на/в/у ______."], 
      examples: [
        "Yes, there is an apple in the bag. (Да, в сумке есть яблоко.)"
      ], 
      id: "yes-there-is-a-noun-prep-place", 
      hasVerb: false,
      hasName: false
    },
    { 
      structure: "No, there is not a/an _____ on/in/at ______", 
      pattern: ["no", "there", "is", "not"], 
      translations: ["Нет, ______ на/в/у ______ нет."], 
      examples: [
        "No, there isn't a pen at the desk. (Нет, на столе нет ручки.)"
      ], 
      id: "no-there-is-not-a-noun-prep-place", 
      hasVerb: false,
      hasName: false
    }
  ],
  requiredCorrect: 15,
  validateStructure: function(text, structure) {
    console.log('Raw input:', text);
    // Заменяем "isn't" на "is not" для поддержки сокращений
    let processedText = text.replace(/isn't/g, 'is not');
    // Удаляем пунктуацию и приводим к нижнему регистру
    const cleanedText = processedText.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase().trim();
    console.log('Cleaned text:', cleanedText);

    const words = cleanedText.split(/\s+/).filter(word => word.length > 0);
    console.log('Split words:', words);

    const pattern = structure.pattern;
    let wordIndex = 0;

    // Проверяем начальные слова структуры (например, "is there", "yes there is", "no there is not")
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

    // Проверяем существительное после артикля
    if (!words[wordIndex]) {
      console.log('No noun after article');
      return false;
    }
    const noun = words[wordIndex];
    // Список допустимых существительных (объекты)
    const validNouns = [
      'book', 'pen', 'apple', 'bag', 'chair', 'table', 'desk', 'phone', 'car', 'key',
      'box', 'cup', 'plate', 'spoon', 'fork', 'knife', 'glass', 'bottle', 'lamp', 'clock'
    ];
    if (!validNouns.includes(noun)) {
      console.log('Invalid noun:', noun);
      return false;
    }
    wordIndex++;

    // Проверяем правильность артикля ("a" или "an") в зависимости от первого звука существительного
    const startsWithVowelSound = /^[aeiou]/i.test(noun);
    if (startsWithVowelSound && article !== 'an') {
      console.log('Incorrect article: expected "an" for', noun);
      return false;
    }
    if (!startsWithVowelSound && article !== 'a') {
      console.log('Incorrect article: expected "a" for', noun);
      return false;
    }

    // Проверяем предлог (on/in/at)
    if (!words[wordIndex] || !['on', 'in', 'at'].includes(words[wordIndex])) {
      console.log('Expected preposition "on", "in", or "at" at index', wordIndex, 'got', words[wordIndex]);
      return false;
    }
    const preposition = words[wordIndex];
    wordIndex++;

    // Проверяем существительное (место) после предлога
    if (!words[wordIndex]) {
      console.log('No place noun after preposition');
      return false;
    }
    const place = words[wordIndex];
    // Список допустимых мест
    const validPlaces = [
      'table', 'desk', 'chair', 'bag', 'box', 'room', 'kitchen', 'bedroom', 'bathroom',
      'car', 'park', 'school', 'office', 'shop', 'street', 'garden', 'floor', 'shelf', 'window'
    ];
    if (!validPlaces.includes(place)) {
      console.log('Invalid place noun:', place);
      return false;
    }
    wordIndex++;

    // Проверяем, что после места нет лишних слов
    if (wordIndex < words.length) {
      console.log('Extra words after place:', words.slice(wordIndex));
      return false;
    }

    console.log('Validation passed for:', text);
    return true;
  }
});