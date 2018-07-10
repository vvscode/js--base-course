import React from 'react';
import github from './github.png';
import lkdin from './LinkedIn.png';
import ava from './ava.jpg';

const About = () => {
  return (
    <div className='about'>
      <img src={ava} alt='Author_photo'/>
      <a href='https://github.com/SYarmolenka'><img src={github} alt='GitHub'/></a>
      <a href='https://www.linkedin.com/in/siarheierm/'><img src={lkdin} alt='LinkedIn'/></a>
    </div>
  );
};

export default About;
