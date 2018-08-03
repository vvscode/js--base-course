import React, { Component } from 'react';
import search from '../img/search.png';

export default class FilterTasks extends Component {
  static defaultProps = {
    checked: false
  };

  dateFrom = dir => {
    var list = this.props.sortTasks('Date');
    let tasks = list[0];
    let changeList = list[1];

    if (dir === 'asc' && changeList) {
      tasks.reverse();
    }

    var date = [];
    tasks.forEach(elem => {
      if (!date.includes(elem.tasks.date)) {
        date = [...date, elem.tasks.date];
      }
    });

    return date;
  };

  render() {
    return (
      <form className="form" id="filter">
        <fieldset className="form__field">
          <legend className="form__legend">Filter</legend>
          <label className="form__label">
            <span className="form__text">Show completed</span>
            <input
              className="form__check"
              type="checkbox"
              onClick={this.props.toggleShowDone}
            />
          </label>
          <label className="form__label">
            <span>Date from:</span>
            <select
              className="form__select"
              name="dateFrom"
              id="dateFrom"
              data-name="asc"
              onChange={this.props.selectDate}
            >
              {this.dateFrom('asc').map(elem => (
                <option key={elem} value={elem}>
                  {elem}
                </option>
              ))}
            </select>
          </label>
          <label className="form__label">
            <span className="form__text">Date to:</span>
            <select
              className="form__select"
              name="dateTo"
              id="dateTo"
              data-name="desc"
              onChange={this.props.selectDate}
            >
              {this.dateFrom('desc').map(elem => (
                <option key={elem} value={elem}>
                  {elem}
                </option>
              ))}
            </select>
          </label>
          <label className="form__label">
            <span className="form__text">
              Search in the text and the description:
            </span>
            <div className="form__search-wrap">
              <input
                className="form__input form__input--search"
                type="search"
              />
              <img
                className="form__img"
                src={search}
                alt="search"
                onClick={this.props.search}
              />
            </div>
          </label>
        </fieldset>
      </form>
    );
  }
}
