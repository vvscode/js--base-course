import { ADD_TASK, TOGGLE_DONE } from '../constants/index';

const DEFAULT_STATE = [];

export default (state = DEFAULT_STATE, action) => {
    console.log('tasks reducer', action);
    switch (action.type) {
        case ADD_TASK:
            return [...state, action.data];
        case TOGGLE_DONE:
            return state.map(task => {
                let copy = {...task}
                if (copy.id === action.id) {
                    copy.done = !copy.done;
                }
                return copy;
            })
        
        default:
            return state;
    }
}