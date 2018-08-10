import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';

import './semantic/dist/semantic.min.css';
import './style.css';


import App from './components/App';
import store from './store';

render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root')
);