import React from 'react';
import { shallow } from 'enzyme';

import Component from './index';

const testDecks = [
  {
    id: 'd1',
    name: 'test-name1',
    description: 'test-description1',
    cards: [],
  },
  {
    id: 'd2',
    name: 'test-name2',
    description: 'test-description2',
    cards: [],
  },
];

describe('deckList', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(<Component decks={testDecks} />);
    expect(shallowOutput).toHaveLength(1);
  });

  it('has an add coponent', () => {
    const shallowOutput = shallow(<Component decks={testDecks} />);
    expect(shallowOutput.find('ToggleableAddForm')).toHaveLength(1);
  });

  it('has an item coponents', () => {
    const shallowOutput = shallow(<Component decks={testDecks} />);
    expect(
      shallowOutput
        .find('CardGroup')
        .dive()
        .find('EditableDeck')
    ).toHaveLength(2);
  });
});
