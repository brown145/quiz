import React from 'react';
import PropTypes from 'prop-types';

import DeckList from '../components/deckList'

// TODO: add layer on top that is aware of routed id and store - make this dumber
class DeckListContainer extends React.Component{
  render() {
    const { store } = this.context;
    const state = store.getState();
    const decks = state.decks;

    return (
      <DeckList
        decks={decks}
      />
    );
  }
}
DeckListContainer.contextTypes = {
  store: PropTypes.object
}

export default DeckListContainer;
