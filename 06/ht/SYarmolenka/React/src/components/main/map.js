import React, { Component } from 'react';
import ymaps from 'ymaps';
import {connect} from 'react-redux';
import {getOwnLocation, getLocationByCity} from '../../helpers/request';

class Map extends Component {
  constructor (props) {
    super(props);
    if ('data' in props.hash) {
      const data = props.hash.data.match(/lat(\S+)&long(\S+)&zoom(\d+)/);
      const position = [+data[1], +data[2]];
      const zoom = +data[3];
      props.savePosition(position);
      props.saveZoom(zoom);
      ymaps.load('https://api-maps.yandex.ru/2.1/?lang=ru_RU')
        .then(ymaps => {
          this.map = new ymaps.Map('map', {
            center: position,
            zoom: zoom,
            controls: ['zoomControl']
          });
        })
        .then(_ => {
          this.map.events.add('boundschange', _ => {
            if (this.props.position.toLocaleString() !== this.map.getCenter().toLocaleString()) props.savePosition(this.map.getCenter());
            if (this.props.zoom !== this.map.getZoom()) props.saveZoom(this.map.getZoom());
          });
        })
        .catch(console.error);
    } else {
      if ('city' in props.hash) {
        getLocationByCity(props.method, props.hash.city)
          .then(pos => this.changeHash(pos, props.zoom));
      } else {
        if (props.position && props.position[0] > 0 && props.position[1] > 0) {
          this.changeHash(props.position, props.zoom);
        } else {
          getOwnLocation(props.method)
            .then(pos => this.changeHash(pos, props.zoom));
        };
      };
    };
  };
  changeHash (position, zoom) {
    window.location.hash = position ? `params&lat${+position[0]}&long${+position[1]}&zoom${zoom}` : ``;
  };
  shouldComponentUpdate (nextProps) {
    return nextProps.method === this.props.method;
  };
  componentDidUpdate (prev) {
    if (this.map && (prev.position !== this.props.position || prev.zoom !== this.props.zoom)) {
      this.map.setCenter(this.props.position, this.props.zoom);
      this.changeHash(this.props.position, this.props.zoom);
    };
  };
  render () {
    return (
      <div id='map'></div>
    );
  };
};

export default connect(
  state => ({
    position: state.get('position'),
    zoom: state.get('zoom'),
    method: state.get('method')
  }),
  dispatch => ({
    savePosition (pos) { dispatch({type: 'SAVE_POSITION', payload: pos}); },
    saveZoom (zoom) { dispatch({type: 'SAVE_ZOOM', payload: zoom}); },
  })
)(Map);
