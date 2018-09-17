import { createStore, applyMiddleware, compose } from 'redux';
import combineReducers from '../reducers';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

const logger = createLogger();
const middlewares = [ thunk, logger ];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combineReducers, composeEnhancers(applyMiddleware(...middlewares)));

export default store;

