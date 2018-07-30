import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getDateFromNumber, handlerSelectComponent} from '../../helpers';
import {changeDateFrom} from '../../actions/filter';

class DateFrom extends Component {
  buildDateList () {
    if (!this.props.list) return null;
    const sortDates = this.props.list.sort((a,b) => {
      if (a.get('date') === b.get('date')) return 0;
      return (a.get('date') > b.get('date')) ? 1 : -1;
    });
    const startDate = +sortDates.first().get('date');
    const finishDate = +this.props.dateTo || +sortDates.last().get('date');
    const day = 24 * 60 * 60 * 1000;
    const result = [];
    for (let i = startDate; i <= finishDate; i += day) {
      const day = getDateFromNumber(i);
      result.push(<option key={day} value={i}>{day}</option>)
    };
    return result;
  }
  render () {
    return <select onChange={e => handlerSelectComponent(e.target, this.props.changeDateFrom.bind(this))}>{this.buildDateList()}</select>
  }
}

export default connect(
  state => ({
    list: state.table.get('list'),
    dateTo: state.filter.get('dateTo')
  }),
  {changeDateFrom}
)(DateFrom)