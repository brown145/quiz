import React from 'react';
import {
  Button,
  Card,
  Container,
  Form,
  Header,
  Icon,
  Label,
} from 'semantic-ui-react';

import CardHelpers from '../helpers/card';

class DeckUI extends React.Component {
  state = {
    deck: this.props.deck,
  };

  handleAddSubmit = card => {
    this.addCard(card);
  };

  addCard = attrs => {
    // TODO: this will need to be reworked for persistance
    const card = CardHelpers.newCard(attrs);
    const cards = this.state.deck.cards.concat(card);

    this.setState({
      deck: Object.assign({}, this.state.deck, {
        cards: cards,
      }),
    });
  };

  render() {
    return (
      <Container>
        <Header as="h2">Deck {this.state.deck.name}</Header>
        <AppendableCardList
          cards={this.state.deck.cards}
          onCardSelect={this.props.onCardClick}
          onAddSubmit={this.handleAddSubmit}
        />
      </Container>
    );
  }
}

const AppendableCardList = props => (
  <Card.Group itemsPerRow="1">
    {props.cards.map(card => (
      <CardShort key={card.id} card={card} onCardSelect={props.onCardSelect} />
    ))}
    <ToggleableCardAddForm onAddSubmit={props.onAddSubmit} />
  </Card.Group>
);

const CardShort = props => {
  this.onCardSelect = e => {
    props.onCardSelect(props.card.id);
    e.preventDefault();
  };
  return (
    <Card onClick={this.onCardSelect}>
      <Card.Content>
        <Label ribbon="right">{props.card.topics.join(' | ')}</Label>
        <Card.Header>{props.card.question}</Card.Header>
      </Card.Content>
    </Card>
  );
};

class ToggleableCardAddForm extends React.Component {
  state = {
    isOpen: false,
  };

  handleFormOpen = () => {
    this.setState({ isOpen: true });
  };

  handleFormClose = () => {
    this.setState({ isOpen: false });
  };

  handleFormSubmit = card => {
    this.props.onAddSubmit(card);
    this.setState({ isOpen: false });
  };

  render() {
    if (this.state.isOpen) {
      return (
        <AddCardFrom
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

class AddCardFrom extends React.Component {
  state = {
    question: this.props.question || '',
    answer: this.props.answer || '',
  };

  handleInputChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    this.props.onSubmit({
      question: this.state.question,
      answer: this.state.answer,
    });
  };

  render() {
    return (
      <Card fluid color="green">
        <Card.Content>
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
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button basic color="orange" onClick={this.props.onClose}>
              Cancel
            </Button>
            <Button basic color="green" onClick={this.handleSubmit}>
              Update
            </Button>
          </div>
        </Card.Content>
      </Card>
    );
  }
}

export default DeckUI;
