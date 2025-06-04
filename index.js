let lessonsData = [];

function addLesson(lesson) {
  console.log(`Adding lesson: ${lesson.name} for level ${lesson.level}`);
  lessonsData.push(lesson);
}