import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card as SemanticCard,
  Container,
  Icon,
} from 'semantic-ui-react';

const Deck = props => (
  <SemanticCard value={props.deck.id} onClick={props.onSelect}>
    <SemanticCard.Content>
      <SemanticCard.Header>{props.deck.name}</SemanticCard.Header>
      <SemanticCard.Meta>meta TBD</SemanticCard.Meta>
      <SemanticCard.Description>
        <Button onClick={props.onEditClick}>Edit</Button>
        <Button onClick={props.onDelete}>Remove</Button>
        <Container>{props.deck.description}</Container>
      </SemanticCard.Description>
    </SemanticCard.Content>
    <SemanticCard.Content extra>
      <Icon name="cubes" />
      {props.deck.cards.length} Cards
    </SemanticCard.Content>
  </SemanticCard>
);
Deck.propTypes = {
  deck: PropTypes.object,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
  onEditClick: PropTypes.func,
};

export default Deck;
