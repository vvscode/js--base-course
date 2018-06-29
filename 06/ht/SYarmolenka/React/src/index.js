import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {HashRouter} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './reducer';

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store = {store}>
    <HashRouter>
      <App/>
    </HashRouter>
  </Provider>,
  document.getElementById('root'));
