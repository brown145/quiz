import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Header } from 'semantic-ui-react';

import { ShortCard } from '../../card/_cardCard/';
import { deckShape } from '../../../helpers/entityShapes';
import RelationSelector from '../../_common/relator/select';

class DeckDetail extends React.Component {
  static propTypes = {
    deck: PropTypes.shape(deckShape).isRequired,
    onCardSelect: PropTypes.func.isRequired,
    onTopicSelect: PropTypes.func.isRequired,
    onRelateCardToDeck: PropTypes.func.isRequired,
  };

  onRelateTopic = cardId => {
    this.props.onRelateCardToDeck(cardId, this.props.deck.id);
  };

  render() {
    const {relatableCards} = this.props.deck;
    const cards = this.props.deck.cards.map(card => (
      <ShortCard
        key={card.id}
        card={card}
        onCardSelect={this.props.onCardSelect}
        onTopicSelect={this.props.onTopicSelect}
      />
    ));
    const optionItems = relatableCards
      ? relatableCards.map(card => ({ id: card.id, text: card.question }))
      : [];
    return (
      <Container>
        <Header as="h2">{this.props.deck.name}</Header>
        <Card.Group itemsPerRow={1}>{cards}</Card.Group>
        <RelationSelector
          text="Select a card to relate"
          optionItems={optionItems}
          onSelect={this.onRelateTopic}
        />
      </Container>
    );
  }
}

export default DeckDetail;
