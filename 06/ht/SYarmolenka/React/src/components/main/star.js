import React from 'react';
import {connect} from 'react-redux';

const Star = (props) => {
  const addCity = () => {
    if (props.city) props.addCityInFavorite(props.city);
  };
  return (
    <img id='star'
      src='data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA0OTYuMTU4IDQ5Ni4xNTgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ5Ni4xNTggNDk2LjE1ODsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxwYXRoIHN0eWxlPSJmaWxsOiNFNUFBMTc7IiBkPSJNMCwyNDguMDg1QzAsMTExLjA2MywxMTEuMDY5LDAuMDAzLDI0OC4wNzUsMC4wMDNjMTM3LjAxMywwLDI0OC4wODMsMTExLjA2MSwyNDguMDgzLDI0OC4wODIgIGMwLDEzNy4wMDItMTExLjA3LDI0OC4wNy0yNDguMDgzLDI0OC4wN0MxMTEuMDY5LDQ5Ni4xNTUsMCwzODUuMDg3LDAsMjQ4LjA4NXoiLz4KPHBvbHlnb24gc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIHBvaW50cz0iMjQ4LjA3MSw4OS45NjIgMjk2Ljg2OCwxODguNzgxIDQwNS45MjksMjA0LjY0OCAzMjYuOTkzLDI4MS41NjUgMzQ1LjYyNiwzOTAuMTk4ICAgMjQ4LjA3MSwzMzguOTEgMTUwLjUwNSwzOTAuMTk4IDE2OS4xNDMsMjgxLjU2NSA5MC4yMjksMjA0LjY0OCAxOTkuMzA1LDE4OC43ODEgIi8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo='
      onClick={addCity}
      alt='star_img'
    />
  );
};

export default connect(
  state => ({
    city: state.get('city')
  }),
  dispatch => ({
    addCityInFavorite (city) { dispatch({type: 'ADD_TO_FAVORITE', payload: city});}
  })
)(Star);
