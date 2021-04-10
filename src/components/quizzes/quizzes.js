import React, {useState, useEffect} from 'react';
import QuizzesService from '../../services/quiz-service';
import {Link, useParams} from 'react-router-dom';

const Quizzes = () => {
  const {courseId} = useParams();
  const [quizzes, setQuizzes] = useState([]);
  useEffect(() => {
    QuizzesService.findAllQuizzes()
      .then(res => setQuizzes(res));
  }, [])
  return (
    <div className='container-fluid'>
      <div className='row'>
        <Link to='/' className='fas fa-arrow-left fa-2x mt-2'/>
        <h1>Quizzes</h1>
      </div>
      <ul className='list-group'>
        {
          quizzes.map(quiz => <li className='list-group-item' key={quiz._id}>
            <Link className='col-10' to={`/courses/${courseId}/quizzes/${quiz._id}`}>{quiz.title}</Link>
            <Link className='btn btn-secondary float-right ml-1'
                  to={`/courses/${courseId}/quizzes/${quiz._id}/results`}>Results</Link>
            <Link to={`/courses/${courseId}/quizzes/${quiz._id}`} className='float-right btn btn-primary'>Start</Link>
          </li>)
        }
      </ul>
    </div>
  );
}

export default Quizzes