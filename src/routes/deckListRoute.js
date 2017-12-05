import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createDeck, deleteDeck, updateDeck } from '../actions/entityActions';

import DeckList from '../components/deck/list';

const mapStateToDeckProps = store => {
  // DEV NOTE: de-normalizing data here
  //           it looks a bit messy, but just populating relations as nested objects
  //           redux likes data normalized but UI is easier with de-normalized
  //           this seems like an ok place to denormalize
  let cardsByDeck = {};
  store.entities.decks.allIds.forEach(deckId => {
    const relations = Object.entries(store.entities.cardDecks.byId)
      .map(entry => entry[1])
      .filter(cd => cd.deckId === deckId)
      .map(cd => store.entities.cards.byId[cd.cardId]);
    cardsByDeck[deckId] = relations;
  });

  return {
    decks: store.entities.decks.allIds.map(deckId => ({
      ...store.entities.decks.byId[deckId],
      cards: cardsByDeck[deckId],
    })),
  };
};

class DeckListContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    decks: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  handler_deckClick = deckId => {
    if (deckId) {
      this.props.history.push(`/decks/${deckId}`);
    }
  };

  render() {
    return (
      <DeckList
        decks={this.props.decks}
        onDeckCreate={deck => this.props.dispatch(createDeck(deck))}
        onDeckDelete={deck => this.props.dispatch(deleteDeck(deck))}
        onDeckSelect={this.handler_deckClick}
        onDeckUpdate={deck => this.props.dispatch(updateDeck(deck))}
      />
    );
  }
}

export default connect(mapStateToDeckProps)(DeckListContainer);
