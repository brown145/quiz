import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card as SemanticCard, Form } from 'semantic-ui-react';

class AddEditDeckForm extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  state = {
    name: this.props.name || '',
    description: this.props.description || '',
  };

  handleInputChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    this.props.onSubmit({
      id: this.props.id,
      name: this.state.name,
      description: this.state.description,
    });
  };

  render() {
    const submitText = this.props.id ? 'Update' : 'Add';
    return (
      <SemanticCard color="green">
        <SemanticCard.Content>
          <Form>
            <Form.Input
              type="text"
              name="name"
              label="Name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
            <Form.Input
              type="text"
              name="description"
              label="Description"
              value={this.state.description}
              onChange={this.handleInputChange}
            />
          </Form>
        </SemanticCard.Content>
        <SemanticCard.Content extra>
          <div className="ui two buttons">
            <Button basic color="orange" onClick={this.props.onClose}>
              Cancel
            </Button>
            <Button basic color="green" onClick={this.handleSubmit}>
              {submitText}
            </Button>
          </div>
        </SemanticCard.Content>
      </SemanticCard>
    );
  }
}

export default AddEditDeckForm;
