import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducer from './reducers/index';
import App from './App';
import './index.css';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));
