addLesson({
  level: "beginner1",
  lesson: "lesson13",
  name: "Урок 13 (Часть 1)",
  introExamples: [
    "I live in Astana. (Я живу в Астане.)",
    "You don't play basketball. (Ты не играешь в баскетбол.)",
    "They speak Russian. (Они говорят по-русски.)",
    "Do we live in London? (Мы живём в Лондоне?)",
    "Yes, I live in London. (Да, я живу в Лондоне.)"
  ],
  structures: [
    { 
      structure: "I _____", 
      pattern: ["i"], 
      translations: ["Я ______."], 
      examples: [
        "I live in Almaty. (Я живу в Алматы.)"
      ], 
      id: "i-positive", 
      hasName: true 
    },
    { 
      structure: "You _____.", 
      pattern: ["you"], 
      translations: ["Ты ______."], 
      examples: [
        "You play football. (Ты играешь в футбол.)"
      ], 
      id: "you-positive", 
      hasName: true 
    },
    { 
      structure: "We _____.", 
      pattern: ["we"], 
      translations: ["Мы ______."], 
      examples: [
        "We speak English. (Мы говорим по-английски.)"
      ], 
      id: "we-positive", 
      hasName: true 
    },
    { 
      structure: "They _____.", 
      pattern: ["they"], 
      translations: ["Они ______."], 
      examples: [
        "They live in Astana. (Они живут в Астане.)"
      ], 
      id: "they-positive", 
      hasName: true 
    },
    { 
      structure: "I do not _____.", 
      pattern: ["i", "do", "not"], 
      translations: ["Я не ______."], 
      examples: [
        "I do not play tennis. (Я не играю в теннис.)"
      ], 
      id: "i-negative", 
      hasName: true 
    },
    { 
      structure: "You do not _____.", 
      pattern: ["you", "do", "not"], 
      translations: ["Ты не ______."], 
      examples: [
        "You do not speak French. (Ты не говоришь по-французски.)"
      ], 
      id: "you-negative", 
      hasName: true 
    },
    { 
      structure: "We do not _____.", 
      pattern: ["we", "do", "not"], 
      translations: ["Мы не ______."], 
      examples: [
        "We do not live in London. (Мы не живём в Лондоне.)"
      ], 
      id: "we-negative", 
      hasName: true 
    },
    { 
      structure: "They do not _____.", 
      pattern: ["they", "do", "not"], 
      translations: ["Они не ______."], 
      examples: [
        "They do not play chess. (Они не играют в шахматы.)"
      ], 
      id: "they-negative", 
      hasName: true 
    },
    { 
      structure: "Do you ____?", 
      pattern: ["do", "you"], 
      translations: ["Ты ______?"], 
      examples: [
        "Do you live in Almaty? (Ты живёшь в Алматы?)"
      ], 
      id: "do-you-question", 
      hasName: false 
    },
    { 
      structure: "Do we ____?", 
      pattern: ["do", "we"], 
      translations: ["Мы ______?"], 
      examples: [
        "Do we speak English? (Мы говорим по-английски?)"
      ], 
      id: "do-we-question", 
      hasName: false 
    },
    { 
      structure: "Do they ____?", 
      pattern: ["do", "they"], 
      translations: ["Они ______?"], 
      examples: [
        "Do they play football? (Они играют в футбол?)"
      ], 
      id: "do-they-question", 
      hasName: false 
    }
  ],
  requiredCorrect: 10, // Общее количество правильных примеров на структуру
  parts: { // Разделение структур на части
    "i-positive": 1,
    "you-positive": 1,
    "we-positive": 1,
    "they-positive": 1,
    "i-negative": 2,
    "you-negative": 2,
    "we-negative": 2,
    "they-negative": 2,
    "do-you-question": 3,
    "do-we-question": 3,
    "do-they-question": 3
  },
  currentPart: 1, // Начальная часть урока
  validateStructure: function(text, structure, feedback) {
    const words = text.split(' ').filter(word => word.length > 0);
    let wordIndex = 0;

    // Проверяем существование глобальных переменных для вопросов и ответов
    if (!window.lastAskedVerb) window.lastAskedVerb = null;
    if (!window.lastAskedSubject) window.lastAskedSubject = null;

    // Доступ к usedNames через this (объект урока)
    let usedNames = this.usedNames || [];
    // Дополнительный сброс usedNames в начале валидации
    if (usedNames.length > 0 && this.usedNames.length !== 0) {
      this.usedNames.length = 0;
      usedNames = this.usedNames;
      console.log('usedNames reset at start of validation:', usedNames);
    }

    function normalizeWord(word) {
      word = word.toLowerCase();
      if (word === "don't") return ["do", "not"];
      return [word];
    }

    let normalizedWords = [];
    for (let word of words) {
      normalizedWords.push(...normalizeWord(word));
    }

    console.log(`Validating text: "${text}" for structure: "${structure ? structure.structure : 'answer'}"`);
    console.log('usedNames before validation:', usedNames);

    // Проверяем текущую часть урока
    if (structure && this.parts[structure.id] !== this.currentPart) {
      let message = '';
      if (this.currentPart === 1) {
        message = 'Сейчас нужно говорить примеры с I _____, We _____, You _____, They _____. Например: I live in London.';
      } else if (this.currentPart === 2) {
        message = 'Сейчас нужно говорить примеры с I do not _____, You do not _____, We do not _____, They do not _____. Например: I do not play tennis.';
      } else if (this.currentPart === 3) {
        message = 'Сейчас нужно задавать вопросы с Do you ____?, Do we ____?, Do they _____? Например: Do you live in Almaty?';
      }
      feedback.textContent = message;
      return false;
    }

    // Проверяем, является ли текст ответом на вопрос (Yes/No)
    if (!structure && window.lastAskedVerb && window.lastAskedSubject) {
      console.log('Checking Yes/No answer...');
      if (normalizedWords[0] === "yes") {
        if (normalizedWords.length < 3) {
          console.log("Answer too short for 'Yes' response");
          return false;
        }
        const expectedAnswer = `${window.lastAskedSubject} ${window.lastAskedVerb}`;
        const answerText = normalizedWords.slice(1).join(' ');
        console.log(`Expected answer: "${expectedAnswer}", Given answer: "${answerText}"`);
        if (!answerText.includes(window.lastAskedVerb) || !answerText.includes(window.lastAskedSubject)) {
          return false;
        }
        return true;
      } else if (normalizedWords[0] === "no") {
        if (normalizedWords.length < 4) {
          console.log("Answer too short for 'No' response");
          return false;
        }
        const expectedAnswer = `${window.lastAskedSubject} ${window.lastAskedVerb}`;
        const answerText = normalizedWords.slice(1).join(' ');
        console.log(`Expected answer: "${expectedAnswer}", Given answer: "${answerText}"`);
        if (!answerText.includes(window.lastAskedVerb) || !answerText.includes(window.lastAskedSubject)) {
          return false;
        }
        return true;
      }
      return false;
    }

    // Проверяем, соответствует ли текст шаблону структуры
    const pattern = structure.pattern;
    for (let part of pattern) {
      if (!normalizedWords[wordIndex] || normalizedWords[wordIndex] !== part) {
        console.log(`Mismatch at wordIndex ${wordIndex}: Expected "${part}", Got "${normalizedWords[wordIndex]}"`);
        return false;
      }
      wordIndex++;
    }

    // Дополнительные проверки в зависимости от части
    if (this.currentPart === 1) {
      // Часть 1: Проверяем наличие глагола в настоящем времени
      const remainingWords = normalizedWords.slice(wordIndex);
      if (remainingWords.length < 1) return false; // Должен быть хотя бы глагол
      const verb = remainingWords[0];
      // Простая проверка: глагол должен быть в настоящем времени (не заканчиваться на "ed", не "did")
      if (verb.endsWith('ed') || verb === 'did') {
        feedback.textContent = 'Используйте глагол в настоящем времени. Например: I live in London.';
        return false;
      }
    } else if (this.currentPart === 2) {
      // Часть 2: Проверяем наличие отрицания (уже проверено через pattern: ["i", "do", "not"])
      const remainingWords = normalizedWords.slice(wordIndex);
      if (remainingWords.length < 1) return false; // Должен быть хотя бы глагол после "do not"
    } else if (this.currentPart === 3) {
      // Часть 3: Проверяем вопросительную форму (уже проверено через pattern: ["do", "you/we/they"])
      const remainingWords = normalizedWords.slice(wordIndex);
      if (remainingWords.length < 1) return false; // Должен быть хотя бы глагол после "do you/we/they"
    }

    // Для структур с hasName: true проверяем уникальность
    if (structure.hasName) {
      const remainingWords = normalizedWords.slice(wordIndex).join(' ');
      if (!remainingWords) return false; // Должно быть хотя бы одно слово после шаблона
      if (usedNames.includes(remainingWords)) {
        console.log(`Duplicate found: "${remainingWords}"`);
        return false; // Уже использовали этот пример
      }
      usedNames.push(remainingWords);
      this.usedNames = usedNames;
      console.log('usedNames after adding:', usedNames);
      return true;
    }

    // Для вопросов (hasName: false) проверяем, что текст заканчивается после шаблона
    if (!structure.hasName) {
      if (wordIndex >= normalizedWords.length) return false; // Должно быть хотя бы одно слово после шаблона
      if (structure.id.startsWith('do-')) {
        // Сохраняем глагол и субъект для ответа
        const verbAndObject = normalizedWords.slice(wordIndex).join(' ');
        window.lastAskedVerb = verbAndObject.split(' ')[0]; // Первый глагол после "do you/we/they"
        window.lastAskedSubject = structure.pattern[1]; // "you", "we", "they"
        console.log(`Saved lastAskedVerb: "${window.lastAskedVerb}", lastAskedSubject: "${window.lastAskedSubject}"`);
      }
      return true;
    }

    return false;
  },
  onProgressUpdate: function(progress) {
    // Проверяем прогресс текущей части
    const partStructures = Object.keys(this.parts).filter(id => this.parts[id] === this.currentPart);
    const allStructuresCompleted = partStructures.every(id => progress[id] >= this.requiredCorrect);
    
    if (allStructuresCompleted) {
      if (this.currentPart < 3) {
        this.currentPart++;
        console.log(`Переходим к части ${this.currentPart}`);
      }
    }
  }
});
