import React, {Component} from 'react';
import {connect} from 'react-redux';
import injectSheet from 'react-jss';
import DateComponent from './dateComponent';
import Priority from './priority';
import Title from './title';
import Description from './description';
import {
  changeTitle,
  changePriority,
  changeTask
} from '../../actions/add.js';
import {addTask} from '../../actions/table';


const styled = {
  form: {
    display: 'flex',
    flexFlow: 'column wrap'
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1em',
    '&>*': {
      width: `${700/3}px`
    }
  },
  text: {
    marginBottom: '1em',
    height: '3em',
    width: '100%',
    resize: 'none'
  },
  button: {
    width: '5em',
    margin: 'auto',
    marginRight: 0
  }
};

class Add extends Component {
  shouldComponentUpdate () {
    return false;
  };
  addTask (e) {
    e.preventDefault();
    const id = Date.now();
    const done = false;
    const {title, priority, date, task} = this.props;
    if (title && task) {
      this.props.addTask({id, done, title, priority, date, task});
      this.props.changeTitle('');
      this.props.changeTask('');
    };
  };
  render () {
    const {classes} = this.props;
    return (
      <fieldset className={classes.field}>
        <legend>Add</legend>
        <form className={classes.form}>
          <div className={classes.wrapper}>
            <Title />
            <Priority />
            <DateComponent />
          </div>
          <Description classes={classes.text} />
          <input className={classes.button} type='submit' value="Add" onClick={e => this.addTask(e)}/>
        </form>
      </fieldset>
    )
  };
};

export default injectSheet(styled)(connect(
  state => ({
    title: state.add.get('title'),
    priority: state.add.get('priority'),
    date: state.add.get('date'),
    task: state.add.get('task')
  }),
  {changeTitle, changePriority, changeTask, addTask}
)(Add));
