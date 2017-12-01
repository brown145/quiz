import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Header } from 'semantic-ui-react';

class TopicList extends React.Component {
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
      <Card
        key={card.id}
        header={card.question}
        value={card.id}
        onClick={this.onCardSelect}
      />
    ));
    return (
      <Container>
        <Header as="h2">{this.props.topic.name}</Header>
        <Card.Group>{cards}</Card.Group>
      </Container>
    );
  }
}

export default TopicList;
