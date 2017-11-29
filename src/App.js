import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from './store';
import routes from './routes';

const App = () => (
  <div className="ui container">
    <h1 className="ui header no-anchor">Trivia Demo Project</h1>
    <Switch>
      <Route path="/decks/:id" component={routes.deckDetailRoute} />
      <Route path="/decks" component={routes.deckListRoute} />
      <Route path="/cards/:id" component={routes.cardDetailRoute} />
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
