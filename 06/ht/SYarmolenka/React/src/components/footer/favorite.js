import React from 'react';
import {connect} from 'react-redux';
import {saveFavoriteListInLocal} from '../../helpers/local';

const Favorite = (props) => {
  const deleteElement = (element) => {
    if (element.matches('.delete')) {
      document.querySelector('.favorite').querySelectorAll('.city').forEach((elem, i) => {
        if (element.closest('.city') === elem) props.deleteCity(i);
      });
      return;
    };
    props.addCityInFavorite(element.closest('.city').title);
    window.location.hash = `/city&${element.closest('.city').title}`;
  };
  const favorite = props.favorite.map(city => (
    <div key={Math.random()} title={city} className='city' onClick={e => deleteElement(e.target)}>
      <label>{city}</label>
      <button className='delete'></button>
    </div>));
  saveFavoriteListInLocal(props.favorite.toArray());
  return <div className='favorite'>{favorite}</div>;
};

export default connect(
  state => ({
    favorite: state.get('favorite')
  }),
  dispatch => ({
    deleteCity (index) { dispatch({type: 'DELETE_CITY_FROM_FAVORITE', payload: index}); },
    addCityInFavorite (city) { dispatch({type: 'ADD_TO_FAVORITE', payload: city}); }
  })
)(Favorite);
