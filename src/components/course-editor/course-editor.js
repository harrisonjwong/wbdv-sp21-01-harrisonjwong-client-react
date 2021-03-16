import React, {useEffect, useState} from 'react';
import moduleReducer from '../../reducers/module-reducer';
import lessonReducer from '../../reducers/lesson-reducer';
import topicReducer from '../../reducers/topic-reducer';
import widgetReducer from '../../reducers/widget-reducer';
import {combineReducers, createStore} from 'redux';
import {Link, useParams} from 'react-router-dom';
import {Provider} from 'react-redux';
import ModuleList from './module-list';
import LessonTabs from './lesson-tabs';
import TopicPills from './topic-pills';
import courseService from '../../services/course-service';
import WidgetList from '../widgets/widget-list';

const reducer = combineReducers({
  moduleReducer,
  lessonReducer,
  topicReducer,
  widgetReducer
});

const store = createStore(reducer);

const CourseEditor = () => {
  const { layout, courseId, moduleId, lessonId, topicId } = useParams();
  const [courseName, setCourseName] = useState('')
  useEffect(() => {
    courseService.findCourseById(courseId).then((res) => {
      setCourseName(res.name);
    })
  }, [courseId])
  return (
    <Provider store={store}>
      <div className='wbdv-editor-bottom-padding'>
        <h2>
          <Link to={`/courses/${layout}`}>
            <i className='fas fa-times wbdv-close-editor-button'/>
          </Link>
          Editor for {courseName}
        </h2>
        <div className='row'>
          <div className='col-4'>
            <ModuleList/>
          </div>
          <div className='col-8'>
            {
              moduleId && <LessonTabs/>
            }
            <br/>
            {
              lessonId && <TopicPills/>
            }
            <br/>
            {
              topicId && <WidgetList/>
            }
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default CourseEditor;