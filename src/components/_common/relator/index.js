import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Divider } from 'semantic-ui-react';

import Select from 'components/_common/relator/select';

class ToggleableRelator extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    optionItems: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  state = {
    isOpen: false,
  };

  handleSelectShow = (e) => {
    this.setState({ isOpen: true });
    e.stopPropagation();
  };

  handleSelectHide = () => {
    this.setState({ isOpen: false });
  };

  renderShownState = () => {
    const {text, optionItems, onSelect} = this.props;
    return (
      <Container>
        <Select text={text} optionItems={optionItems} selection={null}
          onSelect={onSelect}
        />
        <Button onClick={this.handleSelectHide}>Close</Button>
      </Container>
    );
  }

  renderHiddenState = () => {
    return (
      <Button onClick={this.handleSelectShow}>{this.props.text}</Button>
    );
  }

  render() {
    return (
      <Container>
        <Divider section />
        {(this.state.isOpen) ? this.renderShownState() : this.renderHiddenState()}
      </Container>
    );
  }
}

export default ToggleableRelator;
