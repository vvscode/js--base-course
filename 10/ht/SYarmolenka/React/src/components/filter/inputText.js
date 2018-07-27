import React from 'react';
import {connect} from 'react-redux';

const InputText = (props) => {
  return <input
    className={props.classes}
    type="text"
    value={props.text}
    onChange={e => props.changeText(e.target.value)}
    placeholder='Search task by titles or description...' />
}

export default connect(
  state => ({
    text: state.filter.get('text')
  }),
  dispatch => ({
    changeText (text) {dispatch({type: 'CHANGE_SEARCH', payload: text})}
  })
)(InputText);