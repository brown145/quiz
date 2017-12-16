import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'semantic-ui-react';

import CardRibon from './cardRibon';
import { cardShape } from 'helpers/entityShapes';

const ShortCard = props => {
  const onSelect = (e) => {
    props.onSelect(props.card.id);
    e.stopPropagation();
  };

  const onRemove = (e) => {
    props.onRemove(props.card.id);
    e.stopPropagation();
  };

  return (
    <Card onClick={onSelect}>
      <Card.Content>
        <CardRibon topics={props.card.topics} onSelect={props.onTopicSelect} />
        <Card.Header>{props.card.question}</Card.Header>
        <Icon link name="x" onClick={onRemove} />
      </Card.Content>
    </Card>
  );
};
ShortCard.propTypes = {
  card: PropTypes.shape(cardShape).isRequired,
  onSelect: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onTopicSelect: PropTypes.func.isRequired,
};

export default ShortCard;
