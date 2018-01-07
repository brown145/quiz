import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from 'store';
import routes from 'routes';

import MainNav from './components/nav/main';

const App = () => (
  <div className="ui container">
    <h1 className="ui header no-anchor">Trivia Demo Project</h1>
    <MainNav
      links={[{
        text: 'decks',
        to: '/decks/',
      },
      {
        text: 'cards',
        to: '/cards/',
      },
      {
        text: 'topics',
        to: '/topics/',
      },
      ]}
    />
    <Switch>
      <Route path="/decks/:id/quiz" component={routes.quizDeckRoute} />
      <Route path="/decks/:id" component={routes.deckDetailRoute} />
      <Route path="/decks" component={routes.deckListRoute} />
      <Route path="/cards/:id" component={routes.cardDetailRoute} />
      <Route path="/cards/" component={routes.cardListRoute} />
      <Route path="/topics/:id" component={routes.topicDetailRoute} />
      <Route path="/topics" component={routes.topicListRoute} />
      <Route path="/" component={routes.deckListRoute} />
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
