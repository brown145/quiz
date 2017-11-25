import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card as SemanticCard,
  Container,
  Form,
  Header,
  Icon,
  Label,
} from 'semantic-ui-react';

import CardHelpers from '../helpers/card';

class Deck extends React.Component {
  static propTypes = {
    deck: PropTypes.object,
    onCardClick: PropTypes.func,
  };

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
  <SemanticCard.Group itemsPerRow="1">
    {props.cards.map(card => (
      <CardShort
        key={card.id}
        card={card}
        onCardSelect={props.onCardSelect}
      />
    ))}
    <ToggleableCardAddForm onAddSubmit={props.onAddSubmit} />
  </SemanticCard.Group>
);
AppendableCardList.propTypes = {
  cards: PropTypes.array,
  onCardSelect: PropTypes.func,
  onAddSubmit: PropTypes.func,
};

const CardShort = props => {
  this.onCardSelect = e => {
    props.onCardSelect(props.card.id);
    e.preventDefault();
  };
  return (
    <SemanticCard onClick={this.onCardSelect}>
      <SemanticCard.Content>
        <Label ribbon="right">{props.card.topics.join(' | ')}</Label>
        <SemanticCard.Header>{props.card.question}</SemanticCard.Header>
      </SemanticCard.Content>
    </SemanticCard>
  );
};
CardShort.propTypes = {
  card: PropTypes.object,
  onCardSelect: PropTypes.func,
};

class ToggleableCardAddForm extends React.Component {
  static propTypes = {
    onAddSubmit: PropTypes.func,
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
  <SemanticCard color="green" onClick={props.onAdd}>
    <SemanticCard.Content className="centerContent">
      <Icon name="add" size="big" />
    </SemanticCard.Content>
  </SemanticCard>
);
AddCard.propTypes = {
  onAdd: PropTypes.func,
};

class AddCardFrom extends React.Component {
  static propTypes = {
    question: PropTypes.string,
    answer: PropTypes.string,
    onSubmit: PropTypes.func,
    onClose: PropTypes.func,
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
      question: this.state.question,
      answer: this.state.answer,
    });
  };

  render() {
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
              Update
            </Button>
          </div>
        </SemanticCard.Content>
      </SemanticCard>
    );
  }
}

export default Deck;
