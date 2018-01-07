import React from 'react';
import PropTypes from 'prop-types';

import Card from './card';
import EditCardForm from 'components/card/addEditCardForm';

import { cardShape } from 'helpers/entityShapes';

class EditableCard extends React.Component {
  static propTypes = {
    card: PropTypes.shape(cardShape).isRequired,
    onDelete: PropTypes.func,
    onDeckSelect: PropTypes.func.isRequired,
    onTopicSelect: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
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
    this.props.onDelete(this.props.card.id);
    e.stopPropagation();
  };

  handleFormClose = () => {
    this.closeForm();
  };

  handleSubmit = card => {
    this.props.onSubmit(card);
    this.closeForm();
  };

  closeForm = () => {
    this.setState({ editFormOpen: false });
  };

  openForm = () => {
    this.setState({ editFormOpen: true });
  };

  render() {
    const handleDeleteClick_if_canDelete = (this.props.onDelete) ? this.handleDeleteClick : undefined;
    if (!this.state.editFormOpen) {
      return (
        <Card
          card={this.props.card}
          onDeckSelect={this.props.onDeckSelect}
          onTopicSelect={this.props.onTopicSelect}
          onDelete={handleDeleteClick_if_canDelete}
          onSelect={this.props.onSelect}
          onEditClick={this.handleEditClick}
        />
      );
    } else {
      return (
        <EditCardForm
          id={this.props.card.id}
          question={this.props.card.question}
          answer={this.props.card.answer}
          onClose={this.handleFormClose}
          onSubmit={this.handleSubmit}
        />
      );
    }
  }
}

export default EditableCard;
