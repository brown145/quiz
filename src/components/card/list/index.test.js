import React from 'react';
import { shallow } from 'enzyme';

import Component from './index';

const testCards = [
  {
    id: 'c1',
    question: 'test-question1',
    answer: 'test-answer1',
    topics:[],
    decks: [],
  },
  {
    id: 'c2',
    question: 'test-question2',
    answer: 'test-answer2',
    topics:[],
    decks: [],
  },
];

describe('cardList', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(<Component cards={testCards} />);
    expect(shallowOutput).toHaveLength(1);
  });

  it('has an add coponent', () => {
    const shallowOutput = shallow(<Component cards={testCards} />);
    expect(shallowOutput.find('ToggleableAddForm')).toHaveLength(1);
  });

  it('has an item coponents', () => {
    const shallowOutput = shallow(<Component cards={testCards} />);
    expect(
      shallowOutput
        .find('CardGroup')
        .dive()
        .find('EditableCard')
    ).toHaveLength(2);
  });
});
