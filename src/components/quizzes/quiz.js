import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import QuestionService from '../../services/question-service';
import QuizService from '../../services/quiz-service';
import Question from './question';

const Quiz = () => {
  const {courseId, quizId} = useParams();
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState({});
  const [graded, setGraded] = useState(false)
  const [results, setResults] = useState({})
  useEffect(() => {
    QuestionService.findQuestionsForQuiz(quizId)
      .then(res => setQuestions(res));
    QuizService.findQuizById(quizId)
      .then(res => setQuiz(res));
    if (graded) {
      QuizService.submitQuiz(quiz._id, questions).then(res => setResults(res));
    }
    //eslint-disable-next-line
  }, [quizId, graded])
  return (
    <div className='container-fluid'>
      <div className='row'>
        <Link to={`/courses/${courseId}/quizzes`} className='fas fa-arrow-left fa-2x mt-2'/>
        <h1>{quiz.title}</h1>
      </div>
        {
          questions.map(question =>
          <div key={question._id}>
            <Question question={question}
                      questions={questions}
                      setQuestions={setQuestions}
                      graded={graded}/>
          </div>
          )
        }
        <div>
          <button onClick={() => setGraded(true)}
                      className='btn btn-success'
                      disabled={graded}>
                Grade
          </button>
          {
            graded &&
            <div>
              <p>
                Your submission ID is: {results._id}
              </p>
              <Link className='btn btn-secondary'
                            to={`/courses/${courseId}/quizzes/${quizId}/results`}>See Results</Link>
            </div>
          }
        </div>
    </div>

  )
}

export default Quiz