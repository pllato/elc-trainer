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
        "Is there a book on the table? (Есть ли книга на столе?)",
        "Is there a dog? (Есть ли собака?)"
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
        "Yes, there is an apple in the bag. (Да, в сумке есть яблоко.)",
        "Yes, there is a car. (Да, есть машина.)"
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
        "No, there isn't a pen at the desk. (Нет, на столе нет ручки.)",
        "No, there is no dog. (Нет, собаки нет.)"
      ], 
      id: "no-there-is-not-a-noun-prep-place", 
      hasVerb: false,
      hasName: false
    }
  ],
  requiredCorrect: 10,
  validateStructure: function(text, structure) {
    console.log('Raw input:', text);
    // Заменяем "isn't" на "is not" и "no" для поддержки сокращений
    let processedText = text.replace(/isn't/g, 'is not');
    // Удаляем пунктуацию и приводим к нижнему регистру
    const cleanedText = processedText.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase().trim();
    console.log('Cleaned text:', cleanedText);

    const words = cleanedText.split(/\s+/).filter(word => word.length > 0);
    console.log('Split words:', words);

    let wordIndex = 0;

    // Проверяем начальные слова структуры
    if (structure.id === "is-there-a-noun-prep-place") {
      // "Is there a/an _____ on/in/at _______?"
      if (!words[wordIndex] || words[wordIndex] !== 'is') {
        console.log('Ожидалось "is" на позиции', wordIndex, ', получено', words[wordIndex]);
        return false;
      }
      wordIndex++;
      if (!words[wordIndex] || words[wordIndex] !== 'there') {
        console.log('Ожидалось "there" на позиции', wordIndex, ', получено', words[wordIndex]);
        return false;
      }
      wordIndex++;
    } else if (structure.id === "yes-there-is-a-noun-prep-place") {
      // "Yes, there is a/an _____ on/in/at ______"
      if (!words[wordIndex] || words[wordIndex] !== 'yes') {
        console.log('Ожидалось "yes" на позиции', wordIndex, ', получено', words[wordIndex]);
        return false;
      }
      wordIndex++;
      if (!words[wordIndex] || words[wordIndex] !== 'there') {
        console.log('Ожидалось "there" на позиции', wordIndex, ', получено', words[wordIndex]);
        return false;
      }
      wordIndex++;
      if (!words[wordIndex] || words[wordIndex] !== 'is') {
        console.log('Ожидалось "is" на позиции', wordIndex, ', получено', words[wordIndex]);
        return false;
      }
      wordIndex++;
    } else if (structure.id === "no-there-is-not-a-noun-prep-place") {
      // "No, there is not a/an _____ on/in/at ______" или "No, there is no ..."
      if (!words[wordIndex] || words[wordIndex] !== 'no') {
        console.log('Ожидалось "no" на позиции', wordIndex, ', получено', words[wordIndex]);
        return false;
      }
      wordIndex++;
      if (!words[wordIndex] || words[wordIndex] !== 'there') {
        console.log('Ожидалось "there" на позиции', wordIndex, ', получено', words[wordIndex]);
        return false;
      }
      wordIndex++;
      if (!words[wordIndex] || words[wordIndex] !== 'is') {
        console.log('Ожидалось "is" на позиции', wordIndex, ', получено', words[wordIndex]);
        return false;
      }
      wordIndex++;
      if (!words[wordIndex] || (words[wordIndex] !== 'not' && words[wordIndex] !== 'no')) {
        console.log('Ожидалось "not" или "no" на позиции', wordIndex, ', получено', words[wordIndex]);
        return false;
      }
      wordIndex++;
    }

    // Проверяем наличие "any" (опционально, для отрицательной структуры)
    let hasAny = false;
    if (structure.id === "no-there-is-not-a-noun-prep-place" && words[wordIndex] === 'any') {
      hasAny = true;
      wordIndex++;
    }

    // Проверяем наличие артикля "a" или "an"
    if (!words[wordIndex] || (words[wordIndex] !== 'a' && words[wordIndex] !== 'an')) {
      console.log('Нет артикля "a" или "an" на позиции', wordIndex);
      return false;
    }
    const article = words[wordIndex];
    wordIndex++;

    // Проверяем существительное после артикля
    if (!words[wordIndex]) {
      console.log('Нет существительного после артикля');
      return false;
    }
    const noun = words[wordIndex];

    // Список запрещённых слов
    const excludedWords = [
      // Модальные глаголы и вспомогательные
      'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought',
      'am', 'is', 'are', 'was', 'were', 'been', 'being', 'has', 'have', 'had', 'does', 'do', 'did',
      // Наречия времени
      'tomorrow', 'yesterday', 'today', 'now', 'later', 'soon', 'always', 'never', 'often',
      // Глаголы с окончаниями
      'going', 'doing', 'saying', 'running', 'swimming', 'singing', 'writing', 'reading',
      'likes', 'runs', 'swims', 'works', 'calls', 'plays', 'watches', 'studies',
      'worked', 'called', 'played', 'watched', 'studied',
      // Другие неподходящие слова
      'to', 'for', 'with', 'by', 'from', 'at', 'in', 'on'
    ];

    // Проверяем, что существительное не в списке запрещённых слов
    if (excludedWords.includes(noun)) {
      console.log('Запрещённое слово:', noun);
      return false;
    }

    // Проверяем, что существительное не заканчивается на -ing, -s, -es, -ed
    if (noun.endsWith('ing') || noun.endsWith('s') || noun.endsWith('es') || noun.endsWith('ed')) {
      console.log('Недопустимая форма существительного:', noun);
      return false;
    }

    wordIndex++;

    // Проверяем правильность артикля ("a" или "an")
    const startsWithVowelSound = /^[aeiou]/i.test(noun);
    if (startsWithVowelSound && article !== 'an') {
      console.log('Неправильный артикль: ожидалось "an" для', noun);
      return false;
    }
    if (!startsWithVowelSound && article !== 'a') {
      console.log('Неправильный артикль: ожидалось "a" для', noun);
      return false;
    }

    // Если нет больше слов, принимаем как корректное (короткая форма)
    if (wordIndex >= words.length) {
      console.log('Валидация пройдена для:', text, '(короткая форма)');
      return true;
    }

    // Проверяем предлог (on/in/at)
    if (!['on', 'in', 'at'].includes(words[wordIndex])) {
      console.log('Ожидался предлог "on", "in" или "at" на позиции', wordIndex, ', получено', words[wordIndex]);
      return false;
    }
    wordIndex++;

    // Проверяем существительное (место) после предлога
    if (!words[wordIndex]) {
      console.log('Нет существительного места после предлога');
      return false;
    }
    let place = words[wordIndex];
    // Проверяем наличие артикля "the"
    if (place === 'the') {
      wordIndex++;
      if (!words[wordIndex]) {
        console.log('Нет существительного места после "the"');
        return false;
      }
      place = words[wordIndex];
    }

    // Проверяем составные места (например, "parking lot")
    if (place === 'parking' && words[wordIndex + 1] === 'lot') {
      place = 'parking lot';
      wordIndex++;
    }

    // Список допустимых мест
    const validPlaces = [
      'table', 'desk', 'chair', 'bag', 'box', 'room', 'kitchen', 'bedroom', 'bathroom',
      'car', 'park', 'school', 'office', 'shop', 'street', 'garden', 'floor', 'shelf', 'window',
      'here', 'parking lot', 'house', 'classroom', 'pocket', 'back'
    ];
    if (!validPlaces.includes(place)) {
      console.log('Недопустимое место:', place);
      return false;
    }
    wordIndex++;

    // Проверяем, что после места нет лишних слов
    if (wordIndex < words.length) {
      console.log('Лишние слова после места:', words.slice(wordIndex));
      return false;
    }

    console.log('Валидация пройдена для:', text);
    return true;
  }
});
