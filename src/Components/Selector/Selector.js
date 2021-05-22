import React from 'react';
import { Select } from 'antd';
import './Selector.scss'

const { Option } = Select;

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

export default Selector;