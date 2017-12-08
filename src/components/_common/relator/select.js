import React from 'react';
import PropTypes from 'prop-types';

const RelationSelector = props => {
  const handler_optionChange = (e) => {
    const select = e.target;
    if (select.value){
      props.onSelect(select.value);
    }
  };

  const options = props.optionItems.map(option => (
    <option key={option.id} value={option.id}>{option.text}</option>
  ));
  return (
    <select onChange={handler_optionChange}>
      <option>{props.text}</option>
      {options}
    </select>
  );
};
RelationSelector.propTypes = {
  text: PropTypes.string.isRequired,
  optionItems: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default RelationSelector;
