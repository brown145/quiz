import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// TODO: for now we ill use a static data source
import initialState from './data';

import DeckList from './components/deckList';
import DeckCards from './components/deckCards';
import TopicCards from './components/topicCards';
import Card from './components/card';

function reducer(state, action) {
  // TODO: reducer is non-op right now
  return state;
}

const store = createStore(reducer, initialState);

const App = () => (
  <div className='ui container'>
    <h1 className='ui header no-anchor'>Trivia Demo Project</h1>
    <Switch>
      <Route path='/decks/:id' component={DeckCards} />
      <Route path='/topics/:topics' component={TopicCards} />
      <Route path='/decks' component={DeckList} />
      <Route path='/cards/:id' component={Card} />
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
