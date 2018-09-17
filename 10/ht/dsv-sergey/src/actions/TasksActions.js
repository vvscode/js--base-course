import getItem from '../utils/api';
import { ADD_TASK, LOAD_LIST, TOGGLE_CHECK } from '../constants/Tasks';

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

export function toggleDone(task) {
const doneItem = !task.done

    return {
        type: TOGGLE_CHECK,
        payload: {
            ...task, done: doneItem 
        }
    }
};

export const loadList = () => dispatch =>
  getItem().then(items => dispatch(loadList(items)));

