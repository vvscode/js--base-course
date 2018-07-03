import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCityByLocation, getWeather} from '../../helpers/request';
import spinner from '../../Loading_icon.gif';

class Weather extends Component {
  state = {
     updateWeather: false,
     position: []
  };
  static getDerivedStateFromProps (props, state) {
    if (props.position.toLocaleString() !== state.position.toLocaleString()) {
      return ({
        updateWeather: true,
        position: props.position
      });
    };
    return null;
  };
  shouldComponentUpdate (props) {
    return this.props.method === props.method;
  }
  getWeather (position) {
    this.props.changeCity('');
    this.props.changeWeather('');
    getCityByLocation(this.props.method, position)
      .then(city => {
        this.props.changeCity(city);
      });
    getWeather(this.props.method, position)
      .then(data => data.daily.summary)
      .then(text => {
        if (!this.props.weather) this.props.changeWeather(text);
      });
  };
  componentDidMount () {
    this.getWeather(this.props.position);
  };
  componentDidUpdate () {
    if (this.state.updateWeather) {
      this.setState({updateWeather: false});
      this.getWeather(this.props.position);
    };
  };
  render () {
    let {city, weather} = this.props;
    return (
      <div className='weather'>
        {(weather) ? (<div><h4>{city || ''}</h4><p>{weather}</p></div>) : (<div className='spinner'><img src={spinner} alt='Spinner_gif' /></div>)}
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
