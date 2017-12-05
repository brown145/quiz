import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card as SemanticCard, Form } from 'semantic-ui-react';

class AddEditCardForm extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    question: PropTypes.string,
    answer: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    question: this.props.question || '',
    answer: this.props.answer || '',
  };

  handleInputChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    this.props.onSubmit({
      id: this.props.id,
      question: this.state.question,
      answer: this.state.answer,
    });
  };

  render() {
    const submitText = this.props.id ? 'Update' : 'Add';
    return (
      <SemanticCard fluid color="green">
        <SemanticCard.Content>
          <Form>
            <Form.Input
              type="text"
              name="question"
              label="Question"
              value={this.state.question}
              onChange={this.handleInputChange}
            />
            <Form.Input
              type="text"
              name="answer"
              label="Answer"
              value={this.state.answer}
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

export default AddEditCardForm;
