import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createCard, deleteCard, updateCard } from '../actions/entityActions';
import { getDecksByCard, getTopicsByCard } from '../helpers/entityHelper';

import CardList from '../components/card/list/';

const mapStateToTopicProps = (store) => {
  const { cardDecks, cardTopics, cards, decks, topics } = store.entities;

  return {
    cards: cards.allIds.map(cardId => ({
      ...cards.byId[cardId],
      decks: getDecksByCard(cardDecks, decks, cardId),
      topics: getTopicsByCard(cardTopics, topics, cardId),
    })),
  };
};

class CardListContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    cards: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  handler_cardClick = cardId => {
    if (cardId) {
      this.props.history.push(`/cards/${cardId}`);
    }
  };

  handler_deckClick = deckId => {
    if (deckId) {
      this.props.history.push(`/decks/${deckId}`);
    }
  };

  handler_topicClick = topicId => {
    if (topicId) {
      this.props.history.push(`/topics/${topicId}`);
    }
  };

  render() {
    return (
      <CardList
        cards={this.props.cards}
        onCardSelect={this.handler_cardClick}
        onDeckSelect={this.handler_deckClick}
        onCardCreate={(card) => ( this.props.dispatch(createCard(card)) )}
        onCardDelete={(card) => ( this.props.dispatch(deleteCard(card)) )}
        onCardUpdate={(card) => ( this.props.dispatch(updateCard(card)) )}
        onTopicSelect={this.handler_topicClick}
      />
    );
  }
}

export default connect(
  mapStateToTopicProps
)(CardListContainer);
