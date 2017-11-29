import { applyMiddleware, createStore } from 'redux';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import { logger } from 'redux-logger';

import reducer from './reducers/';

// setup for localstorage middleware
const storageReducer = storage.reducer(reducer);
const storageEngine = createEngine('redux-quiz');
const storageMiddleware = storage.createMiddleware(storageEngine);
const storageLoader = storage.createLoader(storageEngine);

const middleware = applyMiddleware( logger, storageMiddleware );
const store = createStore(storageReducer, middleware);

// trigger load from redux-storage
storageLoader(store);

export default store;
