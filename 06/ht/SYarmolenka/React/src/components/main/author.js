import React from 'react';
import ava from '../../ava.jpg';
import github from '../../github.png';
import lkdin from '../../LinkedIn.png';

const Author = () => {
  return (
    <div className='author'>
      <img src={ava} alt='Author_photo'/>
      <a href='https://github.com/SYarmolenka'><img src={github} alt='GitHub'/></a>
      <a href='https://www.linkedin.com/in/siarheierm/'><img src={lkdin} alt='LinkedIn'/></a>
    </div>
  );
};

export default Author;
