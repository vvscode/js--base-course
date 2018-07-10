import {Map} from 'immutable';

const initState = Map({
  method: 'xhr',
  position: [0, 0],
  zoom: 10,
  city: null,
  weather: null,
  search: '',
  mainPage: false,
  hashHistoryPush: null
});

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'CHANGE_METHOD':
      return state.update('method', method => method === 'xhr' ? 'fetch' : 'xhr');
    case 'SAVE_POSITION':
      return state.update('position', _ => action.payload);
    case 'SAVE_ZOOM':
      return state.update('zoom', _ => action.payload);
    case 'CHANGE_WEATHER':
      return state.update('weather', _ => action.payload);
    case 'CHANGE_CITY':
      return state.update('city', _ => action.payload);
    case 'ENTER_SEARCH':
      return state.update('search', _ => action.payload);
    case 'ADD_TO_HISTORY':
      const cities = state.get('history').filter(item => item !== action.payload);
      if (cities.size === 5) {
        return state.update('history', _ => cities.pop().unshift(action.payload));
      } else {
        return state.update('history', _ => cities.unshift(action.payload));
      }
    case 'ADD_TO_FAVORITE':
      const favorites = state.get('favorite').filter(item => item !== action.payload);
      return state.update('favorite', _ => favorites.unshift(action.payload));
    case 'CREATE_HISTORY_LIST':
      return state.set('history', action.payload);
    case 'CREATE_FAVORITE_LIST':
      return state.set('favorite', action.payload);
    case 'DELETE_CITY_FROM_FAVORITE':
      return state.update('favorite', list => list.delete(action.payload));
    case 'SET_MAIN_PAGE':
      return state.update('mainPage', _ => action.payload);
    case 'SAVE_HASH_HISTORY':
      return state.update('hashHistoryPush', _ => action.payload);
    default:
      return state;
  }
};

export {reducer};
