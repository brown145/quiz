import React from 'react';
import { shallow, render } from 'enzyme';

import Component from './addEditDeckForm';

const testDeck = {
  id: 'd1',
  name: 'test-name1',
  description: 'test-description1',
  cards: [],
};

describe('addEditDeckForm', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(
      <Component name={testDeck.name} description={testDeck.description} />
    );
    expect(shallowOutput).toHaveLength(1);
  });

  describe('update mode', () => {
    it('displays the deck name', () => {
      const shallowOutput = shallow(
        <Component
          id={testDeck.id}
          name={testDeck.name}
          description={testDeck.description}
        />
      );
      const input = shallowOutput
        .find('Form')
        .findWhere(node => node.prop('name') === 'name');

      expect(input.prop('value')).toBe(testDeck.name);
    });
    it('displays an "Update" button', () => {
      const shallowOutput = shallow(
        <Component
          id={testDeck.id}
          name={testDeck.name}
          description={testDeck.description}
        />
      );
      const submitButton = shallowOutput.find('Button').last();

      expect(render(submitButton).text()).toBe('Update');
    });
  });

  describe('add mode', () => {
    it('displays blank card name', () => {
      const shallowOutput = shallow(<Component />);
      const input = shallowOutput
        .find('Form')
        .findWhere(node => node.prop('name') === 'name');

      expect(input.prop('value')).toBe('');
    });
    it('displays an "Add" button', () => {
      const shallowOutput = shallow(<Component />);
      const submitButton = shallowOutput.find('Button').last();

      expect(render(submitButton).text()).toBe('Add');
    });
  });

  it('can be submited', () => {
    const shallowOutput = shallow(<Component />);
    const submitButton = shallowOutput.find('Button').last();

    expect(typeof submitButton.prop('onClick')).toBe('function');
  });

  it('can be closed', () => {
    const shallowOutput = shallow(<Component onClose={() => {}} />);
    const submitButton = shallowOutput.find('Button').first();

    expect(typeof submitButton.prop('onClick')).toBe('function');
  });
});
