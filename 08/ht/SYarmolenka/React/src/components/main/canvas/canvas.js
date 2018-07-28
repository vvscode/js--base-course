import React, {Component, createRef} from 'react';
import {decorateArray} from '../../../logic';
import {happy, sad} from '../../../index';

class Canvas extends Component {
  constructor (props) {
    super(props);
    this.canvas = createRef();
  };
  defineLimits () {
    this.height = this.props.cell * this.props.arr.length;
    this.width = this.props.cell  * this.props.arr[0].length;
  };
  draw () {
    this.canvas.current.width = this.width;
    this.canvas.current.height = this.height;
    const arr = decorateArray(this.props.arr);
    arr.forEach((inside, i) => {
      inside.forEach((item, j) => {
        if (item) {
          const x = j * this.props.cell;
          const y = i * this.props.cell;
          if (item === 1) this.ctx.drawImage(sad, x, y, this.props.cell, this.props.cell)
          if (item === 2) this.ctx.drawImage(happy, x, y, this.props.cell, this.props.cell)
        };
      });
    });
  };
  componentDidMount () {
    this.ctx = this.canvas.current.getContext('2d');
    this.defineLimits();
    this.draw();
  };
  componentDidUpdate () {
    this.defineLimits();
    this.draw();
  };
  clickHandler = e => {
    const coords = this.canvas.current.getBoundingClientRect();
    const x = Math.abs(e.clientX - coords.left);
    const y = Math.abs(e.clientY - coords.top);
    const itemX = Math.floor(x/(coords.width/this.props.arr[0].length));
    const itemY = Math.floor(y/(coords.height/this.props.arr.length));
    this.props.changeArrItem(itemX, itemY);
  };
  render () {
    return <canvas id='canvas' ref={this.canvas} width={this.width} height={this.height} onClick={this.clickHandler}/>
  };
};

export default Canvas;
