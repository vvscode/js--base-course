import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getDateFromNumber, handlerSelectComponent} from '../../helpers';

class DateComponent extends Component {
  constructor (props) {
    super(props);
    this.dates = this.getDateList();
  };
  getDateList () {
    const dates = [];
    const day = 24*60*60*1000;
    const date = Date.now();
    const lastYear = +new Date(date + 365 * day);
    for (let i = date; i <= lastYear; i += day) {
      const date = getDateFromNumber(i);
      dates.push(<option key={date} value={i}>{date}</option>)
    };
    return dates;
  };
  render () {
    return (
      <select value={this.props.date}
        onChange={e => handlerSelectComponent(e.target, this.props.changeDate.bind(this))}>
        {this.dates}
      </select>
    );
  }
};

export default connect(
  state => ({
    date: state.add.get('date')
  }),
  dispatch => ({
    changeDate (date) {dispatch({type: 'CHANGE_DATE', payload: date})}
  })
)(DateComponent);
