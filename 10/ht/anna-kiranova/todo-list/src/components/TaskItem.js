import React from 'react';

import { Table } from 'semantic-ui-react';

let labels = {
  '': '',
  '1': 'Low',
  '2': 'Medium',
  '3': 'High'
}

export const TaskItem = ({ task, toggleDone }) => (
  <Table.Row>
    <Table.Cell>
      <input type="checkbox" checked={task.done} onChange={() => toggleDone(task.id) } />
    </Table.Cell>
    <Table.Cell title={task.descr} >
        {task.title}
    </Table.Cell>
    <Table.Cell>
        {labels[task.priority]}
    </Table.Cell>
    <Table.Cell>
        {task.date}
    </Table.Cell>
  </Table.Row>
)