import React from 'react';
import { shallow } from 'enzyme';

import Component from './select';

const nonOpFunc = () => {};
const testOptions = [
  {
    id: 'id1',
    text: 'text1',
  },
  {
    id: 'id2',
    text: 'text2',
  },
];

describe('common relator select', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(
      <Component
        text="test text"
        optionItems={testOptions}
        onSelect={nonOpFunc}
      />
    );
    expect(shallowOutput).toHaveLength(1);
  });

  it('displays the options', () => {
    const shallowOutput = shallow(
      <Component
        text="test text"
        optionItems={testOptions}
        onSelect={nonOpFunc}
      />
    );
    expect(shallowOutput.find('option')).toHaveLength(3);
    expect(shallowOutput.find('option').first().text()).toBe('test text');
    expect(shallowOutput.find('option').last().prop('value')).toBe('id2');
  });

  it('can be clicked', () => {
    const spy = jest.fn();
    const shallowOutput = shallow(
      <Component
        text="test text"
        optionItems={testOptions}
        onSelect={spy}
      />
    );
    shallowOutput.find('select').simulate('change', {target: { value : 'id1'}});

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0]).toBe('id1');
  });
});
