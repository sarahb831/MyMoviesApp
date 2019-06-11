//registration-view.jsx

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import PropTypes from 'prop-types';

export default function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleRegistration = (e) => {
    e.preventDefault(); /* to prevent default refresh of page from this method*/
/* send request to server for registration */
    props.onRegistrationDone();
  };

    return (
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            placeholder="Username"
            onChange = {e => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
          type="password"
          value={password}
          placeholder="Password"
          onChange = {e => setPassword(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Email"
            onChange = {e => setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="formBasicBirthday">
          <Form.Label>Birthday (YYYY-MM-DD)</Form.Label>
          <Form.Control
          type="date"
          value={birthday}
          placeholder="Birthday"
          onChange = {e => setBirthday(e.target.value)}/>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick = {handleRegistration}>Register
        </Button>
      </Form>
    );
  }

  RegistrationView.propTypes = {
    onRegistrationDone: PropTypes.func.isRequired
  };
