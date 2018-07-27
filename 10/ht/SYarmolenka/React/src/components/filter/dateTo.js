import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getDateFromNumber, handlerSelectComponent} from '../../helpers';

class DateTo extends Component {
  state = {};
  static getDerivedStateFromProps (props, state) {
    if (!props.list) return null;
    const sortDates = props.list.sort((a,b) => {
      if (a.get('date') === b.get('date')) return 0;
      return (a.get('date') > b.get('date')) ? 1 : -1;
    });
    const startDate = +props.dateFrom || +sortDates.first().get('date');
    const finishDate = +sortDates.last().get('date');
    const day = 24 * 60 * 60 * 1000;
    const result = [];
    for (let i = startDate; i <= finishDate + day; i += day) result.push(i);
    const finish = props.dateTo || result[result.length - 1]
    return (state.finish !== finish) ? ({finish: finish, list: result}) : ({list: result});
  }
  render () {
    return <select
      value={this.state.finish}
      onChange={e => handlerSelectComponent(e.target, this.props.changeDateTo.bind(this))}>
      {(this.state.list) ? this.state.list.map(i => {
        const day = getDateFromNumber(i);
        return <option key={day} value={i}>{day}</option>
      }) : null}
    </select>
  }
}

export default connect(
  state => ({
    list: state.table.get('list'),
    dateFrom: state.filter.get('dateFrom'),
    dateTo: state.filter.get('dateTo')
  }),
  dispatch => ({
    changeDateTo (date) {dispatch({type: 'CHANGE_DATE_TO', payload: date})}
  })
)(DateTo)