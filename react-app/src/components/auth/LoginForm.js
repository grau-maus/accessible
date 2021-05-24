import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { Form, Button } from 'react-bootstrap';

import './LoginForm.css'

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async (e) => {
    e.preventDefault();

    const data = await dispatch(login(email, password));

    if (data.errors) {
      for (const ele of data.errors) {
        const type = ele.split(' ')[0];

        if (type === 'email') setEmailError(ele);
        if (type === 'password') setPassError(ele);
      }
      window.alert(data.errors);
    }
  };

  const adminDemoLogin = () => {
    dispatch(login('demo@user.io', 'password'));
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
    setPassError('');
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div id='login-form-container'>
      <Form id='login-form' onSubmit={onLogin}>
        <div className='login-logo'>
          <i className='fas fa-ambulance' />

          <h2>accessible</h2>
        </div>

        <Form.Group controlId='formBasicEmail' className='login-email'>
          <Form.Label>Email address</Form.Label>

          <Form.Control
            type='email'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />

          {emailError && <div className='login-errors'>{emailError}</div>}
        </Form.Group>

        <Form.Group controlId='formBasicPassword' className='login-password'>
          <Form.Label>Password</Form.Label>

          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />

          {passError && <div className='login-errors'>{passError}</div>}
        </Form.Group>

        <div id='login-buttons'>
          <Button id='login-submit' variant='primary' type='submit'>
            Login
          </Button>

          <Button id='login-admin-demo' onClick={adminDemoLogin}>
            Admin Demo Login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
