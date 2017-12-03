import React from 'react';
import { shallow } from 'enzyme';

import Component from './index';

const testTopic = {
  topic: 'test-topic1',
  cards: [{
    id: 'c1',
    question: 'test-question1',
    answer: 'test-answer1',
  }],
};
const onSelect = () => {};
const onDelete = () => {};

describe('topicList', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(<Component topic={testTopic} onSelect={onSelect} onDelete={onDelete} />);
    expect(shallowOutput).toHaveLength(1);
  });

  it('has a delete button with event handler', () => {
    const shallowOutput = shallow(<Component topic={testTopic} onSelect={onSelect} onDelete={onDelete} />);
    const removeButton = shallowOutput.find('Button').last();

    expect(typeof removeButton.prop('onClick')).toBe('function');
  });

  it('has an onClick event handler', () => {
    const shallowOutput = shallow(<Component topic={testTopic} onSelect={onSelect} onDelete={onDelete} />);

    expect(typeof shallowOutput.prop('onClick')).toBe('function');
  });
});
