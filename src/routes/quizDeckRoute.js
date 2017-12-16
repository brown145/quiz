import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getCardsByDeck,
  getTopicsByCard,
} from 'helpers/entityHelper';

import QuizQuestions from 'components/quiz/questions';
import WarningUI from 'components/warningBlurb';

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
    },
  };
};

class QuizDeckContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    deck: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  handler_endQuiz = () => {
    this.props.history.push(`/decks/${this.props.deck.id}`);
  };

  render() {
    const { deck } = this.props;

    if (!deck || !deck.id) {
      return <WarningUI messageText="Could not load deck" />;
    }

    return (
      <QuizQuestions
        cards={deck.cards}
        onEndQuiz={this.handler_endQuiz}
      />
    );
  }
}

export default connect(mapStateToDeckProps)(QuizDeckContainer);
