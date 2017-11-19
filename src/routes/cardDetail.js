import React from 'react';
import PropTypes from 'prop-types';

import CardDetail from '../components/cardDetail'

// TODO: add layer on top that is aware of routed id and store - make this dumber
class CardDetailContainer extends React.Component{
  handler_deckClick = (deckId) => {
    if (deckId) {
      this.props.history.push('/decks/' + deckId);
    }
  }

  render() {
    const cardId = this.props.match.params.id;
    const { store } = this.context;
    const state = store.getState();
    const card = state.cards.find((card) => ( card.id === cardId ));
    const decks = state.decks.filter((deck) => ( deck.cards.includes(cardId) ));
    const cardDeck = {...card, decks}

    return (
      <CardDetail
        card={cardDeck}
        onDeckSelect={this.handler_deckClick}
      />
    );
  }
}
CardDetailContainer.contextTypes = {
  store: PropTypes.object
}

export default CardDetailContainer;
