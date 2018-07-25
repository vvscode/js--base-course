import React, {PureComponent} from 'react';
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
`

class Menu extends PureComponent {
  mouseEnter = (elem) => {
    elem.style.top = `${document.querySelector('.header').getBoundingClientRect().height}px`;
    elem.open = 1;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = 0;
    };
  };
  mouseLeave = (elem) => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = 0;
    };
    this.timer = setTimeout(_ => {
      if (elem.open) {
        elem.style.top = `-${elem.getBoundingClientRect().height}px`;
        elem.open = 0;
      }
    }, 500);
  };
  componentDidMount () {
    const elem = document.querySelector('.menu');
    if (elem) {
      elem.style.top = `-${elem.getBoundingClientRect().top}px`;
      elem.open = 0;
    };
  };
  render () {
    return (
      <AppContext.Consumer>
        {({start, startGame, prevItem, nextItem, field, changeField, speed, changeSpeed}) => (
          <Wrapper className='menu' onMouseEnter={e => this.mouseEnter(e.target)} onMouseLeave={e => this.mouseLeave(e.target)}>
            <SpeedRegulator speed={speed} changeSpeed={changeSpeed}/>
            <PanelButtons start={start} startGame={startGame} prevItem={prevItem} nextItem={nextItem}/>
            <SelectField field={field} changeField={changeField} />
          </Wrapper>
        )}
      </AppContext.Consumer>
    );
  };
};

export default Menu;
