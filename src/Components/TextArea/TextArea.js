import React, { useRef, useEffect } from 'react';
import { Input } from 'antd';
import { enableTabulatorInTextArea } from 'Utils/InputHelpers';
import PropTypes from 'prop-types';

const { TextArea: AntdTextArea } = Input;

/**
 * Component rendering text area
 * @component
 * @returns Text Area component
 */
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

TextArea.propTypes = {
  /** OnChange callback */
  onChange: PropTypes.func,
  /** TextArea value */
  value: PropTypes.string,
  /** Bordered */
  bordered: PropTypes.bool,
  /** Auto size */
  autoSize: PropTypes.bool,
  /** Read only */
  readOnly: PropTypes.bool
};

TextArea.defaultProps = {
  onChange: () => {},
  value: null,
  bordered: false, 
  autoSize: false,
  readOnly: false
}

export default TextArea;