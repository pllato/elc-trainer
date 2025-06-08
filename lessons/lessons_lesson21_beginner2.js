addLesson({
  level: "beginner2",
  lesson: "lesson21",
  name: "Урок 21",
  structures: [
    { 
      structure: "I/she/he/it was ________.", 
      pattern: ["i", "was"], 
      translations: ["Я/она/он/оно был(а) ______."], 
      examples: ["I was fine. (Я был(а) хорошо.)", "She was at home. (Она была дома.)"], 
      id: "s1", 
      hasName: false 
    },
    { 
      structure: "We/you/they were ______.", 
      pattern: ["we", "were"], 
      translations: ["Мы/вы/они были ______."], 
      examples: ["They were at home. (Они были дома.)", "You were fine. (Вы были хорошо.)"], 
      id: "s2", 
      hasName: false 
    }
  ],
  requiredCorrect: 2, // 2 correct examples per structure
  validateStructure: function(text, structure) {
    console.log('Raw input:', text);
    // Заменяем "she's/he's/it's" на "she is/he is/it is" и нормализуем пробелы
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

    if (words.length < 2) {
      console.log('Слишком короткая фраза');
      return false;
    }

    let wordIndex = 0;

    // Проверяем первое слово структуры
    if (!words[wordIndex] || !structure.pattern.includes(words[wordIndex])) {
      console.log('Ожидалось одно из слов паттерна:', structure.pattern, 'на позиции', wordIndex, ', получено', words[wordIndex]);
      return false;
    }
    wordIndex++;

    // Проверяем второе слово структуры
    if (wordIndex >= words.length || (words[wordIndex] !== 'was' && words[wordIndex] !== 'were')) {
      console.log('Ожидалось "was" или "were" на позиции', wordIndex, ', получено', words[wordIndex]);
      return false;
    }
    wordIndex++;

    // Всё остальное после "was" или "were" принимаем как валидную часть
    if (wordIndex >= words.length) {
      console.log('Нет слов после "was" или "were"');
      return false;
    }

    console.log('Валидация пройдена для:', text);
    return true;
  }
});