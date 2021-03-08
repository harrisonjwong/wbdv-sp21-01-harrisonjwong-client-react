import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import EditableItem from './editable-item';
import lessonService from '../../services/lesson-service'

const LessonTabs = ({
                      lessons = [],
                      findLessonsForModule,
                      createLesson,
                      deleteLesson,
                      updateLesson
                    }) => {
  const {layout, courseId, moduleId, lessonId} = useParams();
  useEffect(() => {
    if (moduleId !== 'undefined' && typeof moduleId !== 'undefined') {
      findLessonsForModule(moduleId)
    }
  }, [moduleId, lessonId, findLessonsForModule]);
  return (
    <div>
      <ul className='nav nav-tabs'>
        {
          lessons.map(lesson =>
            <li className='nav-item' key={lesson._id}>
              <EditableItem
                active={lesson._id === lessonId}
                to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lesson._id}`}
                item={lesson}
                deleteItem={deleteLesson}
                updateItem={updateLesson}
                highlight={''}/>
            </li>
          )
        }
        <li className='nav-item fas fa-plus fa-2x wbdv-clickable wbdv-add-item' key='add-item'
            onClick={() => createLesson(moduleId)}/>
      </ul>
    </div>
  );
};

const stpm = (state) => ({
  lessons: state.lessonReducer.lessons
});

const dtpm = (dispatch) => ({
  findLessonsForModule: (moduleId) => {
    lessonService.findLessonsForModule(moduleId)
      .then(actualLessons => dispatch({
        type: 'FIND_LESSONS_FOR_MODULE',
        lessons: actualLessons
      }));
  },
  createLesson: (moduleId) => {
    lessonService.createLesson(moduleId, {title: 'New Lesson'})
      .then(lessonFromServer => dispatch({
        type: 'CREATE_LESSON',
        lesson: lessonFromServer
      }));
  },
  deleteLesson: (lesson) => {
    lessonService.deleteLesson(lesson._id)
      .then(status => dispatch({
        type: 'DELETE_LESSON',
        lessonToDelete: lesson
      }));
  },
  updateLesson: (lesson) => {
    lessonService.updateLesson(lesson._id, lesson)
      .then(status => dispatch({
        type: 'UPDATE_LESSON',
        lessonToUpdate: lesson
      }));
  }
})

export default connect(stpm, dtpm)(LessonTabs);