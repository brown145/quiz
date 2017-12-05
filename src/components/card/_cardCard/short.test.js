import React from 'react';
import { shallow } from 'enzyme';

import Component from './short';

const testCard = {
  id: 'c1',
  question: 'test-question1',
  answer: 'test-answer1',
  topics: [],
  decks: [],
};
const nonOpFunc = () => {};

describe('shortCard', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(
      <Component
        card={testCard}
        onCardSelect={nonOpFunc}
        onTopicSelect={nonOpFunc}
      />
    );
    expect(shallowOutput).toHaveLength(1);
  });
});
