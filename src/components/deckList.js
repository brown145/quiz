import React from 'react';
import PropTypes from 'prop-types';
import { Container, Card, Icon, Button, Form } from 'semantic-ui-react';

import DeckHelpers from '../helpers/deck';

class DecksUI extends React.Component {
  static propTypes = {
    decks: PropTypes.array,
    onDeckSelect: PropTypes.func,
  };

  state = {
    decks: this.props.decks,
  };

  handleEditSubmit = deck => {
    this.updateDeck(deck);
  };

  handleCreateSubmit = deck => {
    this.createDeck(deck);
  };

  createDeck = deck => {
    const d = DeckHelpers.attributesToDeck(deck);
    this.setState({
      decks: this.state.decks.concat(d),
    });

    // client.createDeck(d);
  };

  updateDeck = attrs => {
    this.setState({
      decks: this.state.decks.map(deck => {
        if (deck.id === attrs.id) {
          return Object.assign({}, deck, {
            name: attrs.name,
            description: attrs.description,
          });
        } else {
          return deck;
        }
      }),
    });

    // client.updateDeck(attrs);
  };

  render() {
    return (
      <EditableDeckList
        decks={this.state.decks}
        onDeckSelect={this.props.onDeckSelect}
        onEditSubmit={this.handleEditSubmit}
        onCreateSubmit={this.handleCreateSubmit}
      />
    );
  }
}

const EditableDeckList = props => (
  <Card.Group itemsPerRow="2">
    {props.decks.map(deck => (
      <EditableDeck
        key={deck.id}
        id={deck.id}
        name={deck.name}
        description={deck.description}
        created={deck.created}
        lastViewed={deck.lastViewed}
        cards={deck.cards}
        onDeckSelect={props.onDeckSelect}
        onSubmit={props.onEditSubmit}
      />
    ))}
    <ToggleableDeckAddForm onSubmit={props.onCreateSubmit} />
  </Card.Group>
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
    created: PropTypes.number,
    lastViewed: PropTypes.number,
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
          created={this.props.created}
          lastViewed={this.props.lastViewed}
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
    created: PropTypes.number,
    lastViewed: PropTypes.number,
    cards: PropTypes.array,
    onDeckSelect: PropTypes.func,
    onEditClick: PropTypes.func,
  };

  state = {
    name: this.props.name,
    description: this.props.description,
    lastViewed: this.props.lastViewed,
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
      <Card onClick={this.onDeckSelect}>
        <Card.Content>
          <Card.Header>{this.state.name}</Card.Header>
          <Card.Meta>
            created: {new Date(this.props.created).toDateString()}
            <br />
            last viewed: {new Date(this.state.lastViewed).toDateString()}
          </Card.Meta>
          <Card.Description>
            <Button
              floated="right"
              size="tiny"
              onClick={this.props.onEditClick}
            >
              Edit
            </Button>
            <Container>{this.state.description}</Container>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name="cubes" />
          {this.props.cards.length} Cards
        </Card.Content>
      </Card>
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
  <Card color="green" onClick={props.onAdd}>
    <Card.Content className="centerContent">
      <Icon name="add" size="big" />
    </Card.Content>
  </Card>
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
      <Card color="green">
        <Card.Content>
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
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="orange" onClick={this.props.onClose}>
              Cancel
            </Button>
            <Button basic color="green" onClick={this.handleSubmit}>
              {submitText}
            </Button>
          </div>
        </Card.Content>
      </Card>
    );
  }
}

export default DecksUI;
