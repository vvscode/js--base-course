import React, {Component} from 'react';
import {Route} from 'react-router';
import Main from './components/main/main';
import Header from './components/header/header';
import About from './components/about';
import './app.css';

class App extends Component {
  render () {
    return (
      <div className='application'>
        <Header />
        <Route exact path='/' component={Main} />
        <Route exact path='/text' component={Main} />
        <Route exact path='/canvas' component={Main} />
        <Route exact path='/svg' component={Main} />
        <Route path='/about' component={About} />
      </div>
    )
  };
};

export default App;
