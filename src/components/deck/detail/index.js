import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Header } from 'semantic-ui-react';

import { ShortCard } from '../../card/_cardCard/';
import { deckShape } from '../../../helpers/entityShapes';

class DeckDetail extends React.Component {
  static propTypes = {
    deck: PropTypes.shape(deckShape).isRequired,
    onCardSelect: PropTypes.func.isRequired,
    onTopicSelect: PropTypes.func.isRequired,
  };

  render() {
    const cards = this.props.deck.cards.map(card => (
      <ShortCard
        key={card.id}
        card={card}
        onCardSelect={this.props.onCardSelect}
        onTopicSelect={this.props.onTopicSelect}
      />
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
