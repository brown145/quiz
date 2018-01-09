import React from 'react';
import PropTypes from 'prop-types';
import { Container, Dropdown } from 'semantic-ui-react';

const RelationSelector = props => {
  const handler_optionChange = (e, {value}) => {
    if (value){
      props.onSelect(value);
    }
  };

  return (
    <Container>
      <Dropdown
        placeholder={props.text}
        fluid
        search
        selection
        onChange={handler_optionChange}
        options={props.optionItems.map( option => ({
          key: option.id,
          value: option.id,
          text: option.text,
        }))}
      />
    </Container>
  );
};
RelationSelector.propTypes = {
  text: PropTypes.string.isRequired,
  optionItems: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default RelationSelector;
