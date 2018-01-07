import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react';

import { topicShape } from 'helpers/entityShapes';

const CardRibon = props => {
  const onTopicClick = function(e) {
    props.onSelect(this.id);
    e.stopPropagation();
  };

  if (props.topics && props.topics.length) {
    const topics = props.topics.map(topic => (
      <span key={topic.id} onClick={onTopicClick.bind(topic)}>
        {topic.id}
      </span>
    ));
    return <Label ribbon="right">{topics}</Label>;
  }
  return '';
};
CardRibon.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.shape(topicShape)).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CardRibon;
