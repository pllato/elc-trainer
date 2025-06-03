window.baseLessonLogic = {
  // Общие настройки
  defaultRequiredCorrect: 4, // Количество правильных примеров для каждой структуры по умолчанию

  // Функция валидации, общая для всех уроков
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
};
