import React, { useState } from 'react';
import './Main.scss';
import { Input, Button, Card, InputNumber } from 'antd';
import Cipher from '../Cipher/Cipher'
import TextArea from '../TextArea/TextArea'
// const { TextArea } = Input;

function Main() {

  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [key, setKey] = useState("");
  const [rounds, setRounds] = useState(null);

  const encipher = (inputValue) => {
    const cipher = new Cipher(key, rounds)
    const encryptedValue = cipher.encrypt(inputValue);
    setKey(cipher.getKey())
    setOutputText(encryptedValue)
  }

  const decipher = (inputValue) => {
    const cipher = new Cipher(key, rounds)
    const decipherValue = cipher.decrypt(inputValue)
    setOutputText(decipherValue)
  }

  const checkAndExecute = (func) => {
    inputText ? func() : console.error('You need some input in order to do that')
  }

  return (
    <main className="main">
      <Card title="Input" className="main__input">
        <TextArea 
          value={inputText}
          onChange={value => setInputText(value)}
        />
      </Card>
      <div className="main__buttons">
        <Button 
          className="main__buttons--encode" 
          type="primary"
          onClick={() => checkAndExecute(() => encipher(inputText))}
        >
          Encode
        </Button>
        <Button 
          className="main__buttons--decode" 
          type="primary"
          onClick={() => checkAndExecute(() => decipher(inputText))}
        >
          Decode
        </Button>
      </div>
      <Card title="Output" className="main__output">
        <TextArea 
          readOnly={ true }
          value={ outputText }
        />
      </Card>
      <div className="main__properties"> 
        <div className="main__properties--key">
          <Input 
            addonBefore="Key:" 
            placeholder="Insert your key or we will generate in for you" 
            value={ key || ''}
            onChange={e => {
              setKey(e.target.value)
            }}
          />
        </div>
        <div className="main__properties--rounds">
          <div className="main__properties--rounds-addon">Rounds:</div>
          <InputNumber 
            min={2}
            max={100}
            defaultValue={2}
            value={ rounds }
            onChange={e => {setRounds(e)}}
          />
        </div>
      </div>
    </main>
  );
}
 
export default Main;