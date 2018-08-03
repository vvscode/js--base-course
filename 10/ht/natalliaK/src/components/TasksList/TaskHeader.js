import React, { Component } from 'react';
import { ButtonSort } from './ButtonsSort';

export default class TaskHeader extends Component {
  render() {
    const colOfHeader = ['Done', 'Title', 'Priority', 'Date'];
    return (
      <thead>
        <tr className="table__header">
          {colOfHeader.map(colName => (
            <th key={colName} className="table__cell table__header-cell">
              <span>{colName}</span>
              <ButtonSort sortTasks={this.props.sortTasks} colName={colName} />
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}
