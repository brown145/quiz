import React from 'react';
import PropTypes from 'prop-types';

import DeckDetail from '../components/deckDetail'

// TODO: add layer on top that is aware of routed id and store - make this dumber
class DeckDetailContainer extends React.Component{
  render() {
    const deckId = this.props.match.params.id;
    const { store } = this.context;
    const state = store.getState();
    const deck = state.decks.find((deck) => deck.id === deckId); //TODO: make function that returns found deck or empty deck
    const cards = state.cards.filter((card) => (deck.cards.includes(card.id)));
    const cardDeck = {...deck, cards};

    return (
      <DeckDetail
        deck={cardDeck}
      />
    );
  }
}
DeckDetailContainer.contextTypes = {
  store: PropTypes.object
}

export default DeckDetailContainer;
