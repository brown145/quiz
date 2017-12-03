import React from 'react';
import { shallow } from 'enzyme';

import Component from './index';

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

describe('topicList', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(<Component topics={testTopics} />);
    expect(shallowOutput).toHaveLength(1);
  });

  it('has an add coponent', () => {
    const shallowOutput = shallow(<Component topics={testTopics} />);
    expect(shallowOutput.find('ToggleableAddForm')).toHaveLength(1);
  });

  it('has an item coponents', () => {
    const shallowOutput = shallow(<Component topics={testTopics} />);
    expect(shallowOutput.find('CardGroup').dive().find('Topic')).toHaveLength(2);
  });
});
