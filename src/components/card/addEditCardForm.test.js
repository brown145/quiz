import React from 'react';
import { shallow, render } from 'enzyme';

import Component from './addEditCardForm';

const testCard = {
  id: 'c1',
  question: 'test-question1',
  answer: 'test-answer1',
  topic: [],
  decks: [],
};

const nonOpFunc = (() => {});

describe('addEditCardForm', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(
      <Component
        question={testCard.question}
        answer={testCard.answer}
        onClose={nonOpFunc}
        onSubmit={nonOpFunc}
      />
    );
    expect(shallowOutput).toHaveLength(1);
  });

  describe('update mode', () => {
    it('displays the card question', () => {
      const shallowOutput = shallow(
        <Component
          id={testCard.id}
          question={testCard.question}
          answer={testCard.answer}
          onClose={nonOpFunc}
          onSubmit={nonOpFunc}
        />
      );
      const input = shallowOutput
        .find('Form')
        .findWhere(node => node.prop('name') === 'question');

      expect(input.prop('value')).toBe(testCard.question);
    });
    it('displays an "Update" button', () => {
      const shallowOutput = shallow(
        <Component
          id={testCard.id}
          question={testCard.question}
          answer={testCard.answer}
          onClose={nonOpFunc}
          onSubmit={nonOpFunc}
        />
      );
      const submitButton = shallowOutput.find('Button').last();

      expect(render(submitButton).text()).toBe('Update');
    });
  });

  describe('add mode', () => {
    it('displays blank card question', () => {
      const shallowOutput = shallow(
        <Component
          onClose={nonOpFunc}
          onSubmit={nonOpFunc}
        />
      );
      const input = shallowOutput
        .find('Form')
        .findWhere(node => node.prop('name') === 'question');

      expect(input.prop('value')).toBe('');
    });
    it('displays an "Add" button', () => {
      const shallowOutput = shallow(
        <Component
          onClose={nonOpFunc}
          onSubmit={nonOpFunc}
        />
      );
      const submitButton = shallowOutput.find('Button').last();

      expect(render(submitButton).text()).toBe('Add');
    });
  });

  it('can be submited', () => {
    const shallowOutput = shallow(
      <Component
        question={testCard.question}
        answer={testCard.answer}
        onClose={nonOpFunc}
        onSubmit={nonOpFunc}
      />
    );
    const submitButton = shallowOutput.find('Button').last();

    expect(typeof submitButton.prop('onClick')).toBe('function');
  });

  it('can be closed', () => {
    const shallowOutput = shallow(
      <Component
        question={testCard.question}
        answer={testCard.answer}
        onClose={nonOpFunc}
        onSubmit={nonOpFunc}
      />
    );
    const submitButton = shallowOutput.find('Button').first();

    expect(typeof submitButton.prop('onClick')).toBe('function');
  });
});
