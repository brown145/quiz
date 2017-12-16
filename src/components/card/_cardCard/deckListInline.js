import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

import { deckShape } from 'helpers/entityShapes';

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
  decks: PropTypes.arrayOf(PropTypes.shape(deckShape)).isRequired,
  onDeckSelect: PropTypes.func.isRequired,
};

export default DeckListInline;
