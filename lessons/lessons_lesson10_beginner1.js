addLesson({
  level: "beginner1",
  lesson: "lesson10",
  name: "Урок 10",
  structures: [
    { 
      structure: "This is ______.", 
      pattern: ["this", "is"], 
      translations: ["Это ______.", "Вот ______."], 
      examples: [
        "This is Madina. (Это Мадина.)",
        "This is John. (Это Джон.)",
        "This is cat. (Это кошка.)"
      ], 
      id: "this-is-name", 
      hasName: true 
    },
    { 
      structure: "This is ____ ____.", 
      pattern: ["this", "is"], 
      translations: ["Это ____ ______.", "Вот ____ ______."], 
      examples: [
        "This is his bag. (Это его сумка.)",
        "This is her dog. (Это её собака.)",
        "This is its toy. (Это его игрушка.)"
      ], 
      id: "this-is-pronoun-thing", 
      hasName: false 
    },
    { 
      structure: "This is ____'s ____.", 
      pattern: ["this", "is"], 
      translations: ["Это ______ ______.", "Вот ______ ______."], 
      examples: [
        "This is Madina's bag. (Это сумка Мадины.)",
        "This is John's car. (Это машина Джона.)",
        "This is cat's toy. (Это игрушка кошки.)"
      ], 
      id: "this-is-possessive-thing", 
      hasName: false 
    }
  ],
  requiredCorrect: 10, // 10 correct examples per structure
  validateStructure: function(text, structure) {
    const words = text.split(' ').filter(word => word.length > 0);
    const pattern = structure.pattern;
    let wordIndex = 0;

    // Сбрасываем состояние при загрузке урока
    if (!window.usedNames) {
      window.usedNames = [];
    }

    // Функция для обработки сокращений
    function normalizeWord(word) {
      word = word.toLowerCase();
      return word;
    }

    let normalizedWords = [];
    for (let word of words) {
      normalizedWords.push(normalizeWord(word));
    }

    console.log(`Validating text: "${text}" for structure: "${structure.structure}"`);

    // Проверяем, что начало текста соответствует шаблону
    for (let part of pattern) {
      if (!normalizedWords[wordIndex] || normalizedWords[wordIndex] !== part) {
        console.log(`Mismatch at index ${wordIndex}: expected "${part}", got "${normalizedWords[wordIndex]}"`);
        return false;
      }
      wordIndex++;
    }

    // Для первой структуры: "This is ______." (имя или слово)
    if (structure.id === "this-is-name") {
      if (wordIndex >= normalizedWords.length) {
        console.log("No word provided after 'this is'");
        return false; // Должно быть хотя бы одно слово после "this is"
      }
      const name = normalizedWords.slice(wordIndex).join(' ');
      console.log(`Recognized name/word: "${name}"`);
      // Проверяем, не повторяется ли слово
      if (window.usedNames && window.usedNames.includes(name)) {
        console.log(`Word "${name}" is a duplicate`);
        return false;
      }
      window.usedNames.push(name);
      return true;
    }

    // Для второй структуры: "This is ____ ____." (притяжательное местоимение + предмет)
    if (structure.id === "this-is-pronoun-thing") {
      if (wordIndex + 2 > normalizedWords.length) {
        console.log("Not enough words for 'This is ____ ____'");
        return false; // Должно быть ровно два слова после "this is"
      }
      if (wordIndex + 2 !== normalizedWords.length) {
        console.log("Too many words for 'This is ____ ____'");
        return false; // Точный текст: "this is pronoun thing"
      }
      const pronoun = normalizedWords[wordIndex];
      const thing = normalizedWords[wordIndex + 1];
      // Проверяем местоимение
      if (!["his", "her", "its"].includes(pronoun)) {
        console.log(`Expected "his", "her", or "its", got "${pronoun}"`);
        return false;
      }
      // Проверяем предмет (ожидаем "bag", "dog", "car", или "toy")
      if (!["bag", "dog", "car", "toy"].includes(thing)) {
        console.log(`Expected "bag", "dog", "car", or "toy", got "${thing}"`);
        return false;
      }
      return true;
    }

    // Для третьей структуры: "This is ____'s ____." (притяжательная форма + предмет)
    if (structure.id === "this-is-possessive-thing") {
      if (wordIndex + 2 > normalizedWords.length) {
        console.log("Not enough words for 'This is ____'s ____'");
        return false; // Должно быть имя's + предмет
      }
      if (wordIndex + 2 !== normalizedWords.length) {
        console.log("Too many words for 'This is ____'s ____'");
        return false; // Точный текст: "this is name's thing"
      }
      const possessiveForm = normalizedWords[wordIndex];
      // Проверяем, что слово заканчивается на 's
      if (!possessiveForm.endsWith("'s")) {
        console.log(`Expected word ending with "'s", got "${possessiveForm}"`);
        return false;
      }
      // Проверяем предмет (ожидаем "bag", "dog", "car", или "toy")
      const thing = normalizedWords[wordIndex + 1];
      if (!["bag", "dog", "car", "toy"].includes(thing)) {
        console.log(`Expected "bag", "dog", "car", or "toy", got "${thing}"`);
        return false;
      }
      return true;
    }

    console.log(`No matching structure for text: "${text}"`);
    return false; // По умолчанию возвращаем false, если структура не распознана
  }
});
