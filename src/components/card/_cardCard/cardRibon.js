import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react';

const CardRibon = props => {
  if (props.topics && props.topics.length) {
    const topicString = props.topics.join(' | ');
    return <Label ribbon="right">{topicString}</Label>;
  }
  return '';
};
CardRibon.propTypes = {
  topics: PropTypes.array,
};

export default CardRibon;
