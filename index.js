const lessonsData = [];

// Function to add lesson data
function addLesson(lesson) {
  lessonsData.push(lesson);
  console.log('Lesson added:', lesson.name, 'Total lessons:', lessonsData.length);
}

// Function to populate lesson select dropdown
function populateLessonSelect(attempt = 1, maxAttempts = 10) {
  const lessonSelect = document.getElementById('lesson-select');
  if (!lessonSelect) {
    if (attempt < maxAttempts) {
      console.warn(`Lesson select element not found, retrying in 1s (attempt ${attempt}/${maxAttempts})`);
      setTimeout(() => populateLessonSelect(attempt + 1, maxAttempts), 1000);
    } else {
      console.error('Lesson select element not found after max attempts');
      alert('Ошибка: не удалось загрузить список уроков. Проверьте подключение или обновите страницу.');
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
    console.log('Files fetched from GitHub:', files);

    for (const file of files.filter(f => f.name.endsWith('.js'))) {
      console.log('Processing file:', file.name);
      try {
        const fileResponse = await fetch(file.download_url);
        if (!fileResponse.ok) {
          throw new Error(`Failed to fetch ${file.name}`);
        }
        const content = await fileResponse.text();
        eval(content); // Execute lesson code
        console.log(`Loaded file: ${file.name}`);
      } catch (error) {
        console.error(`Error loading file ${file.name}:`, error);
      }
    }

    console.log('Lessons loaded from GitHub:', lessonsData);
    // Delay to ensure lessons are processed
    setTimeout(() => populateLessonSelect(), 500);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    if (lessonsData.length > 0) {
      populateLessonSelect();
    } else {
      alert('Ошибка загрузки уроков. Проверьте подключение или попробуйте позже.');
    }
  }
}

// Reset lesson state
function resetLessonState() {
  window.lessonStarted = false;
  window.usedVerbs = [];
  window.userProgress = {};
  console.log('Lesson state reset');
}

// Update progress for a specific structure
function updateProgress(structureId, isCorrect, lessonId) {
  if (!window.userProgress) window.userProgress = {};
  if (!window.userProgress[structureId]) window.userProgress[structureId] = 0;

  const lesson = lessonsData.find(l => l.lesson === lessonId);
  const requiredCorrect = lesson ? lesson.requiredCorrect : 10;

  if (isCorrect && window.userProgress[structureId] < requiredCorrect) {
    window.userProgress[structureId]++;
    console.log(`Updated progress for ${structureId}: ${window.userProgress[structureId]}/${requiredCorrect}`);
  } else if (isCorrect) {
    console.log(`Excess answer for ${structureId}, not counted: ${window.userProgress[structureId]}/${requiredCorrect}`);
  }

  const progressBar = document.querySelector(`#progress-bars [data-structure="${structureId}"] .progress`);
  if (progressBar) {
    const percentage = (window.userProgress[structureId] / requiredCorrect) * 100;
    progressBar.style.width = `${Math.min(percentage, 100)}%`;
    console.log(`Structure: ${structureId}, Total Correct: ${window.userProgress[structureId]}, Percentage: ${percentage}%`);
  } else {
    console.log(`Progress bar not found for ${structureId}`);
  }

  updateOverallProgress(lessonId);
}

// Update overall progress
function updateOverallProgress(lessonId) {
  const lesson = lessonsData.find(l => l.lesson === lessonId);
  if (!lesson) {
    console.log(`Lesson ${lessonId} not found`);
    return;
  }

  const totalRequired = lesson.structures.length * lesson.requiredCorrect;
  let totalCorrect = 0;

  lesson.structures.forEach(structure => {
    const count = window.userProgress[structure.id] || 0;
    totalCorrect += Math.min(count, lesson.requiredCorrect);
    console.log(`Structure ${structure.id}: ${Math.min(count, lesson.requiredCorrect)}/${lesson.requiredCorrect}`);
  });

  const overallProgressBar = document.querySelector('#overall-progress-bar .progress');
  if (overallProgressBar) {
    const percentage = (totalCorrect / totalRequired) * 100;
    overallProgressBar.style.width = `${Math.min(percentage, 100)}%`;
    console.log(`Overall progress: ${totalCorrect}/${totalRequired}, Percentage: ${percentage}%`);
  } else {
    console.log('Overall progress bar not found');
  }

  const progressText = document.querySelector('#overall-progress-bar .text-sm');
  if (progressText) {
    progressText.textContent = `Прогресс: ${totalCorrect}/${totalRequired}`;
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
    validateInput(text);
  };
  window.recognition.onerror = function(event) {
    console.log('Speech recognition error:', event.error);
  };
  window.recognition.onend = function() {
    console.log('Speech recognition ended');
    window.recognition = null;
  };
  window.recognition.start();
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
});
