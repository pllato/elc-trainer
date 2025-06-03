addLesson({
  level: "beginner1",
  lesson: "lesson4",
  name: "Урок 4",
  structures: [
    { structure: "Where are you from? I am from _______.", pattern: ["i", "am", "from", "place"], id: "where-are-you-from", hasName: true },
    { structure: "Where is he from? He is from ________.", pattern: ["he", "is", "from", "place"], id: "where-is-he-from", hasName: true },
    { structure: "Where is she from? She is from _______.", pattern: ["she", "is", "from", "place"], id: "where-is-she-from", hasName: true }
  ],
  requiredCorrect: 2, // 2 correct examples per structure
  validateStructure: function(text, structure) {
    const words = text.split(' ').filter(word => word.length > 0);
    const pattern = structure.pattern;
    let wordIndex = 0;

    for (let part of pattern) {
      if (part === 'place') {
        if (!words[wordIndex]) return false; // Must have a word for place
        wordIndex++;
      } else {
        if (!words[wordIndex] || words[wordIndex] !== part) return false;
        wordIndex++;
      }
    }
    return wordIndex === words.length; // Ensure no extra words
  }
});