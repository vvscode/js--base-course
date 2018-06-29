import React from 'react';
import History from './history';
import Weather from './weather';
import Favorite from './favorite';
import './footer.css';

const Footer = () => {
  return (
    <div id='footer'>
      <History />
      <Weather />
      <Favorite />
    </div>
  );
};

export default Footer;
