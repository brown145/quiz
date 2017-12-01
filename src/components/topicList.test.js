import React from 'react';
import { shallow, render } from 'enzyme';

import Component from './topicList';

const testTopics = [{
  topic: 'test-topic1',
  cards: [{
    id: 'c1',
    question: 'test-question1',
    answer: 'test-answer1',
  }],
},{
  topic: 'test-topic2',
  cards: [{
    id: 'c1',
    question: 'test-question1',
    answer: 'test-answer1',
  },{
    id: 'c2',
    question: 'test-question2',
    answer: 'test-answer2',
  }],
}];

describe('topicDetail', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(<Component topics={testTopics} />);
    expect(shallowOutput).toHaveLength(1);
  });

  it('displays Cards for each topic', () => {
    const shallowOutput = shallow(<Component topics={testTopics} />);
    expect(shallowOutput.find('Card')).toHaveLength(2);
  });

  it('displays the related numper of cards for a topic', () => {
    const staticOutput = render(<Component topics={testTopics} />);
    expect(staticOutput.find('.card').last().find('.extra').text()).toBe('2 Cards');
  });

  it('cards have onClick event', () => {
    const shallowOutput = shallow(<Component topics={testTopics} />);
    expect(typeof shallowOutput.find('Card').first().prop('onClick')).toBe('function');
  });

  // TODO: add
  // TODO: remove
});
