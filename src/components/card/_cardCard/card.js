import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card as SemanticCard } from 'semantic-ui-react';

import CardRibon from 'components/card/_cardCard/cardRibon';
import DeckListInline from 'components/card/_cardCard/deckListInline';
import { cardShape } from 'helpers/entityShapes';

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
        <CardRibon topics={props.card.topics} onSelect={props.onTopicSelect} />
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
  card: PropTypes.shape(cardShape).isRequired,
  onDeckSelect: PropTypes.func.isRequired,
  onTopicSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
  onEditClick: PropTypes.func.isRequired,
};

export default Card;
