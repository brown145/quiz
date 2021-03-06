import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Header } from 'semantic-ui-react';

import { ShortCard } from 'components/card/_cardCard/';
import { topicShape } from 'helpers/entityShapes';

class TopicDetail extends React.Component {
  static propTypes = {
    topic: PropTypes.shape(topicShape).isRequired,
    onCardSelect: PropTypes.func.isRequired,
    onTopicSelect: PropTypes.func.isRequired,
    onUnRelateCardToTopic: PropTypes.func.isRequired,
  };

  onUnRelateTopic = cardId => {
    this.props.onUnRelateCardToTopic(cardId, this.props.topic.id);
  };

  render() {
    const cards = this.props.topic.cards.map(card => (
      <ShortCard
        key={card.id}
        card={card}
        onSelect={this.props.onCardSelect}
        onRemove={this.onUnRelateTopic}
        onTopicSelect={this.props.onTopicSelect}
      />
    ));
    return (
      <Container>
        <Header as="h2">{this.props.topic.id}</Header>
        <Card.Group itemsPerRow={1}>{cards}</Card.Group>
      </Container>
    );
  }
}

export default TopicDetail;
