import React from 'react';
import { shallow } from 'enzyme';

import Component from './card';

const testCard = {
  id: 'c1',
  question: 'test-question1',
  answer: 'test-answer1',
  topics:[],
  decks: [],
};
const nonOpFunc = (() => {});

describe('cardCard', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(
      <Component
        card={testCard}
        onSelect={nonOpFunc}
        onDeckSelect={nonOpFunc}
        onEditClick={nonOpFunc}
        onDelete={nonOpFunc}
      />
    );
    expect(shallowOutput).toHaveLength(1);
  });

  it('has a delete button with event handler', () => {
    const shallowOutput = shallow(
      <Component
        card={testCard}
        onSelect={nonOpFunc}
        onDeckSelect={nonOpFunc}
        onEditClick={nonOpFunc}
        onDelete={nonOpFunc}
      />
    );
    const removeButton = shallowOutput.find('Button').last();

    expect(typeof removeButton.prop('onClick')).toBe('function');
  });

  it('has an onClick event handler', () => {
    const shallowOutput = shallow(
      <Component
        card={testCard}
        onSelect={nonOpFunc}
        onDeckSelect={nonOpFunc}
        onEditClick={nonOpFunc}
        onDelete={nonOpFunc}
      />
    );

    expect(typeof shallowOutput.prop('onClick')).toBe('function');
  });

  // TODO: tests for cardRibon and deckListInline
});
