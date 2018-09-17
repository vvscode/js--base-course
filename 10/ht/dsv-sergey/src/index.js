import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import 'semantic-ui-css/semantic.min.css';
import './style.css';

import store from './config/store';
import App from './containers/App';


render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root')
);