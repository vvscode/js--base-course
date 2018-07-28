import React, {Component} from 'react';
import styled from 'styled-components';

const Select = styled.select`
  background: #3071a9;
  color: #fff;
  font-size: 1em;
  border: 1px solid #000;
  border-radius: .2em;
  width: 3em;
  height: 1.5em;
  margin: 0 .5em;
`
const Wrapper = styled.div`
  padding: 1em;
  padding-right: 0;
`

const SelectField = (props) => {
  const options = new Array(10)
    .fill(0)
    .map((el, i) => <option key={i} value={(i + 1) * 10}>{(i + 1) * 10}</option>);
  const x = props.field[0];
  const y = props.field[1];
  return (
    <Wrapper>
      <label>Height:</label><Select value={x} onChange={e => props.changeField([+e.target.value, y])}>{options}</Select>
      <label>Width:</label><Select value={y} onChange={e => props.changeField([x, +e.target.value])}>{options}</Select>
    </Wrapper>
  );
};

export default class extends Component {
  shouldComponentUpdate(props) {
    return props.field.toLocaleString() !== this.props.field.toLocaleString();
  };
  render () {
    return <SelectField {...this.props} />
  };
}
