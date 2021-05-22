import React, { useState } from 'react';
import { Input } from 'antd';

const { TextArea: AntdTextArea } = Input;

const TextArea = (props) => {

  const {
    bordered,
    autoSize,
    readOnly,
    onChange,
    value
  } = props

  return (
    <AntdTextArea
      bordered={ bordered } 
      autoSize={ autoSize }
      readOnly={ readOnly }
      value={ value }
      onChange={e => onChange(e.target.value)}
    />
  )
}

TextArea.defaultProps = {
  onChange: () => {},
  value: null,
  bordered: false, 
  autoSize: false,
  readOnly: false
}

export default TextArea;