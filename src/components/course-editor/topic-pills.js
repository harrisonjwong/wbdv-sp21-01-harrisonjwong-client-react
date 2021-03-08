import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import EditableItem from './editable-item';
import topicService from '../../services/topic-service'

const TopicPills = ({
                      topics = [],
                      findTopicsForLesson,
                      createTopic,
                      deleteTopic,
                      updateTopic
                    }) => {
  const {layout, courseId, moduleId, lessonId, topicId} = useParams();
  useEffect(() => {
    if (lessonId !== 'undefined' && typeof lessonId !== 'undefined') {
      findTopicsForLesson(lessonId);
    }
  }, [moduleId, lessonId, topicId, findTopicsForLesson]);
  return (
    <div>
      <ul className='nav nav-pills'>
        {
          topics.map(topic =>
            <li className='nav-item' key={topic._id}>
              <EditableItem
                active={topic._id === topicId}
                to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lessonId}/topics/${topic._id}`}
                item={topic}
                deleteItem={deleteTopic}
                updateItem={updateTopic}
                highlight={`${topic._id === topicId ? 'wbdv-link-white' : ''}`}/>
            </li>
          )
        }
        <li className='nav-item fas fa-plus fa-2x wbdv-clickable wbdv-add-item'
            onClick={() => createTopic(lessonId)}>
        </li>
      </ul>
    </div>
  );
};

const stpm = (state) => ({
  topics: state.topicReducer.topics
});

const dtpm = (dispatch) => ({
  findTopicsForLesson: (lessonId) => {
    topicService.findTopicsForLesson(lessonId)
      .then(actualTopics => dispatch({
        type: 'FIND_TOPICS_FOR_LESSON',
        topics: actualTopics
      }));
  },
  createTopic: (lessonId) => {
    topicService.createTopic(lessonId, {title: 'New Topic'})
      .then(topicFromServer => dispatch({
        type: 'CREATE_TOPIC',
        topic: topicFromServer
      }));
  },
  deleteTopic: (topic) => {
    topicService.deleteTopic(topic._id)
      .then(status => dispatch({
        type: 'DELETE_TOPIC',
        topicToDelete: topic
      }));
  },
  updateTopic: (topic) => {
    topicService.updateTopic(topic._id, topic)
      .then(status => dispatch({
        type: 'UPDATE_TOPIC',
        topicToUpdate: topic
      }));
  }
})

export default connect(stpm, dtpm)(TopicPills);