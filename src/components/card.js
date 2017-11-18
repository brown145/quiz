import React from 'react';
import PropTypes from 'prop-types';

// TODO: add layer on top that is aware of routed id and store - make this dumber
class Card extends React.Component{
  render() {
    const cardId = this.props.match.params.id;
    const { store } = this.context;
    const state = store.getState();
    const card = state.cards.find((card) => ( card.id === cardId ));
    const decks = state.decks.filter((deck) => ( deck.cards.includes(cardId) ));
    const deckNames = decks.map((deck) => ( deck.name) );

    // Edge case - no decks
    if (!card){
      return (
        <WarningBlurbUI
          messageText={'No card with id:' + cardId + '!'}
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
Card.contextTypes = {
  store: PropTypes.object
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
