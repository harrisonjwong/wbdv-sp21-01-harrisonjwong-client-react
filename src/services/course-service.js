const COURSES_URL = 'https://wbdv-generic-server.herokuapp.com/api/hwong/courses';

// creates a new course instance and adds it to the collection of courses
const createCourse = (course) => {
  return fetch(COURSES_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(course)
  }).then(response => response.json());
}

// retrieves all course instances as an array of courses
const findAllCourses = () => {
  return fetch(COURSES_URL).then((response) => response.json());
}

// retrieves a course instance that matches the id parameter
const findCourseById = (id) => {
  return fetch(`${COURSES_URL}/${id}`).then(response => response.json());
}

// updates the course instance whose id matches the id parameter.
// Updates the instance with values in course parameter
const updateCourse = (id, course) => {
  return fetch(`${COURSES_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(course)
  }).then(response => response.json());
}

// deletes course instance whose id matches the id parameter
const deleteCourse = (id) => {
  return fetch(`${COURSES_URL}/${id}`, {
    method: 'DELETE'
  }).then(response => response.json());
}

const api = {
  createCourse,
  findAllCourses,
  findCourseById,
  updateCourse,
  deleteCourse
}

export default api;