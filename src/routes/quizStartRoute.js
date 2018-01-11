import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { parse as qsParse } from 'qs';

import { getCardsByDeck, getTopicsByCard } from 'helpers/entityHelper';
import { createQuiz, updateQuizQuestion, updateQuizComplete } from 'actions/entityActions';
import { cardShape } from 'helpers/entityShapes';

import ActiveQuiz from 'components/quiz/detail/active';

const mapStateToDeckProps = (store, ownProps) => {
  const { cardDecks, cardTopics, cards, topics } = store.entities;
  const quizScope = qsParse(ownProps.location.search.substr(1));

  let quizCards = [];
  if (quizScope.deckId) {
    quizCards = getCardsByDeck(cardDecks, cards, quizScope.deckId);
  } else if (quizScope.topicId) {
    // TODO
  }

  return {
    deckId: quizScope.deckId,
    topicId: quizScope.topicId,
    cards: quizCards.map( card => ({
      ...card,
      topics: getTopicsByCard(cardTopics, topics, card.id),
    })),
  };
};

class ActiveQuizContainer extends React.Component {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape(cardShape)).isRequired,
    deckId: PropTypes.string,
    topicId: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  handle_quizQuestionAnswered = (quizId, cardId, isCorrect) => {
    this.props.dispatch(updateQuizQuestion(quizId, cardId, isCorrect));
  }

  handle_quizEnd = (quizId) => {
    this.props.dispatch(updateQuizComplete(quizId, true, Date.now()));
    this.props.history.push(`/quizzes/${quizId}`);
  }

  handle_quizStart = (quizId) => {
    this.props.dispatch(createQuiz({
      id: quizId,
      started: Date.now(),
      deckId: this.props.deckId,
      topicId: this.props.topicId,
    }));
  }

  render() {
    if (!this.props.cards.length) {
      return 'loading';
    }

    return (
      <ActiveQuiz
        cards= {this.props.cards}
        onStartQuiz={this.handle_quizStart}
        onEndQuiz={this.handle_quizEnd}
        onQuestionAnswer={this.handle_quizQuestionAnswered}
      />
    );
  }
}

export default connect(mapStateToDeckProps)(ActiveQuizContainer);
