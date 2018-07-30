import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {connect} from 'react-redux';
import {getDateFromNumber} from '../../helpers';
import {sentDataToStorage} from '../../storage';
import {
  changeDone,
  setList,
  showMessage,
  hideMessage
} from '../../actions/table';
import spinner from './loader.gif';

const styled = {
  item: {
    '&>td': {
      minWidth: '4em',
      maxWidth: '15em',
      overflow: 'hidden',
      textAlign: 'center',
      '&:first-child, &:nth-child(3), &:last-child': {
        width: '4em',
        textAlign: 'center'
      },
      '&:nth-child(3), &:last-child': {
        width: '7em'
      },
    }
  },
  spinner: {
    width: '4em',
    marginTop: '1em'
  }
};

class Tbody extends Component {
  constructor(props) {
    super(props);
    this.props.setList();
  };
  showMessage = (id) => {
    this.props.list.forEach(item => {
      if (item.get('id') === id) {
        this.props.showMessage(id, item.get('task'));
      };
    });
  };
  hideMessage = (id) => {
    this.props.hideMessage(id);
  };
  buildList () {
    return this.sortList(this.runThroughFilters(this.props.list)).map(item => {
      return (
        <tr key={item.get('id')}
          id={item.get('id')}
          className={this.props.classes.item}
          >
          <td>
            <input type="checkbox" checked={item.get('done')} onChange={e => this.props.changeDone(e.target.closest('tr').id)} />
          </td>
          <td
            onMouseEnter={_ => this.showMessage(item.get('id'))}
            onMouseLeave={_ => this.hideMessage(item.get('id'))}>
          {item.get('title')}</td>
          <td>{['Low', 'Medium', 'High'][+item.get('priority')]}</td>
          <td>{getDateFromNumber(item.get('date'))}</td>
        </tr>
      )
    })
  };
  runThroughFilters (list) {
    return list.filter(item => {
      if (this.props.filters.get('today')) {
        const current = getDateFromNumber(Date.now()).match(/\d{2,4}/g);
        const today = +new Date(current[2], current[1] - 1, current[0]);
        const tomorrow = +new Date(current[2], current[1] - 1, +current[0] + 1);
        if (item.get('date') < today || item.get('date') >= tomorrow) return false;
      };
      if (!this.props.filters.get('completed') && item.get('done')) return false;
      if (this.props.filters.get('dateFrom') && item.get('date') < this.props.filters.get('dateFrom')) return false;
      if (this.props.filters.get('dateTo') && item.get('date') > this.props.filters.get('dateTo')) return false;
      if (this.props.filters.get('text')) {
        const str = this.props.filters.get('text');
        if (item.get('title').indexOf(str) < 0 && item.get('task').indexOf(str) < 0) return false;
      };
      return true;
    })
  };
  sortList (list) {
    if (!this.props.sort) return list;
    const dir = this.props.sort[0];
    const item = this.props.sort[1];
    return list.sort((a, b) => {
      if (item === 'done' || item === 'title') {
        if (dir === 'up') return a.get(item) > b.get(item);
        if (dir === 'down') return a.get(item) < b.get(item);
      };
      if (item === 'priority' || item === 'date') {
        if (dir === 'up') return (a.get(item) < b.get(item)) ? 1 : -1;
        if (dir === 'down') return (a.get(item) > b.get(item)) ? 1 : -1;
      };
      return 0;
    })
  };
  componentDidUpdate (props, state) {
    if (props.list !== this.props.list) sentDataToStorage(this.props.list);
  }
  render () {
    return (
      <tbody>
        {(this.props.list) ? this.buildList() : <tr><th colSpan={4}><img className={this.props.classes.spinner} src={spinner} alt="Spinner..."/></th></tr>}
      </tbody>
    )
  };
};

export default injectSheet(styled)(connect(
  state => ({
    list: state.table.get('list'),
    filters: state.filter,
    sort: state.table.get('sort')
  }),
  {changeDone, setList, showMessage, hideMessage}
)(Tbody));
