import React from 'react';
import { shallow } from 'enzyme';

import Component from './toggleableAddForm';

describe('topicList', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(<Component onSubmit={() => {}} />);
    expect(shallowOutput).toHaveLength(1);
  });

  it('can be in opened state', () => {
    const shallowOutput = shallow(<Component onSubmit={() => {}} />);
    shallowOutput.setState({isOpen: true});

    expect(shallowOutput.find('AddEditTopicForm')).toHaveLength(1);
    expect(shallowOutput.find('AddCard')).toHaveLength(0);
  });

  it('can be in closed state', () => {
    const shallowOutput = shallow(<Component onSubmit={() => {}} />);
    shallowOutput.setState({isOpen: false});

    expect(shallowOutput.find('AddEditTopicForm')).toHaveLength(0);
    expect(shallowOutput.find('AddCard')).toHaveLength(1);
  });
});
