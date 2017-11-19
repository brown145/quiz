import React from 'react';
import PropTypes from 'prop-types';

import DeckDetail from '../components/deckDetail';
import WarningUI from '../components/warningBlurb';

class DeckDetailContainer extends React.Component{
  handler_cardClick = (cardId) => {
    if (cardId) {
      this.props.history.push('/cards/' + cardId);
    }
  }

  render() {
    const deckId = this.props.match.params.id;
    const { store } = this.context;
    const state = store.getState();
    const deck = state.decks.find((deck) => deck.id === deckId); //TODO: make function that returns found deck or empty deck

    if (!deck) {
      return (
        <WarningUI
          messageText='Could not load deck'
        />
      );
    }

    const cards = state.cards.filter((card) => (deck.cards.includes(card.id)));
    const cardDeck = {...deck, cards};

    return (
      <DeckDetail
        deck={cardDeck}
        onCardClick={this.handler_cardClick}
      />
    );
  }
}
DeckDetailContainer.contextTypes = {
  store: PropTypes.object
}

export default DeckDetailContainer;
