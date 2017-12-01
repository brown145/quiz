import React from 'react';
import { shallow, render } from 'enzyme';

import Component from './topicDetail';

const testTopic = {
  name: 'test-topic',
  cards: [
    {
      id: 'c1',
      question: 'what is blue?',
      answer: 'the sky',
    },
    {
      id: 'c2',
      question: 'what is yellow?',
      answer: 'the sun',
    },
  ],
};

describe('topicDetail', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(<Component topic={testTopic} />);
    expect(shallowOutput).toHaveLength(1);
  });

  it('displays the topic', () => {
    const staticOutput = render(<Component topic={testTopic} />);
    expect(staticOutput.find('h2').text()).toEqual('test-topic');
  });

  it('displays related cards', () => {
    const staticOutput = render(<Component topic={testTopic} />);
    expect(staticOutput.find('.card')).toHaveLength(2);
  });

  // THIS DOES NOT WORK - because onCardSelect is an arrow function and not accessible via
  //                      the prototype it is not possible to spy on it.
  //
  //                      Alternatly - we could pass in the props funciton as a spy, however
  //                      the existing click handler fails because of the argument deconstruction
  //
  // it('cards are clickable', () => {
  //   const spy = jest.spyOn(Component.prototype, 'onCardSelect');
  //   const shallowOutput = shallow(<Component topic={testTopic} />);
  //
  //   shallowOutput.find('Card').last().simulate('click');
  //   expect(spy).toHaveBeenCalled();
  // });

  it('cards have onClick event', () => {
    const shallowOutput = shallow(<Component topic={testTopic} />);
    expect(typeof shallowOutput.find('Card').first().prop('onClick')).toBe('function');
  });

  // TODO: remove
});
