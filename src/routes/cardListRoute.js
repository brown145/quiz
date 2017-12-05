import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createCard, deleteCard, updateCard } from '../actions/entityActions';

import CardList from '../components/card/list/';

const mapStateToTopicProps = (store) => {
  // DEV NOTE: de-normalizing data here
  //           it looks a bit messy, but just populating relations as nested objects
  //           redux likes data normalized but UI is easier with de-normalized
  //           this seems like an ok place to denormalize
  let topicsByCard = {};
  let decksByCard = {};
  store.entities.cards.allIds.forEach(cardId => {
    const topics = Object.entries(store.entities.cardTopics.byId)
      .map((entry) => (entry[1]))
      .filter(ct => ct.cardId === cardId)
      .map(ct => (store.entities.topics.byId[ct.topicId]));
    topicsByCard[cardId] = topics;
    const decks = Object.entries(store.entities.cardDecks.byId)
      .map((entry) => (entry[1]))
      .filter(cd => cd.cardId === cardId)
      .map(cd => (store.entities.decks.byId[cd.deckId]));
    decksByCard[cardId] = decks;
  });

  return {
    cards: store.entities.cards.allIds.map(cardId => ({
      ...store.entities.cards.byId[cardId],
      topics: topicsByCard[cardId],
      decks: decksByCard[cardId],
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

  render() {
    return (
      <CardList
        cards={this.props.cards}
        onCardSelect={this.handler_cardClick}
        onDeckSelect={this.handler_deckClick}
        onCardCreate={(card) => ( this.props.dispatch(createCard(card)) )}
        onCardDelete={(card) => ( this.props.dispatch(deleteCard(card)) )}
        onCardUpdate={(card) => ( this.props.dispatch(updateCard(card)) )}
      />
    );
  }
}

export default connect(
  mapStateToTopicProps
)(CardListContainer);
