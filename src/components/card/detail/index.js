import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header } from 'semantic-ui-react';

import { EditableCard } from '../../card/_cardCard/';
import { cardShape } from '../../../helpers/entityShapes';

class CardDetail extends React.Component {
  static propTypes = {
    card: PropTypes.shape(cardShape).isRequired,
    onDeckSelect: PropTypes.func.isRequired,
    onTopicSelect: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
  };

  onEditSubmit = card => {
    if (card.id) {
      this.props.onUpdate(card);
    }
  };

  render() {
    return (
      <Container>
        <Header as="h2">{this.props.card.question}</Header>
        <EditableCard
          card={this.props.card}
          onDeckSelect={this.props.onDeckSelect}
          onTopicSelect={this.props.onTopicSelect}
          onSubmit={this.onEditSubmit}
        />
      </Container>
    );
  }
}

export default CardDetail;
