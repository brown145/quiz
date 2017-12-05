import React from 'react';
import { shallow } from 'enzyme';

import Component from './addCard';

const nonOpFunc = (() => {});

describe('common addCard', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(<Component onAdd={nonOpFunc} />);
    expect(shallowOutput).toHaveLength(1);
  });

  it('displays the add icon', () => {
    const shallowOutput = shallow(<Component onAdd={nonOpFunc} />);
    expect(shallowOutput.find('Icon')).toHaveLength(1);
  });

  it('can be clicked', () => {
    const shallowOutput = shallow(<Component onAdd={nonOpFunc} />);
    expect(typeof shallowOutput.prop('onClick')).toBe('function');
  });
});
