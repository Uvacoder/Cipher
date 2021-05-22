import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import './Login.scss'
import { 
  Form, 
  Input, 
  Button, 
} from 'antd';
import SessionManager from '../../Utils/SessionManager'

const MASTER_PASSWORD = 'admin'

const Login = () => {
  
  const [userLogged, setUserLogged] = useState(false)

  const onFinish = (values) => {

    // if (values.password === MASTER_PASSWORD) {
    //   setUserLogged(true)
    // }
    setUserLogged(SessionManager.authenticate(values.password))
  };

  const renderPopup = () => {
    return (
      <div className="login-overlay" >
        <Form 
          onFinish={onFinish}
        >
          <Form.Item
            label="Password"
            name="password"
            rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item >
            <div className='login-overlay__buttons'>
              <Button 
                type="primary" 
                htmlType="submit"
                className='login-overlay__buttons--login'
              >
                Sign In
              </Button>
              <Button 
                className='login-overlay__buttons--guest'
              >
                Continue as a Guest
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    )
  }

  if (userLogged) {
    return null
  }

  return ReactDOM.createPortal(
    renderPopup(),
    document.getElementById('root')
  );
}

export default Login;