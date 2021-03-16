const initialState = {
  widgets: []
};

const widgetReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'CREATE_WIDGET':
      return {
        ...state,
        widgets: [...state.widgets, action.widget]
      }
    case 'DELETE_WIDGET':
      return {
        ...state,
        widgets: state.widgets.filter(w => w.id !== action.widgetToDelete.id)
      }
    case 'UPDATE_WIDGET':
      return {
        ...state,
        widgets: state.widgets.map(w => {
          return w.id === action.widgetToUpdate.id
            ? action.widgetToUpdate : w;
        })
      }
    case 'FIND_ALL_WIDGETS_FOR_TOPIC':
      return {
        ...state,
        widgets: action.widgets
      }
    default:
      return state;
  }
};

export default widgetReducer;