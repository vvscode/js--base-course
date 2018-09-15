import { SORT_TASKS } from '../constants';

export const sortTasks = (field, direction) => ({
        type: SORT_TASKS,
        payload: {
            field,
            direction
        }

})
