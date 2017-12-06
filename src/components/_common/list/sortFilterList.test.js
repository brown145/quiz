import React from 'react';
import { shallow } from 'enzyme';

import Component from './sortFilterList';

const nonOpFunc = () => {};
const testItems = [
  {
    id: 'one',
  },
  {
    id: 'two',
  },
];

describe('common sortFilterList', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(
      <Component
        listItemMapper={nonOpFunc}
        filteredBy={'id'}
        sortedBy={'id'}
        items={testItems}
      />
    );
    expect(shallowOutput).toHaveLength(1);
  });

  it('can have sort button', () => {
    const shallowOutput = shallow(
      <Component
        listItemMapper={nonOpFunc}
        filteredBy={'id'}
        sortedBy={'id'}
        items={testItems}
      />
    );
    expect(shallowOutput.find('Button')).toHaveLength(1);
  });

  it('can have filter input', () => {
    const shallowOutput = shallow(
      <Component
        listItemMapper={nonOpFunc}
        filteredBy={'id'}
        sortedBy={'id'}
        items={testItems}
      />
    );
    expect(shallowOutput.find('Input')).toHaveLength(1);
  });
});
