import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

import CardRibon from './cardRibon';
import { cardShape } from '../../../helpers/entityShapes';

const ShortCard = props => {
  const onSelect = (e, { value }) => {
    props.onCardSelect(value);
    e.stopPropagation();
  };

  return (
    <Card
      header={props.card.question}
      description={<CardRibon topics={props.card.topics} onSelect={props.onTopicSelect} />}
      value={props.card.id}
      onClick={onSelect}
    />
  );
};
ShortCard.propTypes = {
  card: PropTypes.shape(cardShape).isRequired,
  onCardSelect: PropTypes.func.isRequired,
  onTopicSelect: PropTypes.func.isRequired,
};

export default ShortCard;
