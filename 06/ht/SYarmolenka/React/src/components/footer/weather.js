import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCityByLocation, getWeather} from '../../helpers/request';
import spinner from '../../Loading_icon.gif';

class Weather extends Component {
  getWeather (position) {
    this.props.changeCity('');
    this.props.changeWeather('');
    Promise.all([
      getCityByLocation(this.props.method, position),
      getWeather(this.props.method, position).then(data => data.daily.summary)
    ]).then(result => {
      if (!this.props.city) this.props.changeCity(result[0]);
      if (!this.props.weather) this.props.changeWeather(result[1]);
    });
  };
  componentWillReceiveProps (nextProps) {
    if (nextProps.position.toLocaleString() !== this.props.position.toLocaleString()) {
      this.getWeather(nextProps.position);
    }
  };
  shouldComponentUpdate (nextProps) {
    return nextProps.weather !== this.props.weather;
  };
  componentDidMount () {
    this.getWeather(this.props.position);
  };
  render () {
    let {city, weather} = this.props;
    return (
      <div className='weather'>
        {weather ? (<div><h4>{city || ''}</h4><p>{weather}</p></div>) : (<div className='spinner'><img src={spinner} alt='Spinner_gif' /></div>)}
      </div>
    );
  };
};

export default connect(state => ({
  method: state.get('method'),
  position: state.get('position'),
  weather: state.get('weather'),
  city: state.get('city')
}),
dispatch => ({
  changeWeather (data) { dispatch({type: 'CHANGE_WEATHER', payload: data}); },
  changeCity (city) { dispatch({type: 'CHANGE_CITY', payload: city}); }
}))(Weather);
