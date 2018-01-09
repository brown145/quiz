import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import QuizSummary from 'components/quiz/detail/summary';

const mapStateToTopicProps = (store, ownProps) => {
  const { quizResults } = store.entities;
  const quizId = ownProps.match.params.id;
  return {
    quizResult: {
      ...quizResults.byId[quizId],
    },
  };
};

class QuizSummaryContainer extends React.Component {
  static propTypes = {
    quizResult: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  render() {
    if (!this.props.quizResult.id) {
      return '';
    }

    return (
      <QuizSummary
        quizResult={this.props.quizResult}
      />
    );
  }
}

export default connect(
  mapStateToTopicProps
)(QuizSummaryContainer);
