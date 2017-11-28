import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Card as SemanticCard,
  Icon,
  Button,
  Form,
} from 'semantic-ui-react';

class DeckList extends React.Component {
  static propTypes = {
    decks: PropTypes.array,
    onDeckSelect: PropTypes.func,
    onDeckEdit: PropTypes.func,
    onDeckAdd: PropTypes.func,
  };

  handleEditSubmit = deck => {
    this.props.onDeckEdit(deck);
  };

  handleCreateSubmit = deck => {
    this.props.onDeckAdd(deck);
  };

  render() {
    return (
      <EditableDeckList
        decks={this.props.decks}
        onDeckSelect={this.props.onDeckSelect}
        onEditSubmit={this.handleEditSubmit}
        onCreateSubmit={this.handleCreateSubmit}
      />
    );
  }
}

const EditableDeckList = props => (
  <SemanticCard.Group itemsPerRow="2">
    {props.decks.map(deck => (
      <EditableDeck
        key={deck.id}
        id={deck.id}
        name={deck.name}
        description={deck.description}
        cards={deck.cards}
        onDeckSelect={props.onDeckSelect}
        onSubmit={props.onEditSubmit}
      />
    ))}
    <ToggleableDeckAddForm onSubmit={props.onCreateSubmit} />
  </SemanticCard.Group>
);
EditableDeckList.propTypes = {
  decks: PropTypes.array,
  onDeckSelect: PropTypes.func,
  onEditSubmit: PropTypes.func,
  onCreateSubmit: PropTypes.func,
};

class EditableDeck extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    cards: PropTypes.array,
    onDeckSelect: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  state = {
    editFormOpen: false,
  };

  handleEditClick = () => {
    this.openForm();
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
          id={this.props.id}
          name={this.props.name}
          description={this.props.description}
          cards={this.props.cards}
          onDeckSelect={this.props.onDeckSelect}
          onEditClick={this.handleEditClick}
        />
      );
    } else {
      return (
        <AddEditDeckForm
          id={this.props.id}
          name={this.props.name}
          description={this.props.description}
          onClose={this.handleFormClose}
          onSubmit={this.handleSubmit}
        />
      );
    }
  }
}

class Deck extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    cards: PropTypes.array,
    onDeckSelect: PropTypes.func,
    onEditClick: PropTypes.func,
  };

  state = {
    name: this.props.name,
    description: this.props.description,
  };

  render() {
    this.onDeckSelect = e => {
      if (e.target.classList.contains('button')) {
        // TODO: mabye better way to check for button inside clickable element?
        return;
      }
      this.props.onDeckSelect(this.props.id);
      e.preventDefault();
    };
    return (
      <SemanticCard onClick={this.onDeckSelect}>
        <SemanticCard.Content>
          <SemanticCard.Header>{this.state.name}</SemanticCard.Header>
          <SemanticCard.Meta>
            meta TODO
          </SemanticCard.Meta>
          <SemanticCard.Description>
            <Button
              floated="right"
              size="tiny"
              onClick={this.props.onEditClick}
            >
              Edit
            </Button>
            <Container>{this.state.description}</Container>
          </SemanticCard.Description>
        </SemanticCard.Content>
        <SemanticCard.Content extra>
          <Icon name="cubes" />
          {this.props.cards.length} Cards
        </SemanticCard.Content>
      </SemanticCard>
    );
  }
}

class ToggleableDeckAddForm extends React.Component {
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

  handleFormSubmit = deck => {
    this.props.onSubmit(deck);
    this.setState({ isOpen: false });
  };

  render() {
    if (this.state.isOpen) {
      return (
        <AddEditDeckForm
          onClose={this.handleFormClose}
          onSubmit={this.handleFormSubmit}
        />
      );
    } else {
      return <AddCard onAdd={this.handleFormOpen} />;
    }
  }
}

const AddCard = props => (
  <SemanticCard color="green" onClick={props.onAdd}>
    <SemanticCard.Content className="centerContent">
      <Icon name="add" size="big" />
    </SemanticCard.Content>
  </SemanticCard>
);
AddCard.propTypes = {
  onAdd: PropTypes.func,
};

class AddEditDeckForm extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    onSubmit: PropTypes.func,
    onClose: PropTypes.func,
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

export default DeckList;
