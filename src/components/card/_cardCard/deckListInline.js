import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

const DeckListInline = props => {
  this.onDeckSelect = (e, { value }) => {
    props.onDeckSelect(value);
    e.preventDefault();
    e.stopPropagation();
  };
  if (props.decks && props.decks.length) {
    const deckList = props.decks.map(deck => (
      <List.Item
        key={deck.id}
        onClick={this.onDeckSelect}
        value={deck.id}
        content={deck.name}
      />
    ));
    return <List horizontal items={deckList} />;
  } else {
    return <span>No decks</span>;
  }
};
DeckListInline.propTypes = {
  decks: PropTypes.array,
  onDeckSelect: PropTypes.func,
};

export default DeckListInline;
