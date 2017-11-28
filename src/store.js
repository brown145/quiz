import { applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';

import reducer from './reducers/';

// TODO: for now we will use a static data source
import persistedStore from './initData';

const middleware = applyMiddleware( logger );

export default createStore(reducer, persistedStore, middleware);
