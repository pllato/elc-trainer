let lessonsData = []; // Массив для хранения данных об уроков

// Определяем функцию addLesson для добавления уроков в lessonsData
function addLesson(lesson) {
  // Добавляем свойство usedNames для каждого урока
  lesson.usedNames = [];
  lessonsData.push(lesson);
  console.log(`Adding lesson: ${lesson.name} for level ${lesson.level}`);
}

const encouragementMessages = [
  "Ты большой молодец! 🌟 Отличная работа, ты справился с уроком на ура! Ты уже говоришь на английском как носитель! 💪",
  "Молодец, ты справился блестяще! 🎉 Урок пройден, ты на высоте! Ты уже владеешь английским как настоящий профи! ✨",
  "Ух, как здорово! 🌟 Ты прошёл урок с лёгкостью! Ты уже говоришь на английском как носитель, это потрясающе! 💪",
  "Ты настоящий чемпион! 🏆 Урок завершён, ты большой молодец! Ты уже разговариваешь как носитель английского! 🌟",
  "Превосходно! 🎉 Ты справился с уроком на все 100%! Ты уже общаешься на английском как носитель, это невероятно! 💪",
  "Вау, ты супер! 🌟 Урок пройден, и ты уже говоришь как носитель английского! Продолжай в том же духе! 🚀",
  "Отлично сработано! 🎉 Ты завершил урок, и твой английский звучит как у носителя! Ты звезда! ⭐",
  "Как круто! 🌟 Ты прошёл урок, и твой английский уже на уровне носителя! Горжусь тобой! 💖",
  "Ты справился на ура! 🏆 Урок завершён, и ты уже общаетесь как носитель! Это фантастика! 🎈",
  "Супер, ты сделал это! 🌟 Урок пройден, и ты уже говоришь как носитель английского! Ты молодец! 💪"
];

// Проверка поддержки SpeechRecognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
  alert("Ваш браузер не поддерживает SpeechRecognition API. Пожалуйста, используйте современный браузер, например, Google Chrome.");
}

// Инициализация распознавания речи
const recognition = SpeechRecognition ? new SpeechRecognition() : null;
if (recognition) {
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.continuous = true;
}

let userName = '';
let userLevel = '';
let userLesson = '';
let progress = {};
let spokenHistory = [];
let logEntries = [];
let isListening = false;
let lastSpeechTime = Date.now();
let startTime = null;
let endTime = null;
let lessonCompleted = false;
let currentLessonData = null;
let currentPart = 1;

// Конфигурация GitHub
const GITHUB_OWNER = 'pllato';
const GITHUB_REPO = 'elc-trainer';
const GITHUB_PATH = 'lessons';

// Фиксированный пароль для админки
const ADMIN_PASSWORD = 'admin123';

// Элементы DOM
const startScreen = document.getElementById('start-screen');
const practiceScreen = document.getElementById('practice-screen');
const adminScreen = document.getElementById('admin-screen');
const startBtn = document.getElementById('start-btn');
const adminBtn = document.getElementById('admin-btn');
const startPracticeBtn = document.getElementById('start-practice-btn');
const restartListeningBtn = document.getElementById('restart-listening-btn');
const feedback = document.getElementById('feedback');
const startFeedback = document.getElementById('start-feedback');
const adminFeedback = document.getElementById('admin-feedback');
const statsDiv = document.getElementById('stats');
const progressBars = document.getElementById('progress-bars');
const logDiv = document.getElementById('log');
const userNameEl = document.getElementById('user-name');
const userLevelEl = document.getElementById('user-level');
const userLessonEl = document.getElementById('user-lesson');
const completionModal = document.getElementById('completionModal');
const congratulationsEl = document.getElementById('congratulations');
const modalLog = document.getElementById('modal-log');
const levelSelect = document.getElementById('level');
const lessonSelect = document.getElementById('lesson');
const lessonFileInput = document.getElementById('lesson-file');
const uploadLessonBtn = document.getElementById('upload-lesson-btn');
const githubTokenInput = document.getElementById('github-token');
const indexHtmlFileInput = document.getElementById('index-html-file');
const uploadIndexHtmlBtn = document.getElementById('upload-index-html-btn');
const indexJsFileInput = document.getElementById('index-js-file');
const uploadIndexJsBtn = document.getElementById('upload-index-js-btn');
const deleteLessonSelect = document.getElementById('delete-lesson');
const deleteLessonBtn = document.getElementById('delete-lesson-btn');
const passwordModal = document.getElementById('password-modal');
const passwordInput = document.getElementById('password-input');
const passwordError = document.getElementById('password-error');
const totalProgressText = document.getElementById('total-progress-text');
const totalProgressBar = document.getElementById('total-progress-bar');
const introExamplesDiv = document.getElementById('intro-examples');

// Показать модальное окно пароля при клике на "Админка"
adminBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (passwordModal) {
    passwordModal.style.display = 'block';
    passwordInput.value = '';
    passwordError.textContent = '';
    passwordInput.focus();
  } else {
    console.error('Password modal not found');
  }
});

