import { FILTER_UPDATE } from '../constants/index';

const DEFAULT_STATE = {
    showCompl: true,
    from: '',
    to: '',
    search: ''
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case FILTER_UPDATE:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            };
    
        default:
            return state;
    }
}