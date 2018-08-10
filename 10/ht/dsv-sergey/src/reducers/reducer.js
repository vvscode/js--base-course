import { ADD_TASK, LOAD_LIST, TOGGLE_CHECK } from '../actions/tasks'

const DEFAULT_STATE = { 
    tasks: [{'title': 'df'}, {'title': 'hdjk'}],
    showDone: true
};



export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state, 
                tasks: [action.payload, ...state.tasks]  
            }

        case LOAD_LIST:
            return [...state, ...action.payload];
    
        case TOGGLE_CHECK:
            return state.map(item => item.id !== action.payload ? item : {...item, done: !item.done});
        default:
            return state;
    }
}