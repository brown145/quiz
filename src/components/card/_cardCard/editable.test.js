import React from 'react';
import { shallow } from 'enzyme';

import Component from './editable';

const testCard = {
  id: 'c1',
  question: 'test-question1',
  answer: 'test-answer1',
  topics: [],
  decks: [],
};
const nonOpFunc = () => {};

describe('editable cardCard', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(
      <Component
        card={testCard}
        onSelect={nonOpFunc}
        onDelete={nonOpFunc}
        onSubmit={nonOpFunc}
        onDeckSelect={nonOpFunc}
        onTopicSelect={nonOpFunc}
      />
    );
    expect(shallowOutput).toHaveLength(1);
  });

  it('can be in edit mode', () => {
    const shallowOutput = shallow(
      <Component
        card={testCard}
        onSelect={nonOpFunc}
        onDelete={nonOpFunc}
        onSubmit={nonOpFunc}
        onDeckSelect={nonOpFunc}
        onTopicSelect={nonOpFunc}
      />
    );
    shallowOutput.setState({ editFormOpen: true });

    expect(shallowOutput.find('Card')).toHaveLength(0);
    expect(shallowOutput.find('AddEditCardForm')).toHaveLength(1);
  });

  it('can be in non-edit mode', () => {
    const shallowOutput = shallow(
      <Component
        card={testCard}
        onSelect={nonOpFunc}
        onDelete={nonOpFunc}
        onSubmit={nonOpFunc}
        onDeckSelect={nonOpFunc}
        onTopicSelect={nonOpFunc}
      />
    );
    shallowOutput.setState({ editFormOpen: false });

    expect(shallowOutput.find('Card')).toHaveLength(1);
    expect(shallowOutput.find('AddEditCardForm')).toHaveLength(0);
  });
});
