import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container } from 'semantic-ui-react';

import { cardShape } from 'helpers/entityShapes';

class QuizQuestion extends React.Component {
  static propTypes = {
    card: PropTypes.shape(cardShape).isRequired,
  };

  state = {
    answerRevealed: false,
  }

  revealAnswer = () => {
    this.setState({
      answerRevealed: true,
    });
  }

  render() {
    const { card } = this.props;
    const answer = (this.state.answerRevealed) ? card.answer : <Button onClick={this.revealAnswer}>Answer</Button>;
    return (
      <Container>
        <Container>{card.question}</Container>
        <Container>{answer}</Container>
      </Container>
    );
  }
}

export default QuizQuestion;
