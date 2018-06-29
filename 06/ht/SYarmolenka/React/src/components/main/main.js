import React from 'react';
import Footer from '../footer/footer';
import Map from './map';
import Star from './star';

const Main = (props) => {
  return (
    <div className='wrapper'>
      <Star />
      <Map hash={props.match.params}/>
      <Footer />
    </div>
  );
};

export default Main;
