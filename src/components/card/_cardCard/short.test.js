import React from 'react';
import { shallow } from 'enzyme';

import Component from './short';

const testCard = {
  id: 'c1',
  question: 'test-question1',
  answer: 'test-answer1',
  topic: [],
  decks: [],
};
const onSelect = () => {};

describe('shortCard', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(
      <Component
        card={testCard}
        onSelect={onSelect}
      />
    );
    expect(shallowOutput).toHaveLength(1);
  });
});
