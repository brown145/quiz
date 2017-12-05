import React from 'react';
import { shallow } from 'enzyme';

import Component from './deck';

const testDeck = {
  id: 'd1',
  name: 'test-name1',
  description: 'test-description1',
  cards: [],
};
const nonOpFunc = () => {};

describe('deckCard', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(
      <Component
        deck={testDeck}
        onSelect={nonOpFunc}
        onDelete={nonOpFunc}
        onEditClick={nonOpFunc}
      />
    );
    expect(shallowOutput).toHaveLength(1);
  });

  it('has a delete button with event handler', () => {
    const shallowOutput = shallow(
      <Component
        deck={testDeck}
        onSelect={nonOpFunc}
        onDelete={nonOpFunc}
        onEditClick={nonOpFunc}
      />
    );
    const removeButton = shallowOutput.find('Button').last();

    expect(typeof removeButton.prop('onClick')).toBe('function');
  });

  it('has an onClick event handler', () => {
    const shallowOutput = shallow(
      <Component
        deck={testDeck}
        onSelect={nonOpFunc}
        onDelete={nonOpFunc}
        onEditClick={nonOpFunc}
      />
    );

    expect(typeof shallowOutput.prop('onClick')).toBe('function');
  });
});
