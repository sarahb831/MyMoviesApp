//registration-view.jsx

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './registration-view.scss';

import axios from 'axios';

export default function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

   const handleRegistration = (e) => {
    e.preventDefault(); /* to prevent default refresh of page from this method*/
    /* send request to server for registration */
    axios.post('https://my-movie-app-smb.herokuapp.com/users', {
      Username: username, 
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.location.href = `http://localhost:${window.location.port}`;
    })
    .catch(e => {
      console.log(e, ': error registering user')
    });
  };

    return (
      <Container>
        <Row>
          <Col></Col>
          <Col  xs={12} md={8}>
            <Form>
              <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                placeholder="Username"
                required 
                onChange = {e => setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  placeholder="Password"
                  required 
                  onChange = {e => setPassword(e.target.value)}/>
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  placeholder="Email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
                  onChange = {e => setEmail(e.target.value)}/>
              </Form.Group>

              <Form.Group controlId="formBasicBirthday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                type="date"
                value={birthday}
                placeholder="Birthday"
                onChange = {e => setBirthday(e.target.value)}/>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className = "button-primary"
                onClick = {handleRegistration}
                block>Register
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }

