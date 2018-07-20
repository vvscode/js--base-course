import React, {PureComponent} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  background: #000;
  border-radius: .1em;
  z-index: 1;
`
const Ul = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 20%);
  grid-auto-columns: minmax(5em, auto);
  margin: 0;
  padding: 0;
`
const Li = styled.li`
  display: inline-block !important;
  text-align: center;
  margin: .5em 0;
  width: 100%;
  height: 100%;
  color: #fff;
  &:first-child {
    cursor: pointer;
    &:active {
      color: red;
    }
  };
`
const A = styled.a`
  display: block;
  width: 100%;
  height: 100%;
  color: #fff;
  text-decoration-line: none;
`

class Header extends PureComponent {
  state = {
    hash: window.location.hash
  };
  static getDerivedStateFromProps(props, state) {
    return (state.hash !== window.location.hash) ? ({hash: window.location.hash}) : null;
  };
  showHideMenu = () => {
    const elem = document.querySelector('.menu');
    if (!elem) return;
    if (elem.open) {
      elem.style.top = `-${elem.getBoundingClientRect().height}px`;
      elem.open = 0;
    } else {
      elem.style.top = `${document.querySelector('.header').getBoundingClientRect().height}px`;
      elem.open = 1;
    };
  };
  decorateLink () {
    document.querySelectorAll('a').forEach(a => {
      a.style.color = (a.closest('.header') && a.href.match(/.+(#.+)/)[1] === this.state.hash) ? 'yellow' : '';
    });
  };
  componentDidMount () {
    this.decorateLink();
  };
  componentDidUpdate () {
    this.decorateLink();
  };
  render () {
    return (
      <Wrapper className='header'>
        <Ul onClick={this.clickHandler}>
          <Li onClick={this.showHideMenu}>Menu</Li>
          <Li><A href='#text'>Text</A></Li>
          <Li><A href='#canvas'>Canvas</A></Li>
          <Li><A href='#svg'>SVG</A></Li>
          <Li><A href='#about'>About</A></Li>
        </Ul>
      </Wrapper>
    );
  };
};

export default Header;
