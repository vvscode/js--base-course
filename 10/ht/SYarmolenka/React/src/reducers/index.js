import {combineReducers} from 'redux';
import add from './add';
import filter from './filter';
import table from './table';

export default combineReducers({add, filter, table});