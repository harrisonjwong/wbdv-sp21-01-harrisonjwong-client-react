const WIDGETS_URL = 'http://localhost:8080/api';
// const WIDGETS_URL = 'https://wbdv-sp21-harrisonjwong-java.herokuapp.com/api';

export const createWidget = (tid, widget) =>
  fetch(`${WIDGETS_URL}/topics/${tid}/widgets`, {
    method: 'POST',
    body: JSON.stringify(widget),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json());

export const findWidgetsForTopic = (tid) =>
  fetch(`${WIDGETS_URL}/topics/${tid}/widgets`)
    .then(response => response.json());

export const updateWidget = (wid, widget) =>
  fetch(`${WIDGETS_URL}/widgets/${wid}`, {
    method: 'PUT',
    body: JSON.stringify(widget),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json());

export const deleteWidget = (wid) =>
  fetch(`${WIDGETS_URL}/widgets/${wid}`, {
    method: 'DELETE'
  }).then(response => response.json());

const widgetService = {
  createWidget,
  findWidgetsForTopic,
  updateWidget,
  deleteWidget
};

export default widgetService;