import React, {Component} from 'react';
import {decorateArray} from '../../../logic';
import Smile from './smile';

class Svg extends Component {
  state = {
    height: 0,
    width: 0
  };
  defineLimits () {
    const height = (this.props.cell) * this.props.arr.length;
    const width = (this.props.cell) * this.props.arr[0].length;
    if (height !== this.state.height) this.setState({height});
    if (width !== this.state.width) this.setState({width});
  };
  componentDidMount () {
    this.defineLimits();
  };
  componentDidUpdate () {
    this.defineLimits();
  };
  insertShapes () {
    return decorateArray(this.props.arr).map((elem, i) => {
      return elem.map((item, j) => {
          if (item === 1) return <Smile key={`${i}-${j}`} x={j * this.props.cell} y={i * this.props.cell} size={this.props.cell} behavior={0}/>
          if (item === 2) return <Smile key={`${i}-${j}`} x={j * this.props.cell} y={i * this.props.cell} size={this.props.cell} behavior={1}/>
      })
    });
  };
  clickHandler = (e) => {
    const coords = document.querySelector('#svg').getBoundingClientRect();
    const x = Math.abs(e.clientX - coords.left);
    const y = Math.abs(e.clientY - coords.top);
    const itemX = Math.floor(x/(coords.width/this.props.arr[0].length));
    const itemY = Math.floor(y/(coords.height/this.props.arr.length));
    this.props.changeArrItem(itemX, itemY);
  };
  render () {
    return <svg id='svg' width={this.state.width} height={this.state.height} onClick={this.clickHandler}>{this.insertShapes()}</svg>
  };
};

export default Svg;
