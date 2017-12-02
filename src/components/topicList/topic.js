import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card as SemanticCard, Icon } from 'semantic-ui-react';

const Topic = props => (
  <SemanticCard value={props.topic.topic} onClick={props.onSelect}>
    <SemanticCard.Content>
      <SemanticCard.Header>{props.topic.topic}</SemanticCard.Header>
      <Button onClick={e => {
        props.onDelete(props.topic.topic);
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
Topic.propTypes = {
  topic: PropTypes.object,
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
};

export default Topic;
