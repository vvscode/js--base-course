import { combineReducers } from 'redux';

import tasks from './tasks';
import filter from './filter';
import sort from './sort';

export default combineReducers({
    tasks,
    filter,
    sort
});
