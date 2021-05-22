import React, { useState, useMemo } from 'react';
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

const OPTIONS = Object.keys(BITWISE_FUNCTIONS)
const MIN_NUMBER_OF_ROUNDS = 2;
const MAX_NUMBER_OF_ROUNDS = 100;

const cipher = new Feistel()

const Main = () => {
  // const cipher = useMemo(() => new Feistel(key, rounds), []);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [key, setKey] = useState("");
  const [rounds, setRounds] = useState(null);

  const setEncryptionOperator = (operator) => {
    cipher.setEncryptionOperator(operator)
  }

  const encipher = (inputValue) => {
    // const cipher = new Feistel(key, rounds)
    const encryptedValue = cipher.encrypt(inputValue);
    setKey(cipher.getKey())
    setOutputText(encryptedValue)
  }

  const decipher = (inputValue) => {
    // const cipher = new Feistel(key, rounds)
    const decipherValue = cipher.decrypt(inputValue)
    setOutputText(decipherValue)
  }

  const checkAndExecute = (func) => {
    if (!SessionManager.isAuthenticated) {
      openNotification("Please log in first! You can do that, by refreshing the page")
      return;
    }

    if (inputText) {
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
          Encode
        </Button>
        <Button 
          className="main__buttons-decode" 
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
        {/* <div>
          <Select defaultValue={ TEMP[0] }>
            {TEMP.map(method => (
              <Option key={method}>{method}</Option>
            ))}
          </Select>
        </div> */}
        <Selector 
          options={ OPTIONS } 
          onChange={ (value) => setEncryptionOperator(BITWISE_FUNCTIONS[value]) }
          defaultValue = { OPTIONS[0] }
        />
        <div className="main__properties-key">
          <Input 
            addonBefore="Key:" 
            placeholder="Insert your key or we will generate in for you" 
            value={ key || ''}
            onChange={e => {
              setKey(e.target.value)
            }}
          />
        </div>
        <div className="main__properties-rounds">
          <div className="main__properties-rounds-addon">Rounds:</div>
          <InputNumber 
            min={ MIN_NUMBER_OF_ROUNDS }
            max={ MAX_NUMBER_OF_ROUNDS }
            defaultValue={ MIN_NUMBER_OF_ROUNDS }
            value={ rounds }
            onChange={e => {setRounds(e)}}
          />
        </div>
      </div>
    </main>
  );
}
 
export default Main;