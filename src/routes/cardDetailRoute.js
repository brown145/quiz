import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateCard } from 'actions/entityActions';
import {
  getDecksByCard,
  getTopicsByCard,
  getRelateableTopicsByCard,
} from 'helpers/entityHelper';
import { relateTopicToCard } from 'actions/entityActions';

import CardDetail from 'components/card/detail';
import WarningUI from 'components/warningBlurb';

const mapStateToCardProps = (store, ownProps) => {
  const cardId = ownProps.match.params.id;
  const { cardDecks, cardTopics, cards, decks, topics } = store.entities;

  return {
    card: {
      ...cards.byId[cardId],
      decks: getDecksByCard(cardDecks, decks, cardId),
      topics: getTopicsByCard(cardTopics, topics, cardId),
      relatableTopics: getRelateableTopicsByCard(cardTopics, topics, cardId),
    },
  };
};

class CardDetailContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    card: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
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
    // TODO: this should be loading icon
    if (!this.props.card || this.props.card.id === undefined) {
      return <WarningUI messageText={'Could not load card!'} />;
    }

    return (
      <CardDetail
        card={this.props.card}
        onDeckSelect={this.handler_deckClick}
        onTopicSelect={this.handler_topicClick}
        onUpdate={card => this.props.dispatch(updateCard(card))}
        onRelateTopicToCard={(topicId, cardId) =>
          this.props.dispatch(relateTopicToCard(topicId, cardId))
        }
      />
    );
  }
}

export default connect(mapStateToCardProps)(CardDetailContainer);
