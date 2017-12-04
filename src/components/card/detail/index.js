import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header } from 'semantic-ui-react';

import { EditableCard } from '../../card/_cardCard/';

class CardDetail extends React.Component {
  static propTypes = {
    card: PropTypes.object,
    onDeckSelect: PropTypes.func,
    onUpdate: PropTypes.func,
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
          onSubmit={this.onEditSubmit}
        />
      </Container>
    );
  }
}

export default CardDetail;
