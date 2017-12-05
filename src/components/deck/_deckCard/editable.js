import React from 'react';
import PropTypes from 'prop-types';

import Deck from './deck';
import EditDeckForm from '../addEditDeckForm';
import { deckShape } from '../../../helpers/entityShapes';

class EditableDeck extends React.Component {
  static propTypes = {
    deck: PropTypes.shape(deckShape).isRequired,
    onDelete: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    editFormOpen: false,
  };

  handleEditClick = (e) => {
    this.openForm();
    e.stopPropagation();
  };

  handleDeleteClick = (e) => {
    this.props.onDelete(this.props.deck.id);
    e.stopPropagation();
  };

  handleFormClose = () => {
    this.closeForm();
  };

  handleSubmit = deck => {
    this.props.onSubmit(deck);
    this.closeForm();
  };

  closeForm = () => {
    this.setState({ editFormOpen: false });
  };

  openForm = () => {
    this.setState({ editFormOpen: true });
  };

  render() {
    if (!this.state.editFormOpen) {
      return (
        <Deck
          deck={this.props.deck}
          onDelete={this.handleDeleteClick}
          onSelect={this.props.onSelect}
          onEditClick={this.handleEditClick}
        />
      );
    } else {
      return (
        <EditDeckForm
          id={this.props.deck.id}
          name={this.props.deck.name}
          description={this.props.deck.description}
          onClose={this.handleFormClose}
          onSubmit={this.handleSubmit}
        />
      );
    }
  }
}

export default EditableDeck;
