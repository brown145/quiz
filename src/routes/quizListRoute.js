import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import QuizList from 'components/quiz/list/';

const mapStateToTopicProps = (store) => {
  const { quizResults } = store.entities;
  return {
    quizResults: quizResults.allIds.map(quizResultId => ({
      ...quizResults.byId[quizResultId],
    })),
  };
};

class QuizListContainer extends React.Component {
  static propTypes = {
    quizResults: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  handler_quizResultClick = quizResultId => {
    if (quizResultId) {
      this.props.history.push(`/quizes/${quizResultId}`);
    }
  };

  render() {
    return (
      <QuizList
        quizResults={this.props.quizResults}
        onQuizSelect={this.handler_quizResultClick}
      />
    );
  }
}

export default connect(
  mapStateToTopicProps
)(QuizListContainer);
