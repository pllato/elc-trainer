addLesson({
  level: "beginner1",
  lesson: "lesson10",
  name: "Урок 10",
  structures: [
    { structure: "This is ______.", pattern: ["this", "is"], translations: ["Это ______.", "Вот ______."], id: "this-is-name", hasName: true },
    { structure: "This is ____ ____.", pattern: ["this", "is"], translations: ["Это ____ ______.", "Вот ____ ______."], id: "this-is-pronoun-thing", hasName: false },
    { structure: "This is ____'s ____.", pattern: ["this", "is"], translations: ["Это ____ ______.", "Вот ____ ______."], id: "this-is-possessive-thing", hasName: false }
  ],
  requiredCorrect: 10, // 10 correct examples per structure
  validateStructure: function(text, structure) {
    const words = text.split(' ').filter(word => word.length > 0);
    const pattern = structure.pattern;
    let wordIndex = 0;

    // Сбрасываем состояние при загрузке урока
    if (!window.lastName) {
      window.lastName = null;
      window.lastNameGender = null;
      window.usedNames = [];
    }

    // Словарь имён с родами
    const nameGenders = {
      // Женские имена
      "madina": "female",
      "anna": "female",
      "sarah": "female",
      // Мужские имена
      "john": "male",
      "tom": "male",
      "alex": "male",
      // Неодушевлённые
      "cat": "neuter",
      "dog": "neuter",
      "table": "neuter"
    };

    // Функция для обработки сокращений
    function normalizeWord(word) {
      word = word.toLowerCase();
      return word;
    }

    let normalizedWords = [];
    for (let word of words) {
      normalizedWords.push(normalizeWord(word));
    }

    // Проверяем, что начало текста соответствует шаблону
    for (let part of pattern) {
      if (!normalizedWords[wordIndex] || normalizedWords[wordIndex] !== part) return false;
      wordIndex++;
    }

    // Для первой структуры: "This is ______." (имя)
    if (structure.id === "this-is-name") {
      if (wordIndex >= normalizedWords.length) return false; // Должно быть хотя бы одно слово после "this is"
      if (wordIndex !== normalizedWords.length - 1) return false; // Должно быть ровно одно слово после "this is"
      const name = normalizedWords[wordIndex];
      // Проверяем, не повторяется ли имя
      if (window.usedNames && window.usedNames.includes(name)) return false;
      // Сохраняем имя и определяем его род
      window.lastName = name;
      window.lastNameGender = nameGenders[name] || "unknown";
      window.usedNames.push(name);
      return true;
    }

    // Для второй структуры: "This is ____ ____." (притяжательное местоимение + предмет)
    if (structure.id === "this-is-pronoun-thing") {
      if (wordIndex + 2 > normalizedWords.length) return false; // Должно быть ровно два слова после "this is"
      if (wordIndex + 2 !== normalizedWords.length) return false; // Точный текст: "this is pronoun thing"
      const pronoun = normalizedWords[wordIndex];
      const thing = normalizedWords[wordIndex + 1];
      // Проверяем предмет (для примера ожидаем "bag", но исправляем на "back" для соответствия твоим примерам)
      if (thing !== "back") return false;
      // Проверяем местоимение в зависимости от рода последнего имени
      if (!window.lastNameGender) return false; // Если имени не было, структура недействительна
      if (window.lastNameGender === "unknown") return ["his", "her", "its"].includes(pronoun); // Для неизвестного рода принимаем любое местоимение
      if (window.lastNameGender === "male" && pronoun !== "his") return false;
      if (window.lastNameGender === "female" && pronoun !== "her") return false;
      if (window.lastNameGender === "neuter" && pronoun !== "its") return false;
      return true;
    }

    // Для третьей структуры: "This is ____'s ____." (притяжательная форма имени + предмет)
    if (structure.id === "this-is-possessive-thing") {
      if (!window.lastName) return false; // Если имени не было, структура недействительна
      if (wordIndex + 2 > normalizedWords.length) return false; // Должно быть имя's + предмет
      if (wordIndex + 2 !== normalizedWords.length) return false; // Точный текст: "this is name's thing"
      // Проверяем, что после "this is" идёт имя с 's
      const possessiveForm = normalizedWords[wordIndex];
      const expectedPossessive = window.lastName + "'s";
      if (possessiveForm !== expectedPossessive) return false;
      // Проверяем предмет (исправляем на "back")
      const thing = normalizedWords[wordIndex + 1];
      if (thing !== "back") return false;
      return true;
    }

    return false; // По умолчанию возвращаем false, если структура не распознана
  }
});