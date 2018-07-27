import React, { Component } from 'react';
import Filter from './components/filter/filter';
import Add from './components/add/add';
import Table from './components/table/table';
import injectSheet from 'react-jss';
import Message from './components/message/message';

const styled = {
  '@keyframes fall': {
    from: {
      top: '-4em'
    },
    to: {
      top: 0
    }
  },
  '@keyframes jump': {
    from: {
      top: 0
    },
    to: {
      top: '-4em'
    }
  },
  field: {
    borderRadius: '.5em',
    width: '800px',
    margin: 'auto',
    minHeight: '7em',
    '&>legend': {
      textAlign: 'center'
    },
    '& input, & select, & textarea': {
      font: '12pt sans-serif'
    }
  },
  message: {
    animation: 'jump 1s alternate',
    position: 'absolute',
    background: '#fff',
    border: '1px solid',
    borderTop: 'none',
    borderRadius: '0 0 .5em  .5em',
    width: '400px',
    padding: '1em',
    textAlign: 'center',
    left: `${window.screen.width / 2 - 200}px`,
    top: '-4em'
  },
  animate: {
    animation: 'fall 1s alternate ease',
    top: 0
  }
};

class App extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div>
        <Add classes={classes}/>
        <Filter classes={classes}/>
        <Message classes={classes} top={0} left={0}/>
        <Table classes={classes}/>
      </div>
    );
  }
}

export default injectSheet(styled)(App);
