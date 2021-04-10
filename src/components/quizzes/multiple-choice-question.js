import React, {useState, useEffect} from 'react';

const MultipleChoiceQuestion = ({question, questions, setQuestions, graded}) => {
  const [answer, setAnswer] = useState('');
  const choices = question.choices;
  const correctAnswer = graded && answer === question.correct;
  const incorrectAnswer = graded && answer !== question.correct;
  useEffect(() => {
    if (graded) {
      const foundQuestion = questions.find(q => q._id === question._id);
      const restOfQuestions = questions.filter(q => q._id !== question._id);
      foundQuestion.answer = answer;
      const newQuestions = [...restOfQuestions, foundQuestion];
      setQuestions(newQuestions);
    }
    //eslint-disable-next-line
  }, [graded])
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
    </div>
  );
}

export default MultipleChoiceQuestion;