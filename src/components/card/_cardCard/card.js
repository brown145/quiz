import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card as SemanticCard } from 'semantic-ui-react';

import CardRibon from './cardRibon';
import DeckListInline from './deckListInline';

const Card = props => {
  const onSelect = (e, { value }) => {
    props.onSelect(value);
    e.stopPropagation();
  };

  let buttons = [];
  if (props.onDelete) {
    buttons.push(<Button key="removeButton" onClick={props.onDelete}>Remove</Button>);
  }
  if (props.onEditClick) {
    buttons.push(<Button key="editButton" onClick={props.onEditClick}>Edit</Button>);
  }

  return (
    <SemanticCard fluid value={props.card.id} onClick={onSelect}>
      <SemanticCard.Content>
        <CardRibon topics={props.card.topics} />
        <SemanticCard.Header>{props.card.question}</SemanticCard.Header>
        {buttons}
      </SemanticCard.Content>
      <SemanticCard.Content extra>
        <span>included in: </span>
        <DeckListInline decks={props.card.decks} onDeckSelect={props.onDeckSelect} />
      </SemanticCard.Content>
    </SemanticCard>
  );
};
Card.propTypes = {
  card: PropTypes.object,
  onDeckSelect: PropTypes.func,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
  onEditClick: PropTypes.func,
};

export default Card;
