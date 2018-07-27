import React from 'react';
import {connect} from 'react-redux';

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
  dispatch => ({
    changeTitle (title) {dispatch({type: 'CHANGE_TITLE', payload: title})}
  })
)(Title);