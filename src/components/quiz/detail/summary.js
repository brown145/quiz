import React from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Header, List, Statistic, Progress } from 'semantic-ui-react';
import moment from 'moment';

import { quizResultShape } from 'helpers/entityShapes';

class QuizSummary extends React.Component {
  static propTypes = {
    quizResult: PropTypes.shape(quizResultShape).isRequired,
  }

  render() {
    const { deckId, ended, results } = this.props.quizResult;
    const correct = results.correctCardIds.length;
    const total = results.correctCardIds.length + results.incorrectCardIds.length;
    const score = (total) ? correct / total : 0;

    return (
      <Container>
        <Header>
          Quiz Results for {deckId}
          <Header.Subheader> Completed {moment(ended).format('MMMM Do YYYY kk:mm:ss')}</Header.Subheader>
        </Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width={2} floated="left">
              <Statistic
                value={correct}
                label="Correct"
              />
            </Grid.Column>
            <Grid.Column width={2} floated="right" textAlign="right">
              <Statistic
                value={total}
                label="total"
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Progress percent={score} progress />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column floated="left">
              Correct
              <List divided items={results.correctCardIds} />
            </Grid.Column>
            <Grid.Column floated="right" textAlign="right">
              Incorrect
              <List divided items={results.incorrectCardIds} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default QuizSummary;
