import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import QuizService from '../../services/quiz-service';

const QuizResults = () => {
  const {courseId, quizId} = useParams();
  const [results, setResults] = useState([]);
  useEffect(() => {
    QuizService.getQuizResults(quizId)
      .then(res => setResults(res));
  }, [quizId])
  return (
    <div className='container-fluid'>
      <div className='row'>
        <Link to={`/courses/${courseId}/quizzes`} className='fas fa-arrow-left fa-2x mt-2'/>
        <h1>Quiz Results</h1>
      </div>
      <table className='table'>
        <thead>
        <tr>
          <th>Number</th>
          <th>ID</th>
          <th>Score</th>
        </tr>
        </thead>
        <tbody>
        {
          results.map((r, num) =>
            <tr key={r._id}>
              <td>
                {num}
              </td>
              <td>
                {r._id}
              </td>
              <td>
                {r.score}
              </td>
            </tr>
          )
        }
        </tbody>
      </table>
    </div>
  );
}

export default QuizResults;