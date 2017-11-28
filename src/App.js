import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from './store';

// TODO: can i simplify 'routes' with an index.js similar to how store/index.js works?
import DeckListRoute from './routes/deckListRoute';
import DeckDetailRoute from './routes/deckDetailRoute';
import CardDetailRoute from './routes/cardDetailRoute';

const App = () => (
  <div className="ui container">
    <h1 className="ui header no-anchor">Trivia Demo Project</h1>
    <Switch>
      <Route path="/decks/:id" component={DeckDetailRoute} />
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
