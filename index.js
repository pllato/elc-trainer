const lessonsData = [];
let isFetchingLessons = false;
let lastValidatedText = null;
let lastValidatedTime = 0;

// Initialize global capped progress
window.cappedProgress = {};
window.totalProgress = 0;

// Function to add lesson data
function addLesson(lesson) {
  if (!lessonsData.some(existing => existing.lesson === lesson.lesson && existing.level === lesson.level)) {
    lessonsData.push(lesson);
    console.log('Lesson added:', lesson.name, 'Total lessons:', lessonsData.length);
  } else {
    console.log('Duplicate lesson skipped:', lesson.name);
  }
}

// Function to populate lesson select dropdown
function populateLessonSelect(attempt = 1, maxAttempts = 20) {
  const levelLessonScreen = document.getElementById('level-lesson-screen');
  if (levelLessonScreen && levelLessonScreen.style.display === 'none') {
    console.log('Level-lesson screen is hidden, skipping populateLessonSelect');
    return;
  }

  const lessonSelect = document.getElementById('lesson-select');
  if (!lessonSelect) {
    if (attempt < maxAttempts) {
      console.warn(`Lesson select element not found, retrying in 1s (attempt ${attempt}/${maxAttempts})`);
      console.log('Current DOM state:', document.body ? document.body.innerHTML.substring(0, 200) : 'No body');
      setTimeout(() => populateLessonSelect(attempt + 1, maxAttempts), 1000);
    } else {
      console.error('Lesson select element not found after max attempts');
    }
    return;
  }
  lessonSelect.innerHTML = '<option value="">Выберите урок</option>';

  lessonsData.sort((a, b) => {
    if (a.level === b.level) {
      const lessonA = parseInt(a.lesson.replace('lesson', '')) || 0;
      const lessonB = parseInt(b.lesson.replace('lesson', '')) || 0;
      return lessonA - lessonB;
    }
    return a.level.localeCompare(b.level);
  });

  lessonsData.forEach(lesson => {
    const option = document.createElement('option');
    option.value = lesson.lesson;
    option.textContent = lesson.name;
    lessonSelect.appendChild(option);
  });
  console.log('Lesson select populated with', lessonsData.length, 'lessons');
}

// Fetch lessons from GitHub API
async function fetchLessons() {
  if (isFetchingLessons) {
    console.log('fetchLessons already running, skipping');
    return;
  }
  isFetchingLessons = true;
  const url = 'https://api.github.com/repos/pllato/elc-trainer/contents/lessons';
  console.log('Starting to fetch lessons from:', url);
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const files = await response.json();
    console.log('Files fetched from GitHub:', files.length, 'files');

    for (const file of files.filter(f => f.name.endsWith('.js'))) {
      console.log('Processing file:', file.name);
      try {
        const fileResponse = await fetch(file.download_url);
        if (!fileResponse.ok) {
          throw new Error(`Failed to fetch ${file.name}`);
        }
        const content = await fileResponse.text();
        eval(content);
        console.log('Loaded file:', file.name);
      } catch (error) {
        console.error('Error loading file:', file.name, error);
      }
    }

    console.log('Lessons loaded from GitHub:', lessonsData.length, 'lessons');
    setTimeout(() => populateLessonSelect(), 90000); // Increased delay
  } catch (error) {
    console.error('Error loading lessons:', error);
    if (lessonsData.length > 0) {
      populateLessonSelect();
    }
  } finally {
    isFetchingLessons = false;
  }
}

// Reset lesson state
function resetLessonState() {
  window.lessonStarted = false;
  window.usedVerbs = [];
  window.userProgress = {};
  window.cappedProgress = {};
  window.totalProgress = 0; // Reset total progress
  lastValidatedText = null;
  lastValidatedTime = 0;
  console.log('Lesson state reset');
  updateOverallProgress(null); // Reset overall progress bar
}

// Update progress for a specific structure
function updateProgress(structureId, isCorrect, lessonId) {
  if (!window.userProgress) window.userProgress = {};
  if (!window.cappedProgress) window.cappedProgress = {};
  if (!window.userProgress[structureId]) window.userProgress[structureId] = 0;
  if (!window.cappedProgress[structureId]) window.cappedProgress[structureId] = 0;

  const lesson = lessonsData.find(l => l.lesson === lessonId);
  const requiredCorrect = lesson ? lesson.requiredCorrect : 10;

  console.log(`Before update: ${structureId}, Current progress: ${window.userProgress[structureId]}/${requiredCorrect}`);

  if (isCorrect && window.userProgress[structureId] < requiredCorrect) {
    window.userProgress[structureId]++;
    window.cappedProgress[structureId] = Math.min(window.userProgress[structureId], requiredCorrect);
    console.log(`Updated progress for ${structureId}: ${window.userProgress[structureId]}/${requiredCorrect}, Capped: ${window.cappedProgress[structureId]}`);
    // Update individual progress bar
    const progressBar = document.querySelector(`#progress-bars [data-structure="${structureId}"] .progress`);
    if (progressBar) {
      const percentage = (window.cappedProgress[structureId] / requiredCorrect) * 100;
      progressBar.style.width = `${Math.min(percentage, 100)}%`;
      console.log(`Structure: ${structureId}, Total Correct: ${window.cappedProgress[structureId]}, Percentage: ${percentage}%`);
    } else {
      console.log(`Progress bar not found for ${structureId}`);
    }
    updateOverallProgress(lessonId);
  } else if (isCorrect) {
    console.log(`Excess answer for ${structureId}, not counted: ${window.userProgress[structureId]}/${requiredCorrect}, Capped: ${window.cappedProgress[structureId]}`);
    return; // Early return to prevent further processing
  }
}

