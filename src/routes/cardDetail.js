import React from 'react';
import PropTypes from 'prop-types';

import CardDetail from '../components/cardDetail'

// TODO: add layer on top that is aware of routed id and store - make this dumber
class CardDetailContainer extends React.Component{
  render() {
    const cardId = this.props.match.params.id;
    const { store } = this.context;
    const state = store.getState();
    const card = state.cards.find((card) => ( card.id === cardId ));
    const decks = state.decks.filter((deck) => ( deck.cards.includes(cardId) ));
    const deckNames = decks.map((deck) => ( deck.name) );
    const cardDeck = {...card, decks}

    return (
      <CardDetail
        card={cardDeck}
      />
    );
  }
}
CardDetailContainer.contextTypes = {
  store: PropTypes.object
}

export default CardDetailContainer;
