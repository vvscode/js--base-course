import React, {Component} from 'react';
import {decorateArray} from '../../logic';
import styled from 'styled-components';

const Pre = styled.pre`
  display: inline-block;
  font-size: 1em;
  font-weight: bold;
  line-height: 1em;
  font-stretch: normal;
  font-family: monospace;
  padding: 0;
  margin: 0;
  font-size: ${props => props.cell+'px'};
`

class Text extends Component {
  getText () {
    return decorateArray(this.props.arr).reduce((res, el) => {
      res += el.reduce((str, item) => {
        if (!item) str += `  `;
        if (item === 1) str += ':('; //String.fromCharCode(9766);
        if (item === 2) str += ':)'; //String.fromCharCode(9786);
        return str;
      }, '') + '\n';
      return res;
    }, '');
  };
  clickHandler = (e) => {
    const coords = e.target.getBoundingClientRect();
    const x = Math.abs(e.clientX - coords.left);
    const y = Math.abs(e.clientY - coords.top);
    const itemX = Math.floor(x/(coords.width/this.props.arr[0].length));
    const itemY = Math.floor(y/(coords.height/this.props.arr.length));
    this.props.changeArrItem(itemX, itemY);
  };
  render () {
    return <Pre id='text' cell={this.props.cell} children={this.getText()} onClick={this.clickHandler}/>
  };
};

export default Text;
