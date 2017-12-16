import React from 'react';
import { shallow } from 'enzyme';

import Component from './question';

const card = {
  id:'1',
  question: 'test-question',
  answer: 'test-answer',
};

describe('quiz question', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(<Component card={card} />);
    expect(shallowOutput).toHaveLength(1);
  });

  it('has a button', () => {
    const shallowOutput = shallow(<Component card={card} />);
    expect(shallowOutput.find('Button')).toHaveLength(1);
  });

  it('can show the answer', () => {
    const shallowOutput = shallow(<Component card={card} />);
    const button = shallowOutput.find('Button');
    button.simulate('click');

    expect(shallowOutput.find('Container').last().html()).toContain('test-answer');
  });
});
