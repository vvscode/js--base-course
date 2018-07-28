import React from 'react';
import {AppContext} from '../../index';
import {Switch, Route} from 'react-router';
import Text from './text';
import Canvas from './canvas/canvas';
import Svg from './svg/svg';
import About from '../about';
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

const Main = (props) => {
  return (
    <MainDiv className='main'>
      <GameField>
        <AppContext.Consumer>
          {({arr, changeArrItem, cell}) => {
            const cont = {arr, changeArrItem, cell};
            if (!arr || !cell) return <div children='Spinner...'/>
            return (  
              <Switch>
                <Route exact path='/' render={props => <Text {...cont} />} />
                <Route path='/text' render={props => <Text {...cont} />} />
                <Route path='/canvas' render={props => <Canvas {...cont} />} />
                <Route path='/svg' render={props => <Svg {...cont} />} />
                <Route path='/about' component={About} />
              </Switch>
            )
          }}
        </AppContext.Consumer>
      </GameField>
    </MainDiv>
  );
};

export default Main;
