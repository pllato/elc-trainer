(function() {
  addLesson({
    level: "elementary",
    lesson: "lesson1",
    name: "Урок 1: I can't stop ____________ing / I enjoy ________ing",
    structures: [
      {
        structure: "I can't stop ____________ing.",
        pattern: ["cannot", "stop"],
        translations: ["Я не могу перестать ______."],
        examples: [
          "I can't stop reading. (Я не могу перестать читать.)",
          "I can't stop working. (Я не могу перестать работать.)",
          "I can't stop dancing. (Я не могу перестать танцевать.)",
          "I can't stop singing. (Я не могу перестать петь.)"
        ],
        id: "i-cant-stop-verbing",
        hasVerb: true,
        hasName: false
      },
      {
        structure: "I enjoy ________ing.",
        pattern: ["enjoy"],
        translations: ["Мне нравится ______."],
        examples: [
          "I enjoy reading. (Мне нравится читать.)",
          "I enjoy working. (Мне нравится работать.)",
          "I enjoy dancing. (Мне нравится танцевать.)",
          "I enjoy singing. (Мне нравится петь.)"
        ],
        id: "i-enjoy-verbing",
        hasVerb: true,
        hasName: false
      }
    ],
    requiredCorrect: 10,
    validateStructure: function(text, structure) {
      console.log('Валидация структуры:', structure.id);
      console.log('Входной текст:', text);
      // Обрабатываем сокращения
      let processedText = text.replace(/can't/gi, 'cannot');
      if (processedText !== text) {
        console.log('Обработаны сокращения:', processedText);
      }
      // Удаляем пунктуацию, нормализуем пробелы и приводим к нижнему регистру
      const cleanedText = processedText.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').toLowerCase().trim();
      console.log('Очищенный текст:', cleanedText);

      const words = cleanedText.split(/\s+/).filter(word => word.length > 0);
      console.log('Разделённые слова:', words);

      // Минимальное количество слов
      const minWords = structure.id === "i-cant-stop-verbing" ? 4 : 3;
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;

      // Исключённые глаголы (модальные, стативные и неподходящие)
      const excludedWords = [
        'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought',
        'am', 'is', 'are', 'was', 'were', 'been', 'being', 'has', 'have', 'had', 'does', 'do', 'did',
        'like', 'love', 'hate', 'know', 'understand', 'want', 'need', 'believe', 'going'
      ];

      // Проверяем глагол в форме -ing
      const validateVerbIng = () => {
        console.log('Валидация глагола на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет глагола');
          return false;
        }

        const verb = words[wordIndex];
        if (!verb.endsWith('ing')) {
          console.log('Глагол должен заканчиваться на -ing:', verb);
          return false;
        }

        if (excludedWords.includes(verb)) {
          console.log('Исключённый глагол:', verb);
          return false;
        }

        wordIndex++;
        // Разрешаем дополнительные слова
        while (wordIndex < words.length) {
          const extraWord = words[wordIndex];
          if (excludedWords.includes(extraWord)) {
            console.log('Исключённое дополнительное слово:', extraWord);
            return false;
          }
          wordIndex++;
        }

        return true;
      };

      if (structure.id === "i-cant-stop-verbing") {
        if (words[wordIndex] !== 'i') {
          console.log('Ожидалось "i" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'cannot') {
          console.log('Ожидалось "cannot" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'stop') {
          console.log('Ожидалось "stop" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        const isValid = validateVerbIng();
        if (isValid) {
          console.log('Валидация пройдена для:', text);
        }
        return isValid;
      } else if (structure.id === "i-enjoy-verbing") {
        if (words[wordIndex] !== 'i') {
          console.log('Ожидалось "i" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        if (words[wordIndex] !== 'enjoy') {
          console.log('Ожидалось "enjoy" на позиции', wordIndex, ', получено', words[wordIndex] || 'ничего');
          return false;
        }
        wordIndex++;

        const isValid = validateVerbIng();
        if (isValid) {
          console.log('Валидация пройдена для:', text);
        }
        return isValid;
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();