import React from 'react';
import { Button, Card, Container, Form, Header, Label, List } from 'semantic-ui-react';

class CardUI extends React.Component {
  state = {
    card: this.props.card,
  }

  handleEditSubmit = card => {
    this.updateCard(card);
  }

  updateCard = (attrs) => {
    this.setState({card: Object.assign({}, this.state.card, {
      question: attrs.question,
      answer: attrs.answer,
    })});
  }

  render() {
    return (
      <EditableCard
        question={this.state.card.question}
        answer={this.state.card.answer}
        topics={this.state.card.topics}
        decks={this.state.card.decks}
        onDeckSelect={this.props.onDeckSelect}
        onSubmit={this.handleEditSubmit}
      />
    );
  }
}

class EditableCard extends React.Component {
  state = {
    editFormOpen: false,
  }

  handleEditClick = () => {
    this.openForm();
  }

  handleFormClose = () => {
    this.closeForm();
  }

  handleSubmit = (card) => {
    this.props.onSubmit(card);
    this.closeForm();
  }

  closeForm = () => {
    this.setState({ editFormOpen: false });
  }

  openForm = () => {
    this.setState({ editFormOpen: true });
  }

  render(){
    if (!this.state.editFormOpen){
      return (
        <CardComponent
          question={this.props.question}
          answer={this.props.answer}
          topics={this.props.topics}
          decks={this.props.decks}
          onDeckSelect={this.props.onDeckSelect}
          onEditClick={this.handleEditClick}
        />
      );
    } else {
      return (
        <EditCardForm
          question={this.props.question}
          answer={this.props.answer}
          topics={this.props.topics}
          decks={this.props.decks}
          onSubmit={this.handleSubmit}
          onClose={this.handleFormClose}
        />
      );
    }
  }
}

const CardComponent = props => (
  <Container>
    <Header as='h2'>Card {props.question}</Header>
    <Card fluid>
      <Card.Content>
        <CardRibonUI topics={props.topics} />
        <Card.Header>{props.question}</Card.Header>
        <Card.Description>{props.answer}</Card.Description>
        <Button floated='right' size='tiny' onClick={props.onEditClick}>Edit</Button>
      </Card.Content>
      <Card.Content extra>
        <span>included in: </span>
        <CardDeckListUI decks={props.decks} onDeckSelect={props.onDeckSelect} />
      </Card.Content>
    </Card>
  </Container>
);

class EditCardForm extends React.Component {
  // TODO: edit decks and topics
  state = {
    question: this.props.question || '',
    answer: this.props.answer || '',
  }

  handleInputChange = (e, {name, value}) => {
    this.setState({[name]: value});
  }

  handleSubmit = () => {
    this.props.onSubmit({
      question: this.state.question,
      answer: this.state.answer,
    });
  };

  render(){
    return (
      <Card fluid color='green' >
        <Card.Content>
          <Form>
            <Form.Input type='text' name='question' label='Question' value={this.state.question} onChange={this.handleInputChange} />
            <Form.Input type='text' name='answer' label='Answer' value={this.state.answer} onChange={this.handleInputChange} />
          </Form>
        </Card.Content>
        <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='orange' onClick={this.props.onClose}>Cancel</Button>
              <Button basic color='green' onClick={this.handleSubmit}>Update</Button>
            </div>
          </Card.Content>
      </Card>
    );
  }
}

const CardRibonUI = props => {
  if (props.topics && props.topics.length) {
    const topicString = props.topics.join(' | ');
    return (
      <Label ribbon='right'>{topicString}</Label>
    );
  }
  return '';
}

const CardDeckListUI = props => {
  this.onDeckSelect = (e, {value}) => {
    props.onDeckSelect(value);
    e.preventDefault();
  }
  if (props.decks && props.decks.length) {
    const deckList = props.decks.map((deck) => (
      <List.Item
        key={deck.id}
        onClick={this.onDeckSelect}
        value={deck.id}
        content={deck.name}
      />
    ));
    return (
      <List horizontal items={deckList} />
    );
  } else {
    return (<span>No decks</span>);
  }
}

export default CardUI;
