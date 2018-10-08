import { ADD_TASK, TOGGLE_DONE } from '../constants';

export const addTask = (task) => ({
    type: ADD_TASK,
    payload: task
})

export const toggleDone = (id) => ({
    type: TOGGLE_DONE,
    id
})