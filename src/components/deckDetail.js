import React from 'react';
import { Container, Header, Card, Label } from 'semantic-ui-react';

import WarningUI from './warningBlurb';

class DeckDetail extends React.Component {
  state = {
    name: this.props.name || '',
    description: this.props.description || '',
    lastViewed: this.props.lastViewed,
    cards: this.props.cards || [],
  }

  render() {
    const deck = this.props.deck;

    // Edge case - no cards in deck
    if (!this.state.cards.length){
      return (
        <WarningUI
          messageText='No cards in deck!'
          actionText='Add card?'
        />
      );
    }

    return (
      <CardListUI
        deckId={this.props.deckId}
        name={this.state.name}
        description={this.state.description}
        created={this.props.created}
        lastViewed={this.state.lastViewed}
        cards={this.state.cards}
        onCardSelect={this.props.onCardClick}
      />
    );
  }
}

const CardListUI = props => (
  <Container>
    <Header as='h2'>Deck {props.name}</Header>
    <Card.Group itemsPerRow='1'>
      {props.cards.map(card => (
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
