import React from 'react';
import PropTypes from 'prop-types';

import AddCard from './addCard';

class ToggleableAddForm extends React.Component {
  static propTypes = {
    isFluid: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    AddEditForm: PropTypes.func.isRequired,
  };

  state = {
    isOpen: false,
  };

  handleFormOpen = (e) => {
    this.setState({ isOpen: true });
    e.stopPropagation();
  };

  handleFormClose = () => {
    this.setState({ isOpen: false });
  };

  handleFormSubmit = formProps => {
    this.props.onSubmit(formProps);
    this.setState({ isOpen: false });
  };

  render() {
    const AddEditForm = this.props.AddEditForm;
    if (this.state.isOpen) {
      return (
        <AddEditForm
          onClose={this.handleFormClose}
          onSubmit={this.handleFormSubmit}
        />
      );
    } else {
      return <AddCard isFluid={this.props.isFluid} onAdd={this.handleFormOpen} />;
    }
  }
}

export default ToggleableAddForm;
