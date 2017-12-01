import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createTopic, deleteTopic } from '../actions/entityActions';

import TopicList from '../components/topicList';

const mapStateToTopicProps = (store) => {
  // DEV NOTE: de-normalizing data here
  //           it looks a bit messy, but just populating relations as nested objects
  //           redux likes data normalized but UI is easier with de-normalized
  //           this seems like an ok place to denormalize
  let cardsByTopic = {};
  store.entities.topics.allIds.forEach(topicId => {
    const relations = Object.entries(store.entities.cardTopics.byId)
      .map((entry) => (entry[1]))
      .filter(ct => ct.topicId === topicId)
      .map(ct => (store.entities.cards.byId[ct.cardId]));
    cardsByTopic[topicId] = relations;
  });

  return {
    topics: store.entities.topics.allIds.map(topicId => ({
      topic: topicId,
      cards: cardsByTopic[topicId],
    })),
  };
};

class TopicListContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    topics: PropTypes.array,
    dispatch: PropTypes.func,
  };

  handler_topicClick = topicId => {
    if (topicId) {
      this.props.history.push(`/topics/${topicId}`);
    }
  };

  render() {
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
