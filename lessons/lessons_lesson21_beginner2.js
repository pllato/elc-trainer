addLesson({
  level: "beginner2",
  lesson: "lesson21",
  name: "Урок 21: Прошедшее время с to be",
  structures: [
    { 
      structure: "I/she/he/it was ________.", 
      pattern: ["i", "she", "he", "it"], // Убрали "was" из паттерна
      translations: ["Я/она/он/оно был(а) ______."], 
      examples: ["I was fine. (Я был(а) хорошо.)", "She was at home. (Она была дома.)"], 
      id: "s1", 
      hasVerb: false,
      hasName: false 
    },
    { 
      structure: "We/you/they were ______.", 
      pattern: ["we", "you", "they"], // Убрали "were" из паттерна
      translations: ["Мы/вы/они были ______."], 
      examples: ["They were at home. (Они были дома.)", "You were fine. (Вы были хорошо.)"], 
      id: "s2", 
      hasVerb: false,
      hasName: false 
    }
  ],
  requiredCorrect: 10,
  validateStructure: function(text, structure) {
    console.log('Raw input:', text);
    // Заменяем сокращения и нормализуем пробелы
    let processedText = text
      .replace(/she's/gi, 'she was')
      .replace(/he's/gi, 'he was')
      .replace(/it's/gi, 'it was')
      .replace(/\s+/g, ' ');
    // Удаляем пунктуацию и приводим к нижнему регистру
    const cleanedText = processedText.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase().trim();
    console.log('Cleaned text:', cleanedText);

    const words = cleanedText.split(' ').filter(word => word.length > 0);
    console.log('Split words:', words);

    if (words.length < 3) { // Минимум 3 слова: субъект, was/were, дополнение
      console.log('Слишком короткая фраза');
      return false;
    }

    let wordIndex = 0;

    // Проверяем первое слово (субъект)
    const validSubjects = structure.pattern; // Только субъекты
    if (!words[wordIndex] || !validSubjects.includes(words[wordIndex])) {
      console.log('Ожидалось одно из слов:', validSubjects, 'на позиции', wordIndex, ', получено', words[wordIndex]);
      return false;
    }
    wordIndex++;

    // Проверяем второе слово (was или were)
    const expectedVerb = structure.id === "s1" ? "was" : "were";
    if (!words[wordIndex] || words[wordIndex] !== expectedVerb) {
      console.log('Ожидалось "', expectedVerb, '" на позиции', wordIndex, ', получено', words[wordIndex]);
      return false;
    }
    wordIndex++;

    // Проверяем, что есть хотя бы одно слово после was/were
    if (wordIndex >= words.length) {
      console.log('Нет слов после "', expectedVerb, '"');
      return false;
    }

    // Дополнительная проверка на допустимые слова после was/were
    const invalidWords = ['is', 'am', 'are', 'will', 'would', 'can', 'could', 'should'];
    const remainingWords = words.slice(wordIndex);
    for (const word of remainingWords) {
      if (invalidWords.includes(word)) {
        console.log('Недопустимое слово после "', expectedVerb, '":', word);
        return false;
      }
    }

    console.log('Валидация пройдена для:', text);
    return true;
  }
});
