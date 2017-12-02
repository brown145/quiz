import React from 'react';
import { shallow, render } from 'enzyme';

import Component from './addEditTopicForm';

const testTopic = {
  topic: 'test-topic1',
  cards: [{
    id: 'c1',
    question: 'test-question1',
    answer: 'test-answer1',
  }],
};

describe('addEditTopicForm', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(<Component topic={testTopic} />);
    expect(shallowOutput).toHaveLength(1);
  });

  describe('update mode', () => {
    it('displays the topic text', () => {
      const shallowOutput = shallow(<Component id={testTopic.topic} text={testTopic.topic} />);
      const input = shallowOutput.find('Form').findWhere(node => (
        node.prop('name') === 'text'
      ));

      expect(input.prop('value')).toBe(testTopic.topic);
    });
    it('displays an "Update" button', () => {
      const shallowOutput = shallow(<Component id={testTopic.topic} text={testTopic.topic} />);
      const submitButton = shallowOutput.find('Button').last();

      expect(render(submitButton).text()).toBe('Update');
    });
  });

  describe('add mode', () => {
    it('displays blank topic text', () => {
      const shallowOutput = shallow(<Component />);
      const input = shallowOutput.find('Form').findWhere(node => (
        node.prop('name') === 'text'
      ));

      expect(input.prop('value')).toBe('');
    });
    it('displays an "Add" button', () => {
      const shallowOutput = shallow(<Component />);
      const submitButton = shallowOutput.find('Button').last();

      expect(render(submitButton).text()).toBe('Add');
    });
  });

  it('can be submited', () => {
    const shallowOutput = shallow(<Component />);
    const submitButton = shallowOutput.find('Button').last();

    expect(typeof submitButton.prop('onClick')).toBe('function');
  });

  it('can be closed', () => {
    const shallowOutput = shallow(<Component onClose={() => {}} />);
    const submitButton = shallowOutput.find('Button').first();

    expect(typeof submitButton.prop('onClick')).toBe('function');
  });

});
