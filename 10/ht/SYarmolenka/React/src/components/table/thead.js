import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {connect} from 'react-redux';

const styled = {
  item: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&>div>button': {
      display: 'block',
      padding: 0,
      fontSize: '.5em',
      width: '3em'
    }
  }
};

class Thead extends Component {
  handlerClick = e => {
    this.props.sortList([e.target.className, e.currentTarget.className]);
  };
  buildThead () {
    const items = ['Done', 'Title', 'Priority', 'Date'];
    return <tr>{items.map(item => {
      return (
        <td key={item}>
          <div className={this.props.classes.item}>
            <div>{item}</div>
            <div className={item.toLowerCase()} onClick={this.handlerClick}>
              <button className="up">{String.fromCharCode(9650)}</button>
              <button className="down">{String.fromCharCode(9660)}</button>
            </div>
          </div>
        </td>
      )
    })}</tr>
  };
  render () {
    return (
      <thead>
        {this.buildThead()}
      </thead>
    );
  };
};

export default injectSheet(styled)(connect(
  state => ({}),
  dispatch => ({
    sortList(arr) {dispatch({type: 'SORT_LIST', payload: arr})}
  })
)(Thead));
