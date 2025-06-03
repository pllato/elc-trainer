addLesson({
  level: "beginner1",
  lesson: "lesson8",
  name: "Урок 8",
  structures: [
    { structure: "What is your name?", pattern: ["what", "is", "your", "name"], translations: ["Как тебя зовут?", "Какое у тебя имя?"], id: "what-is-your-name", hasName: false },
    { structure: "What is your phone number?", pattern: ["what", "is", "your", "phone", "number"], translations: ["Какой у тебя номер телефона?", "Какой у тебя телефон?"], id: "what-is-your-phone-number", hasName: false },
    { structure: "What is your address?", pattern: ["what", "is", "your", "address"], translations: ["Какой у тебя адрес?", "Где ты живёшь?"], id: "what-is-your-address", hasName: false },
    { structure: "What is your age?", pattern: ["what", "is", "your", "age"], translations: ["Сколько тебе лет?", "Какой у тебя возраст?"], id: "what-is-your-age", hasName: false },
    { structure: "My name is _________.", pattern: ["my", "name", "is"], translations: ["Меня зовут _________.", "Моё имя _________."], examples: ["My name is Anna. (Меня зовут Анна.)", "My name is John. (Моё имя Джон.)"], id: "my-name-is", hasName: true },
    { structure: "My phone number is _________.", pattern: ["my", "phone", "number", "is"], translations: ["Мой номер телефона _________.", "Мой телефон _________."], examples: ["My phone number is 123-456-7890. (Мой номер телефона 123-456-7890.)", "My phone number is 987-654-3210. (Мой телефон 987-654-3210.)"], id: "my-phone-number-is", hasName: true },
    { structure: "My address is _________.", pattern: ["my", "address", "is"], translations: ["Мой адрес _________.", "Я живу по адресу _________."], examples: ["My address is 123 Main Street. (Мой адрес 123 Main Street.)", "My address is 456 Oak Avenue. (Я живу по адресу 456 Oak Avenue.)"], id: "my-address-is", hasName: true },
    { structure: "My age is _________.", pattern: ["my", "age", "is"], translations: ["Мне _________ лет.", "Мой возраст _________."], examples: ["My age is 25. (Мне 25 лет.)", "My age is 30. (Мой возраст 30.)"], id: "my-age-is", hasName: true }
  ],
  requiredCorrect: 6, // 6 correct examples per structure
  validateStructure: function(text, structure) {
    const words = text.split(' ').filter(word => word.length > 0);
    const pattern = structure.pattern;
    let wordIndex = 0;

    // Функция для обработки сокращений
    function normalizeWord(word) {
      word = word.toLowerCase();
      if (word === "what's") return ["what", "is"];
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