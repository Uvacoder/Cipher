import React from 'react';
import { Select } from 'antd';
import './Selector.scss'
import PropTypes from 'prop-types';

const { Option } = Select;

/**
 * Encrypting function selector
 * @component
 * @returns Selector component
 */
const Selector = (props) => {
  const {
    options,
    onChange,
    defaultValue
  } = props

  return (
    <div className="main__properties-selector">
      <div className="main__properties-selector-label">
        Select encrypting function:
      </div>
      <Select 
        defaultValue={ defaultValue } 
        onChange={(val) => onChange(val)}
        dropdownClassName = "main__properties-selector--dropdown"
      >
        {options.map(method => (
          <Option key={method}>{method}</Option>
        ))}
      </Select>
    </div>
  )
}

Selector.propTypes = {
  /**Array of encoding functions */
  options: PropTypes.array,
  /**On change function */
  onChange: PropTypes.func,
  /**Default selected value */
  defaultValue: PropTypes.string
};

Selector.defaultProps = {
  options: [],
  onChange: () => {},
  defaultValue: ''
}

export default Selector;