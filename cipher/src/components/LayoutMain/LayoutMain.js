import React from 'react';
import './LayoutMain.scss';
import { Input, Button, Card } from 'antd';
// import convertToBinary from '../../Utils/AsciiToBinary'
import Cipher from '../Cipher/Cipher'

const { TextArea } = Input;

function LayoutMain() {

  return (
    <main className="layout-main">
      <Card title="Input" className="layout-main__input">
        <TextArea 
          bordered={false} 
          autoSize={false}
        />
      </Card>
      <div className="layout-main__buttons">
        <Button 
          className="layout-main__buttons--encode" 
          type="primary"
          // onClick={() => console.log(convertToBinary('abc'))}
        >
          Encode
        </Button>
        <Button className="layout-main__buttons--decode" type="primary">
          Decode
        </Button>
      </div>
      <Card title="Output" className="layout-main__output">
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
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