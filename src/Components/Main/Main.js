import React, { useState, useMemo } from 'react';
import './Main.scss';
import Feistel from 'Cipher/Feistel'
import TextArea from 'Components/TextArea/TextArea'
import Selector from 'Components/Selector/Selector'
import openNotification from 'Components/Notification/Notification'
import SessionManager from 'Context/SessionManager'
import BITWISE_FUNCTIONS from 'Constants/BitwiseFunctions'
import { generateKey } from 'Utils/KeyGenerator'
import { 
  Input, 
  Button,
  Card, 
  InputNumber
} from 'antd';

const OPTIONS = Object.keys(BITWISE_FUNCTIONS)
const MIN_NUMBER_OF_ROUNDS = 2;
const DEFAULT_NUMBER_OF_ROUNDS = 8;
const MAX_NUMBER_OF_ROUNDS = 1000;

/**
 * Main component, handling state of the application
 * @returns Input and Output areas, buttons
 */
const Main = () => {
  const cipher = useMemo(() => new Feistel(DEFAULT_NUMBER_OF_ROUNDS), []);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [key, setKey] = useState('');
  const [rounds, setRounds] = useState(DEFAULT_NUMBER_OF_ROUNDS);

  const setEncryptionOperator = (operator) => cipher.setEncryptionOperator(operator)
  const encipher = (inputValue) => setOutputText(cipher.encrypt(inputValue))
  const decipher = (inputValue) => setOutputText(cipher.decrypt(inputValue))

  const setNewKey = (key) => {
    setKey(key)
    cipher.setKey(key)
  }

  const checkAndExecute = (callback) => {
    if (!SessionManager.isAuthenticated) {
      openNotification('Please log in first! You can do that, by refreshing the page')
      return;
    }

    if (inputText.length) {
      if (!key.length) {
        setNewKey(generateKey())
      }  
      callback()
    } else {
      openNotification('You need some input in order to do that')
    }
  }

  return (
    <main className="main">
      <Card title="Input" className="main__input">
        <TextArea 
          value={ inputText }
          onChange={ value => setInputText(value) }
        />
      </Card>
      <div className="main__buttons">
        <Button 
          className="main__buttons-encode" 
          onClick={ () => checkAndExecute(() => encipher(inputText)) }
        >
          Encrypt
        </Button>
        <Button 
          className="main__buttons-decode" 
          onClick={ () => checkAndExecute(() => decipher(inputText)) }
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
            addonBefore='Key:' 
            placeholder='Insert your key or we will generate in for you' 
            value={ key }
            onChange={ e => setNewKey(e.target.value) }
          />
        </div>
        <div className="main__properties-rounds">
          <div className="main__properties-rounds-addon">Rounds:</div>
          <InputNumber 
            min={ MIN_NUMBER_OF_ROUNDS }
            max={ MAX_NUMBER_OF_ROUNDS }
            value={ rounds }
            onChange={ value => {
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