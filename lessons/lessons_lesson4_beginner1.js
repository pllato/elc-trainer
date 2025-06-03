addLesson({
  level: "beginner1",
  lesson: "lesson4",
  name: "Урок 4",
  structures: [
    { structure: "Where are you from?", pattern: ["where", "are", "you", "from"], id: "where-are-you-from", hasName: false },
    { structure: "I am from _______.", pattern: ["i", "am", "from"], id: "i-am-from", hasName: true },
    { structure: "Where is he from?", pattern: ["where", "is", "he", "from"], id: "where-is-he-from", hasName: false },
    { structure: "He is from ________.", pattern: ["he", "is", "from"], id: "he-is-from", hasName: true },
    { structure: "Where is she from?", pattern: ["where", "is", "she", "from"], id: "where-is-she-from", hasName: false },
    { structure: "She is from _______.", pattern: ["she", "is", "from"], id: "she-is-from", hasName: true }
  ],
  requiredCorrect: 5, // 5 correct examples per structure
  validateStructure: function(text, structure) {
    const words = text.split(' ').filter(word => word.length > 0);
    const pattern = structure.pattern;
    let wordIndex = 0;

    // Функция для обработки сокращений
    function normalizeWord(word) {
      word = word.toLowerCase();
      if (word === "i'm") return ["i", "am"];
      if (word === "he's") return ["he", "is"];
      if (word === "she's") return ["she", "is"];
      return [word];
    }

    let normalizedWords = [];
    for (let word of words) {
      normalizedWords.push(...normalizeWord(word));
    }

    // Проверяем, что начало текста соответствует шаблону
    for (let part of pattern) {
      if (!normalizedWords[wordIndex] || normalizedWords[wordIndex] !== part) return false;
      wordIndex++;
    }

    // Для вопросов (hasName: false) текст должен точно совпадать с шаблоном
    if (!structure.hasName) {
      return wordIndex === normalizedWords.length; // Длина текста должна равняться длине шаблона
    }

    // Для ответов (hasName: true) после шаблона должно быть хотя бы одно слово
    return wordIndex < normalizedWords.length; // Проверяем, что есть хотя бы одно слово после шаблона
  }
});
