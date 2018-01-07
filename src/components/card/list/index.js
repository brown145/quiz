import React from 'react';
import PropTypes from 'prop-types';

import { cardShape } from 'helpers/entityShapes';
import { EditableCard } from 'components/card/_cardCard';
import AddCardForm from 'components/card/addEditCardForm';
import SortFilterList from 'components/_common/list/sortFilterList';
import ToggleableAddForm from 'components/_common/toggleableAddForm';

class CardList extends React.Component {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape(cardShape)).isRequired,
    onCardCreate: PropTypes.func.isRequired,
    onCardDelete: PropTypes.func.isRequired,
    onCardUpdate: PropTypes.func.isRequired,
    onCardSelect: PropTypes.func.isRequired,
    onDeckSelect: PropTypes.func.isRequired,
    onTopicSelect: PropTypes.func.isRequired,
  };

  onAddEditSubmit = card => {
    if (card.id) {
      this.props.onCardUpdate(card);
    } else {
      this.props.onCardCreate(card);
    }
  };

  cardItemMapper = card => (
    <EditableCard
      key={card.id}
      card={card}
      onDeckSelect={this.props.onDeckSelect}
      onTopicSelect={this.props.onTopicSelect}
      onDelete={this.props.onCardDelete}
      onSelect={this.props.onCardSelect}
      onSubmit={this.onAddEditSubmit}
    />
  );

  addElement = (
    <ToggleableAddForm
      isFluid={true}
      onSubmit={this.onAddEditSubmit}
      AddEditForm={AddCardForm}
    />
  );

  render() {
    return (
      <SortFilterList
        listItemMapper={this.cardItemMapper}
        sortedBy={'question'}
        filteredBy={'question'}
        items={this.props.cards}
        extra={this.addElement}
      />
    );
  }
}

export default CardList;
