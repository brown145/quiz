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

  onCardSelect = (e, { value }) => {
    this.props.onCardSelect(value);
    e.stopPropagation();
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
        onSelect={this.onCardSelect}
        onSubmit={this.onAddEditSubmit}
        onUpdate={this.props.onCardUpdate}
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
