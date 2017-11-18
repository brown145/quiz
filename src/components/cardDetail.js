import React from 'react';

class Card extends React.Component{
  render() {
    const card = this.props.card;
    const deckNames = card.decks.map((deck) => ( deck.name));

    // TODO: move this catch up to Router
    // Edge case - no decks
    if (!card){
      return (
        <WarningBlurbUI
          messageText={'Could not load card!'}
        />
      );
    }

    return (
      <CardUI
        question={card.question}
        answer={card.answer}
        topics={card.topics}
        deckNames={deckNames}
      />
    );
  }
}

// TODO: pull into own file and include in where needed
const WarningBlurbUI = props => {
  const actionLine = (props.actionText) ? (<span>{props.actionText} <button>TBD</button></span>) : null;
  return (
    <div className="ui warning message">
      <div className="header">
        {props.messageText}
      </div>
      {actionLine}
    </div>
  );
};

const CardUI = props => (
  <div className='ui container'>
    <h2 className='ui header no-anchor'>Card {props.question}</h2>
    <div className='ui card fluid'>
      <div className='content'>
        <CardRibonUI topics={props.topics} />
        <div className='header'>{props.question}</div>
        <div className='description'>{props.answer}</div>
      </div>
      <div className="extra content">
        <span>included in: </span>
        <CardDeckListUI deckNames={props.deckNames} />
      </div>
    </div>
  </div>
);

const CardRibonUI = props => {
  if (props.topics && props.topics.length) {
    const topicString = props.topics.join(' | ');
    return (
      <div className='ui right ribbon tiny label'>{topicString}</div>
    );
  }
};

const CardDeckListUI = props => {
  if (props.deckNames && props.deckNames.length) {
    const deckNameList = props.deckNames.map((name) => (
      <div key={name} role='listItem' className='item'>{name}</div>
    ));
    return (
      <div role='list' className='ui horizontal list'>
        {deckNameList}
      </div>
    );
  } else {
    return (<span>No decks</span>);
  }
};


export default Card;
