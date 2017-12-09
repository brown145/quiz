import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getCardsByDeck,
  getRelateableCardsByDeck,
  getTopicsByCard,
} from '../helpers/entityHelper';
import { relateCardToDeck, unRelateCardToDeck } from '../actions/entityActions';

import DeckDetail from '../components/deck/detail';
import WarningUI from '../components/warningBlurb';

const mapStateToDeckProps = (store, ownProps) => {
  const deckId = ownProps.match.params.id;
  const { cardDecks, cardTopics, cards, decks, topics } = store.entities;
  return {
    deck: {
      ...decks.byId[deckId],
      cards: getCardsByDeck(cardDecks, cards, deckId).map(card => ({
        ...card,
        topics: getTopicsByCard(cardTopics, topics, card.id),
      })),
      relatableCards: getRelateableCardsByDeck(cardDecks, cards, deckId),
    },
  };
};

class DeckDetailContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    deck: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  handler_cardClick = cardId => {
    if (cardId) {
      this.props.history.push(`/cards/${cardId}`);
    }
  };

  handler_topicClick = topicId => {
    if (topicId) {
      this.props.history.push(`/topics/${topicId}`);
    }
  };

  render() {
    const { deck } = this.props;

    if (!deck || !deck.id) {
      return <WarningUI messageText="Could not load deck" />;
    }

    return (
      <DeckDetail
        deck={deck}
        onCardSelect={this.handler_cardClick}
        onTopicSelect={this.handler_topicClick}
        onRelateCardToDeck={(cardId, deckId) =>
          this.props.dispatch(relateCardToDeck(cardId, deckId))
        }
        onUnRelateCardToDeck={(cardId, deckId) =>
          this.props.dispatch(unRelateCardToDeck(cardId, deckId))
        }
      />
    );
  }
}

export default connect(mapStateToDeckProps)(DeckDetailContainer);
