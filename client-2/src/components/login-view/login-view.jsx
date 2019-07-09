//login-view.jsx

import React, { useState } from 'react';
import { Link } from  'react-router-dom';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './login-view.scss';

import { setUser } from  '../../actions/actions'

import PropTypes from 'prop-types';

import axios from 'axios';

function LoginView(props) {
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
      localStorage.setItem('userObject',data);
      props.setUser(data);
      props.onLoggedIn(); 
    })
    .catch(e => {
      console.log(e);
      console.log('user not found in system')
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
                autoFocus="autofocus"
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
              onClick = {handleSubmit}
              block>
              Login
            </Button>
            <Link to={`/register`}>
              <Button 
                variant="link" 
                className = "button-primary"
                block>
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

export default connect(null, { setUser } )(LoginView);

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};
