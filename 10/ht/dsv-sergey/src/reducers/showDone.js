import { TOGGLE_SHOW_DONE } from '../constants/ShowDone'

const DEFAULT_STATE = { 
    showDone: false
};



export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {

        case TOGGLE_SHOW_DONE:
            return {
                ...state,
                showDone: action.payload
            }

        default:
            return state;
    }
}