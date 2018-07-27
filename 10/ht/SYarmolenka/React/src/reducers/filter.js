import {Map} from 'immutable';

const initState = Map({
  today: false,
  completed: false,
  dateFrom: '',
  dateTo: '',
  text: ''
});

export default (state = initState, action) => {
  switch (action.type) {
    case 'CHANGE_TODAY':
      return state.update('today', val => !val);
    case 'CHANGE_COMPLETED':
      return state.update('completed', val => !val);
    case 'CHANGE_DATE_FROM':
      return state.set('dateFrom', +action.payload);
    case 'CHANGE_DATE_TO':
      return state.set('dateTo', +action.payload);
    case 'CHANGE_SEARCH':
      return state.set('text', action.payload);
    default:
      return state;
  }
};