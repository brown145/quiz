import React from 'react';
import PropTypes from 'prop-types';
import { Card as SemanticCard } from 'semantic-ui-react';

import { EditableCard } from '../_cardCard';
import AddCardForm from '../addEditCardForm';
import ToggleableAddForm from '../../_common/toggleableAddForm';

class CardList extends React.Component {
  static propTypes = {
    cards: PropTypes.array,
    onCardCreate: PropTypes.func,
    onCardDelete: PropTypes.func,
    onCardUpdate: PropTypes.func,
    onCardSelect: PropTypes.func,
    onDeckSelect: PropTypes.func,
  };

  onAddEditSubmit = card => {
    if (card.id) {
      this.props.onCardUpdate(card);
    } else {
      this.props.onCardCreate(card);
    }
  };

  render() {
    const cards = this.props.cards.map(card => (
      <EditableCard
        key={card.id}
        card={card}
        onDeckSelect={this.props.onDeckSelect}
        onDelete={this.props.onCardDelete}
        onSelect={this.props.onCardSelect}
        onSubmit={this.onAddEditSubmit}
      />
    ));
    return (
      <SemanticCard.Group>
        {cards}
        <ToggleableAddForm
          isFluid={true}
          onSubmit={this.onAddEditSubmit}
          AddEditForm={AddCardForm}
        />
      </SemanticCard.Group>
    );
  }
}

export default CardList;
