import React from 'react';
import PropTypes from 'prop-types';

import DeckList from '../components/deckList';

class DeckListContainer extends React.Component {
  handler_deckClick = deckId => {
    if (deckId) {
      this.props.history.push(`/decks/${deckId}`);
    }
  };

  render() {
    const { store } = this.context;
    const state = store.getState();
    const decks = state.decks;

    return <DeckList decks={decks} onDeckSelect={this.handler_deckClick} />;
  }
}
DeckListContainer.contextTypes = {
  store: PropTypes.object,
};

export default DeckListContainer;
