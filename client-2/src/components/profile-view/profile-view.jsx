import React, { useState } from 'react';

import { connect } from 'react-redux';
import { setUser } from  '../../actions/actions'; 

//import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import axios from 'axios';

import './profile-view.scss';

import { Link } from  'react-router-dom';

function ProfileView(props) {
  const profile = props.userObject;
  const token = props.userObject.token;
  console.log('profileview token:',profile ? token : 'no token found')
  
  const [ username, setUsername ] = useState(profile.user.Username);
  const [ password, setPassword ] = useState(profile.user.Password);
  const [ email, setEmail ] = useState(profile.user.Email);
  const [ birthdate, setBirthdate ] = useState(profile.user.Birthdate);
  const [ favoriteMovies] = useState(profile.user.FavoriteMovies);

  const handleProfileUpdate = (e) => {
    e.preventDefault(); 
    /* send request to server for update*/
    axios.put(`https://my-movie-app-smb.herokuapp.com/users/${username}`, {
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
       console.log(e, ': user not in system')
     });
  };

  const handleProfileDelete = (e) => {
    e.preventDefault(); 
    /* send request to server for update*/
    axios.delete(`https://my-movie-app-smb.herokuapp.com/users/${username}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
      .then(response => {
        const data = response.data;
        this.props.setUser({});
        console.log("profile deleted", data);
     })
     .catch(e => {
       console.log(e,': user not in system')
     });
  };

  function handleMovieDelete(movieId) {
    axios.delete(`https://my-movie-app-smb.herokuapp.com/users/${username}/${movieId}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      //const data = response.data;
      console.log("movie deleted from favorites");
      // this should update store with revised favoirte movies for user
    })
    .catch(e => {
      console.log('movie not found')
    });
  }

  function getFavoriteMoviesDetails() {
   // const { movies, userObject } = this.props;
    const { movies } = props;
     console.log('gFMD movies:',props.movies);
     let favoriteMoviesDetails = [];
     //console.log('userObject:',userObject ? userObject : null);
     //console.log('userObject.user.Username:', userObject.user.Username ? userObject.user.Username : 'does not exist');
     //console.log('userObject.userObject.user.Username:', userObject.userObject.user.Username ? userObject.userObject.user.Username : 'does not exist');
     if ((favoriteMovies != null) && 
       (favoriteMovies.length > 0) && movies) {
       favoriteMoviesDetails = movies.filter(movie => favoriteMovies.includes(movie._id));
     }
     console.log('favMoviesDetails:',favoriteMoviesDetails ? favoriteMoviesDetails : 'no fav movies found');
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

      { /*favoriteMoviesDetails && (favoriteMoviesDetails.length > 0) &&
        favoriteMoviesDetails.map(movie => */
          
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
const mapStateToProps = ({movies, userObject}) => ({movies, userObject});
export default connect( mapStateToProps, { setUser } )(ProfileView);

/*ProfileView.propTypes = {
  profile: PropTypes.shape({
    Username: PropTypes.string,
    Password: PropTypes.string,
    Email: PropTypes.string
  }).isRequired
};
*/