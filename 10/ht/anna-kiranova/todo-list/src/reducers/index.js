import { combineReducers } from 'redux';

import tasks from './tasks';
import filter from './filter';

export default combineReducers({
    tasks,
    filter
});
