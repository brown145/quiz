import React from 'react';
import { Container, Header, Card, Label } from 'semantic-ui-react';

import WarningUI from './warningBlurb';

class DeckDetail extends React.Component{
  render() {
    const deck = this.props.deck;

    // Edge case - no cards in deck
    if (!deck.cards.length){
      return (
        <WarningUI
          messageText='No cards in deck!'
          actionText='Add card?'
        />
      );
    }

    return (
      <CardListUI
        deck={deck}
        onCardSelect={this.props.onCardClick}
      />
    );
  }
}

const CardListUI = props => (
  <Container>
    <Header as='h2'>Deck {props.deck.name}</Header>
    <Card.Group itemsPerRow='1'>
      {props.deck.cards.map(card => (
        <CardListItemUI
          key={card.id}
          card={card}
          onCardSelect={props.onCardSelect}
        />
      ))}
    </Card.Group>
  </Container>
);

const CardListItemUI = props => {
  this.onCardSelect = e => {
    props.onCardSelect(props.card.id);
    e.preventDefault();
  }
  return (
    <Card onClick={this.onCardSelect}>
      <Card.Content>
        <Label ribbon='right'>{props.card.topics.join(' | ')}</Label>
        <Card.Header>{props.card.question}</Card.Header>
      </Card.Content>
    </Card>
  );
}

export default DeckDetail;
