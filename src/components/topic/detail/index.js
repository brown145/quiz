import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Header } from 'semantic-ui-react';

import { ShortCard } from '../../card/_cardCard/';

class TopicDetail extends React.Component {
  static propTypes = {
    topic: PropTypes.object,
    onCardSelect: PropTypes.func,
  };

  onCardSelect = (e, { value }) => {
    this.props.onCardSelect(value);
    e.preventDefault();
  };

  render() {
    const cards = this.props.topic.cards.map(card => (
      <ShortCard key={card.id} card={card} onCardSelect={this.onCardSelect} />
    ));
    return (
      <Container>
        <Header as="h2">{this.props.topic.name}</Header>
        <Card.Group>{cards}</Card.Group>
      </Container>
    );
  }
}

export default TopicDetail;
