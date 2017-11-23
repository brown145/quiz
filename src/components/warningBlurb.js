import React from 'react';
import PropTypes from 'prop-types';

const warningBlurb = props => {
  const actionLine = props.actionText ? (
    <span>
      {props.actionText} <button>TBD</button>
    </span>
  ) : null;
  return (
    <div className="ui warning message">
      <div className="header">{props.messageText}</div>
      {actionLine}
    </div>
  );
};
warningBlurb.propTypes = {
  messageText: PropTypes.string,
  actionText: PropTypes.string,
};

export default warningBlurb;
