import React from 'react';
import { shallow } from 'enzyme';

import Component from './index';

const testTopic = {
  name: 'test-topic1',
  cards: [{
    id: 'c1',
    question: 'test-question1',
    answer: 'test-answer1',
  },{
    id: 'c2',
    question: 'test-question2',
    answer: 'test-answer2',
  }],
};
const onSelect = () => {};

describe('topicDetail', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(<Component topic={testTopic} onCardSelect={onSelect} />);
    expect(shallowOutput).toHaveLength(1);
  });

  it('displays the topic1', () => {
    const shallowOutput = shallow(<Component topic={testTopic} onCardSelect={onSelect} />);
    expect(shallowOutput.find('Header').html()).toContain('test-topic1');
  });

  it('displays related cards', () => {
    const shallowOutput = shallow(<Component topic={testTopic} onCardSelect={onSelect} />);
    expect(shallowOutput.find('CardGroup').dive().find('ShortCard')).toHaveLength(2);
  });

  it('cards pass onClick event', () => {
    const shallowOutput = shallow(<Component topic={testTopic} />);
    expect(typeof shallowOutput.find('ShortCard').first().prop('onCardSelect')).toBe('function');
  });
});
