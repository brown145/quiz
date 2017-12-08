import React from 'react';
import { shallow } from 'enzyme';

import Component from './index';

const testDeck = {
  id: 'd1',
  name: 'test-name1',
  description: 'test-description1',
  cards: [
    {
      id: 'c1',
      question: 'test-question1',
      answer: 'test-answer1',
    },
    {
      id: 'c2',
      question: 'test-question2',
      answer: 'test-answer2',
    },
  ],
};
const nonOpFunc = () => {};

describe('deckDetail', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(
      <Component
        deck={testDeck}
        onCardSelect={nonOpFunc}
        onTopicSelect={nonOpFunc}
        onRelateCardToDeck={nonOpFunc}
      />
    );
    expect(shallowOutput).toHaveLength(1);
  });

  it('displays the deck1', () => {
    const shallowOutput = shallow(
      <Component
        deck={testDeck}
        onCardSelect={nonOpFunc}
        onTopicSelect={nonOpFunc}
        onRelateCardToDeck={nonOpFunc}
      />
    );
    expect(shallowOutput.find('Header').html()).toContain('test-name1');
  });

  it('displays related cards', () => {
    const shallowOutput = shallow(
      <Component
        deck={testDeck}
        onCardSelect={nonOpFunc}
        onTopicSelect={nonOpFunc}
        onRelateCardToDeck={nonOpFunc}
      />
    );
    expect(
      shallowOutput
        .find('CardGroup')
        .dive()
        .find('ShortCard')
    ).toHaveLength(2);
  });

  it('cards pass card select event', () => {
    const shallowOutput = shallow(
      <Component
        deck={testDeck}
        onCardSelect={nonOpFunc}
        onTopicSelect={nonOpFunc}
        onRelateCardToDeck={nonOpFunc}
      />
    );
    expect(
      typeof shallowOutput
        .find('ShortCard')
        .first()
        .prop('onCardSelect')
    ).toBe('function');
  });

  it('cards pass topic select event', () => {
    const shallowOutput = shallow(
      <Component
        deck={testDeck}
        onCardSelect={nonOpFunc}
        onTopicSelect={nonOpFunc}
        onRelateCardToDeck={nonOpFunc}
      />
    );
    expect(
      typeof shallowOutput
        .find('ShortCard')
        .first()
        .prop('onTopicSelect')
    ).toBe('function');
  });
});
