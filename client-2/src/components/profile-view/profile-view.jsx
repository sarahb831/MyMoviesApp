import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import axios from 'axios';

import './profile-view.scss';

import { Link } from  'react-router-dom';

export default function ProfileView(props) {
  const [ username, setUsername ] = useState(props.profile.user.Username);
  const [ password, setPassword ] = useState(props.profile.user.Password);
  const [ email, setEmail ] = useState(props.profile.user.Email);
  const [ birthdate, setBirthdate ] = useState(props.profile.user.Birthdate);
  const [ favoriteMoviesDetails ] = useState(props.movies);

  const handleProfileUpdate = (e) => {
    e.preventDefault(); 
    /* send request to server for update*/
    axios.put(`https://my-movie-app-smb.herokuapp.com/users/${username}`, {
      headers: {Authorization: `Bearer ${props.token}`}
    },{
        Username: username,
        Password: password,
        Email: email,
        Birthdate: birthdate
      })
      .then(response => {
        const data = response.data;
        console.log("profile updated");
     })
     .catch(e => {
       console.log(e, ': user not in system')
     });
  };

  const handleProfileDelete = (e) => {
    e.preventDefault(); 
    /* send request to server for update*/
    axios.delete(`https://my-movie-app-smb.herokuapp.com/users/${username}`, {
      headers: {Authorization: `Bearer ${props.token}`}
    })
      .then(response => {
        const data = response.data;
        console.log("profile deleted", data);
     })
     .catch(e => {
       console.log(e,': user not in system')
     });
  };

  function handleMovieDelete(movieId) {
    axios.delete(`https://my-movie-app-smb.herokuapp.com/users/${username}/${movieId}`, {
      headers: {Authorization: `Bearer ${props.token}`}
    })
    .then(response => {
      const data = response.data;
      console.log("movie deleted from favorites");
    })
    .catch(e => {
      console.log('movie not found')
    });
  }

    return (
    <div>
       <Container>
      <Row>
        <Col></Col>
        <Col xs={12} md={8}>
          <Form>
        <Form.Group controlId="formGroupUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder={username} 
            onChange = {e => setUsername(e.target.value)} 
            aria-label="Username"/>
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control type="password" placeholder="Password" 
            onChange = {e => setPassword(e.target.value)} 
            aria-label="Password"/>
        </Form.Group>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder={email} 
            onChange = {e => setEmail(e.target.value)}  
            aria-label="Email"/>
        </Form.Group>
        <Form.Group controlId="formGroupBirthdate">
          <Form.Label>Birthdate</Form.Label>
          <Form.Control type="date" placeholder={birthdate} 
            onChange = {e => setBirthdate(e.target.value)} 
            aria-label="Birthdate"/>
        </Form.Group>
      </Form>
      <Card> 
        <Card.Body>
          <Button
            variant="primary"
            type="submit"
            className = "button-primary"
            onClick = {handleProfileUpdate}>Update Profile
          </Button>
          <Button
            variant="primary"
            type="submit"
            className = "button-primary"
            onClick = {handleProfileDelete}>Delete Profile
          </Button>
          <Link to={`/`}>
            <Button variant="link" className = "button-primary">
              Return to Main Menu 
            </Button>
          </Link>
        </Card.Body>
      </Card>

      { favoriteMoviesDetails && (favoriteMoviesDetails.length > 0) &&
        favoriteMoviesDetails.map(movie => 
        <Card style={{ width: '16rem' }} key = {movie._id}>
          <Card.Body>
            <Card.Title>Title: {movie.Title}</Card.Title>
            <Card.Text>Description: {movie.Description}</Card.Text>
            <Button 
              variant="primary" 
              onClick = {() => handleMovieDelete(movie._id)}
              className = "button-primary">
              Delete From Favorites
            </Button>
          </Card.Body>
          </Card>
          )
        }
          </Col>
          <Col>
          </Col>
          </Row>
          </Container>        
        </div>
    );   
}

ProfileView.propTypes = {
  profile: PropTypes.shape({
    Username: PropTypes.string,
    Password: PropTypes.string,
    Email: PropTypes.string
  }).isRequired
};