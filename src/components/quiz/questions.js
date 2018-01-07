import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container } from 'semantic-ui-react';

import Question from './question';
import { cardShape } from 'helpers/entityShapes';

class QuizQuestions extends React.Component {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape(cardShape)).isRequired,
    onEndQuiz: PropTypes.func.isRequired,
    onStartQuiz: PropTypes.func.isRequired,
  };

  state = {
    currentCard: null,
  }

  getNextCard = (currentCard) => (
    this.props.cards[this.props.cards.indexOf(currentCard) + 1]
  );

  onNext = () => {
    const nextCard = this.getNextCard(this.state.currentCard);

    if (!this.state.currentCard){
      this.props.onStartQuiz();
    }

    if (!nextCard){
      this.props.onEndQuiz();
    }

    this.setState({
      currentCard: nextCard,
    });
  }

  render() {
    const { currentCard } = this.state;
    const buttonText = (currentCard) ? 'Next' : 'Start';
    const question = (currentCard) ? <Question key={currentCard.id} card={currentCard} /> : '';
    return (
      <Container>
        {question}
        <Button onClick={this.onNext}>{buttonText}</Button>
      </Container>
    );
  }
}

export default QuizQuestions;
