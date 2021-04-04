import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import QuestionService from '../../services/question-service';
import QuizService from '../../services/quiz-service';
import Question from './question';

const Quiz = () => {
  const {courseId, quizId} = useParams();
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState({});
  useEffect(() => {
    QuestionService.findQuestionsForQuiz(quizId)
      .then(res => setQuestions(res));
    QuizService.findQuizById(quizId)
      .then(res => setQuiz(res));
  }, [quizId])
  return (
    <div className='container-fluid'>
      <div className='row'>
        <Link to={`/courses/${courseId}/quizzes`} className='fas fa-arrow-left fa-2x mt-2'/>
        <h1>{quiz.title}</h1>
      </div>
        {
          questions.map(question =>
          <div key={question._id}>
            <Question question={question}/>
          </div>
          )
        }
    </div>

  )
}

export default Quiz