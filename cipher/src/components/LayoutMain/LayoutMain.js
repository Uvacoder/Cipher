import React, { useState } from 'react';
import './LayoutMain.scss';
import { Input, Button, Card } from 'antd';
import Cipher from '../Cipher/Cipher'

const { TextArea } = Input;

function LayoutMain() {

  const [inputText, setInputText] = useState("");
  const [outputText, setoutputText] = useState("");

  const createCipher = (text) => {
    const cipher = new Cipher('klucz', 5)
    setoutputText(inputText)
    console.log(outputText)
    console.log(cipher)
    console.log(cipher.encrypt(text))
  }

  return (
    <main className="layout-main">
      <Card title="Input" className="layout-main__input">
        <TextArea 
          bordered={false} 
          autoSize={false}
          onChange={e => setInputText(e.target.value)}
        />
      </Card>
      <div className="layout-main__buttons">
        <Button 
          className="layout-main__buttons--encode" 
          type="primary"
          onClick={() => createCipher('abc')}
        >
          Encode
        </Button>
        <Button className="layout-main__buttons--decode" type="primary">
          Decode
        </Button>
      </div>
      <Card title="Output" className="layout-main__output">
        <div>{ outputText }</div>
      </Card>
      <div className="layout-main__key">
        <Input 
          addonBefore="Key:" 
          placeholder="Insert your key in order to decode"  
        />
      </div>
    </main>
  );
}
 
export default LayoutMain;