// Проверка пароля
function checkPassword() {
  const enteredPassword = passwordInput.value.trim();

  if (enteredPassword === '') {
    passwordError.textContent = 'Пожалуйста, введите пароль.';
    passwordInput.focus();
    return;
  }

  // Проверяем введённый пароль
  if (enteredPassword === ADMIN_PASSWORD) {
    // Пароль верный, открываем админку
    passwordModal.style.display = 'none';
    if (startScreen && adminScreen) {
      startScreen.classList.add('hidden');
      adminScreen.classList.remove('hidden');
      githubTokenInput.value = ''; // Очищаем поле токена
    } else {
      console.error('startScreen or adminScreen not found');
    }
  } else {
    // Пароль неверный, показываем ошибку
    passwordError.textContent = 'Неверный пароль. Попробуйте снова.';
    passwordInput.value = '';
    passwordInput.focus();
  }
}

// Обработчик нажатия Enter для проверки пароля
passwordInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    checkPassword();
  }
});

// Загрузка уроков с GitHub через API
async function loadLessonsFromGitHub() {
  console.log('Starting to load lessons from GitHub API...');
  lessonsData.length = 0;
  deleteLessonSelect.innerHTML = '<option value="">Выберите урок для удаления</option>';
  const token = githubTokenInput.value.trim();
  const headers = {
    'Accept': 'application/vnd.github.v3+json'
  };
  
  if (token) {
    headers['Authorization'] = `token ${token}`;
    console.log('Using GitHub token for authorization');
  } else {
    console.log('No GitHub token provided, proceeding without authorization');
  }

  try {
    const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_PATH}`;
    console.log(`Fetching lessons from ${apiUrl}`);
    const response = await fetch(apiUrl, { headers });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GitHub API error: ${response.statusText} (${response.status}) - ${errorText}`);
    }
    const files = await response.json();
    console.log('Files fetched from GitHub:', files);

    for (const file of files) {
      if (file.name.endsWith('.js')) {
        console.log(`Processing file: ${file.name}`);
        const option = document.createElement('option');
        option.value = file.name;
        option.textContent = file.name;
        deleteLessonSelect.appendChild(option);

        const fileResponse = await fetch(file.download_url);
        if (!fileResponse.ok) {
          console.error(`Failed to fetch lesson ${file.name}: ${fileResponse.statusText}`);
          continue;
        }
        const script = await fileResponse.text();
        console.log(`Fetched script for ${file.name}:`, script);
        try {
          eval(script);
          console.log(`Successfully evaluated lesson ${file.name}`);
        } catch (error) {
          console.error(`Error evaluating lesson ${file.name}:`, error.message);
          console.error(`Stack trace:`, error.stack);
        }
      } else {
        console.log(`Skipping non-js file: ${file.name}`);
      }
    }
    
    // Сортируем уроки по номеру урока
    lessonsData.sort((a, b) => {
      const lessonNumberA = parseInt(a.lesson.replace('lesson', ''), 10);
      const lessonNumberB = parseInt(b.lesson.replace('lesson', ''), 10);
      return lessonNumberA - lessonNumberB;
    });

    console.log('Lessons loaded from GitHub:', lessonsData);
    populateLessons();
  } catch (error) {
    console.error('Error loading lessons from GitHub:', error);
    if (startFeedback) {
      startFeedback.textContent = 'Ошибка при загрузке уроков с GitHub: ' + error.message;
    } else if (feedback) {
      feedback.textContent = 'Ошибка при загрузке уроков с GitHub: ' + error.message;
    }
  }
}

// Заполнение списка уроков
function populateLessons() {
  const selectedLevel = levelSelect.value;
  lessonSelect.innerHTML = '';
  const lessons = lessonsData.filter(lesson => lesson.level === selectedLevel);
  console.log('Populating lessons for level:', selectedLevel, 'Found lessons:', lessons);
  if (lessons.length === 0) {
    const option = document.createElement('option');
    option.textContent = 'Нет доступных уроков';
    option.disabled = true;
    lessonSelect.appendChild(option);
  } else {
    lessons.forEach(lesson => {
      const option = document.createElement('option');
      option.value = lesson.lesson;
      option.textContent = lesson.name;
      lessonSelect.appendChild(option);
    });
  }
}

loadLessonsFromGitHub();
levelSelect.addEventListener('change', populateLessons);

async function uploadFileToGitHub(file, filePath, token, successMessage) {
  if (!file) {
    adminFeedback.textContent = `Пожалуйста, выберите файл для ${filePath}.`;
    return false;
  }

  if (!token) {
    adminFeedback.textContent = 'Пожалуйста, введите GitHub токен.';
    return false;
  }

  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = async function(e) {
      const fileContent = e.target.result;

      try {
        let sha = null;
        try {
          const existingFileResponse = await fetch(
            `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
            {
              headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
              }
            }
          );
          if (existingFileResponse.ok) {
            const existingFile = await existingFileResponse.json();
            sha = existingFile.sha;
          }
        } catch (error) {
          // File doesn't exist, proceed with creating a new file
        }

        const content = btoa(unescape(encodeURIComponent(fileContent)));

        const response = await fetch(
          `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
          {
            method: 'PUT',
            headers: {
              'Authorization': `token ${token}`,
              'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
              message: `Update ${filePath}`,
              content: content,
              sha: sha
            })
          }
        );

        if (!response.ok) throw new Error(`GitHub API error: ${response.statusText}`);

        adminFeedback.textContent = successMessage;
        resolve(true);
      } catch (error) {
        adminFeedback.textContent = `Ошибка при загрузке ${filePath} на GitHub: ${error.message}`;
        console.error(`Error uploading ${filePath} to GitHub:`, error);
        resolve(false);
      }
    };
    reader.onerror = function() {
      adminFeedback.textContent = `Ошибка при чтении файла ${filePath}.`;
      resolve(false);
    };
    reader.readAsText(file);
  });
}

