import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from  'react-router-dom';

import { setUser } from  '../../actions/actions'; 

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import './profile-view.scss';
import { putRequest, deleteRequest } from '../../helpers/requester';

function ProfileView(props) {
  const profile = props.userObject;
  const token = props.userObject.token;
    const [ username, setUsername ] = useState(profile.user.Username);
  const [ password, setPassword ] = useState(profile.user.Password);
  const [ email, setEmail ] = useState(profile.user.Email);
  const [ birthdate, setBirthdate ] = useState(profile.user.Birthdate);
  const [ favoriteMovies] = useState(profile.user.FavoriteMovies);

  const handleProfileUpdate = (e) => {
    e.preventDefault(); 
    /* send request to server for update*/
    putRequest(`/users/${username}`, {
      headers: {Authorization: `Bearer ${token}`}
    },{
        Username: username,
        Password: password,
        Email: email,
        Birthdate: birthdate
      })
      .then(response => {
        console.log("profile updated");
        this.props.setUser(response.data);
     })
     .catch(e => {
       console.log(e, ': user not found in system')
     });
  };

  const handleProfileDelete = (e) => {
    e.preventDefault(); 
    /* send request to server for update*/
    deleteRequest(`/users/${username}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
      .then(response => {
        const data = response.data;
        this.props.setUser({});
        console.log("profile deleted", data);
     })
     .catch(e => {
       console.log(e,': user not found in system')
     });
  };

  function handleMovieDelete(movieId) {
    deleteRequest(`/users/${username}/${movieId}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log("movie deleted from favorites");
    })
    .catch(e => {
      console.log('movie not found')
    });
  }

  function getFavoriteMoviesDetails() {
    const { movies } = props;
    let favoriteMoviesDetails = [];
    if ((favoriteMovies != null) && 
       (favoriteMovies.length > 0) && movies) {
       favoriteMoviesDetails = movies.filter(movie => favoriteMovies.includes(movie._id));
     }
     return favoriteMoviesDetails;
   } 

    const favoriteMoviesDetails = getFavoriteMoviesDetails();
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

            { favoriteMoviesDetails.map(movie =>
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
            )}
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>        
    </div>
    );   
}
const mapStateToProps = ({movies, userObject}) => ({movies, userObject});
export default connect( mapStateToProps, { setUser } )(ProfileView);
