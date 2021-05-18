import React from 'react';
import './LayoutMain.scss';
import { Input } from 'antd';
import { Button } from 'antd';
import { Card } from 'antd';
 
function LayoutMain() {

  const { TextArea } = Input;
 
  return (
    <main className="layout-main">
      <Card title="Input" bordered={false} style={{ width: 300 }}>
        <TextArea rows={4} />
      </Card>
      <div className="layout-main__buttons">
        <Button className="layout-main__buttons--encode" type="primary">Encode</Button>
        <Button className="layout-main__buttons--decode"type="primary">Decode</Button>
      </div>
      <Card title="Result" bordered={false} style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </main>
  );
}
 
export default LayoutMain;