(function() {
  console.log('Загружен Урок 6 Upper-Intermediate v2');
  console.log('Регистрация урока с уровнем: upperintermediate');
  addLesson({
    level: "upperintermediate",
    lesson: "lesson6_upper_intermediate",
    name: "Урок 6: Present Perfect Continuous",
    structures: [
      {
        structure: "__________ have/has been __________ing (for/since ________).",
        pattern: ["have", "has", "been"],
        translations: ["______ делал/а ______ (в течение/с _______)."],
        examples: [
          "I have been working for three hours. (Я работал в течение трёх часов.)",
          "She has been studying since morning. (Она училась с утра.)",
          "They have been running for an hour. (Они бегали в течение часа.)"
        ],
        id: "present-perfect-continuous-affirmative",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "Have/Has __________ been __________ing (for/since ________)?",
        pattern: ["have", "has", "been"],
        translations: ["Делал/а ли ______ ______ (в течение/с _______)?"],
        examples: [
          "Have you been waiting for long? (Ты долго ждал?)",
          "Has she been studying since morning? (Она училась с утра?)",
          "Have they been working on the project for a week? (Они работали над проектом неделю?)"
        ],
        id: "present-perfect-continuous-question",
        hasVerb: false,
        hasName: false
      },
      {
        structure: "__________ haven't/hasn't been __________ing (for/since ________).",
        pattern: ["have", "has", "not", "been"],
        translations: ["______ не делал/а ______ (в течение/с _______)."],
        examples: [
          "I haven’t been sleeping well for a week. (Я плохо спал всю неделю.)",
          "He hasn’t been working since last month. (Он не работал с прошлого месяца.)",
          "They haven’t been practicing for long. (Они не практиковались долго.)"
        ],
        id: "present-perfect-continuous-negative",
        hasVerb: false,
        hasName: false
      }
    ],
    requiredCorrect: 10,
    validateStructure: function(text, structure) {
      console.log('Валидация структуры:', structure.id);
      console.log('Входной текст:', text);
      // Нормализуем сокращения и "everyday"
      let processedText = text
        .replace(/i've/gi, 'i have')
        .replace(/haven't/gi, 'have not')
        .replace(/hasn't/gi, 'has not')
        .replace(/don't/gi, 'do not')
        .replace(/i'm/gi, 'i am')
        .replace(/\beveryday\b/gi, 'every day');
      if (processedText !== text) {
        console.log('Обработаны сокращения и everyday:', processedText);
      }
      // Удаляем пунктуацию, нормализуем пробелы и приводим к нижнему регистру
      const cleanedText = processedText.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').toLowerCase().trim();
      console.log('Очищенный текст:', cleanedText);

      const words = cleanedText.split(/\s+/).filter(word => word.length > 0);
      console.log('Разделённые слова:', words);

      // Минимальное количество слов
      let minWords;
      switch (structure.id) {
        case "present-perfect-continuous-affirmative":
          minWords = 4; // subject have/has been V-ing
          break;
        case "present-perfect-continuous-question":
          minWords = 4; // have/has subject been V-ing
          break;
        case "present-perfect-continuous-negative":
          minWords = 5; // subject have/has not been V-ing
          break;
        default:
          minWords = 4;
      }
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;

      // Исключённые слова (модальные, стативные глаголы и неподходящие)
      const excludedWords = [
        'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought',
        'am', 'is', 'are', 'was', 'were', 'been', 'being', 'has', 'had', 'does', 'did'
      ];

      // Проверяем подлежащее
      const validateSubject = () => {
        console.log('Валидация подлежащего на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет подлежащего');
          return false;
        }

        const subjectWords = [];
        while (wordIndex < words.length && !['have', 'has', 'not'].includes(words[wordIndex])) {
          const word = words[wordIndex];
          if (excludedWords.includes(word) && !['i', 'you', 'he', 'she', 'it', 'we', 'they', 'the', 'a', 'an'].includes(word)) {
            console.log('Исключённое слово в подлежащем:', word);
            return false;
          }
          subjectWords.push(word);
          wordIndex++;
        }

        if (subjectWords.length === 0) {
          console.log('Подлежащее отсутствует');
          return false;
        }
        console.log('Подлежащее:', subjectWords.join(' '));
        return true;
      };

      // Проверяем герундий (V-ing)
      const validateGerund = () => {
        console.log('Валидация герундия на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет герундия');
          return false;
        }

        const gerund = words[wordIndex];
        console.log('Проверка герундия:', gerund);
        if (!gerund.endsWith('ing') || excludedWords.includes(gerund)) {
          console.log('Глагол не является герундием или исключён:', gerund);
          return false;
        }

        wordIndex++;
        return true;
      };

      // Проверяем опциональное for/since-дополнение
      const validateTimeClause = () => {
        if (wordIndex >= words.length) {
          console.log('Нет for/since-дополнения, валидация успешна');
          return true;
        }

        if (!['for', 'since'].includes(words[wordIndex])) {
          console.log('Ожидалось "for" или "since" или конец фразы на позиции', wordIndex, ', получено', words[wordIndex]);
          return false;
        }
        wordIndex++;

        if (!words[wordIndex]) {
          console.log('Нет указания времени после "for" или "since"');
          return false;
        }

        // Проверяем указание времени (может быть составным, например, "well for a week")
        const timeWords = [];
        while (wordIndex < words.length) {
          const word = words[wordIndex];
          if (excludedWords.includes(word) && !['the', 'a', 'an', 'well'].includes(word)) {
            console.log('Исключённое слово в указании времени:', word);
            return false;
          }
          timeWords.push(word);
          wordIndex++;
        }
        if (timeWords.length === 0) {
          console.log('Указание времени отсутствует');
          return false;
        }
        console.log('Указание времени:', timeWords.join(' '));
        return true;
      };

      if (structure.id === "present-perfect-continuous-affirmative") {
        console.log('Начало проверки структуры Present Perfect Continuous Affirmative');
        if (!validateSubject()) return false;

        if (!words[wordIndex] || !['have', 'has'].includes(words[wordIndex])) {
          console.log('Ожидалось "have" или "has" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!words[wordIndex] || words[wordIndex] !== 'been') {
          console.log('Ожидалось "been" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateGerund()) return false;

        if (!validateTimeClause()) return false;

        console.log('Валидация пройдена для:', cleanedText);
        return true;
      } else if (structure.id === "present-perfect-continuous-question") {
        console.log('Начало проверки структуры Present Perfect Continuous Question');
        if (!words[wordIndex] || !['have', 'has'].includes(words[wordIndex])) {
          console.log('Ожидалось "have" или "has" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateSubject()) return false;

        if (!words[wordIndex] || words[wordIndex] !== 'been') {
          console.log('Ожидалось "been" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateGerund()) return false;

        if (!validateTimeClause()) return false;

        console.log('Валидация пройдена для:', cleanedText);
        return true;
      } else if (structure.id === "present-perfect-continuous-negative") {
        console.log('Начало проверки структуры Present Perfect Continuous Negative');
        if (!validateSubject()) return false;

        if (!words[wordIndex] || !['have', 'has'].includes(words[wordIndex])) {
          console.log('Ожидалось "have" или "has" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!words[wordIndex] || words[wordIndex] !== 'not') {
          console.log('Ожидалось "not" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!words[wordIndex] || words[wordIndex] !== 'been') {
          console.log('Ожидалось "been" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (!validateGerund()) return false;

        if (!validateTimeClause()) return false;

        console.log('Валидация пройдена для:', cleanedText);
        return true;
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();