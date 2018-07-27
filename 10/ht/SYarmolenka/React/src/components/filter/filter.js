import React from 'react';
import {connect} from 'react-redux';
import injectSheet from 'react-jss';
import Checkbox from './checkbox';
import DateFrom from './dateFrom';
import DateTo from './dateTo';
import InputText from './inputText';

const styled = {
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexFlow: 'row wrap',
    '&>div>div:first-child': {
      marginBottom: '1em'
    },
    '&>*': {
      width: `${700/3}px`
    }
  },
  text: {
    width: '100%',
    marginTop: '1em'
  }
};

const Filter = (props) => {
  return (
    <fieldset className={props.classes.field}>
      <legend>Filter</legend>
      <form className={props.classes.form}>
        <div>
          <div>
            <Checkbox check={props.today}
              change={_ => props.changeToday()} />
            <label>Today only</label>
          </div>
          <div>
            <Checkbox check={props.completed}
              change={_ => props.changeCompleted()} />
            <label>Show completed</label>
          </div>
        </div>
        <DateFrom />
        <DateTo />
        <InputText classes={props.classes.text} />
      </form>
    </fieldset>
  );
};

export default injectSheet(styled)(connect(
  state => ({
    today: state.filter.get('today'),
    completed: state.filter.get('completed')
  }),
  dispatch => ({
    changeToday () {dispatch({type: 'CHANGE_TODAY'})},
    changeCompleted () {dispatch({type: 'CHANGE_COMPLETED'})}
  })
)(Filter));
