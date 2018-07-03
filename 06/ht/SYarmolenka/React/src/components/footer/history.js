import React, {Component} from 'react';
import {connect} from 'react-redux';
import {saveCityListInLocal} from '../../helpers/local';

class History extends Component {
  clickElement = (element) => {
    this.props.addCityInHistory(element.closest('.city').title);
    this.props.hashPush(`/city&${element.closest('.city').title}`);
  };
  getHistoryList () {
    saveCityListInLocal(this.props.history);
    return this.props.history.map(city => (
      <div key={city} title={city} className='city' onClick={e => this.clickElement(e.target)}>
        <label>{city}</label>
      </div>));
  };
  render () {
    return <div className='history'>{this.getHistoryList()}</div>;
  };
};

export default connect(
  state => ({
    history: state.get('history'),
    hashPush: state.get('hashHistoryPush')
  }),
  dispatch => ({
    addCityInHistory (city) { dispatch({type: 'ADD_TO_HISTORY', payload: city}); }
  })
)(History);
