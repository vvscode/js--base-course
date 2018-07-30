const CHANGE_TITLE = 'CHANGE_TITLE',
  CHANGE_PRIORITY = 'CHANGE_PRIORITY',
  CHANGE_DATE = 'CHANGE_DATE',
  CHANGE_TASK = 'CHANGE_TASK';

const changeTitle = payload => ({
  type: CHANGE_TITLE,
  payload
});

const changePriority = payload => (dispatch, getState) => {
  setTimeout(_ => {
    dispatch({
      type: CHANGE_PRIORITY,
      payload: +payload
    });
  }, 2000);
};

const changeDate = payload => ({
  type: CHANGE_DATE,
  payload: +payload
});

const changeTask = payload => ({
  type: CHANGE_TASK,
  payload
});

export {
  CHANGE_TITLE,
  CHANGE_PRIORITY,
  CHANGE_DATE,
  CHANGE_TASK,
  changeTitle,
  changePriority,
  changeDate,
  changeTask
};
