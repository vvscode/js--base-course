import { TOGGLE_SHOW_DONE } from '../constants/ShowDone';

export function toggleShowDone(showDone) {

    return {
        type: TOGGLE_SHOW_DONE,
        payload: !showDone
    }
}