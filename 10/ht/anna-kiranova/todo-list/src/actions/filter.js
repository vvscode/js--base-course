import { FILTER_UPDATE } from '../constants/index';

export const filterUpdate = (name, value) => {
    return {
        type: FILTER_UPDATE,
        payload: {
            value,
            name
        }
        
    }
}