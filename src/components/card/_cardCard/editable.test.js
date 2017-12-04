import React from 'react';
import { shallow } from 'enzyme';

import Component from './editable';

const testCard = {
  id: 'c1',
  question: 'test-question1',
  answer: 'test-answer1',
  topic: [],
  decks: [],
};
const onDelete = () => {};
const onDeckSelect = () => {};
const onSelect = () => {};
const onSubmit = () => {};

describe('editable cardCard', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(
      <Component
        card={testCard}
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
        card={testCard}
        onSelect={onSelect}
        onDelete={onDelete}
        onSubmit={onSubmit}
        onDeckSelect={onDeckSelect}
      />
    );
    shallowOutput.setState({ editFormOpen: true });

    expect(shallowOutput.find('Card')).toHaveLength(0);
    expect(shallowOutput.find('AddEditCardForm')).toHaveLength(1);
  });

  it('can be in non-edit mode', () => {
    const shallowOutput = shallow(
      <Component
        card={testCard}
        onSelect={onSelect}
        onDelete={onDelete}
        onSubmit={onSubmit}
        onDeckSelect={onDeckSelect}
      />
    );
    shallowOutput.setState({ editFormOpen: false });

    expect(shallowOutput.find('Card')).toHaveLength(1);
    expect(shallowOutput.find('AddEditCardForm')).toHaveLength(0);
  });
});
