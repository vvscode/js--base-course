import React, { Component } from 'react';

export default class Form extends Component {
  onSubmit = e => {
    e.preventDefault();
    if (e.target.querySelector('[name]').value) {
      let title = e.target.querySelector('[name]').value;
      let date = e.target.querySelector('#date').value || this.addCurrentDate();
      let priority = e.target.querySelector('#priority').options[
        e.target.querySelector('#priority').selectedIndex
      ].value;
      let description =
        e.target.querySelector('#description').value || 'No description';
      let task = { title, description, priority, date };
      this.props.addTaskByTable(task);
      e.target.reset();
    } else {
      alert('Add task title');
    }
  };

  addCurrentDate = () => {
    let currentDate = new Date();
    let year = currentDate.getFullYear();

    var writeFullDate = value => {
      return value < 10 ? '0' + value : value;
    };

    let month = writeFullDate(currentDate.getMonth() + 1);
    let day = writeFullDate(currentDate.getDate());

    return year + '-' + month + '-' + day;
  };

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        <fieldset className="form__field">
          <legend className="form__legend">Add your task</legend>
          <label className="form__label">
            <span className="form__text">Title</span>
            <input
              className="form__input"
              type="text"
              name="title"
              placeholder="Title"
            />
          </label>
          <label className="form__label">
            <span className="form__text">Priority</span>
            <select className="form__select" name="priority" id="priority">
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>
          <label className="form__label">
            <span className="form__text">Date</span>
            <input className="form__input" id="date" type="date" />
          </label>
          <label className="form__label">
            <span className="form__text">Description</span>
            <textarea
              className="form__textarea"
              name="description"
              id="description"
              cols="30"
              rows="10"
              placeholder="Add description"
            />
          </label>
          <button className="form__btn btn" type="submit">
            Add
          </button>
        </fieldset>
      </form>
    );
  }
}
