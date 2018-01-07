import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createDeck, deleteDeck, updateDeck } from 'actions/entityActions';
import { getCardsByDeck } from 'helpers/entityHelper';

import DeckList from 'components/deck/list';

const mapStateToDeckProps = store => {
  const { cardDecks, cards, decks } = store.entities;

  return {
    decks: decks.allIds.map(deckId => ({
      ...decks.byId[deckId],
      cards: getCardsByDeck(cardDecks, cards, deckId),
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
    if (!this.props.decks.length){
      // TODO: handle error/loading onCardSelect
      return <div>loading</div>;
    }
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
