import React, {Component} from 'react';
import styled from 'styled-components'
import './speedRegulator.css';

const Label = styled.label`
  display: inline-block;
  vertical-align: middle;
  padding-left: .5em;
`

export default class SpeedRegulator extends Component {
  shouldComponentUpdate(props) {
    return props.speed !== this.props.speed;
  };
  render () {
    return (
      <div>
        <Label>Speed:</Label>
        <input type='range'
          min={50}
          max={950}
          value={this.props.speed}
          onChange={e => this.props.changeSpeed(e.target.value)}
        />
      </div>
    );
  };
};