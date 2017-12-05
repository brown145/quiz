import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

import CardRibon from './cardRibon';
import { cardShape } from '../../../helpers/entityShapes';

const ShortCard = props => {
  const onSelect = (e, { value }) => {
    props.onSelect(value);
    e.stopPropagation();
  };

  const temp = [{
    id: 'todo',
  }];

  return (
    <Card
      header={props.card.question}
      description={<CardRibon topics={temp} />}
      value={props.card.id}
      onClick={onSelect}
    />
  );
};
ShortCard.propTypes = {
  card: PropTypes.shape(cardShape).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ShortCard;
