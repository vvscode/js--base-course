import React, {Component} from 'react';
import play from './play.png';
import stop from './stop.png';
import next from './next.png';
import back from './back.png';
import styled from 'styled-components';

const AllButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Button = styled.button`
  display: inline-block;
  background: url(${props => {
    switch (props.st) {
      case 'stop': return stop;
      case 'play': return play;
      case 'next': return next;
      case 'back': return back;
      default: return 'none';
    }
  }}) no-repeat;
  background-size: 100%;
  border: none;
  outline: none;
  width: 4em;
  height: 4em;
  margin: 0 .5em
  border-radius: 2em;
  &:active {
    transition-duration: .2s;
    transform: scale(1.1, 1.1);
    box-shadow: 0 0 10px #000;
  }
`

class PanelButtons extends Component {
  shouldComponentUpdate(props, state) {
    return props.start !== this.props.start;
  };
  render () {
    return (
      <AllButtons>
        <Button st='back' onClick={this.props.prevItem}></Button>
        {this.props.start ? <Button st='stop' onClick={this.props.startGame}></Button> : <Button st='play' onClick={this.props.startGame}></Button>}
        <Button st='next' onClick={this.props.nextItem}></Button>
      </AllButtons>
    );
  };
};

export default PanelButtons;
