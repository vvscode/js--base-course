import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {reducer} from './reducer';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';
import App from './App';
import './index.css';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store = {store}>
    <HashRouter>
      <App/>
    </HashRouter>
  </Provider>,
  document.getElementById('root'));
