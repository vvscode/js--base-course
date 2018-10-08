import { SORT_TASKS } from '../constants/index';

const DEFAULT_STATE = {
    field: 'title',
    direction: 'no'
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case SORT_TASKS:
            return {
                ...action.payload,
            };
    
        default:
            return state;
    }
}