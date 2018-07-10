import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Header from './components/header/header';
import Main from './components/main/main';
import About from './components/main/about';
import Author from './components/main/author';

class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <Route exact path='/' component={Main}/>
        <Route path='/params&:data' component={Main} />
        <Route path='/city&:city' component={Main} />
        <Route path='/about' component={About} />
        <Route path='/author' component={Author} />
      </div>
    );
  }
}

export default App;
