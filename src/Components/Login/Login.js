import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom'
import './Login.scss'
import { 
  Form, 
  Input, 
  Button, 
  Tooltip
} from 'antd';
import SessionManager from 'Context/SessionManager'

/**
 * Display Login component
 * @component
 * @returns Login component
 */
const Login = () => {
  const [userAutheticated, setUserAutheticated] = useState(false)
  const formRef = useRef(null)

  const onFinish = (values) => {
    const isLogged = SessionManager.authenticate(values.password)

    if (!isLogged) {
      formRef.current.setFields([
        {
          name: 'password',
          errors: ['Wrong password'],
        }
      ])
    }

    setUserAutheticated(isLogged)
  };

  const renderTooltipMessage = () => {
    return (
      <>
        <p>Master password: admin</p>
        <p>(Due to app being a demo)</p>
      </>
    )
  }

  const renderLabel = () => {
    return (
      <Form.Item>
        <div className="login-container__label">
          Log In
        </div>
      </Form.Item>
    )
  }

  const renderPasswordInput = () => {
    return (
      <Form.Item
        label="Password"
        name="password"
        rules={[
        {
          message: 'Please input your password!',
        },
        ]}
      >
        <Input.Password />
      </Form.Item>
    )
  }

  const renderLogInButton  = () => {
    return (
      <Form.Item >
        <div className="login-container__buttons">
          <Tooltip 
            placement="bottom" 
            title={ renderTooltipMessage() }
            overlayClassName="login-container__buttons-tooltip"
          >
            <Button 
              type="primary" 
              htmlType="submit"
              className='login-container__buttons--login'
            >
              Sign In
            </Button>
          </Tooltip>
        </div>
      </Form.Item>
    )
  }

  const renderPopup = () => {
    return (
      <div className="login-overlay">
        <div className="login-container">
          <Form onFinish={onFinish} ref={formRef}>
            { renderLabel() }
            { renderPasswordInput() }
            { renderLogInButton() }
          </Form>
        </div> 
      </div>
    );
  };

  if (userAutheticated) {
    return null
  };

  return ReactDOM.createPortal(
    renderPopup(),
    document.body
  );
}

export default Login;