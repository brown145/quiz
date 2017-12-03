import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card as SemanticCard } from 'semantic-ui-react';

import CardRibon from './cardRibon';
import DeckListInline from './deckListInline';

const Card = props => (
  <SemanticCard fluid value={props.card.id} onClick={props.onSelect}>
    <SemanticCard.Content>
      <CardRibon topics={props.card.topics} />
      <SemanticCard.Header>{props.card.question}</SemanticCard.Header>
      <Button onClick={e => {
        props.onDelete(props.card.id);
        e.stopPropagation();
        e.preventDefault();
      }}
      >Remove</Button>
    </SemanticCard.Content>
    <SemanticCard.Content extra>
      <span>included in: </span>
      <DeckListInline decks={props.card.decks} onDeckSelect={props.onDeckSelect} />
    </SemanticCard.Content>
  </SemanticCard>
);
Card.propTypes = {
  card: PropTypes.object,
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
  onDeckSelect: PropTypes.func,
};

export default Card;
