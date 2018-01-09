import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card as SemanticCard,
  Container,
  Icon,
} from 'semantic-ui-react';
import { deckShape } from 'helpers/entityShapes';

const Deck = props => {
  const onSelect = (e, { value }) => {
    props.onSelect(value);
    e.stopPropagation();
  };

  return (
    <SemanticCard value={props.deck.id} onClick={onSelect}>
      <SemanticCard.Content>
        <SemanticCard.Header>{props.deck.name}</SemanticCard.Header>
        <SemanticCard.Meta>[Last Quiz Date] TBD</SemanticCard.Meta>
        <SemanticCard.Description>
          <Container>{props.deck.description}</Container>
          <Button basic floated="right" size="tiny"
            compact onClick={props.onDelete}
          >
            <Icon name="remove" />
            Remove
          </Button>
          <Button basic floated="right" size="tiny"
            compact onClick={props.onEditClick}
          >
            <Icon name="pencil" />
            Edit
          </Button>
        </SemanticCard.Description>
      </SemanticCard.Content>
      <SemanticCard.Content extra className="link">
        <Icon name="cubes" />
        {props.deck.cards.length} Cards
      </SemanticCard.Content>
    </SemanticCard>
  );
};
Deck.propTypes = {
  deck: PropTypes.shape(deckShape).isRequired,
  onDelete: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
};

export default Deck;
