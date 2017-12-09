import React from 'react';
import { shallow, mount } from 'enzyme';

import Component from './short';

const testCard = {
  id: 'c1',
  question: 'test-question1',
  answer: 'test-answer1',
  topics: [],
  decks: [],
};
const nonOpFunc = () => {};

describe('shortCard', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(
      <Component
        card={testCard}
        onSelect={nonOpFunc}
        onRemove={nonOpFunc}
        onTopicSelect={nonOpFunc}
      />
    );
    expect(shallowOutput).toHaveLength(1);
  });


  it('remove event fires', () => {
    const spy = jest.fn();
    const wrapper = mount(
      <Component
        card={testCard}
        onSelect={nonOpFunc}
        onRemove={spy}
        onTopicSelect={nonOpFunc}
      />
    );
    wrapper.find('Icon').simulate('click');

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0]).toBe('c1');
  });
});
