import React from 'react';
import { shallow } from 'enzyme';

import Component from './editable';

const testDeck = {
  id: 'd1',
  name: 'test-name1',
  description: 'test-description1',
  cards: [],
};

const onDelete = () => {};
const onDeckSelect = () => {};
const onSelect = () => {};
const onSubmit = () => {};

describe('editable deckCard', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(
      <Component
        deck={testDeck}
        onSelect={onSelect}
        onDelete={onDelete}
        onSubmit={onSubmit}
        onDeckSelect={onDeckSelect}
      />
    );
    expect(shallowOutput).toHaveLength(1);
  });

  it('can be in edit mode', () => {
    const shallowOutput = shallow(
      <Component
        deck={testDeck}
        onSelect={onSelect}
        onDelete={onDelete}
        onSubmit={onSubmit}
        onDeckSelect={onDeckSelect}
      />
    );
    shallowOutput.setState({ editFormOpen: true });

    expect(shallowOutput.find('Deck')).toHaveLength(0);
    expect(shallowOutput.find('AddEditDeckForm')).toHaveLength(1);
  });

  it('can be in non-edit mode', () => {
    const shallowOutput = shallow(
      <Component
        deck={testDeck}
        onSelect={onSelect}
        onDelete={onDelete}
        onSubmit={onSubmit}
        onDeckSelect={onDeckSelect}
      />
    );
    shallowOutput.setState({ editFormOpen: false });

    expect(shallowOutput.find('Deck')).toHaveLength(1);
    expect(shallowOutput.find('AddEditDeckForm')).toHaveLength(0);
  });
});
