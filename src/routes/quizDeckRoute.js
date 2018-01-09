import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getCardsByDeck,
  getTopicsByCard,
  attributesToDeckQuiz,
} from 'helpers/entityHelper';
import { createDeckQuiz, updateDeckQuizComplete } from 'actions/entityActions';

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

  state = {
    quizResultsId: null,
  }

  handler_startQuiz = () => {
    const quiz = attributesToDeckQuiz({
      deckId: this.props.deck.id,
      started: Date.now(),
    });
    this.setState({
      quizResultsId: quiz.id,
    });
    this.props.dispatch(createDeckQuiz({
      ...quiz,
    }));
  };

  handler_endQuiz = () => {
    this.props.dispatch(updateDeckQuizComplete(this.state.quizResultsId, true, Date.now()));
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
        onStartQuiz={this.handler_startQuiz}
        onEndQuiz={this.handler_endQuiz}
      />
    );
  }
}

export default connect(mapStateToDeckProps)(QuizDeckContainer);
