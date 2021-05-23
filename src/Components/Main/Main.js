import React, { useState, useMemo, useEffect } from 'react';
import './Main.scss';
import Feistel from '../../Cipher/Feistel'
import TextArea from '../TextArea/TextArea'
import SessionManager from '../../Context/SessionManager'
import openNotification from '../Notification/Notification'
import Selector from '../Selector/Selector'
import { 
  Input, 
  Button,
  Card, 
  InputNumber
} from 'antd';
import BITWISE_FUNCTIONS from '../../Constants/BitwiseFunctions'
import { generateKey } from '../../Utils/KeyGenerator'

const OPTIONS = Object.keys(BITWISE_FUNCTIONS)
const MIN_NUMBER_OF_ROUNDS = 2;
const MAX_NUMBER_OF_ROUNDS = 999;
// const DEFUALT_KEY = generateKey()

const Main = () => {
 
  const cipher = useMemo(() => new Feistel(), []);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [key, setKey] = useState("");
  const [rounds, setRounds] = useState(MIN_NUMBER_OF_ROUNDS);
  // let cipher = new Feistel(key, rounds)
  const setEncryptionOperator = (operator) => {
    cipher.setEncryptionOperator(operator)
  }

  // useEffect(() => {
  //   cipher = new Feistel(key, rounds)
  // },[key])

  const encipher = (inputValue) => {
    // const cipher = new Feistel(key, rounds)
    const encryptedValue = cipher.encrypt(inputValue);
    // setKey(cipher.getKey())
    setOutputText(encryptedValue)
  }

  const decipher = (inputValue) => {
    // const cipher = new Feistel(key, rounds)
    const decipherValue = cipher.decrypt(inputValue)
    setOutputText(decipherValue)
  }

  const checkAndExecute = (func) => {
    // let isValid = true;

    if (!SessionManager.isAuthenticated) {
      openNotification("Please log in first! You can do that, by refreshing the page")
      return;
    }

    // if (!inputText.length) {
    //   isValid = false;
    //   openNotification('You need some input in order to do that')
    // }

    // if (!key.length) {

    // }
    if (!key.length) {
      const key = generateKey();
      setKey(key);
      cipher.setKey(key);
    }

    if (inputText.length) {
      func()
    } else {
      openNotification('You need some input in order to do that')
    }
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
          className="main__buttons-encode" 
          onClick={() => checkAndExecute(() => encipher(inputText))}
        >
          Encrypt
        </Button>
        <Button 
          className="main__buttons-decode" 
          onClick={() => checkAndExecute(() => decipher(inputText))}
        >
          Decrypt
        </Button>
      </div>
      <Card title="Output" className="main__output">
        <TextArea 
          readOnly={ true }
          value={ outputText }
        />
      </Card>
      <div className="main__properties"> 
        <Selector 
          options={ OPTIONS } 
          onChange={ (value) => setEncryptionOperator(BITWISE_FUNCTIONS[value]) }
          defaultValue = { OPTIONS[0] }
        />
        <div className="main__properties-key">
          <Input 
            addonBefore="Key:" 
            placeholder="Insert your key or we will generate in for you" 
            // defaultValue="qwertyZAX"
            value={ key }
            onChange={e => {
              setKey(e.target.value)
              //feistel set target key
            }}
            onBlur={() => cipher.setKey(key)}
          />
        </div>
        <div className="main__properties-rounds">
          <div className="main__properties-rounds-addon">Rounds:</div>
          <InputNumber 
            min={ MIN_NUMBER_OF_ROUNDS }
            max={ MAX_NUMBER_OF_ROUNDS }
            // defaultValue={ MIN_NUMBER_OF_ROUNDS }
            value={ rounds }
            onChange={value => {
              setRounds(value)
              cipher.setRounds(value)
            }}
          />
        </div>
      </div>
    </main>
  );
}
 
export default Main;