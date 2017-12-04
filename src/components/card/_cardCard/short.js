import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

const ShortCard = props => (
  <Card
    header={props.card.question}
    value={props.card.id}
    onClick={props.onCardSelect}
  />
);
ShortCard.propTypes = {
  card: PropTypes.object,
  onCardSelect: PropTypes.func,
};

export default ShortCard;
