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

const nonOpFunc = () => {};

describe('deckList', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(
      <Component
        decks={testDecks}
        onDeckCreate={nonOpFunc}
        onDeckDelete={nonOpFunc}
        onDeckSelect={nonOpFunc}
        onDeckUpdate={nonOpFunc}
      />
    );
    expect(shallowOutput).toHaveLength(1);
  });

  it('has an add coponent', () => {
    const shallowOutput = shallow(
      <Component
        decks={testDecks}
        onDeckCreate={nonOpFunc}
        onDeckDelete={nonOpFunc}
        onDeckSelect={nonOpFunc}
        onDeckUpdate={nonOpFunc}
      />
    );
    expect(shallowOutput.find('ToggleableAddForm')).toHaveLength(1);
  });

  it('has an item coponents', () => {
    const shallowOutput = shallow(
      <Component
        decks={testDecks}
        onDeckCreate={nonOpFunc}
        onDeckDelete={nonOpFunc}
        onDeckSelect={nonOpFunc}
        onDeckUpdate={nonOpFunc}
      />
    );
    expect(
      shallowOutput
        .find('CardGroup')
        .dive()
        .find('EditableDeck')
    ).toHaveLength(2);
  });
});
