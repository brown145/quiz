import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

import CardRibon from './cardRibon';

const ShortCard = props => {
  const onSelect = (e, { value }) => {
    props.onSelect(value);
    e.stopPropagation();
  };
  return (
    <Card
      header={props.card.question}
      description={<CardRibon topics={['test', 'TODO']} />}
      value={props.card.id}
      onClick={onSelect}
    />
  );
};
ShortCard.propTypes = {
  card: PropTypes.object,
  onSelect: PropTypes.func,
};

export default ShortCard;
