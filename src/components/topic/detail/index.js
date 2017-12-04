import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Header } from 'semantic-ui-react';

import { ShortCard } from '../../card/_cardCard/';

class TopicDetail extends React.Component {
  static propTypes = {
    topic: PropTypes.object,
    onCardSelect: PropTypes.func,
  };

  render() {
    const cards = this.props.topic.cards.map(card => (
      <ShortCard key={card.id} card={card} onSelect={this.props.onCardSelect} />
    ));
    return (
      <Container>
        <Header as="h2">{this.props.topic.name}</Header>
        <Card.Group itemsPerRow={1}>{cards}</Card.Group>
      </Container>
    );
  }
}

export default TopicDetail;
