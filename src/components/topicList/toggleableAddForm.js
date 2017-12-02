import React from 'react';
import PropTypes from 'prop-types';

import AddEditTopicForm from './addEditTopicForm';
import AddCard from './addCard';

class ToggleableAddForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  state = {
    isOpen: false,
  };

  handleFormOpen = () => {
    this.setState({ isOpen: true });
  };

  handleFormClose = () => {
    this.setState({ isOpen: false });
  };

  handleFormSubmit = formProps => {
    this.props.onSubmit(formProps);
    this.setState({ isOpen: false });
  };

  render() {
    if (this.state.isOpen) {
      return (
        <AddEditTopicForm
          onClose={this.handleFormClose}
          onSubmit={this.handleFormSubmit}
        />
      );
    } else {
      return <AddCard onAdd={this.handleFormOpen} />;
    }
  }
}

export default ToggleableAddForm;
