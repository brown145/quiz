import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TopicDetail from '../components/topic/detail';

const mapStateToTopicProps = (store, ownProps) => {
  // DEV NOTE: de-normalizing data here
  //           it looks a bit messy, but just populating relations as nested objects
  //           redux likes data normalized but UI is easier with de-normalized
  //           this seems like an ok place to denormalize
  const topicId = ownProps.match.params.id;
  const topicEntity = store.entities.topics.byId[topicId];
  const topicCardEntites = Object.entries(store.entities.cardTopics.byId)
    .map(entry => entry[1])
    .filter(ct => ct.topicId === topicId)
    .map(ct => store.entities.cards.byId[ct.cardId]);

  return {
    topic:{
      name: topicEntity,
      cards: topicCardEntites,
    },
  };
};

class TopicDetailContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    topic: PropTypes.object,
    dispatch: PropTypes.func,
  };

  handler_cardClick = cardId => {
    if (cardId) {
      this.props.history.push(`/cards/${cardId}`);
    }
  };

  render() {
    return (
      <TopicDetail
        topic={this.props.topic}
        onCardSelect={this.handler_cardClick}
      />
    );
  }
}

export default connect(
  mapStateToTopicProps
)(TopicDetailContainer);
