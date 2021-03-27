import React, {useEffect, useState} from 'react';
import widgetService from '../../services/widget-service';
import {connect} from 'react-redux';
import HeadingWidget from './heading-widget';
import ParagraphWidget from './paragraph-widget';
import {useParams} from 'react-router-dom';
import ImageWidget from './image-widget';
import ListWidget from './list-widget';

const WidgetList = (
  {
    widgets,
    createWidget,
    deleteWidget,
    updateWidget,
    findAllWidgetsForTopic
  }
) => {
  const {topicId} = useParams();
  const [editing, setEditing] = useState([]);
  useEffect(() => {
    if (topicId !== 'undefined' && typeof topicId !== 'undefined') {
      findAllWidgetsForTopic(topicId);
    }
  }, [findAllWidgetsForTopic, topicId]);

  const onClickEdit = (widget) => {
    setEditing([...editing, widget])
  }

  const onClickSave = (widget) => {
    setEditing(editing.filter(w => w.id !== widget.id))
    updateWidget(widget.id, widget);
  }

  const onClickTrash = (widget) => {
    setEditing(editing.filter(w => w.id !== widget.id));
    deleteWidget(widget);
  }
  const onChangeType = (widget, type) => {
    const withoutCurrWidget = editing.filter(w => w.id !== widget.id);
    widget.type = type;
    if (!widget.size) {
      widget.size = 1;
    }
    setEditing([...withoutCurrWidget, widget])
  }

  return (
    <div>
      <i className='fas fa-plus fa-2x wbdv-clickable wbdv-add-item float-right'
         onClick={() => createWidget(topicId)}
      />
      <h5>Widgets</h5>
      <ul className='list-group'>
        {
          widgets.map(widget =>
            <li className='list-group-item' key={widget.id}>
              {
                !editing.includes(widget) &&
                <i className='fas fa-cog float-right wbdv-clickable' onClick={() => onClickEdit(widget)}/>
              }
              {
                editing.includes(widget) &&
                <div>
                  <i className='fas fa-trash float-right wbdv-clickable'
                     onClick={() => onClickTrash(widget)}/>
                  <i className='fas fa-check float-right wbdv-clickable'
                     onClick={() => onClickSave(widget)}/>
                </div>
              }
              {
                editing.includes(widget) &&
                  <select className='form-control mb-2'
                          value={widget.type}
                          onChange={(e) =>
                            onChangeType(widget, e.target.value)}>
                    <option value='PARAGRAPH'>Paragraph</option>
                    <option value='HEADING'>Heading</option>
                    <option value='LIST'>List</option>
                    <option value='IMAGE'>Image</option>
                  </select>
              }
              {
                widget.type === 'HEADING' &&
                <HeadingWidget widget={widget}
                               editing={editing}
                               setEditing={setEditing}/>
              }
              {
                widget.type === 'PARAGRAPH' &&
                <ParagraphWidget widget={widget}
                                 editing={editing}
                                 setEditing={setEditing}/>
              }
              {
                widget.type === 'IMAGE' &&
                <ImageWidget widget={widget}
                                 editing={editing}
                                 setEditing={setEditing}/>
              }
              {
                widget.type === 'LIST' &&
                <ListWidget widget={widget}
                                 editing={editing}
                                 setEditing={setEditing}/>
              }
            </li>
          )
        }
      </ul>
    </div>
  );
}

const stpm = (state) => ({
  widgets: state.widgetReducer.widgets
})

const dtpm = (dispatch) => ({
  createWidget: (topicId) => {
    const defaultWidget = {
      type: 'HEADING',
      size: 1,
      text: 'New Widget',
      height: 0,
      width: 0,
      url: '',
      value: 'UNORDERED'
    }
    widgetService.createWidget(topicId, defaultWidget)
      .then(widgetFromServer => dispatch({
        type: 'CREATE_WIDGET',
        widget: widgetFromServer
      }));
  },
  deleteWidget: (widget) => {
    widgetService.deleteWidget(widget.id)
      .then(() => dispatch({
        type: 'DELETE_WIDGET',
        widgetToDelete: widget
      }))
  },
  updateWidget: (widgetId, widget) => {
    widgetService.updateWidget(widgetId, widget)
      .then(() => dispatch({
        type: 'UPDATE_WIDGET',
        widgetToUpdate: widget
      }))
  },
  findAllWidgetsForTopic: (topicId) => {
    widgetService.findWidgetsForTopic(topicId)
      .then(actualWidgets => dispatch({
        type: 'FIND_ALL_WIDGETS_FOR_TOPIC',
        widgets: actualWidgets
      }));
  }
})

export default connect(stpm, dtpm)(WidgetList);