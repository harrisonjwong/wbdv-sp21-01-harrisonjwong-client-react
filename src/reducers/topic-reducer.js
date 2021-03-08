const initialState = {
  topics: []
};

const topicReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'CREATE_TOPIC':
      return {
        ...state,
        topics: [...state.topics, action.topic]
      };
    case 'FIND_TOPICS_FOR_LESSON':
      return {
        ...state,
        topics: action.topics
      }
    case 'FIND_TOPIC': //not needed
      return state;
    case 'UPDATE_TOPIC':
      return {
        ...state,
        topics: state.topics.map(t => {
          if (t._id === action.topicToUpdate._id) {
            return action.topicToUpdate;
          } else {
            return t;
          }
        })
      };
    case 'DELETE_TOPIC':
      return {
        ...state,
        topics: state.topics.filter(l => l._id !== action.topicToDelete._id)
      }
    default:
      return state;
  }
}

export default topicReducer;