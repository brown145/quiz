import React from 'react';
import PropTypes from 'prop-types';

// TODO: add layer on top that is aware of routed id and store - make this dumber
class DeckCards extends React.Component{
  render() {
    const deckId = this.props.match.params.id;
    const { store } = this.context;
    const state = store.getState();
    const deck = state.decks.find((deck) => deck.id === deckId); //TODO: make function that returns found deck or empty deck
    const cards = state.cards.filter((card) => (deck.cards.includes(card.id)));

    // Edge case - deck not found
    if (!deck){
      return (
        <WarningBlurbUI
          messageText={'No deck with id:' + deckId + '!'}
        />
      );
    }

    // Edge case - no cards in deck
    if (!cards.length){
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
        cards={cards}
      />
    );
  }
}
DeckCards.contextTypes = {
  store: PropTypes.object
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
      {props.cards.map(card => (
        <CardListItemUI key={card.id} card={card} />
      ))}
    </div>
  </div>
);

const CardListItemUI = props => (
  <div className='ui card'>
    <div className='content'>
      <div className='ui right ribbon tiny label'>{props.card.topics.join(' | ')}</div>
      <div className='header'>{props.card.question}</div>
    </div>
  </div>
);

export default DeckCards;
