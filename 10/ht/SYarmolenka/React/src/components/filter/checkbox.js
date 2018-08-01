import React from 'react';

const Checkbox = (props) => {
  return <input type="checkbox" checked={props.check} onChange={e => props.change(e.target.value)}/>
}

export default Checkbox;