import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Header } from 'semantic-ui-react';

import { ShortCard } from '../../card/_cardCard/';

class DeckDetail extends React.Component {
  static propTypes = {
    deck: PropTypes.object,
    onCardSelect: PropTypes.func,
  };

  onCardSelect = (e, { value }) => {
    this.props.onCardSelect(value);
    e.preventDefault();
  };

  render() {
    const cards = this.props.deck.cards.map(card => (
      <ShortCard key={card.id} card={card} onSelect={this.onCardSelect} />
    ));
    return (
      <Container>
        <Header as="h2">{this.props.deck.name}</Header>
        <Card.Group itemsPerRow={1}>{cards}</Card.Group>
      </Container>
    );
  }
}

export default DeckDetail;