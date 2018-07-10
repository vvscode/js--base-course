import React, {Component} from 'react';
import {connect} from 'react-redux';
import {saveFavoriteListInLocal} from '../../helpers/local';

class Favorite extends Component {
  getFavoriteList () {
    if (this.props.favorite) {
      return this.props.favorite.map(city => (
        <div key={city} title={city} className='city'>
          <label>{city}</label>
          <button className='delete'></button>
        </div>));
    };
  };
  componentDidUpdate () {
    if (this.props.favorite) saveFavoriteListInLocal(this.props.favorite);
  }
  render () {
    return <div className='favorite'>{this.getFavoriteList()}</div>;
  };
};

export default connect(
  state => ({
    favorite: state.get('favorite')
  })
)(Favorite);
