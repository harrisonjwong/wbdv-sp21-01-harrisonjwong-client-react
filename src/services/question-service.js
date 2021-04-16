// const QUIZZES_URL = 'http://localhost:3001/api/quizzes';
const QUIZZES_URL = 'https://wbdv-sp21-harrisonjwong-node.herokuapp.com/api/quizzes';

export const findQuestionsForQuiz = (qid) =>
  fetch(`${QUIZZES_URL}/${qid}/questions`)
    .then(response => response.json())

const api = {
  findQuestionsForQuiz
}

export default api;
