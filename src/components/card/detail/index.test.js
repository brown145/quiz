import React from 'react';
import { shallow } from 'enzyme';

import Component from './index';

const testCard = {
  id: 'c1',
  question: 'test-question1',
  answer: 'test-answer1',
  topics:[],
  decks: [],
};
const nonOpFunc = () => {};

describe('cardDetail', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(
      <Component
        card={testCard}
        onUpdate={nonOpFunc}
        onDeckSelect={nonOpFunc} 
      />
    );
    expect(shallowOutput).toHaveLength(1);
  });

  it('displays the question', () => {
    const shallowOutput = shallow(
      <Component
        card={testCard}
        onUpdate={nonOpFunc}
        onDeckSelect={nonOpFunc} 
      />
    );
    expect(shallowOutput.find('Header').html()).toContain('test-question');
  });

  it('renders and editable card', () => {
    const shallowOutput = shallow(
      <Component
        card={testCard}
        onUpdate={nonOpFunc}
        onDeckSelect={nonOpFunc} 
      />
    );
    expect(shallowOutput.find('EditableCard')).toHaveLength(1);
  });
});
