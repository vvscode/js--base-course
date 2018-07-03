import React, {Component} from 'react';
import {connect} from 'react-redux';
import {saveFavoriteListInLocal} from '../../helpers/local';

class Favorite extends Component {
  clickElement = (element) => {
    if (element.matches('.delete')) {
      document.querySelector('.favorite').querySelectorAll('.city').forEach((elem, i) => {
        if (element.closest('.city') === elem) this.props.deleteCity(i);
      });
      return;
    };
    this.props.addCityInFavorite(element.closest('.city').title);
    this.props.hashPush(`/city&${element.closest('.city').title}`);
  };
  getFavoriteList () {
    saveFavoriteListInLocal(this.props.favorite);
    return this.props.favorite.map(city => (
      <div key={city} title={city} className='city' onClick={e => this.clickElement(e.target)}>
        <label>{city}</label>
        <button className='delete'></button>
      </div>));
  };
  render () {
    return <div className='favorite'>{this.getFavoriteList()}</div>;
  };
};

export default connect(
  state => ({
    favorite: state.get('favorite'),
    hashPush: state.get('hashHistoryPush')
  }),
  dispatch => ({
    deleteCity (index) { dispatch({type: 'DELETE_CITY_FROM_FAVORITE', payload: index}); },
    addCityInFavorite (city) { dispatch({type: 'ADD_TO_FAVORITE', payload: city}); }
  })
)(Favorite);
