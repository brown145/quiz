import React from 'react';
import PropTypes from 'prop-types';

// TODO: add layer on top that is aware of routed id and store - make this dumber
class DeckList extends React.Component{
  render() {
    const { store } = this.context;
    const state = store.getState();
    const decks = state.decks;

    // Edge case - no decks
    if (!decks.length){
      return (
        <WarningBlurbUI
          messageText='No decks loaded!'
          actionText='Add a new deck?'
        />
      );
    }

    return (
      <DeckListUI
        decks={decks}
      />
    );
  }
}
DeckList.contextTypes = {
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

const DeckListUI = props => (
  <div className='ui container'>
    <h2 className='ui header no-anchor'>Deck List</h2>
    <div className='ui two itemsPerRow cards'>
      {props.decks.map(deck => (
        <DeckListItemUI key={deck.id} deck={deck} />
      ))}
    </div>
  </div>
);

const DeckListItemUI = props => (
  <div className='ui card'>
    <div className='content'>
      <div className='header'>{props.deck.name || 'Unnamed Deck'}</div>
      <div className='meta'>{props.deck.description}</div>
      <div className='description'>created: {(new Date(props.deck.created)).toDateString()}</div>
      <div className='description'>last viewed: {(new Date(props.deck.lastViewed)).toDateString()}</div>
    </div>
    <div className="extra content">
      <a>
        <i aria-hidden="true" className="cubes icon"></i>
        {props.deck.cards.length} Cards
      </a>
    </div>
  </div>
);

export default DeckList;
