import React, { useState } from 'react';
import './Main.scss';
import { Input, Button, Card } from 'antd';
import Cipher from '../Cipher/Cipher'

const { TextArea } = Input;

function Main() {

  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [key, setKey] = useState("");

  const createCipher = (inputValue) => {
    const cipher = new Cipher(key)
    const encryptedValue = cipher.encrypt(inputValue);
    setKey(cipher.getKey())
    setOutputText(encryptedValue)
  }

  const decipher = (inputValue) => {
    const cipher = new Cipher(key)
    const decipherValue = cipher.decrypt(inputValue)
    setOutputText(decipherValue)
  }

  return (
    <main className="main">
      <Card title="Input" className="main__input">
        <TextArea 
          bordered={false} 
          autoSize={false}
          onChange={e => setInputText(e.target.value)}
        />
      </Card>
      <div className="main__buttons">
        <Button 
          className="main__buttons--encode" 
          type="primary"
          onClick={() => createCipher(inputText)}
        >
          Encode
        </Button>
        <Button 
          className="main__buttons--decode" 
          type="primary"
          onClick={() => decipher(inputText)}
        >
          Decode
        </Button>
      </div>
      <Card title="Output" className="main__output">
        <TextArea 
          bordered={false} 
          autoSize={false}
          readOnly={true}
          value={ outputText }
        />
      </Card>
      <div className="main__key">
        <Input 
          addonBefore="Key:" 
          placeholder="Insert your key in order to decode" 
          value={ key || ''}
          onChange={e => {
            setKey(e.target.value)
          }}
        />
      </div>
    </main>
  );
}
 
export default Main;