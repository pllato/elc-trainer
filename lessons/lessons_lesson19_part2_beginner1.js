addLesson({
  level: "beginner1",
  lesson: "lesson19_part2",
  name: "Урок 19 Часть 2",
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
      pattern: ["no", "there", "is"], 
      translations: ["Нет, ______ на/в/у ______ нет."], 
      examples: [
        "No, there isn't a pen at the desk. (Нет, на столе нет ручки.)"
      ], 
      id: "no-there-is-not-a-noun-prep-place", 
      hasVerb: false,
      hasName: false
    }
  ],
  requiredCorrect: 10,
  validateStructure: function(text, structure) {
    console.log('Raw input:', text);
    // Заменяем "isn't" на "is not" для поддержки сокращений
    let processedText = text.replace(/isn't/g, 'is not');
    // Удаляем пунктуацию и приводим к нижнему регистру
    const cleanedText = processedText.replace(/[^a-zAZ0-9\s]/g, '').toLowerCase().trim();
    console.log('Cleaned text:', cleanedText);

    const words = cleanedText.split(/\s+/).filter(word => word.length > 0);
    console.log('Split words:', words);

    let wordIndex = 0;

    // Проверяем начальные слова структуры (например, "is there", "yes there is", "no there is not")
    let expectedPattern = structure.pattern;
    if (structure.id === "no-there-is-not-a-noun-prep-place") {
      // Для отрицательной структуры проверяем "is not" или "is no"
      if (words[wordIndex] === "no" && words[wordIndex + 1] === "there" && words[wordIndex + 2] === "is") {
        wordIndex += 3;
        // Проверяем "not" или "no"
        if (!words[wordIndex] || (words[wordIndex] !== 'not' && words[wordIndex] !== 'no')) {
          console.log('Expected "not" или "no" at index', wordIndex, 'got', words[wordIndex]);
          return false;
        }
        wordIndex++;
      } else {
        console.log('Pattern mismatch for "no there is not/no":', words.slice(0, 4));
        return false;
      }
    } else {
      for (let part of expectedPattern) {
        if (!words[wordIndex] || words[wordIndex] !== part) {
          console.log('Pattern mismatch:', words[wordIndex], '!==', part, 'at index', wordIndex);
          return false;
        }
        wordIndex++;
      }
    }

    // Для отрицательной структуры проверяем наличие "any" (опционально)
    let hasAny = false;
    if (structure.id === "no-there-is-not-a-noun-prep-place" && words[wordIndex] === 'any') {
      hasAny = true;
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
    // Расширенный список допустимых существительных (объекты и абстрактные)
    const validNouns = [
      'book', 'pen', 'apple', 'bag', 'chair', 'table', 'desk', 'phone', 'car', 'key',
      'box', 'cup', 'plate', 'spoon', 'fork', 'knife', 'glass', 'bottle', 'lamp', 'clock',
      'problem'
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
    let place = words[wordIndex];
    // Проверяем наличие артикля "the"
    if (place === 'the') {
      wordIndex++;
      if (!words[wordIndex]) {
        console.log('No place noun after "the"');
        return false;
      }
      place = words[wordIndex];
    }

    // Проверяем составные места (например, "parking lot")
    if (place === 'parking' && words[wordIndex + 1] === 'lot') {
      place = 'parking lot';
      wordIndex++;
    }

    // Расширенный список допустимых мест
    const validPlaces = [
      'table', 'desk', 'chair', 'bag', 'box', 'room', 'kitchen', 'bedroom', 'bathroom',
      'car', 'park', 'school', 'office', 'shop', 'street', 'garden', 'floor', 'shelf', 'window',
      'here', 'parking lot', 'house', 'classroom' // Добавляем "house" и "classroom"
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