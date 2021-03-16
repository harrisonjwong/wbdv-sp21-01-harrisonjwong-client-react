import React from 'react';

const ParagraphWidget = ({widget, editing, setEditing}) => {
  const onChangeTextarea = (text) => {
    const withoutCurrWidget = editing.filter(w => w.id !== widget.id);
    widget.text = text;
    setEditing([...withoutCurrWidget, widget])
  }

  return (
    <div>
      {
        !editing.includes(widget) && <p>{widget.text}</p>
      }
      {
        editing.includes(widget) &&
        <textarea
          onChange={e => onChangeTextarea(e.target.value)}
          value={widget.text}
          className='form-control'
          rows={5}/>
      }
    </div>
  );
}

export default ParagraphWidget;