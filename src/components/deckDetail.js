import React from 'react';

class DeckDetail extends React.Component{
  render() {
    const deck = this.props.deck;

    // TODO: move this catch up to Router
    // Edge case - deck not found
    if (!deck){
      return (
        <WarningBlurbUI
          messageText='Could not load deck'
        />
      );
    }

    // Edge case - no cards in deck
    if (!deck.cards.length){
      return (
        <WarningBlurbUI
          messageText='No cards in deck!'
          actionText='Add card?'
        />
      );
    }

    return (
      <CardListUI
        deck={deck}
        onCardSelect={this.props.onCardClick}
      />
    );
  }
}

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

const CardListUI = props => (
  <div className='ui container'>
    <h2 className='ui header no-anchor'>Deck {props.deck.name}</h2>
    <div className='ui one itemsPerRow cards'>
      {props.deck.cards.map(card => (
        <CardListItemUI
          key={card.id}
          card={card}
          onCardSelect={props.onCardSelect}
        />
      ))}
    </div>
  </div>
);

const CardListItemUI = props => {
  this.onCardSelect = e => {
    props.onCardSelect(props.card.id);
    e.preventDefault();
  }
  return (
    <div className='ui card' onClick={this.onCardSelect}>
      <div className='content'>
        <div className='ui right ribbon tiny label'>{props.card.topics.join(' | ')}</div>
        <div className='header'>{props.card.question}</div>
      </div>
    </div>
  );
};

export default DeckDetail;
