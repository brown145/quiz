import React from 'react';
import PropTypes from 'prop-types';
import { Card as SemanticCard, Icon } from 'semantic-ui-react';

const AddCard = props => (
  <SemanticCard color="green" onClick={props.onAdd}>
    <SemanticCard.Content className="centerContent">
      <Icon name="add" size="big" />
    </SemanticCard.Content>
  </SemanticCard>
);
AddCard.propTypes = {
  onAdd: PropTypes.func,
};

export default AddCard;
