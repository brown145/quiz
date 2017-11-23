import React from 'react';

export default props => {
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
