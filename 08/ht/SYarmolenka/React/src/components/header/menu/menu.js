import React from 'react';
import {AppContext} from '../../../index';
import SpeedRegulator from './speedRegulator';
import PanelButtons from './panelButtons';
import SelectField from './selectField';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin: auto;
  flex-wrap: wrap;
  border: 1px solid;
  border-radius: 0 0 .3em .3em;
  background: rgba(200,200,200,.5);
  transition-duration: 1s;
  cursor: pointer;
  top: ${props => {
    return (props.heightMenu) ? `${props.heightMenu}px` : '-100px'}
  };
`

const Menu = (props) => {
  return (
    <AppContext.Consumer>
      {({start, startGame, prevItem, nextItem, field, changeField, speed, changeSpeed}) => (
        <Wrapper className='menu' heightMenu={props.heightMenu}>
          <SpeedRegulator speed={speed} changeSpeed={changeSpeed}/>
          <PanelButtons start={start} startGame={startGame} prevItem={prevItem} nextItem={nextItem}/>
          <SelectField field={field} changeField={changeField} />
        </Wrapper>
      )}
    </AppContext.Consumer>
  );
};

export default Menu;
