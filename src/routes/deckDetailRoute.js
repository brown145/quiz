import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addCardToDeck } from '../actions/entityActions';

import DeckDetail from '../components/deckDetail';
import WarningUI from '../components/warningBlurb';

// TODO: it would be preferable to map to a single deck
//       however, this would require me to have the id of the deck
//       and at present that is only in the router state, it will
//       be passed as prop later
const mapStateToDeckProps = (store) => {
  let cardsByDeck = {};
  store.entities.decks.allIds.forEach(deckId => {
    const relations = Object.entries(store.entities.cardDecks.byId)
      .map((entry) => (entry[1]))
      .filter(cd => cd.deckId === deckId)
      .map(cd => (store.entities.cards.byId[cd.cardId]));
    cardsByDeck[deckId] = relations;
  });

  // TODO: get topics for card
  return {
    decks: store.entities.decks.allIds.map(deckId => ({
      ...store.entities.decks.byId[deckId],
      cards: cardsByDeck[deckId],
    })),
  };
};

class DeckDetailContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    decks: PropTypes.array,
    dispatch: PropTypes.func,
  };

  handler_cardClick = cardId => {
    if (cardId) {
      this.props.history.push(`/cards/${cardId}`);
    }
  };

  handler_addCard = (deck, cardAttrs) => {
    // this is assuming a new card
    this.props.dispatch(this);
  }

  render() {
    const deckId = this.props.match.params.id;
    const deck = this.props.decks.find(deck => deck.id === deckId);

    if (!deck) {
      return <WarningUI messageText="Could not load deck" />;
    }

    return (
      <DeckDetail
        deck={deck}
        onCardClick={this.handler_cardClick}
        onAddCardToDeck={(attrs) => ( this.props.dispatch(addCardToDeck(attrs, deck.id)) )}
      />
    );
  }
}

export default connect(mapStateToDeckProps)(DeckDetailContainer);
