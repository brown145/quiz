import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TopicDetail from '../components/topic/detail';
import { getCardsByTopic, getTopicsByCard } from '../helpers/entityHelper';

const mapStateToTopicProps = (store, ownProps) => {
  const topicId = ownProps.match.params.id;
  const { cardTopics, cards, topics } = store.entities;

  return {
    topic: {
      id: topics.byId[topicId],
      cards: getCardsByTopic(cardTopics, cards, topicId).map(card => ({
        ...card,
        topics: getTopicsByCard(cardTopics, topics, card.id),
      })),
    },
  };
};

class TopicDetailContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    topic: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  handler_cardClick = cardId => {
    if (cardId) {
      this.props.history.push(`/cards/${cardId}`);
    }
  };

  handler_topicClick = topicId => {
    if (topicId) {
      this.props.history.push(`/topics/${topicId}`);
    }
  };

  render() {
    if (!this.props.topic.id){
      // TODO: handle error/loading onCardSelect
      return <div>loading</div>;
    }

    return (
      <TopicDetail
        topic={this.props.topic}
        onCardSelect={this.handler_cardClick}
        onTopicSelect={this.handler_topicClick}
      />
    );
  }
}

export default connect(mapStateToTopicProps)(TopicDetailContainer);