// Update overall progress with retry mechanism
function updateOverallProgress(lessonId, attempt = 1, maxAttempts = 10) {
  if (!lessonId) {
    // Reset progress bar when lessonId is null (e.g., during reset)
    const overallProgressBar = document.querySelector('#overall-progress-bar .progress');
    if (overallProgressBar) {
      overallProgressBar.style.width = '0%';
      console.log('Overall progress bar reset: width=0%');
    }
    const progressText = document.querySelector('#overall-progress-bar .text-sm');
    if (progressText) {
      progressText.textContent = `Прогресс: 0/0`;
      console.log('Progress text reset: Прогресс: 0/0');
    }
    return;
  }

  const lesson = lessonsData.find(l => l.lesson === lessonId);
  if (!lesson) {
    console.log(`Lesson ${lessonId} not found`);
    return;
  }

  const totalRequired = lesson.structures.length * lesson.requiredCorrect;
  let totalCorrect = 0;

  // Calculate total progress based on capped contributions
  lesson.structures.forEach(structure => {
    const cappedCount = window.cappedProgress[structure.id] || 0;
    totalCorrect += cappedCount;
    console.log(`Structure ${structure.id}: ${cappedCount}/${lesson.requiredCorrect}, Contributes: ${cappedCount} to total`);
  });

  // Update global total progress
  window.totalProgress = Math.min(totalCorrect, totalRequired);
  console.log(`Total progress: ${window.totalProgress}/${totalRequired}`);

  const overallProgressBar = document.querySelector('#overall-progress-bar .progress');
  if (!overallProgressBar) {
    if (attempt < maxAttempts) {
      console.warn(`Overall progress bar not found, retrying in 1s (attempt ${attempt}/${maxAttempts})`);
      setTimeout(() => updateOverallProgress(lessonId, attempt + 1, maxAttempts), 1000);
    } else {
      console.error('Overall progress bar not found after max attempts');
    }
    return;
  }

  const percentage = (window.totalProgress / totalRequired) * 100;
  overallProgressBar.style.width = `${percentage}%`;
  console.log(`Overall progress: ${window.totalProgress}/${totalRequired}, Percentage: ${percentage}%`);
  console.log(`Overall progress bar style: width=${overallProgressBar.style.width}`);

  const progressText = document.querySelector('#overall-progress-bar .text-sm');
  if (progressText) {
    progressText.textContent = `Прогресс: ${window.totalProgress}/${totalRequired}`;
    console.log(`Progress text updated: ${progressText.textContent}`);
  } else {
    console.log('Progress text element not found');
  }
}

// Handle lesson selection
function selectLesson(lessonId) {
  resetLessonState();
  const lesson = lessonsData.find(l => l.lesson === lessonId);
  if (lesson) {
    console.log(`Selected lesson: ${lesson.name}`);
  }
}

// SpeechRecognition handler
function startRecognition() {
  if (window.recognition && window.recognition.state === 'listening') {
    console.log('Recognition already active');
    return;
  }
  window.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  window.recognition.lang = 'en-US';
  window.recognition.onresult = function(event) {
    let text = event.results[0][0].transcript;
    text = text.replace(/[^a-zA-Z0-9\s]/g, '').trim();
    console.log('Speech recognized:', text);
    const now = Date.now();
    if (text !== lastValidatedText || now - lastValidatedTime > 7000) {
      validateInput(text);
      lastValidatedText = text;
      lastValidatedTime = now;
    } else {
      console.log('Duplicate input skipped:', text);
    }
  };
  window.recognition.onerror = function(event) {
    console.log('Speech recognition error:', event.error);
    window.recognition = null;
  };
  window.recognition.onend = function() {
    console.log('Speech recognition ended');
    window.recognition = null;
    // Delay before restarting to prevent InvalidStateError
    setTimeout(() => {
      if (!window.recognition || window.recognition.state !== 'listening') {
        startRecognition();
      }
    }, 1000);
  };
  try {
    window.recognition.start();
  } catch (error) {
    console.error('Speech recognition start error:', error);
  }
}

// Validate input
function validateInput(text, lessonId = 'lesson13') {
  const lesson = lessonsData.find(l => l.lesson === lessonId);
  if (!lesson) {
    console.log(`Lesson ${lessonId} not found`);
    return;
  }

  let isCorrect = false;
  let currentStructure;
  for (const structure of lesson.structures) {
    if (lesson.validateStructure(text, structure)) {
      isCorrect = true;
      currentStructure = structure;
      break;
    }
  }

  console.log(`Validation result for "${text}": ${isCorrect ? 'Correct' : 'Incorrect'}`);
  if (isCorrect) {
    updateProgress(currentStructure.id, true, lessonId);
  }
}

// Start fetching lessons
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, starting fetchLessons');
  fetchLessons();
}, { once: true });
