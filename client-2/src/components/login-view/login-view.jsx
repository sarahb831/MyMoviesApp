//login-view.jsx

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import PropTypes from 'prop-types';

import axios from 'axios';

export default function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); /* to prevent default refresh of page from this method*/
    /* send request to server for authentication */
    axios.post('http://localhost:3000/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('user not in system')
    });
  };

    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  const handleRegistry =(e) => {
    e.preventDefault();
    props.onRegistrationClicked();
  };


  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={12} md={8}>
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

            <Button
              variant="primary"
              type="submit"
              className = "button-primary"
              onClick = {handleSubmit}>
              Login
            </Button>

            <Button
              variant="secondary"
              type="submit"
              className = "button-secondary"
              onClick = {handleRegistry}>
              Not registered yet? Sign up here
            </Button>

          </Form>
        </Col>
        <Col>
        </Col>
      </Row>
    </Container>
  );
}

  LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired,
    onRegistrationClicked: PropTypes.func.isRequired
  };
