import React from 'react'
import AddTaskForm from './AddTaskForm'
import FilterTasksForm from './FilterTasksForm'
import TasksList from './TasksList'

const App = () => <React.Fragment>
          <AddTaskForm />
          <FilterTasksForm  />
          <TasksList />
      </React.Fragment>

export default App;
