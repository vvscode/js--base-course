const CHANGE_TODAY = 'CHANGE_TODAY',
  CHANGE_COMPLETED = 'CHANGE_COMPLETED',
  CHANGE_DATE_FROM = 'CHANGE_DATE_FROM',
  CHANGE_DATE_TO = 'CHANGE_DATE_TO',
  CHANGE_SEARCH = 'CHANGE_SEARCH';

const changeToday = _ => ({type: CHANGE_TODAY});

const changeCompleted = _ => ({type: CHANGE_COMPLETED});

const changeDateFrom = payload => ({
  type: CHANGE_DATE_FROM,
  payload: +payload
});

const changeDateTo = payload => ({
  type: CHANGE_DATE_TO,
  payload: +payload
});

const changeText = payload => ({
  type: CHANGE_SEARCH,
  payload
});

export {
  CHANGE_TODAY,
  CHANGE_COMPLETED,
  CHANGE_DATE_FROM,
  CHANGE_DATE_TO,
  CHANGE_SEARCH,
  changeToday,
  changeCompleted,
  changeDateFrom,
  changeDateTo,
  changeText
};
