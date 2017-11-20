import React from 'react';
import { Container, Header, Card, Icon } from 'semantic-ui-react';

import WarningUI from './warningBlurb';

class DeckList extends React.Component {
  state = {
    decks: this.props.decks || []
  }

  render() {
    // Edge case - no decks
    if (!this.state.decks.length){
      return (
        <WarningUI
          messageText='No decks loaded!'
          actionText='Add a new deck?'
        />
      );
    }

    return (
      <DeckListUI
        decks={this.state.decks}
        onDeckSelect={this.props.onDeckSelect}
      />
    );
  }
}

const DeckListUI = props => (
  <Container>
    <Header as='h2'>Deck List</Header>
    <Card.Group itemsPerRow='2'>
      {props.decks.map(deck => (
        <DeckListItemUI
          key={deck.id}
          deck={deck}
          onDeckSelect={props.onDeckSelect}
        />
      ))}
    </Card.Group>
  </Container>
);

const DeckListItemUI = props => {
  this.onDeckSelect = e => {
    props.onDeckSelect(props.deck.id);
    e.preventDefault();
  }
  this.getDeckDescription = () => (
    <div className='ui description'>
      created: {(new Date(props.deck.created)).toDateString()}<br />
      last viewed: {(new Date(props.deck.lastViewed)).toDateString()}
    </div>
  )
  this.getExtra = () => (
    <a>
      <Icon name='cubes' />
      {props.deck.cards.length} Cards
    </a>
  )
  return (
    <Card
      onClick={this.onDeckSelect}
      header={props.deck.name || 'Unnamed Deck'}
      meta={props.deck.description}
      description={this.getDeckDescription()}
      extra={this.getExtra()}
    />
  );
}

export default DeckList;
