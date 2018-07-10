import React, {Component} from 'react';
import {connect} from 'react-redux';
import History from './history';
import Weather from './weather';
import Favorite from './favorite';
import {getLocationByCity} from '../../helpers/request';
import './footer.css';

class Footer extends Component {
  clickHandler = (element) => {
    if (!element.closest('.city')) return;
    const city = element.closest('.city').title;
    if (element.matches('.delete')) {
      document.querySelector('.favorite').querySelectorAll('.city').forEach((elem, i) => {
        if (element.closest('.city') === elem) this.props.deleteCity(i);
      });
      return;
    };
    if (element.closest('.favorite')) this.props.addCityInFavorite(city);
    if (element.closest('.history')) this.props.addCityInHistory(city);
    getLocationByCity(this.props.method, city)
      .then(position => position ? this.props.savePosition(position) : 0);
  };
  render () {
    return (
      <div id='footer' onClick={e => this.clickHandler(e.target)}>
        <History />
        <Weather />
        <Favorite />
      </div>
    );
  }
};

export default connect(
  state => ({
    hashPush: state.get('hashHistoryPush'),
    position: state.get('position'),
    zoom: state.get('zoom'),
    method: state.get('method')
  }),
  dispatch => ({
    deleteCity (index) { dispatch({type: 'DELETE_CITY_FROM_FAVORITE', payload: index}); },
    addCityInFavorite (city) { dispatch({type: 'ADD_TO_FAVORITE', payload: city}); },
    addCityInHistory (city) { dispatch({type: 'ADD_TO_HISTORY', payload: city}); },
    savePosition (pos) { dispatch({type: 'SAVE_POSITION', payload: pos}); }
  })
)(Footer);
