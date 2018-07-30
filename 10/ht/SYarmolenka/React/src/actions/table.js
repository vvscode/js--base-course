const CHANGE_DONE = 'CHANGE_DONE',
  ADD_TASK = 'ADD_TASK',
  SORT_LIST = 'SORT_LIST',
  SET_LIST = 'SET_LIST',
  SHOW_MESSAGE = 'SHOW_MESSAGE',
  HIDE_MESSAGE = 'HIDE_MESSAGE';

const changeDone = payload => ({
  type: CHANGE_DONE,
  payload: +payload
});

const addTask = payload => ({
  type: ADD_TASK,
  payload
});

const sortList = payload => ({
  type: SORT_LIST,
  payload
});

const setList = payload => ({
  type: SET_LIST,
  payload
});

const showMessage = (id, message) => ({
  type: SHOW_MESSAGE,
  payload: [id, message]
});

const hideMessage = payload => ({
  type: HIDE_MESSAGE,
  payload
});

export {
  CHANGE_DONE,
  ADD_TASK,
  SORT_LIST,
  SET_LIST,
  SHOW_MESSAGE,
  HIDE_MESSAGE,
  changeDone,
  addTask,
  sortList,
  setList,
  showMessage,
  hideMessage
};
