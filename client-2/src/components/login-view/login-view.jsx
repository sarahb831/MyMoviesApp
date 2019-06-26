//login-view.jsx

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './login-view.scss';

import { Link } from  'react-router-dom';

import PropTypes from 'prop-types';

import axios from 'axios';

export default function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    /* send request to server for authentication */
    axios.post('https://my-movie-app-smb.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      localStorage.setItem("userObject", JSON.stringify(data)); // store stringified userObject in localStorage
      props.onLoggedIn(data); //keep?
      window.location.href = "http://localhost:3000"; // return to main display after complete
    })
    .catch(e => {
      console.log(e);
      console.log('user not in system')
    });
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
                onChange = {e => setUsername(e.target.value)} 
                required />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange = {e => setPassword(e.target.value)}
              required />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className = "button-primary"
              onClick = {handleSubmit}>
              Login
            </Button>
            <Link to={`/register`}>
            <Button 
              variant="link" 
              className = "button-primary">
              Not registered yet? Sign up here
            </Button>
          </Link>

          </Form>
        </Col>
        <Col>
        </Col>
      </Row>
    </Container>
  );
}

  LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
  };
