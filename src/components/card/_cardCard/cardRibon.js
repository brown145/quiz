import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react';

import { topicShape } from '../../../helpers/entityShapes';

const CardRibon = props => {
  if (props.topics && props.topics.length) {
    const topicString = props.topics.map((topic) => (topic.id));
    return <Label ribbon="right">{topicString}</Label>;
  }
  return '';
};
CardRibon.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.shape(topicShape)).isRequired,
};

export default CardRibon;
