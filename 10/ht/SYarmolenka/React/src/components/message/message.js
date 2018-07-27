import React from 'react';
import {connect} from 'react-redux';

const Message = (props) => {
  return <div className={(props.message) ? `${props.classes.message} ${props.classes.animate}` : props.classes.message} children={(props.message) ? props.message.get('1') : null}/>;
};

export default connect(
  state => ({
    message: state.table.get('message')
  })
)(Message);