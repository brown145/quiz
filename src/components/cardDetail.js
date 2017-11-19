import React from 'react';
import { Card, Container, Header, Label, List } from 'semantic-ui-react';

class CardDetail extends React.Component {
  state = {
    question: this.props.question || '',
    answer: this.props.answer || '',
    topics: this.props.topics || [],
    decks: this.props.decks || [],
  }

  render() {
    return (
      <CardUI
        question={this.state.question}
        answer={this.state.answer}
        topics={this.state.topics}
        decks={this.state.decks}
        onDeckSelect={this.props.onDeckSelect}
      />
    );
  }
}

const CardUI = props => (
  <Container>
    <Header as='h2'>Card {props.question}</Header>
    <Card fluid>
      <Card.Content>
        <CardRibonUI topics={props.topics} />
        <Card.Header>{props.question}</Card.Header>
        <Card.Description>{props.answer}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <span>included in: </span>
        <CardDeckListUI decks={props.decks} onDeckSelect={props.onDeckSelect} />
      </Card.Content>
    </Card>
  </Container>
);

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
  this.onDeckSelect = e => {
    props.onDeckSelect(e.target.dataset.value);
    e.preventDefault();
  }
  if (props.decks && props.decks.length) {
    const deckList = props.decks.map((deck) => (
      <List.Item
        key={deck.id}
        data-id={deck.id}
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

export default CardDetail;
