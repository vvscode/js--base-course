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
                [action.name]: action.value
            };
    
        default:
            return state;
    }
}