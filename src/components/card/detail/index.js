import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header } from 'semantic-ui-react';

import { EditableCard } from '../_cardCard/';
import { cardShape } from 'helpers/entityShapes';
import RelationSelector from 'components/_common/relator/select';

class CardDetail extends React.Component {
  static propTypes = {
    card: PropTypes.shape(cardShape).isRequired,
    onDeckSelect: PropTypes.func.isRequired,
    onTopicSelect: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onRelateTopicToCard: PropTypes.func.isRequired,
  };

  onEditSubmit = card => {
    if (card.id) {
      this.props.onUpdate(card);
    }
  };

  onRelateTopic = topicId => {
    this.props.onRelateTopicToCard(topicId, this.props.card.id);
  };

  render() {
    const {relatableTopics} = this.props.card;
    const optionItems = relatableTopics
      ? relatableTopics.map(topic => ({ id: topic, text: topic }))
      : [];
    return (
      <Container>
        <Header as="h2">{this.props.card.question}</Header>
        <EditableCard
          card={this.props.card}
          onDeckSelect={this.props.onDeckSelect}
          onTopicSelect={this.props.onTopicSelect}
          onSubmit={this.onEditSubmit}
        />
        <RelationSelector
          text="Select a topic to relate"
          optionItems={optionItems}
          onSelect={this.onRelateTopic}
        />
      </Container>
    );
  }
}

export default CardDetail;
