const lessonsData = [];

// Declare recognition globally to avoid re-declaration
let recognition = null;

// Function to add lesson data
function addLesson(lesson) {
  lessonsData.push(lesson);
  console.log('Lesson added:', lesson.name, 'Total lessons:', lessonsData.length);
}

// Function to populate lesson select dropdown
function populateLessonSelect() {
  const lessonSelect = document.getElementById('lesson-select');
  if (!lessonSelect) {
    console.error('Lesson select element not found, retrying in 1s');
    setTimeout(populateLessonSelect, 1000); // Retry after 1 second
    return;
  }
  lessonSelect.innerHTML = '<option value="">Выберите урок</option>';

  // Sort lessons by level and lesson number
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

    const loadPromises = files
      .filter(file => file.name.endsWith('.js'))
      .map(file => {
        console.log('Processing file:', file.name);
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = file.download_url;
          script.onload = () => {
            console.log(`Loaded file: ${file.name}`);
            resolve();
          };
          script.onerror = () => {
            console.error(`Error loading file: ${file.name}`);
            reject(new Error(`Failed to load ${file.name}`));
          };
          document.head.appendChild(script);
        });
      });

    // Wait for all scripts to load
    await Promise.allSettled(loadPromises);
    console.log('Lessons loaded from GitHub:', lessonsData);
    populateLessonSelect();
  } catch (error) {
    console.error('Error fetching lessons:', error);
    // Fallback: populate with any lessons already in lessonsData
    if (lessonsData.length > 0) {
      populateLessonSelect();
    }
  }
}

// Reset lesson state when starting a new lesson
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

  // Only increment if under requiredCorrect
  if (isCorrect && window.userProgress[structureId] < requiredCorrect) {
    window.userProgress[structureId]++;
    console.log(`Updated progress for ${structureId}: ${window.userProgress[structureId]}/${requiredCorrect}`);
  } else if (isCorrect) {
    console.log(`Excess answer for ${structureId}, not counted: ${window.userProgress[structureId]}/${requiredCorrect}`);
  }

  // Update individual progress bar
  const progressBar = document.querySelector(`#progress-bars [data-structure="${structureId}"] .progress`);
  if (progressBar) {
    const percentage = (window.userProgress[structureId] / requiredCorrect) * 100;
    progressBar.style.width = `${Math.min(percentage, 100)}%`;
    console.log(`Structure: ${structureId}, Total Correct: ${window.userProgress[structureId]}, Percentage: ${percentage}%`);
  } else {
    console.log(`Progress bar not found for ${structureId}`);
  }

  // Update overall progress
  updateOverallProgress(lessonId);
}

// Update overall progress for the lesson
function updateOverallProgress(lessonId) {
  const lesson = lessonsData.find(l => l.lesson === lessonId);
  if (!lesson) {
    console.log(`Lesson ${lessonId} not found`);
    return;
  }

  const totalRequired = lesson.structures.length * lesson.requiredCorrect;
  let totalCorrect = 0;

  // Sum up correct answers, capping at requiredCorrect per structure
  lesson.structures.forEach(structure => {
    const count = window.userProgress[structure.id] || 0;
    totalCorrect += Math.min(count, lesson.requiredCorrect);
    console.log(`Structure ${structure.id}: ${Math.min(count, lesson.requiredCorrect)}/${lesson.requiredCorrect}`);
  });

  // Update overall progress bar
  const overallProgressBar = document.querySelector('#overall-progress-bar .progress');
  if (overallProgressBar) {
    const percentage = (totalCorrect / totalRequired) * 100;
    overallProgressBar.style.width = `${Math.min(percentage, 100)}%`;
    console.log(`Overall progress: ${totalCorrect}/${totalRequired}, Percentage: ${percentage}%`);
  } else {
    console.log('Overall progress bar not found');
  }

  // Update progress text
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
    // Assume UI updates here (e.g., show practice screen)
  }
}

// SpeechRecognition handler
function startRecognition() {
  if (recognition && recognition.state === 'listening') {
    console.log('Recognition already active');
    return;
  }
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.onresult = function(event) {
    let text = event.results[0][0].transcript;
    // Clean up speech input
    text = text.replace(/[^a-zA-Z0-9\s]/g, '').trim();
    console.log('Speech recognized:', text);
    validateInput(text);
  };
  recognition.onerror = function(event) {
    console.log('Speech recognition error:', event.error);
  };
  recognition.onend = function() {
    console.log('Speech recognition ended');
    recognition = null;
  };
  recognition.start();
}

// Validate input against lesson structures
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

// Start fetching lessons when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  fetchLessons();
});
