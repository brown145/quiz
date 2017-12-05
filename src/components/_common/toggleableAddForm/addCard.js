import React from 'react';
import PropTypes from 'prop-types';
import { Card as SemanticCard, Icon } from 'semantic-ui-react';

const AddCard = props => (
  <SemanticCard fluid={props.isFluid} color="green" onClick={props.onAdd}>
    <SemanticCard.Content className="centerContent">
      <Icon name="add" size="big" />
    </SemanticCard.Content>
  </SemanticCard>
);
AddCard.propTypes = {
  isFluid: PropTypes.bool,
  onAdd: PropTypes.func.isRequired,
};

export default AddCard;
