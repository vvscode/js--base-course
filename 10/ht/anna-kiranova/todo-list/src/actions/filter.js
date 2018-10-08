import { FILTER_UPDATE } from '../constants/index';

export const filterUpdate = (name, value) => ({
    type: FILTER_UPDATE,
    payload: {
        value,
        name
    }
})