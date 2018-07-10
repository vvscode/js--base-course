import React, {Component} from 'react';
import {connect} from 'react-redux';
import {saveCityListInLocal} from '../../helpers/local';

class History extends Component {
  getHistoryList () {
    if (this.props.history) {
      return this.props.history.map(city => (
        <div key={city} title={city} className='city'>
          <label>{city}</label>
        </div>));
    };
  };
  componentDidUpdate () {
    saveCityListInLocal(this.props.history);
  };
  render () {
    return <div className='history'>{this.getHistoryList()}</div>;
  };
};

export default connect(
  state => ({
    history: state.get('history')
  })
)(History);
