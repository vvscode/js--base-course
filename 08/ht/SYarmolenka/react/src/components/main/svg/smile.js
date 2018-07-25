import React from 'react';

const Smile = (props) => {
  const {x, y, size, behavior} = props;
  return (
    <g>
      <circle cx={x + size / 2} cy={y + size / 2} r={size / 2 - size * 0.035} fill='none' stroke='black' strokeWidth={size * 0.07}/>
      <circle cx={x + size * 0.35} cy={y + size * 0.4} r={size * 0.08} />
      <circle cx={x + size * 0.65} cy={y + size * 0.4} r={size * 0.08} />
      {behavior ? (
        <path d={`M${x + size * 0.3} ${y + size * 0.65} C${x + size * 0.35} ${y + size*0.8},${x + size * 0.65} ${y + size*0.8},${x + size * 0.7} ${y + size * 0.65}`} fill='none' stroke='black' strokeWidth={size * 0.07}/>
      ) : (
        <path d={`M${x + size * 0.3} ${y + size * 0.75} C${x + size * 0.35} ${y + size*0.6},${x + size * 0.65} ${y + size*0.6},${x + size * 0.7} ${y + size * 0.75}`} fill='none' stroke='black' strokeWidth={size * 0.07}/>
      )}
    </g>
  )
};

export default Smile;