import React from 'react';
import {connect} from 'react-redux';
import {saveCityListInLocal} from '../../helpers/local';

const History = (props) => {
  const deleteElement = (element) => {
    props.addCityInHistory(element.closest('.city').title);
    window.location.hash = `/city&${element.closest('.city').title}`;
  };
  const history = props.history.map(city => (
    <div key={Math.random()} title={city} className='city' onClick={e => deleteElement(e.target)}>
      <label>{city}</label>
    </div>));
  saveCityListInLocal(props.history.toArray());
  return <div className='history'>{history}</div>;
};

export default connect(
  state => ({
    history: state.get('history')
  }),
  dispatch => ({
    deleteCity (index) { dispatch({type: 'DELETE_CITY_FROM_HISTORY', payload: index}); },
    addCityInHistory (city) { dispatch({type: 'ADD_TO_HISTORY', payload: city}); }
  })
)(History);
