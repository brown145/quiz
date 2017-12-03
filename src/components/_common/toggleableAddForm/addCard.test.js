import React from 'react';
import { shallow } from 'enzyme';

import Component from './addCard';

describe('common addCard', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(<Component />);
    expect(shallowOutput).toHaveLength(1);
  });

  it('displays the add icon', () => {
    const shallowOutput = shallow(<Component />);
    expect(shallowOutput.find('Icon')).toHaveLength(1);
  });

  it('can be clicked', () => {
    const shallowOutput = shallow(<Component onAdd={() => {}} />);
    expect(typeof shallowOutput.prop('onClick')).toBe('function');
  });
});
