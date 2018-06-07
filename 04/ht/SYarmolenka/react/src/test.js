import React from 'react';

const Test = (props) => {
  const clsCal = document.createElement('script');
  clsCal.type = 'text/javascript';
  clsCal.setAttribute('src', 'https://syarmolenka.github.io/calendar/nativeCode.js');
  document.body.appendChild(clsCal);
  return (
    <div className='test'>
      <input id='testInput'/>
      <button onClick={_ => {
        let code = document.querySelector('#testInput').value.match(/\(function\(\) [\S\s]+}\) \(\);/)[0];
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerText = code;
        document.body.appendChild(script);
        document.querySelector('#testInput').value = '';
      }}>Insert Code</button>
    </div>
  );
};

export default Test;
