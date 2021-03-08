const MODULES_URL = 'https://wbdv-generic-server.herokuapp.com/api/hwong/modules';
const LESSONS_URL = 'https://wbdv-generic-server.herokuapp.com/api/hwong/lessons';

const createLesson = (moduleId, lesson) =>
  fetch(`${MODULES_URL}/${moduleId}/lessons`, {
    method: 'POST',
    body: JSON.stringify(lesson),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json());

const findLessonsForModule = (moduleId) =>
  fetch(`${MODULES_URL}/${moduleId}/lessons`)
    .then(response => response.json());

const findLesson = (lessonId) =>
  fetch(`${LESSONS_URL}/${lessonId}`)
    .then(response => response.json());

const updateLesson = (lessonId, lesson) =>
  fetch(`${LESSONS_URL}/${lessonId}`, {
    method: 'PUT',
    body: JSON.stringify(lesson),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json());

const deleteLesson = (lessonId) =>
  fetch(`${LESSONS_URL}/${lessonId}`, {
    method: 'DELETE'
  }).then(response => response.json());

const api = {
  createLesson,
  findLessonsForModule,
  findLesson,
  updateLesson,
  deleteLesson
};

export default api;