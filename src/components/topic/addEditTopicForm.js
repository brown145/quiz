import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card as SemanticCard, Form } from 'semantic-ui-react';

class AddEditTopicForm extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    text: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  state = {
    text: this.props.text || '',
  };

  handleInputChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    this.props.onSubmit({
      id: this.props.id,
      text: this.state.text,
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
              name="text"
              label="Text"
              value={this.state.text}
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

export default AddEditTopicForm;