uploadLessonBtn.addEventListener('click', async () => {
  const file = lessonFileInput.files[0];
  const token = githubTokenInput.value.trim();

  if (!file) {
    adminFeedback.textContent = 'Пожалуйста, выберите файл урока (.js)';
    return;
  }

  if (!file.name.endsWith('.js')) {
    adminFeedback.textContent = 'Файл должен быть в формате .js';
    return;
  }

  const success = await uploadFileToGitHub(
    file,
    `${GITHUB_PATH}/${file.name}`,
    token,
    'Урок успешно загружен на GitHub! Перейдите на стартовый экран, чтобы увидеть его.'
  );

  if (success) {
    lessonFileInput.value = '';
    githubTokenInput.value = '';
    await loadLessonsFromGitHub();
  }
});

deleteLessonBtn.addEventListener('click', async () => {
  const lessonFile = deleteLessonSelect.value;
  const token = githubTokenInput.value.trim();

  if (!lessonFile) {
    adminFeedback.textContent = 'Пожалуйста, выберите урок для удаления.';
    return;
  }

  if (!token) {
    adminFeedback.textContent = 'Пожалуйста, введите GitHub токен.';
    return;
  }

  try {
    const fileResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_PATH}/${lessonFile}`,
      {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );
    if (!fileResponse.ok) throw new Error(`GitHub API error: ${fileResponse.statusText}`);
    const fileData = await fileResponse.json();
    const sha = fileData.sha;

    const deleteResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_PATH}/${lessonFile}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
          message: `Delete lesson ${lessonFile}`,
          sha: sha
        })
      }
    );

    if (!deleteResponse.ok) throw new Error(`GitHub API error: ${deleteResponse.statusText}`);

    adminFeedback.textContent = 'Урок успешно удалён из GitHub! Перейдите на стартовый экран, чтобы обновить список.';
    githubTokenInput.value = '';
    await loadLessonsFromGitHub();
  } catch (error) {
    adminFeedback.textContent = `Ошибка при удалении урока: ${error.message}`;
    console.error('Error deleting lesson from GitHub:', error);
  }
});

uploadIndexHtmlBtn.addEventListener('click', async () => {
  const file = indexHtmlFileInput.files[0];
  const token = githubTokenInput.value.trim();

  const success = await uploadFileToGitHub(
    file,
    'index.html',
    token,
    'index.html успешно обновлён на GitHub! Страница перезагрузится через 3 секунды.'
  );

  if (success) {
    indexHtmlFileInput.value = '';
    githubTokenInput.value = '';
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
});

uploadIndexJsBtn.addEventListener('click', async () => {
  const file = indexJsFileInput.files[0];
  const token = githubTokenInput.value.trim();

  const success = await uploadFileToGitHub(
    file,
    'index.js',
    token,
    'index.js успешно обновлён на GitHub! Страница перезагрузится через 3 секунды.'
  );

  if (success) {
    indexJsFileInput.value = '';
    githubTokenInput.value = '';
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
});

startBtn.addEventListener('click', () => {
  userName = document.getElementById('name').value.trim();
  userLevel = document.getElementById('level').value;
  userLesson = document.getElementById('lesson').value;
  if (!userName) {
    alert('Пожалуйста, введите ваше имя.');
    return;
  }

  currentLessonData = lessonsData.find(lesson => lesson.level === userLevel && lesson.lesson === userLesson);
  if (!currentLessonData) {
    alert('Урок не найден. Пожалуйста, выберите другой урок.');
    return;
  }

  progress = {};
  currentLessonData.structures.forEach(struct => {
    progress[struct.id] = 0;
  });

  currentPart = 1; // Начинаем с первой части

  // Отображаем introExamples, если они есть
  if (currentLessonData.introExamples && introExamplesDiv) {
    introExamplesDiv.innerHTML = '';
    currentLessonData.introExamples.forEach(example => {
      const p = document.createElement('p');
      p.textContent = example;
      introExamplesDiv.appendChild(p);
    });
  } else if (introExamplesDiv) {
    introExamplesDiv.innerHTML = '<p class="text-sm text-gray-600">Примеры отсутствуют.</p>';
  }

  startScreen.classList.add('hidden');
  practiceScreen.classList.remove('hidden');
  userNameEl.textContent = userName;
  userLevelEl.textContent = document.getElementById('level').options[document.getElementById('level').selectedIndex].text;
  userLessonEl.textContent = document.getElementById('lesson').options[document.getElementById('lesson').selectedIndex].text;
  initializeProgressBars();
  updateStats();
  feedback.textContent = currentLessonData.parts ? 'Сначала говори утвердительные предложения (Часть 1)' : 'Говори любой пример из структур ниже.';
});

function goBackToStart() {
  console.log('goBackToStart called');
  // Сбрасываем состояние
  progress = {};
  spokenHistory = [];
  logEntries = [];
  isListening = false;
  lessonCompleted = false;
  startTime = null;
  endTime = null;
  currentLessonData = null;
  currentPart = 1; // Сбрасываем текущую часть
  if (typeof window.usedNames !== 'undefined') {
    window.usedNames.length = 0; // Очищаем массив
    console.log('window.usedNames cleared at goBackToStart:', window.usedNames);
  } else {
    window.usedNames = [];
    console.log('window.usedNames initialized at goBackToStart:', window.usedNames);
  }
  window.lastAskedVerb = null; // Сбрасываем lastAskedVerb
  window.lastAskedSubject = null; // Сбрасываем lastAskedSubject
  if (recognition) recognition.stop();

  // Проверяем, что элементы существуют, прежде чем менять их классы
  if (startPracticeBtn) {
    startPracticeBtn.textContent = 'Начать практику';
    startPracticeBtn.classList.remove('bg-gray-400', 'cursor-not-allowed');
    startPracticeBtn.classList.add('bg-[#373D8D]', 'hover:bg-[#2A3171]');
    startPracticeBtn.disabled = false;
  }
  if (restartListeningBtn) {
    restartListeningBtn.classList.add('hidden');
  }
  if (completionModal) {
    completionModal.style.display = 'none';
  }
  if (feedback) feedback.textContent = '';
  if (startFeedback) startFeedback.textContent = '';
  if (adminFeedback) adminFeedback.textContent = '';
  if (statsDiv) statsDiv.innerHTML = '';
  if (logDiv) logDiv.innerHTML = '';
  if (modalLog) modalLog.innerHTML = '';
  if (introExamplesDiv) introExamplesDiv.innerHTML = '';
  updateProgressBars();

  // Переключаем экраны
  if (practiceScreen) practiceScreen.classList.add('hidden');
  if (adminScreen) adminScreen.classList.add('hidden');
  if (startScreen) startScreen.classList.remove('hidden');
}

startPracticeBtn.addEventListener('click', () => {
  feedback.textContent = 'Попытка запустить практику...';
  if (!isListening) {
    startTime = new Date();
    startListening();
  } else {
    feedback.textContent = 'Практика уже запущена. Если ничего не происходит, проверьте доступ к микрофону и перезапустите.';
  }
});

restartListeningBtn.addEventListener('click', () => {
  feedback.textContent = 'Попытка возобновить прослушивание...';
  if (!isListening) {
    startListening();
  } else {
    feedback.textContent = 'Прослушивание уже активно. Проверьте доступ к микрофону.';
  }
});

function startNewTraining() {
  goBackToStart();
}

function startListening() {
  if (!recognition) {
    feedback.textContent = 'SpeechRecognition не поддерживается в вашем браузере.';
    return;
  }

  try {
    // Сбрасываем window.usedNames при старте практики
    if (typeof window.usedNames !== 'undefined') {
      window.usedNames.length = 0; // Очищаем массив
      console.log('window.usedNames cleared at startListening:', window.usedNames);
    } else {
      window.usedNames = [];
      console.log('window.usedNames initialized at startListening:', window.usedNames);
    }

    // Сбрасываем локальные usedNames для текущего урока
    if (currentLessonData) {
      currentLessonData.usedNames = []; // Сбрасываем локальный массив
      console.log('currentLessonData.usedNames reset at startListening:', currentLessonData.usedNames);
    }

    recognition.start();
    isListening = true;
    if (startPracticeBtn) {
      startPracticeBtn.textContent = 'Слушаю...';
      startPracticeBtn.classList.remove('bg-[#373D8D]', 'hover:bg-[#2A3171]');
      startPracticeBtn.classList.add('bg-gray-400', 'cursor-not-allowed');
      startPracticeBtn.disabled = true;
    }
    if (restartListeningBtn) {
      restartListeningBtn.classList.add('hidden');
    }
    feedback.textContent = currentLessonData.parts ? (currentPart === 1 ? 'Сначала говори утвердительные предложения (Часть 1)' : 'Теперь говори отрицательные или вопросительные предложения (Часть 2)') : 'Говори любой пример из структур ниже.';
    lastSpeechTime = Date.now();
  } catch (error) {
    feedback.textContent = 'Ошибка при запуске распознавания речи: ' + error.message + '. Проверьте доступ к микрофону и попробуйте снова.';
    isListening = false;
    if (startPracticeBtn) {
      startPracticeBtn.textContent = 'Начать практику';
      startPracticeBtn.classList.remove('bg-gray-400', 'cursor-not-allowed');
      startPracticeBtn.classList.add('bg-[#373D8D]', 'hover:bg-[#2A3171]');
      startPracticeBtn.disabled = false;
    }
    if (restartListeningBtn) {
      restartListeningBtn.classList.remove('hidden');
    }
  }
}

function initializeProgressBars() {
  updateProgressBars();
}

function formatDuration(start, end) {
  if (!start || !end) return '0 минут 0 секунд';
  const durationMs = end - start;
  const minutes = Math.floor(durationMs / 1000 / 60);
  const seconds = Math.floor((durationMs / 1000) % 60);
  return `${minutes} минут ${seconds} секунд`;
}

function updateStats() {
  if (!currentLessonData) return;
  const requiredExamples = currentLessonData.requiredCorrect * currentLessonData.structures.length;
  const totalCorrect = Object.values(progress).reduce((sum, count) => sum + count, 0);
  const totalAttempts = logEntries.length;
  const accuracy = totalAttempts > 0 ? ((totalCorrect / totalAttempts) * 100).toFixed(2) : 0;

  let statsHTML = `
    <p><strong>Статистика:</strong></p>
    <p>- Нужно было сказать: ${requiredExamples} примеров</p>
    <p>- Сказано правильно: ${totalCorrect} примеров</p>
    <p>- Всего попыток: ${totalAttempts}</p>
    <p>- Процент аккуратности: ${accuracy}%</p>
  `;
  
  if (lessonCompleted && startTime && endTime) {
    statsHTML += `<p>- Время тренировки: ${formatDuration(startTime, endTime)}</p>`;
  }

  statsDiv.innerHTML = statsHTML;
}

function updateModalLog() {
  if (!currentLessonData) return;
  const requiredExamples = currentLessonData.requiredCorrect * currentLessonData.structures.length;
  const totalCorrect = Object.values(progress).reduce((sum, count) => sum + count, 0);
  const totalAttempts = logEntries.length;
  const accuracy = totalAttempts > 0 ? ((totalCorrect / totalAttempts) * 100).toFixed(2) : 0;
  const duration = formatDuration(startTime, endTime);

  let logHTML = `
    <p><strong>Протокол:</strong></p>
    <p><strong>Статистика:</strong></p>
    <p>- Нужно было сказать: ${requiredExamples} примеров</p>
    <p>- Сказано правильно: ${totalCorrect} примеров</p>
    <p>- Всего попыток: ${totalAttempts}</p>
    <p>- Процент аккуратности: ${accuracy}%</p>
    <p>- Время тренировки: ${duration}</p>
    <p><strong>Попытки:</strong></p>
  `;

  logEntries.forEach(entry => {
    if (entry.exceeded) {
      logHTML += `<p>[${entry.time}] ${entry.spoken} 🎉🎈❤️</p>`;
    } else {
      const statusIcon = entry.correct ? '✅' : '❌';
      const duplicateIcon = entry.duplicate ? '🔁' : '';
      logHTML += `<p>[${entry.time}] Сказано: "${entry.spoken}"${entry.structure ? ` для "${entry.structure}"` : ''} - ${statusIcon} ${entry.correct ? 'Правильно' : 'Неправильно'}${duplicateIcon ? ` ${duplicateIcon} Повтор` : ''}</p>`;
    }
  });

  modalLog.innerHTML = logHTML;
}

if (recognition) {
  recognition.onresult = (event) => {
    const spokenText = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
    
    // Игнорируем пустой ввод
    if (!spokenText) {
      console.log('Empty speech input detected, ignoring.');
      setTimeout(() => {
        if (isListening && !recognition.recognizing && completionModal.style.display !== 'block') {
          try {
            recognition.start();
          } catch (error) {
            console.error('Failed to restart recognition:', error);
          }
        }
      }, 500);
      return;
    }

    const matchedStructure = findMatchingStructure(spokenText);
    const logEntry = { time: new Date().toLocaleTimeString(), spoken: spokenText };

    lastSpeechTime = Date.now();

    console.log('Current window.usedNames before validation:', window.usedNames);
    console.log('Current lesson usedNames before validation:', currentLessonData ? currentLessonData.usedNames : 'No lesson data');

    if (matchedStructure) {
      let isCorrect;
      if (matchedStructure.id === "answer") {
        // Вызываем validateStructure с правильным контекстом
        isCorrect = currentLessonData.validateStructure.call(currentLessonData, spokenText);
      } else {
        // Вызываем validateStructure с правильным контекстом
        isCorrect = currentLessonData.validateStructure.call(currentLessonData, spokenText, matchedStructure);
      }
      if (isCorrect) {
        const isDuplicate = matchedStructure.hasName && spokenHistory.includes(spokenText);
        logEntry.structure = matchedStructure.structure;
        logEntry.correct = true;
        logEntry.duplicate = isDuplicate;

        if (!isDuplicate || !matchedStructure.hasName) {
          progress[matchedStructure.id]++;
          if (matchedStructure.hasName) spokenHistory.push(spokenText);

          if (progress[matchedStructure.id] > currentLessonData.requiredCorrect) {
            feedback.textContent = `Отлично! 🎉🎈❤️ Ты превысил цель для "${matchedStructure.structure}"!`;
            logEntries.push({
              time: new Date().toLocaleTimeString(),
              spoken: `Превышена цель для "${matchedStructure.structure}"`,
              structure: matchedStructure.structure,
              correct: true,
              exceeded: true
            });
          } else {
            feedback.textContent = `Правильно! Ты сказал: "${spokenText}" для "${matchedStructure.structure}"`;
          }

          // Проверяем, нужно ли перейти ко второй части
          checkPartProgress();

          updateProgressBars();
          checkCompletion();
        } else {
          feedback.textContent = `Повтор: "${spokenText}". Скажи новый пример для: ${matchedStructure.structure}`;
        }
      } else {
        logEntry.structure = matchedStructure.structure;
        logEntry.correct = false;
        feedback.textContent = `Неправильно: "${spokenText}" для "${matchedStructure.structure}"`;
      }
    } else {
      logEntry.correct = false;
      feedback.textContent = `Не совпадает: "${spokenText}". ${currentLessonData.parts ? (currentPart === 1 ? 'Сначала говори утвердительные предложения (Часть 1)' : 'Теперь говори отрицательные или вопросительные предложения (Часть 2)') : 'Попробуй одну из структур ниже.'}`;
    }

    logEntries.push(logEntry);
    updateLog();
    updateStats();

    // Убедимся, что не пытаемся запустить recognition, если оно уже активно
    setTimeout(() => {
      if (isListening && !recognition.recognizing && completionModal.style.display !== 'block') {
        try {
          recognition.start();
        } catch (error) {
          console.error('Failed to restart recognition:', error);
        }
      }
    }, 500);
  };

  recognition.onerror = (event) => {
    feedback.textContent = 'Ошибка в распознавании: ' + event.error + '. Попробуйте снова или проверьте доступ к микрофону.';
    isListening = false;
    if (startPracticeBtn) {
      startPracticeBtn.textContent = 'Начать практику';
      startPracticeBtn.classList.remove('bg-gray-400', 'cursor-not-allowed');
      startPracticeBtn.classList.add('bg-[#373D8D]', 'hover:bg-[#2A3171]');
      startPracticeBtn.disabled = false;
    }
    if (restartListeningBtn) {
      restartListeningBtn.classList.remove('hidden');
    }
  };

  recognition.onend = () => {
    recognition.recognizing = false;
    const currentTime = Date.now();
    if (currentTime - lastSpeechTime > 10000) {
      feedback.textContent = 'Давно не слышу речи. Перезапускаю...';
      isListening = false;
      if (startPracticeBtn) {
        startPracticeBtn.textContent = 'Начать практику';
        startPracticeBtn.classList.remove('bg-gray-400', 'cursor-not-allowed');
        startPracticeBtn.classList.add('bg-[#373D8D]', 'hover:bg-[#2A3171]');
        startPracticeBtn.disabled = false;
      }
      if (restartListeningBtn) {
        restartListeningBtn.classList.remove('hidden');
      }
      return;
    }

    if (isListening && completionModal.style.display !== 'block') {
      setTimeout(() => {
        if (!recognition.recognizing) {
          try {
            recognition.start();
          } catch (error) {
            feedback.textContent = 'Ошибка при перезапуске распознавания: ' + error.message + '. Попробуйте снова.';
            isListening = false;
            if (startPracticeBtn) {
              startPracticeBtn.textContent = 'Начать практику';
              startPracticeBtn.classList.remove('bg-gray-400', 'cursor-not-allowed');
              startPracticeBtn.classList.add('bg-[#373D8D]', 'hover:bg-[#2A3171]');
              startPracticeBtn.disabled = false;
            }
            if (restartListeningBtn) {
              restartListeningBtn.classList.remove('hidden');
            }
          }
        }
      }, 500);
    }
  };

  // Добавляем свойство recognizing для отслеживания состояния
  Object.defineProperty(recognition, 'recognizing', {
    get: function() {
      return this._recognizing || false;
    },
    set: function(value) {
      this._recognizing = value;
    }
  });

  recognition.onstart = () => {
    recognition.recognizing = true;
  };
}

function findMatchingStructure(text) {
  if (!currentLessonData) return null;
  const structures = currentLessonData.structures;

  // Фильтруем структуры в зависимости от текущей части
  const activeStructures = structures.filter(struct => {
    if (!currentLessonData.parts) return true; // Если нет разделения на части, проверяем все структуры
    return currentLessonData.parts[struct.id] === currentPart;
  });

  for (let struct of activeStructures) {
    // Вызываем validateStructure с правильным контекстом
    if (currentLessonData.validateStructure.call(currentLessonData, text, struct)) {
      console.log(`Checking specific structure: "${struct.structure}" for text: "${text}"`);
      console.log('Matched specific structure:', struct.structure);
      return struct;
    }
  }
  for (let struct of activeStructures) {
    console.log(`Checking general structure: "${struct.structure}" for text: "${text}"`);
    // Вызываем validateStructure с правильным контекстом
    if (currentLessonData.validateStructure.call(currentLessonData, text, struct)) {
      console.log('Matched general structure:', struct.structure);
      return struct;
    }
  }
  // Проверяем, является ли текст ответом на вопрос (Yes/No), только если мы во второй части
  if (currentPart === 2 || !currentLessonData.parts) {
    console.log(`Checking answer for last verb: "${window.lastAskedVerb}" and subject: "${window.lastAskedSubject}"`);
    if (window.lastAskedVerb && window.lastAskedSubject) {
      const words = text.split(' ').filter(word => word.length > 0);
      const normalizedWords = words.map(word => word.toLowerCase());
      if (normalizedWords[0] === "yes" || normalizedWords[0] === "no") {
        // Вызываем validateStructure с правильным контекстом
        if (currentLessonData.validateStructure.call(currentLessonData, text)) {
          console.log('Matched answer structure');
          return { structure: `Answer to "${window.lastAskedSubject} ${window.lastAskedVerb}"`, id: "answer" };
        }
      }
    }
  }
  console.log(`No matching structure found for text: "${text}"`);
  return null;
}

function checkPartProgress() {
  if (!currentLessonData || !currentLessonData.parts || currentPart !== 1) return;

  // Проверяем прогресс для структур первой части
  const part1Structures = currentLessonData.structures.filter(struct => currentLessonData.parts[struct.id] === 1);
  const requiredPerStructure = currentLessonData.requiredCorrect; // 10 правильных ответов на структуру
  const part1Completed = part1Structures.every(struct => {
    const count = progress[struct.id];
    const meetsRequirement = count >= requiredPerStructure;
    console.log(`Structure "${struct.structure}" has ${count} correct answers, needs ${requiredPerStructure}: ${meetsRequirement}`);
    return meetsRequirement;
  });

  if (part1Completed) {
    currentPart = 2;
    // Сбрасываем локальные usedNames при переходе ко второй части
    if (currentLessonData) {
      currentLessonData.usedNames = [];
      console.log('currentLessonData.usedNames reset at part transition:', currentLessonData.usedNames);
    }
    // Сбрасываем window.usedNames для совместимости с другими уроками
    if (typeof window.usedNames !== 'undefined') {
      window.usedNames.length = 0; // Очищаем массив
      console.log('window.usedNames cleared at part transition:', window.usedNames);
    } else {
      window.usedNames = [];
      console.log('window.usedNames initialized at part transition:', window.usedNames);
    }
    feedback.textContent = 'Отлично! Ты завершил Часть 1 (утвердительные предложения). Теперь переходи к Часть 2: говори отрицательные или вопросительные предложения.';
    updateProgressBars();
  }
}

function updateLog() {
  if (!logDiv) {
    console.warn('logDiv element not found, skipping updateLog.');
    return;
  }
  logDiv.innerHTML = '';
  logEntries.forEach(entry => {
    const p = document.createElement('p');
    p.className = 'mb-1';
    if (entry.exceeded) {
      p.textContent = `[${entry.time}] ${entry.spoken} 🎉🎈❤️`;
    } else {
      const statusIcon = entry.correct ? '✅' : '❌';
      const duplicateIcon = entry.duplicate ? '🔁' : '';
      p.textContent = `[${entry.time}] Сказано: "${entry.spoken}"${entry.structure ? ` для "${entry.structure}"` : ''} - ${statusIcon} ${entry.correct ? 'Правильно' : 'Неправильно'}${duplicateIcon ? ` ${duplicateIcon} Повтор` : ''}`;
    }
    logDiv.appendChild(p);
  });
  if (logDiv.scrollHeight) {
    logDiv.scrollTop = logDiv.scrollHeight;
  }
}

function updateProgressBars() {
  if (!currentLessonData) return;
  
  // Подсчёт общего прогресса (учитываем только до requiredCorrect для каждой структуры)
  const totalRequired = currentLessonData.requiredCorrect * currentLessonData.structures.length;
  const totalCompleted = Object.values(progress).reduce((sum, count) => sum + Math.min(count, currentLessonData.requiredCorrect), 0);
  const totalPercentage = totalRequired > 0 ? (totalCompleted / totalRequired) * 100 : 0;

  // Обновляем текст и прогресс-бар общего прогресса
  totalProgressText.textContent = `${totalCompleted}/${totalRequired}`;
  totalProgressBar.style.width = `${totalPercentage}%`;

  // Обновляем прогресс для каждой структуры
  progressBars.innerHTML = '';
  
  // Если урок разделён на части, группируем структуры по частям
  if (currentLessonData.parts) {
    const parts = [...new Set(Object.values(currentLessonData.parts))].sort();
    parts.forEach(part => {
      const partStructures = currentLessonData.structures.filter(struct => currentLessonData.parts[struct.id] === part);
      const partDiv = document.createElement('div');
      partDiv.className = 'mb-4';

      const partHeader = document.createElement('p');
      partHeader.className = 'text-md font-semibold mb-2';
      partHeader.textContent = `Часть ${part}: ${part === 1 ? 'Утвердительные предложения' : 'Отрицательные и вопросительные предложения'}`;
      partDiv.appendChild(partHeader);

      partStructures.forEach(struct => {
        const totalCorrect = progress[struct.id];
        const structDiv = document.createElement('div');
        structDiv.className = 'mb-2';

        let barsHTML = `
          <p class="text-sm">${struct.structure}</p>
        `;

        // Отображаем переводы
        if (struct.translations) {
          barsHTML += `
            <p class="text-xs text-gray-600 mb-1">${struct.translations.join(' / ')}</p>
          `;
        } else if (struct.translation) {
          barsHTML += `
            <p class="text-xs text-gray-600 mb-1">${struct.translation}</p>
          `;
        }

        // Отображаем примеры, если они есть
        if (struct.examples && struct.examples.length > 0) {
          barsHTML += `
            <p class="text-xs text-gray-600 mb-1">Примеры: ${struct.examples.join(' / ')}</p>
          `;
        }

        const firstBarProgress = Math.min(totalCorrect, currentLessonData.requiredCorrect);
        const firstBarPercentage = (firstBarProgress / currentLessonData.requiredCorrect) * 100;
        barsHTML += `
          <div class="w-full bg-gray-200 rounded-full h-2.5 mb-1">
            <div class="bg-[#373D8D] h-2.5 rounded-full" style="width: ${firstBarPercentage}%"></div>
          </div>
        `;

        if (totalCorrect > currentLessonData.requiredCorrect) {
          const excessCorrect = totalCorrect - currentLessonData.requiredCorrect;
          const excessProgress = excessCorrect % currentLessonData.requiredCorrect;
          const excessPercentage = (excessProgress / currentLessonData.requiredCorrect) * 100;
          barsHTML += `
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div class="bg-[#28A745] h-2.5 rounded-full" style="width: ${excessPercentage}%"></div>
            </div>
          `;
        }

        barsHTML += `
          <p class="text-xs text-gray-600">${totalCorrect}/${currentLessonData.requiredCorrect}</p>
        `;
        structDiv.innerHTML = barsHTML;
        partDiv.appendChild(structDiv);
        console.log(`Rendering progress bar for structure: "${struct.structure}" in Part ${part}`);
      });

      progressBars.appendChild(partDiv);
    });
  } else {
    // Если нет разделения на части, отображаем как раньше
    currentLessonData.structures.forEach(struct => {
      const totalCorrect = progress[struct.id];
      const div = document.createElement('div');
      div.className = 'mb-2';

      let barsHTML = `
        <p class="text-sm">${struct.structure}</p>
      `;

      if (struct.translations) {
        barsHTML += `
          <p class="text-xs text-gray-600 mb-1">${struct.translations.join(' / ')}</p>
        `;
      } else if (struct.translation) {
        barsHTML += `
          <p class="text-xs text-gray-600 mb-1">${struct.translation}</p>
        `;
      }

      if (struct.examples && struct.examples.length > 0) {
        barsHTML += `
          <p class="text-xs text-gray-600 mb-1">Примеры: ${struct.examples.join(' / ')}</p>
        `;
      }

      const firstBarProgress = Math.min(totalCorrect, currentLessonData.requiredCorrect);
      const firstBarPercentage = (firstBarProgress / currentLessonData.requiredCorrect) * 100;
      barsHTML += `
        <div class="w-full bg-gray-200 rounded-full h-2.5 mb-1">
          <div class="bg-[#373D8D] h-2.5 rounded-full" style="width: ${firstBarPercentage}%"></div>
        </div>
      `;

      if (totalCorrect > currentLessonData.requiredCorrect) {
        const excessCorrect = totalCorrect - currentLessonData.requiredCorrect;
        const excessProgress = excessCorrect % currentLessonData.requiredCorrect;
        const excessPercentage = (excessProgress / currentLessonData.requiredCorrect) * 100;
        barsHTML += `
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-[#28A745] h-2.5 rounded-full" style="width: ${excessPercentage}%"></div>
          </div>
        `;
      }

      barsHTML += `
        <p class="text-xs text-gray-600">${totalCorrect}/${currentLessonData.requiredCorrect}</p>
      `;
      div.innerHTML = barsHTML;
      progressBars.appendChild(div);
      console.log(`Rendering progress bar for structure: "${struct.structure}"`);
    });
  }
}

function checkCompletion() {
  if (!currentLessonData) return;
  
  const allStructuresComplete = Object.entries(progress).every(([id, count]) => {
    const structure = currentLessonData.structures.find(s => s.id === id);
    const meetsRequirement = count >= currentLessonData.requiredCorrect;
    if (!meetsRequirement) {
      console.log(`Structure "${structure.structure}" has ${count} correct answers, needs ${currentLessonData.requiredCorrect}`);
    }
    return meetsRequirement;
  });

  if (allStructuresComplete) {
    console.log('All structures completed, finishing lesson.');
    endTime = new Date();
    lessonCompleted = true;
    const randomMessage = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
    congratulationsEl.textContent = randomMessage;
    updateModalLog();
    completionModal.style.display = 'block';
    isListening = false;
    if (recognition) recognition.stop();
    startPracticeBtn.textContent = 'Урок завершён';
    updateStats();
    sendResults();
  } else {
    console.log('Lesson not yet complete, waiting for more examples.');
  }
}

async function sendResults() {
  if (!currentLessonData) return;
  const requiredExamples = currentLessonData.requiredCorrect * currentLessonData.structures.length;
  const totalCorrect = Object.values(progress).reduce((sum, count) => sum + count, 0);
  const totalAttempts = logEntries.length;
  const accuracy = totalAttempts > 0 ? ((totalCorrect / totalAttempts) * 100).toFixed(2) : 0;
  const duration = formatDuration(startTime, endTime);

  const resultSummary = `
Результаты для ${userName}
Уровень: ${userLevelEl.textContent}
Урок: ${userLessonEl.textContent}
Прогресс: ${Object.entries(progress).map(([id, count]) => `${currentLessonData.structures.find(s => s.id === id).structure}: ${count} правильных`).join('\n')}
Статистика:
- Нужно было сказать: ${requiredExamples} примеров
- Сказано правильно: ${totalCorrect} примеров
- Всего попыток: ${totalAttempts}
- Процент аккуратности: ${accuracy}%
- Время тренировки: ${duration}
Протокол:
Статистика в протоколе:
- Нужно было сказать: ${requiredExamples} примеров
- Сказано правильно: ${totalCorrect} примеров
- Всего попыток: ${totalAttempts}
- Процент аккуратности: ${accuracy}%
- Время тренировки: ${duration}
${logEntries.map(entry => {
  if (entry.exceeded) {
    return `- ${entry.spoken} 🎉🎈❤️`;
  } else {
    const statusIcon = entry.correct ? '✅' : '❌';
    const duplicateIcon = entry.duplicate ? '🔁' : '';
    return `- ${entry.spoken}${entry.structure ? ` (для "${entry.structure}")` : ''} - ${statusIcon} ${entry.correct ? 'Правильно' : 'Неправильно'}${duplicateIcon ? ` ${duplicateIcon} Повтор` : ''}`;
  }
}).join('\n')}
`;

  const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
  const TELEGRAM_CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID';
  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: resultSummary
      })
    });
  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error.message);
  }

  const BITRIX_WEBHOOK_URL = 'https://elcalmaty.bitrix24.kz/rest/1/t30j7bkqi9p4sy0b/';
  const BITRIX_CHAT_ID = '145630';
  const bitrixUrl = `${BITRIX_WEBHOOK_URL}im.message.add`;

  try {
    const response = await fetch(bitrixUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        CHAT_ID: BITRIX_CHAT_ID,
        MESSAGE: resultSummary
      })
    });
    const data = await response.json();
    if (!data.result) {
      console.error('Ошибка отправки в Bitrix24:', JSON.stringify(data.error));
    }
  } catch (error) {
    console.error('Ошибка отправки в Bitrix24:', error.message);
  }
}
