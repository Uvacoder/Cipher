import React, { useRef, useEffect } from 'react';
import { Input } from 'antd';
import { enableTabulatorInTextArea } from '../../Utils/InputHelpers';

const { TextArea: AntdTextArea } = Input;

const TextArea = (props) => {
  const textAreaRef = useRef(null);
  
  useEffect(() => {
    const nativeTextArea = textAreaRef.current.resizableTextArea.textArea;
    enableTabulatorInTextArea(nativeTextArea);
  }, [])

  const {
    bordered,
    autoSize,
    readOnly,
    onChange,
    value
  } = props

  return (
    <AntdTextArea
      ref={textAreaRef}
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