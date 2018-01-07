import React from 'react';
import PropTypes from 'prop-types';

import { deckShape } from 'helpers/entityShapes';
import { EditableDeck } from 'components/deck/_deckCard';
import AddForm from 'components/deck/addEditDeckForm';
import SortFilterList from 'components/_common/list/sortFilterList';
import ToggleableAddForm from 'components/_common/toggleableAddForm';

class DeckList extends React.Component {
  static propTypes = {
    decks: PropTypes.arrayOf(PropTypes.shape(deckShape)).isRequired,
    onDeckCreate: PropTypes.func.isRequired,
    onDeckDelete: PropTypes.func.isRequired,
    onDeckSelect: PropTypes.func.isRequired,
    onDeckUpdate: PropTypes.func.isRequired,
  };

  onAddEditSubmit = deck => {
    if (deck.id) {
      this.props.onDeckUpdate(deck);
    } else {
      this.props.onDeckCreate(deck);
    }
  };

  deckItemMapper = deck => (
    <EditableDeck
      key={deck.id}
      deck={deck}
      onDelete={this.props.onDeckDelete}
      onSelect={this.props.onDeckSelect}
      onSubmit={this.onAddEditSubmit}
      onUpdate={this.props.onDeckUpdate}
    />
  );

  addElement = (
    <ToggleableAddForm
      onSubmit={this.onAddEditSubmit}
      AddEditForm={AddForm}
    />
  );

  render() {
    return (
      <SortFilterList
        listItemMapper={this.deckItemMapper}
        listProps={{ itemsPerRow:'2' }}
        sortedBy={'name'}
        filteredBy={'name'}
        items={this.props.decks}
        extra={this.addElement}
      />
    );
  }
}

export default DeckList;
