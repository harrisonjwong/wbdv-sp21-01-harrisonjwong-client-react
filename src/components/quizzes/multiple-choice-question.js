import React, {useState} from 'react';

const MultipleChoiceQuestion = ({question}) => {
  const [answer, setAnswer] = useState('');
  const [graded, setGraded] = useState(false);
  const choices = question.choices;
  const correctAnswer = graded && answer === question.correct;
  const incorrectAnswer = graded && answer !== question.correct;
  return (
    <div className='p-4 border rounded'>
      <h4>{question.question}
         {correctAnswer && <i className='fas fa-check text-success ml-1'/>}
        {incorrectAnswer && <i className='fas fa-times text-danger ml-1'/>}</h4>
      <ul className='list-group'>
        {
          choices.map(choice => {
            const isCorrectAnswer = graded && question.correct === choice;
            const isSelectedButIncorrect = graded && question.correct !== answer && answer === choice;
            return (<li className={`list-group-item ${isCorrectAnswer ? 'list-group-item-success' : ''} 
            ${isSelectedButIncorrect ? 'list-group-item-danger' : ''}`} key={`${choice}${Math.random()*1000}`}>
              <label>
                <input type='radio'
                       value={choice}
                       checked={answer === choice}
                       name={question._id}
                       disabled={graded}
                       onChange={e => setAnswer(e.target.value)}/>
                {choice}
              </label>
              {
                isCorrectAnswer && <i className='fas fa-check float-right text-success'/>
              }
              {
                isSelectedButIncorrect && <i className='fas fa-times float-right text-danger'/>
              }
            </li>)
          })
        }
      </ul>
      <div className='mt-3 mb-3'>
        Your Answer: {answer}
      </div>
      <div className='row'>
        <div className='col-2'>
          <button onClick={() => setGraded(true)}
                  className='btn btn-success'
                  disabled={graded}>
            Grade
          </button>
        </div>
      </div>
    </div>
  );
}

export default MultipleChoiceQuestion;