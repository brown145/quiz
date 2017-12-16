import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createTopic, deleteTopic } from 'actions/entityActions';
import { getCardsByTopic } from 'helpers/entityHelper';

import TopicList from 'components/topic/list/';

const mapStateToTopicProps = (store) => {
  const { cardTopics, cards, topics } = store.entities;
  return {
    topics: topics.allIds.map(topicId => ({
      id: topicId,
      cards: getCardsByTopic(cardTopics, cards, topicId),
    })),
  };
};

class TopicListContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    topics: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  handler_topicClick = topicId => {
    if (topicId) {
      this.props.history.push(`/topics/${topicId}`);
    }
  };

  render() {
    if (!this.props.topics.length){
      // TODO: handle error/loading onCardSelect
      return <div>loading</div>;
    }

    return (
      <TopicList
        topics={this.props.topics}
        onTopicSelect={this.handler_topicClick}
        onTopicCreate={(topic) => ( this.props.dispatch(createTopic(topic)) )}
        onTopicDelete={(topic) => ( this.props.dispatch(deleteTopic(topic)) )}
      />
    );
  }
}

export default connect(
  mapStateToTopicProps
)(TopicListContainer);
