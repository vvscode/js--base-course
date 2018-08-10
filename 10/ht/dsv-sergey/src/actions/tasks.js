import getItem from '../api';

export const ADD_TASK = 'ADD_TASK';
export const LOAD_LIST = 'LOAD_LIST';
export const TOGGLE_CHECK = 'TOGGLE_CHECK';

export const addTask = (itemProps) => ({
    type: ADD_TASK,
    payload: {
        id: Date.now(),
        ...itemProps
    }
});

export const loadItems = payload => ({
    type: LOAD_LIST,
    payload,
});

export const toggleCheck = payload => ({
    type: TOGGLE_CHECK,
    payload,
});

export const loadList = () => dispatch =>
  getItem().then(items => dispatch(loadList(items)));

export const showChecked = () => ({});

export const toggleShowDone = () => ({});