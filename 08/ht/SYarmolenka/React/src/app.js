import React from 'react';
import Main from './components/main/main';
import Header from './components/header/header';

import './app.css';

const App = _ => {
  return (
    <div className='application'>
      <Header />
      <Main />
    </div>
  )
};

export default App;
