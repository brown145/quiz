import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// TODO: for now we ill use a static data source
import initialState from './data';

import DeckListRoute from './routes/deckList';
import DeckDetailRoute from './routes/deckDetail';
import CardDetailRoute from './routes/cardDetail';

import TopicCards from './components/topicCards';

function reducer(state, action) {
  // TODO: reducer is non-op right now
  return state;
}

// sanity checks
initialState.decks = initialState.decks || [];
initialState.cards = initialState.cards || [];

const store = createStore(reducer, initialState);

const App = () => (
  <div className="ui container">
    <h1 className="ui header no-anchor">Trivia Demo Project</h1>
    <Switch>
      <Route path="/decks/:id" component={DeckDetailRoute} />
      <Route path="/topics/:topics" component={TopicCards} />
      <Route path="/decks" component={DeckListRoute} />
      <Route path="/cards/:id" component={CardDetailRoute} />
    </Switch>
  </div>
);

const WrappedApp = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

export default WrappedApp;
