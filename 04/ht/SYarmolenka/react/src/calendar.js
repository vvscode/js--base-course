import React, {Component} from 'react';
import {Calendar} from './nativeCode';

class ReactCalendar extends Component {
  componentDidMount() {
    const conf = {...this.props.config, el: document.querySelector('.bigCal')};
    new Calendar(conf);
  };
  render () {
    return (
      <div className='bigCal'></div>
    );
  };
};

export default ReactCalendar;
