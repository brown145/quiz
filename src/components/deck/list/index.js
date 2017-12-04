import React from 'react';
import PropTypes from 'prop-types';
import { Card as SemanticCard } from 'semantic-ui-react';

import { EditableDeck } from '../_deckCard';
import AddForm from '../addEditDeckForm';
import ToggleableAddForm from '../../_common/toggleableAddForm';

class DeckList extends React.Component {
  static propTypes = {
    decks: PropTypes.array,
    onDeckCreate: PropTypes.func,
    onDeckDelete: PropTypes.func,
    onDeckSelect: PropTypes.func,
    onDeckUpdate: PropTypes.func,
  };

  onDeckSelect = (e, { value }) => {
    this.props.onDeckSelect(value);
    e.stopPropagation();
  };

  onAddEditSubmit = deck => {
    if (deck.id) {
      this.props.onDeckUpdate(deck);
    } else {
      this.props.onDeckCreate(deck);
    }
  };

  render() {
    const decks = this.props.decks.map(deck => (
      <EditableDeck
        key={deck.id}
        deck={deck}
        onDelete={this.props.onDeckDelete}
        onSelect={this.onDeckSelect}
        onSubmit={this.onAddEditSubmit}
        onUpdate={this.props.onDeckUpdate}
      />
    ));
    return (
      <SemanticCard.Group itemsPerRow="2">
        {decks}
        <ToggleableAddForm
          onSubmit={this.onAddEditSubmit}
          AddEditForm={AddForm}
        />
      </SemanticCard.Group>
    );
  }
}

export default DeckList;
