import React from 'react';
import { shallow } from 'enzyme';

import Component from './addCard';

const testTopic = {
  topic: 'test-topic1',
  cards: [{
    id: 'c1',
    question: 'test-question1',
    answer: 'test-answer1',
  }],
};

describe('topic addCard', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(<Component topic={testTopic} />);
    expect(shallowOutput).toHaveLength(1);
  });

  it('displays the add icon', () => {
    const shallowOutput = shallow(<Component topic={testTopic} />);
    expect(shallowOutput.find('Icon')).toHaveLength(1);
  });

  it('can be clicked', () => {
    const shallowOutput = shallow(<Component topic={testTopic} onAdd={() => {}} />);
    expect(typeof shallowOutput.prop('onClick')).toBe('function');
  });
});
