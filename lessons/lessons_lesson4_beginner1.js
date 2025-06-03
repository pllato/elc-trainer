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
  requiredCorrect: 2, // 2 correct examples per structure
  validateStructure: function(text, structure) {
    const words = text.split(' ').filter(word => word.length > 0);
    const pattern = structure.pattern;
    let wordIndex = 0;

    // Проверяем, что начало текста соответствует шаблону
    for (let part of pattern) {
      if (!words[wordIndex] || words[wordIndex] !== part) return false;
      wordIndex++;
    }

    // Для вопросов (hasName: false) текст должен точно совпадать с шаблоном
    if (!structure.hasName) {
      return wordIndex === words.length; // Длина текста должна равняться длине шаблона
    }

    // Для ответов (hasName: true) после шаблона должно быть хотя бы одно слово
    return wordIndex < words.length; // Проверяем, что есть хотя бы одно слово после шаблона
  }
});
