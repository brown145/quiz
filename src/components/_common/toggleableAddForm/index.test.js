import React from 'react';
import { shallow } from 'enzyme';

import Component from './index';

const TestFormComponent = props => (<div>test</div>);
const testFuncNonOp = () => {};

describe('common ToggleableAddForm', () => {
  it('shallow renders without crashing', () => {
    const shallowOutput = shallow(<Component onSubmit={testFuncNonOp} AddEditForm={TestFormComponent} />);
    expect(shallowOutput).toHaveLength(1);
  });

  it('can be in opened state', () => {
    const shallowOutput = shallow(<Component onSubmit={testFuncNonOp} AddEditForm={TestFormComponent} />);
    shallowOutput.setState({isOpen: true});

    expect(shallowOutput.find('TestFormComponent')).toHaveLength(1);
    expect(shallowOutput.find('AddCard')).toHaveLength(0);
  });

  it('can be in closed state', () => {
    const shallowOutput = shallow(<Component onSubmit={testFuncNonOp} AddEditForm={TestFormComponent} />);
    shallowOutput.setState({isOpen: false});

    expect(shallowOutput.find('TestFormComponent')).toHaveLength(0);
    expect(shallowOutput.find('AddCard')).toHaveLength(1);
  });
});
