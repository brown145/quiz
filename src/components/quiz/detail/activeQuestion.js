import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container } from 'semantic-ui-react';

import { cardShape } from 'helpers/entityShapes';

class QuizQuestion extends React.Component {
  static propTypes = {
    card: PropTypes.shape(cardShape).isRequired,
    onAnswer: PropTypes.func.isRequired,
  };

  state = {
    answerRevealed: false,
  }

  revealAnswer = () => {
    this.setState({
      answerRevealed: true,
    });
  }

  markAnswered = (isCorrect) => {
    this.props.onAnswer(this.props.card.id, isCorrect);
  }

  render() {
    const { card } = this.props;
    const answer = (this.state.answerRevealed) ? card.answer : <Button onClick={this.revealAnswer}>Answer</Button>;
    return (
      <Container>
        <Container>{card.question}</Container>
        <Container>{answer}</Container>
        <Button onClick={() => ( this.markAnswered(true) )} >Got it!</Button>
        <Button onClick={() => ( this.markAnswered(false) )} >Need to Review</Button>
      </Container>
    );
  }
}

export default QuizQuestion;
