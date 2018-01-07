import React from 'react';
import { shallow } from 'enzyme';

import Component from './main';

const testLinks = [{
  text: 'decks',
  to: '/decks/',
},
{
  text: 'cards',
  to: '/cards/',
},
{
  text: 'topics',
  to: '/topics/',
},
];

describe('deckList', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(
      <Component
        links={testLinks}
      />
    );
    expect(shallowOutput).toHaveLength(1);
  });
});
