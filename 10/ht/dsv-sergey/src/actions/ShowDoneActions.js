import { TOGGLE_SHOW_DONE } from '../constants/ShowDone';

export const toggleShowDone = (showDone) => ({
    type: TOGGLE_SHOW_DONE,
    payload: !showDone
})