import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TaskItem extends Component {
  render() {
    const { title, priority, date } = this.props.task;
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

TaskItem.propTypes = {
  defaultChecked: PropTypes.bool,
  toggleDone: PropTypes.func,
  task: PropTypes.object
};
