import React from 'react';
import {connect} from 'react-redux';
import {changeTitle} from '../../actions/add.js';

const Title = (props) => {
  return <input type="text"
  placeholder="Title..."
  value={props.title}
  onChange={e => props.changeTitle(e.target.value)}/>
}

export default connect(
  state => ({
    title: state.add.get('title')
  }),
  {changeTitle}
)(Title);