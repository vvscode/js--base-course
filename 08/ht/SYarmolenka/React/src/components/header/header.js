import React, {PureComponent} from 'react';
import styled from 'styled-components';
import Menu from './menu/menu';

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
  color: ${props => {
    return (props.hash === props.href) ? 'yellow' : '#fff';
    }
  };
  text-decoration-line: none;
  &:active {
    color: red;
  }
`

class Header extends PureComponent {
  state = {
    hash: window.location.hash
  };
  static getDerivedStateFromProps(props, state) {
    return (state.hash !== window.location.hash) ? ({hash: window.location.hash}) : null;
  };
  showMenu = e => {
    const height = e.target.clientHeight;
    this.setState(state => ({
      heightMenu: (state.heightMenu) ? 0 : height
      })
    );
  };
  render () {
    const hash = this.state.hash;
    return (
      [<Menu key={1} heightMenu={this.state.heightMenu} />,
      <Wrapper key={2} className='header'>
        <Ul onClick={this.clickHandler}>
          <Li onClick={this.showMenu}>Menu</Li>
          <Li><A hash={hash} href='#text'>Text</A></Li>
          <Li><A hash={hash} href='#canvas'>Canvas</A></Li>
          <Li><A hash={hash} href='#svg'>SVG</A></Li>
          <Li><A hash={hash} href='#about'>About</A></Li>
        </Ul>
      </Wrapper>]
    );
  };
};

export default Header;
