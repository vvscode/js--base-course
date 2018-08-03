import React, { Component } from 'react';

export default class TaskItem extends Component {
  render() {
    const { title, priority, date } = this.props.tasks;

    return (
      <tr>
        <td className="table__cell">
          <input
            className="form__check"
            data-type="check"
            type="checkbox"
            defaultChecked={this.props.defaultChecked}
            onClick={() => {
              this.props.toggleDone(this.props.id);
            }}
          />
        </td>
        <td data-type="title" className="table__cell">
          {title}
        </td>
        <td className="table__cell">{priority}</td>
        <td className="table__cell">{date}</td>
      </tr>
    );
  }
}
