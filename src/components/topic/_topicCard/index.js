import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card as SemanticCard, Icon } from 'semantic-ui-react';
import { topicShape } from '../../../helpers/entityShapes';

const Topic = props => {
  const onSelect = (e, { value }) => {
    props.onSelect(value);
    e.preventDefault();
  };
  return (
    <SemanticCard value={props.topic.id} onClick={onSelect}>
      <SemanticCard.Content>
        <SemanticCard.Header>{props.topic.id}</SemanticCard.Header>
        <Button onClick={e => {
          props.onDelete(props.topic.id);
          e.stopPropagation();
          e.preventDefault();
        }}
        >Remove</Button>
      </SemanticCard.Content>
      <SemanticCard.Content extra>
        <Icon name="cubes" />
        {props.topic.cards.length} Cards
      </SemanticCard.Content>
    </SemanticCard>
  );
};
Topic.propTypes = {
  topic: PropTypes.shape(topicShape).isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Topic;
