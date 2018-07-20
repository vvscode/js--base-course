import React, {Component} from 'react';
import {AppContext} from '../../index';
import Menu from './menu/menu';
import Text from './text';
import Canvas from './canvas/canvas';
import Svg from './svg/svg';
import styled from 'styled-components';

const MainDiv = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-bottom: 0;
  overflow: auto;
`
const GameField = styled.div`
  display: block;
  cursor: pointer;
  height: 90%;
  width: 100%;
  text-align: center;
  margin-top: .5em;
  &>* {
    background-color: rgba(255,255,255,.7);
    border-radius: .1em;
    box-shadow: 0 0 10px #000;
  }
`

class Main extends Component {
  state = {
    hash: this.props.match.path,
  };
  static getDerivedStateFromProps(props, state) {
    return (state.hash !== props.match.path) ? ({hash: props.match.path}) : null;
  };
  shouldComponentUpdate(props, state) {
    return state !== this.state; 
  };
  render () {
    return (
      <MainDiv className='main'>
        <Menu />
        <GameField>
          <AppContext.Consumer>
            {({arr, changeArrItem, cell}) => {
              if (!arr || !cell) return <div children='Spinner...'/>
              const props = {arr, changeArrItem, cell};
              switch (this.state.hash) {
                case '/text':
                  return <Text {...props} />
                case '/canvas':
                  return <Canvas {...props} />
                case '/svg':
                  return <Svg {...props} />
                default:
                  return <Text {...props} />
              }
            }}
          </AppContext.Consumer>
        </GameField>
      </MainDiv>
    );
  };
};

export default Main;
