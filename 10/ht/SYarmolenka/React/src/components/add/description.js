import React from 'react';
import {connect} from 'react-redux';
import {changeTask} from '../../actions/add.js';

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
  {changeTask}
)(Description);
