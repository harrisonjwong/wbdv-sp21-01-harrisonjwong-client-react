// const QUIZZES_URL = 'http://localhost:3001/api/quizzes';
const QUIZZES_URL = 'https://wbdv-sp21-harrisonjwong-node.herokuapp.com/api/quizzes';

export const findAllQuizzes = () =>
  fetch(QUIZZES_URL)
    .then(response => response.json());

export const findQuizById = (qid) =>
  fetch(`${QUIZZES_URL}/${qid}`)
    .then(response => response.json())

export const submitQuiz = (qid, questions) =>
  fetch(`${QUIZZES_URL}/${qid}/attempts`, {
    method: 'POST',
    body: JSON.stringify(questions),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json());

export const getQuizResults = (qid) =>
  fetch(`${QUIZZES_URL}/${qid}/attempts`)
    .then(response => response.json());

const api = {
  findAllQuizzes, findQuizById, submitQuiz, getQuizResults
}

export default api;
