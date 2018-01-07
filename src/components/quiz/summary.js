import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

import { quizSummaryShape } from 'helpers/entityShapes';

class QuizSummary extends React.Component {
  static propTypes = {
    summary: PropTypes.shape(quizSummaryShape).isRequired,
  };

  render() {
    const { correctNumber, incorrectNumber } = this.props.summary.counts;
    return (
      <Container>
        <Container>correct: {correctNumber}</Container>
        <Container>incorrect: {incorrectNumber}</Container>
      </Container>
    );
  }
}

export default QuizSummary;
