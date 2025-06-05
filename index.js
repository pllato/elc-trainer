const lessonsData = [];

// Function to add lesson data
function addLesson(lesson) {
  lessonsData.push(lesson);
  console.log('Lesson added:', lesson.name, 'Total lessons:', lessonsData.length);
}

// Function to populate lesson select dropdown
function populateLessonSelect() {
  const lessonSelect = document.getElementById('lesson-select');
  lessonSelect.innerHTML = '<option value="">Выберите урок</option>';

  // Sort lessons by level and lesson number
  lessonsData.sort((a, b) => {
    if (a.level === b.level) {
      return parseInt(a.lesson.replace('lesson', '')) - parseInt(b.lesson.replace('lesson', ''));
    }
    return a.level.localeCompare(b.level);
  });

  lessonsData.forEach(lesson => {
    const option = document.createElement('option');
    option.value = lesson.lesson;
    option.textContent = lesson.name;
    lessonSelect.appendChild(option);
  });
}

// Placeholder for progress tracking
function updateProgress(structureId, isCorrect) {
  // Assume userProgress is an object tracking correct answers per structure
  if (!window.userProgress) window.userProgress = {};
  if (!window.userProgress[structureId]) window.userProgress[structureId] = 0;

  if (isCorrect && window.userProgress[structureId] < 10) {
    window.userProgress[structureId]++;
  }

  // Update individual progress bar
  const progressBar = document.querySelector(`#progress-bars [data-structure="${structureId}"] .progress`);
  if (progressBar) {
    progressBar.style.width = `${(window.userProgress[structureId] / 10) * 100}%`;
  }

  // Update overall progress
  updateOverallProgress();
}

function updateOverallProgress() {
  const totalRequired = lessonsData.find(l => l.lesson === currentLesson).structures.length * 10;
  let totalCorrect = 0;

  Object.values(window.userProgress).forEach(count => {
    totalCorrect += Math.min(count, 10); // Cap at 10 per structure
  });

  const overallProgressBar = document.querySelector('#overall-progress-bar .progress');
  if (overallProgressBar) {
    overallProgressBar.style.width = `${(totalCorrect / totalRequired) * 100}%`;
  }

  const progressText = document.querySelector('#overall-progress-bar .text-sm');
  if (progressText) {
    progressText.textContent = `Прогресс: ${totalCorrect}/${totalRequired}`;
  }
}

// Call populateLessonSelect when DOM is loaded
document.addEventListener('DOMContentLoaded', populateLessonSelect);
