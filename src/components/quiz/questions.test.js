import React from 'react';
import { shallow } from 'enzyme';

import Component from './questions';

const testFuncNonOp = () => {};
const cards = [{
  id:'1',
  question: 'test-question',
  answer: 'test-answer',
},{
  id:'2',
  question: 'test-question2',
  answer: 'test-answer2',
}];

describe('quiz questions', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(<Component onEndQuiz={testFuncNonOp} cards={cards} />);
    expect(shallowOutput).toHaveLength(1);
  });

  it('has a button', () => {
    const shallowOutput = shallow(<Component onEndQuiz={testFuncNonOp} cards={cards} />);
    expect(shallowOutput.find('Button')).toHaveLength(1);
  });

  it('calls the end test function', () => {
    const spy = jest.fn();
    const shallowOutput = shallow(<Component onEndQuiz={spy} cards={cards} />);
    const button = shallowOutput.find('Button');

    for (let i=0; i<3; i++){
      button.simulate('click');
    }

    expect(spy).toHaveBeenCalled();
  });
});
