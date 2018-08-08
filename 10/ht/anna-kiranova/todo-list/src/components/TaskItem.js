import React from 'react';

import { Table } from 'semantic-ui-react'

export default ({ task, toggleDone }) => (
  <Table.Row>
    <Table.Cell>
      <input type="checkbox" checked={task.done} onChange={() => {
        toggleDone(task.id)
      }} />
    </Table.Cell>
    <Table.Cell title={task.descr} >
        {task.title}
    </Table.Cell>
    <Table.Cell>
        {task.priority}
    </Table.Cell>
    <Table.Cell>
        {task.date}
    </Table.Cell>
  </Table.Row>
)