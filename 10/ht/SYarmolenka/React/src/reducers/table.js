import {List, Map} from 'immutable';
import {
  CHANGE_DONE,
  ADD_TASK,
  SORT_LIST,
  SET_LIST,
  SHOW_MESSAGE,
  HIDE_MESSAGE
} from '../actions/table';

const initState = Map({
  sort: '',
  message: 0
});

export default (state = initState, action) => {
  switch (action.type) {
    case CHANGE_DONE:
      return state.update('list', list => {
        const index = list.findIndex(item => item.get('id') === action.payload);
        if (index < 0) return list;
        return list.update(index, value => {
          return value.update('done', done => !done)
        });
      });
    case ADD_TASK:
      return state.update('list', list => list.push(Map(action.payload)));
    case SORT_LIST:
      return state.set('sort', action.payload);
    case SET_LIST:
      return state.set('list', List(action.payload).map(elem => Map(elem)));
    case SHOW_MESSAGE:
      return state.set('message', List(action.payload));
    case HIDE_MESSAGE:
      return state.update('message', val => null);
    default:
      return state;
  }
};
