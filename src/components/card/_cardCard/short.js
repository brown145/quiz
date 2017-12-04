import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

import CardRibon from './cardRibon';

const ShortCard = props => (
  <Card
    header={props.card.question}
    description={<CardRibon topics={['test', 'TODO']} />}
    value={props.card.id}
    onClick={props.onSelect}
  />
);
ShortCard.propTypes = {
  card: PropTypes.object,
  onSelect: PropTypes.func,
};

export default ShortCard;
