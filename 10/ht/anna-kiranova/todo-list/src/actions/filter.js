import { FILTER_UPDATE } from '../constants/index';

export const filterUpdate = (event) => {
    let el = event.target;
    let name = el.getAttribute('name');
    let value;
    if (el.type === 'checkbox') {
        value = el.checked;
    } else {
        value = el.value;
    }

    return {
        type: FILTER_UPDATE,
        value,
        name
    }
}