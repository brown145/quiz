import React from 'react';
import { Container, Header, Card, Icon, Button, Form } from 'semantic-ui-react';

import DeckHelpers from '../helpers/deck';
import WarningUI from './warningBlurb';

class DeckDashboard extends React.Component {
  state = {
    decks: this.props.decks
  }

  handleEditSubmit = deck => {
    this.updateDeck(deck);
  }

  handleCreateSubmit = deck => {
    this.createDeck(deck);
  }

  createDeck = deck => {
    const d = DeckHelpers.attributesToDeck(deck);
    this.setState({
      decks: this.state.decks.concat(d),
    });

    // client.createDeck(d);
  }

  updateDeck = (attrs) => {
    this.setState({
      decks: this.state.decks.map((deck) => {
        if (deck.id === attrs.id) {
          return Object.assign({}, deck, {
            name: attrs.name,
            description: attrs.description,
          });
        } else {
          return deck;
        }
      })
    });

    // client.updateDeck(attrs);
  };

  render(){
    return (<EditableDeckList
      decks={this.state.decks}
      onDeckSelect={this.props.onDeckSelect}
      onEditSubmit={this.handleEditSubmit}
      onCreateSubmit={this.handleCreateSubmit}
    />);
  }
}

const EditableDeckList = props => (
  <Card.Group itemsPerRow='2' >
    {props.decks.map((deck) => (
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

class EditableDeck extends React.Component {
  state = {
    editFormOpen: false,
  }

  handleEditClick = () => {
    this.openForm();
  };

  handleFormClose = () => {
    this.closeForm();
  };

  handleSubmit = (deck) => {
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
    if (!this.state.editFormOpen){
      return (<Deck
        id={this.props.id}
        name={this.props.name}
        description={this.props.description}
        created={this.props.created}
        lastViewed={this.props.lastViewed}
        cards={this.props.cards}
        onDeckSelect={this.props.onDeckSelect}
        onEditClick={this.handleEditClick}
      />);
    } else {
      return (<AddEditDeckForm
        id={this.props.id}
        name={this.props.name}
        description={this.props.description}
        onClose={this.handleFormClose}
        onSubmit={this.handleSubmit}
      />);
    }
  }
}

class Deck extends React.Component {
  state = {
    name: this.props.name,
    description: this.props.description,
    lastViewed: this.props.lastViewed,
  }

  render() {
    this.onDeckSelect = e => {
      this.props.onDeckSelect(this.props.id);
      e.preventDefault();
    }
    this.getDeckDescription = () => (
      <div className='ui description'>
        created: {(new Date(this.props.created)).toDateString()}<br />
        last viewed: {(new Date(this.state.lastViewed)).toDateString()}
        <Button onClick={this.props.onEditClick}>Edit</Button>
      </div>
    )
    this.getExtra = () => (
      <Container onClick={this.props.onDeckSelect}>
        <Icon name='cubes' />
        {this.props.cards.length} Cards
      </Container>
    )
    return (
      <Card
        header={this.state.name}
        meta={this.state.description}
        description={this.getDeckDescription()}
        extra={this.getExtra()}
      />
    );
  }
}

class ToggleableDeckAddForm extends React.Component {
  state = {
    isOpen: false,
  };

  handleFormOpen = () => {
    this.setState({ isOpen: true });
  };

  handleFormClose = () => {
    this.setState({ isOpen: false });
  };

  handleFormSubmit = (deck) => {
    this.props.onSubmit(deck);
    this.setState({ isOpen: false });
  };

  render() {
    if ( this.state.isOpen ) {
      return <AddEditDeckForm
        onClose={this.handleFormClose}
        onSubmit={this.handleFormSubmit}
      />
    } else {
      return <AddCard
        onAdd={this.handleFormOpen}
      />
    }
  }
}

const AddCard = props => (
  <Card color='green' onClick={props.onAdd} >
    <Card.Content className='centerContent'>
      <Icon name='add' size='big' />
    </Card.Content>
  </Card>
);

class AddEditDeckForm extends React.Component {
  state = {
    name: this.props.name || '',
    description: this.props.description || '',
  };

  handleInputChange = (e, {name, value}) => {
    this.setState({[name]: value});
  }

  handleSubmit = () => {
    this.props.onSubmit({
      id: this.props.id,
      name: this.state.name,
      description: this.state.description,
    });
  };

  render() {
    return (
      <Card color='green' >
        <Card.Content>
          <Form.Input name='name' label='Name' value={this.state.name} onChange={this.handleInputChange} />
          <Form.Input name='description' label='Description' value={this.state.description} onChange={this.handleInputChange} />
        </Card.Content>
        <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='orange' onClick={this.props.onClose}>Cancel</Button>
              <Button basic color='green' onClick={this.handleSubmit}>Submit</Button>
            </div>
          </Card.Content>
      </Card>
    );
  }
}

export default DeckDashboard;
