(function() {
  addLesson({
    level: "preintermediate",
    lesson: "lesson5",
    name: "Урок 5: I Like the Way You",
    structures: [
      {
        structure: "I like the way you __________",
        pattern: ["i", "like", "the", "way", "you"],
        translations: ["Мне нравится, как ты ______."],
        examples: [
          "I like the way you sing. (Мне нравится, как ты поёшь.)",
          "I like the way you speak. (Мне нравится, как ты говоришь.)",
          "I like the way you look at me. (Мне нравится, как ты на меня смотришь.)"
        ],
        id: "i-like-the-way-you-action",
        hasVerb: false,
        hasName: false
      }
    ],
    requiredCorrect: 10,
    validateStructure: function(text, structure) {
      console.log('Валидация структуры:', structure.id);
      console.log('Входной текст:', text);
      // Нормализуем "everyday"
      let processedText = text.replace(/\beveryday\b/gi, 'every day');
      if (processedText !== text) {
        console.log('Обработан everyday:', processedText);
      }
      // Удаляем пунктуацию, нормализуем пробелы и приводим к нижнему регистру
      const cleanedText = processedText.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').toLowerCase().trim();
      console.log('Очищенный текст:', cleanedText);

      const words = cleanedText.split(/\s+/).filter(word => word.length > 0);
      console.log('Разделённые слова:', words);

      // Минимальное количество слов
      const minWords = 6; // I + like + the + way + you + минимум 1 слово действия
      if (words.length < minWords) {
        console.log(`Недостаточно слов (минимум ${minWords}):`, words.length);
        return false;
      }

      let wordIndex = 0;

      // Исключённые слова (модальные, стативные глаголы и неподходящие)
      const excludedWords = [
        'will', 'should', 'can', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought',
        'am', 'is', 'are', 'was', 'were', 'been', 'being', 'has', 'have', 'had', 'does', 'do', 'did',
        'like', 'love', 'hate', 'know', 'understand', 'want', 'need', 'believe', 'stand'
      ];

      // Проверяем действие (глагол или фразу)
      const validateAction = () => {
        console.log('Валидация действия на позиции', wordIndex);
        if (!words[wordIndex]) {
          console.log('Нет действия');
          return false;
        }

        // Разрешаем составные фразы (например, "look at me")
        let actionWords = [];
        while (wordIndex < words.length) {
          const word = words[wordIndex];
          if (excludedWords.includes(word)) {
            console.log('Исключённое слово в действии:', word);
            return false;
          }
          actionWords.push(word);
          wordIndex++;
        }

        if (actionWords.length === 0) {
          console.log('Действие отсутствует');
          return false;
        }

        return true;
      };

      if (structure.id === "i-like-the-way-you-action") {
        const expected = ['i', 'like', 'the', 'way', 'you'];
        for (let i = 0; i < expected.length; i++) {
          if (words[wordIndex] !== expected[i]) {
            console.log(`Ожидалось "${expected[i]}" на позиции ${wordIndex}, получено`, words[wordIndex] || 'ничего');
            return false;
          }
          wordIndex++;
        }

        if (!validateAction()) return false;

        if (wordIndex < words.length) {
          console.log('Лишние слова:', words.slice(wordIndex));
          return false;
        }

        console.log('Валидация пройдена для:', text);
        return true;
      }

      console.log('Структура не соответствует:', structure.id);
      return false;
    }
  });
})();