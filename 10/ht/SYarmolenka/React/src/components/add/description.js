import React from 'react';
import {connect} from 'react-redux';

const Description = (props) => {
  return (
    <textarea className={props.classes}
      placeholder="Description..."
      value={props.task}
      onChange={e => props.changeTask(e.target.value)}>
    </textarea>
  );
};

export default connect(
  state => ({
    task: state.add.get('task')
  }),
  dispatch => ({
    changeTask (task) {dispatch({type: 'CHANGE_TASK', payload: task})}
  })
)(Description);
