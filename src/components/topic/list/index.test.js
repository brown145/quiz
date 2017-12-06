import React from 'react';
import { shallow } from 'enzyme';

import Component from './index';

const testTopics = [{
  id: 'test-topic1',
  cards: [{
    id: 'c1',
    question: 'test-question1',
    answer: 'test-answer1',
  }],
},{
  id: 'test-topic2',
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

const nonOpFunc = (() => {});

describe('topicList', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(
      <Component
        topics={testTopics}
        onTopicCreate={nonOpFunc}
        onTopicDelete={nonOpFunc}
        onTopicSelect={nonOpFunc}
      />
    );
    expect(shallowOutput).toHaveLength(1);
  });

  it('has an sortFilterList coponent', () => {
    const shallowOutput = shallow(
      <Component
        topics={testTopics}
        onTopicCreate={nonOpFunc}
        onTopicDelete={nonOpFunc}
        onTopicSelect={nonOpFunc}
      />
    );
    expect(shallowOutput.find('SortFilterList')).toHaveLength(1);
  });

  it('has an item coponents', () => {
    const shallowOutput = shallow(
      <Component
        topics={testTopics}
        onTopicCreate={nonOpFunc}
        onTopicDelete={nonOpFunc}
        onTopicSelect={nonOpFunc}
      />
    );
    expect(shallowOutput.find('SortFilterList').dive().find('Topic')).toHaveLength(2);
  });
});
