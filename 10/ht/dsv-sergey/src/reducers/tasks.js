import { ADD_TASK, LOAD_LIST, TOGGLE_CHECK } from '../constants/Tasks'

const DEFAULT_STATE = { 
    tasks: [
        {
          id: 1534954046274,
          done: false,
          title: 'Встреча',
          priority: 'Low',
          date: '2018-08-08',
          description: 'Может сходить?'
        },
        {
          id: 1534967582968,
          done: false,
          title: 'Бассейн',
          priority: 'Medium',
          date: '2018-08-30',
          description: 'Взять шапочку ))))'
        },
      {
        id: 1534967960991,
        done: false,
        title: 'Уроки английского',
        priority: 'Medium',
        date: '2018-08-29',
        description: 'Начало в 19.00'
      }
      ]
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                tasks: [...state.tasks, action.payload]  
            };

        case LOAD_LIST:
            return [...state, ...action.payload];
    
        case TOGGLE_CHECK: 
            const { payload: newItem } = action;
            
            return {
                tasks: state.tasks.map((item) => { return ((item.id === newItem.id) ? {...item, done: newItem} : item)})
            }
        default:
            return state;
    }
}