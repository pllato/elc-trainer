addLesson({
  level: "beginner2",
  lesson: "lesson26",
  name: "Урок 26: Wh-вопросы и ответы в Past Simple",
  structures: [
    {
      structure: "Where/What/When/Why did I/you/he/she/it/we/they _______?",
      pattern: [],
      translations: ["Где/Что/Когда/Почему я/ты/мы/вы/он/она/оно _______?"],
      examples: [
        "Where did you go? (Куда ты ходил?)",
        "What did she eat? (Что она ела?)",
        "When did they play? (Когда они играли?)",
        "Why did he run? (Почему он бежал?)",
        "What did you do? (Что ты делал?)"
      ],
      id: "wh-did-pronoun-verb",
      hasVerb: true,
      hasName: false
    },
    {
      structure: "I/you/he/she/it/we/they _______ed _______.",
      pattern: [],
      translations: ["Я/ты/мы/вы/он/она/оно _______ _______."],
      examples: [
        "I went to school. (Я ходил в школу.)",
        "She ate an apple. (Она съела яблоко.)",
        "They played football. (Они играли в футбол.)",
        "I ate at home. (Я ел дома.)",
        "She cooked yesterday. (Она готовила вчера.)"
      ],
      id: "pronoun-verbed-object",
      hasVerb: true,
      hasName: false
    }
  ],
  requiredCorrect: 10,
  irregularVerbs: {
    "arise": "arose", "awake": "awoke", "be": "was", "bear": "bore", "beat": "beat",
    "become": "became", "begin": "began", "bend": "bent", "bet": "bet", "bind": "bound",
    "bite": "bit", "bleed": "bled", "blow": "blew", "break": "broke", "bring": "brought",
    "build": "built", "burn": "burnt", "burst": "burst", "buy": "bought", "catch": "caught",
    "choose": "chose", "cling": "clung", "come": "came", "cost": "cost", "creep": "crept",
    "cut": "cut", "deal": "dealt", "dig": "dug", "dive": "dove", "do": "did",
    "draw": "drew", "dream": "dreamt", "drink": "drank", "drive": "drove", "eat": "ate",
    "fall": "fell", "feed": "fed", "feel": "felt", "fight": "fought", "find": "found",
    "flee": "fled", "fly": "flew", "forbid": "forbade", "forget": "forgot", "forgive": "forgave",
    "freeze": "froze", "get": "got", "give": "gave", "go": "went", "grind": "ground",
    "grow": "grew", "hang": "hung", "have": "had", "hear": "heard", "hide": "hid",
    "hit": "hit", "hold": "held", "hurt": "hurt", "keep": "kept", "kneel": "knelt",
    "know": "knew", "lay": "laid", "lead": "led", "lean": "leant", "leap": "leapt",
    "learn": "learnt", "leave": "left", "lend": "lent", "let": "let", "lie": "lay",
    "light": "lit", "lose": "lost", "make": "made", "mean": "meant", "meet": "met",
    "mow": "mowed", "pay": "paid", "put": "put", "quit": "quit", "read": "read",
    "ride": "rode", "ring": "rang", "rise": "rose", "run": "ran", "say": "said",
    "see": "saw", "seek": "sought", "sell": "sold", "send": "sent", "set": "set",
    "shake": "shook", "shine": "shone", "shoot": "shot", "show": "showed", "shrink": "shrank",
    "shut": "shut", "sing": "sang", "sink": "sank", "sit": "sat", "sleep": "slept",
    "slide": "slid", "smell": "smelt", "speak": "spoke", "speed": "sped", "spell": "spelt",
    "spend": "spent", "spill": "spilt", "spin": "spun", "spit": "spat", "split": "split",
    "spoil": "spoilt", "spread": "spread", "spring": "sprang", "stand": "stood", "steal": "stole",
    "stick": "stuck", "sting": "stung", "stink": "stank", "strike": "struck", "strive": "strove",
    "swear": "swore", "sweep": "swept", "swim": "swam", "swing": "swung", "take": "took",
    "teach": "taught", "tear": "tore", "tell": "told", "think": "thought", "throw": "threw",
    "tread": "trod", "understand": "understood", "undo": "undid", "upset": "upset", "wake": "woke",
    "wear": "wore", "weave": "wove", "weep": "wept", "win": "won", "wind": "wound",
    "withdraw": "withdrew", "write": "wrote"
  },
  validateStructure: function(text, structure) {
    console.log('ValidateStructure called with text:', text, 'structure:', structure.id);
    const cleanedText = text.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase().trim();
    console.log('Cleaned text:', cleanedText);

    const words = cleanedText.split(/\s+/).filter(word => word.length > 0);
    console.log('Split words:', words);

    if (words.length === 0) {
      console.log('Empty input');
      return false;
    }

    // Initialize spokenHistory
    if (!window.spokenHistory) {
      window.spokenHistory = [];
      console.log('Initialized spokenHistory');
    }

    // Check for duplicates
    if (window.spokenHistory.includes(cleanedText)) {
      console.log('Duplicate phrase:', cleanedText);
      return false;
    }

    let wordIndex = 0;
    const validPronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they'];
    const forbiddenWords = ['will', 'can', 'should', 'could', 'would', 'must', 'may', 'might', 'shall', 'ought'];

    if (structure.id === "wh-did-pronoun-verb") {
      console.log('Checking wh-did-pronoun-verb structure');
      // Check wh-word
      if (!['where', 'what', 'when', 'why'].includes(words[wordIndex])) {
        console.log('Expected wh-word at index', wordIndex, 'got', words[wordIndex] || 'undefined');
        return false;
      }
      wordIndex++;

      // Check "did"
      if (words[wordIndex] !== 'did') {
        console.log('Expected "did" at index', wordIndex, 'got', words[wordIndex] || 'undefined');
        return false;
      }
      wordIndex++;

      // Check pronoun
      if (!validPronouns.includes(words[wordIndex])) {
        console.log('Expected pronoun at index', wordIndex, 'got', words[wordIndex] || 'undefined');
        return false;
      }
      wordIndex++;

      // Check verb
      if (!words[wordIndex]) {
        console.log('No verb at index', wordIndex);
        return false;
      }
      const verb = words[wordIndex];
      if (verb.endsWith('ing') || verb.endsWith('es') || verb.endsWith('ed') || (verb.endsWith('s') && verb !== 'pass')) {
        console.log('Invalid verb form:', verb);
        return false;
      }
      if (Object.values(this.irregularVerbs).includes(verb)) {
        console.log('Past Simple form not allowed in question:', verb);
        return false;
      }
      if (['be', 'have', 'do'].includes(verb)) {
        console.log('Auxiliary verb not allowed:', verb);
        return false;
      }
      wordIndex++;

      // No extra words
      if (wordIndex < words.length) {
        console.log('Extra words:', words.slice(wordIndex));
        return false;
      }
    } else if (structure.id === "pronoun-verbed-object") {
      console.log('Checking pronoun-verbed-object structure');
      // Check pronoun
      if (!validPronouns.includes(words[wordIndex])) {
        console.log('Expected pronoun at index', wordIndex, 'got', words[wordIndex] || 'undefined');
        return false;
      }
      wordIndex++;

      // Check verb
      if (!words[wordIndex]) {
        console.log('No verb at index', wordIndex);
        return false;
      }
      const verb = words[wordIndex];
      const isRegular = verb.endsWith('ed');
      const isIrregular = Object.values(this.irregularVerbs).includes(verb);
      if (!isRegular && !isIrregular) {
        console.log('Verb not in Past Simple:', verb);
        return false;
      }
      let baseVerb = verb;
      if (isRegular) {
        baseVerb = verb.replace(/ed$/, '');
        if (baseVerb.endsWith('i')) baseVerb += 'y';
        else if (baseVerb.endsWith('pp') || baseVerb.endsWith('rr')) baseVerb = baseVerb.slice(0, -1);
      } else {
        baseVerb = Object.keys(this.irregularVerbs).find(key => this.irregularVerbs[key] === verb);
      }
      if (!baseVerb || ['be', 'have', 'do'].includes(baseVerb)) {
        console.log('Invalid base verb:', baseVerb || verb);
        return false;
      }
      wordIndex++;

      // Check complement
      if (wordIndex >= words.length) {
        console.log('No complement after verb');
        return false;
      }
      const complement = words.slice(wordIndex);
      for (const word of complement) {
        if (forbiddenWords.includes(word)) {
          console.log('Forbidden word in complement:', word);
          return false;
        }
      }
    } else {
      console.log('Unknown structure:', structure.id);
      return false;
    }

    window.spokenHistory.push(cleanedText);
    console.log('Phrase added to history:', cleanedText);
    console.log('Validation passed for:', text, 'structure:', structure.id);
    return true;
  }
});