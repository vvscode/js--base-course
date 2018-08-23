import { combineReducers } from 'redux';
import showDone from './showDone';
import tasks from './tasks';

export default combineReducers ({
    showDone,
    tasks
});