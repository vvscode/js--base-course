import {Map} from 'immutable';

const initState = Map({
  title: '',
  priority: 2,
  date: Date.now(),
  task: ''
});

export default (state = initState, action) => {
  switch (action.type) {
    case 'CHANGE_TITLE':
      return state.set('title', action.payload);
    case 'CHANGE_PRIORITY':
      return state.set('priority', +action.payload);
    case 'CHANGE_DATE':
      return state.set('date', +action.payload);
    case 'CHANGE_TASK':
      return state.set('task', action.payload);
    default:
      return state;
  }
};