import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import { getUniqueId } from 'helpers/entityHelper';
import { cardShape } from 'helpers/entityShapes';

import ActiveQuestion from './activeQuestion';

class QuizActive extends React.Component {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape(cardShape)).isRequired,
    onQuestionAnswer: PropTypes.func.isRequired,
    onStartQuiz: PropTypes.func.isRequired,
    onEndQuiz: PropTypes.func.isRequired,
  }

  state = {
    currentCardIndex: null,
  }

  onStart = () => {
    const quizId = getUniqueId();
    this.setState({
      quizId,
      currentCardIndex: 0,
    });
    this.props.onStartQuiz(quizId);
  }

  onAnswer = (cardId, isCorrect) => {
    const nextIndex = this.state.currentCardIndex + 1;
    this.props.onQuestionAnswer(this.state.quizId, cardId, isCorrect);
    this.setState({
      currentCardIndex: nextIndex,
    });
    if (nextIndex >= this.props.cards.length){
      this.props.onEndQuiz(this.state.quizId);
    }
  }

  renderStartButton() {
    return (
      <Button onClick={this.onStart}>Start</Button>
    );
  }

  renderQuestion() {
    const currentCard = this.props.cards[this.state.currentCardIndex];

    if (!currentCard) {
      return ('complete');
    }

    return (
      <ActiveQuestion
        card= {currentCard}
        onAnswer= {this.onAnswer}
      />
    );
  }

  render() {
    const quizStarted = this.state.currentCardIndex !== null;

    return (quizStarted) ? this.renderQuestion() : this.renderStartButton();
  }
}

export default QuizActive;
