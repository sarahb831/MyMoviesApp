import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { setMovies } from  '../../actions/actions'; // to import relevant actions
import { setUser } from  '../../actions/actions'; 

import MoviesList from '../movies-list/movies-list';
import RegistrationView from '../registration-view/registration-view';
import LoginView from  '../login-view/login-view';
import MovieView from '../movie-view/movie-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';

import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import './main-view.scss';

class MainView extends React.Component {

  constructor() {
    super();
    this.onLoggedIn = this.onLoggedIn.bind(this);
  }
  
  componentDidMount() {    
    let accessToken;
    const userObject = localStorage.getItem('userObject');
    if (userObject !== null) accessToken = userObject.token;
    if (userObject != null && accessToken != null) {
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://my-movie-app-smb.herokuapp.com/movies', {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onLoggedIn() {
    const { userObject } = this.props;
    this.getMovies(userObject.token);
  }

  handleLogout() {
      localStorage.removeItem('userObject');
      if (window.location.port !== 0 && window.location.port !== 80) {
        window.location.href = `${window.location.href}:${window.location.port}/`;
      } else window.location.href = `${window.location.href}/`;
  }

  getMovie(movieId) {
    const { movies } = this.props;
    let movie;
    if (movies != null)  {
    // eslint-disable-next-line
      const movie = movies.find(movie => movie._id == movieId); // note not strict equality here
    }  
    return movie;
  }

  render() {
    const { movies, userObject } = this.props;
    const username = userObject.user ? userObject.user.Username : null;
   
    return ( 
      <div>
        <div>
          <Navbar bg="dark" variant="dark" fixed="top" 
            className="sticky-navbar navbar navbar-default navbar-fixed-top">
              <Navbar.Brand href="#home">myMovies</Navbar.Brand>
              { username !== null && <Navbar.Text>
                Signed in as: {username}
              </Navbar.Text>
              }
              <Navbar.Collapse className="justify-content-end">
                <Button
                  variant="primary"
                  type="submit"
                  className = "button-logout"
                  size="sm"
                  onClick = {this.handleLogout}>
                  Logout
                </Button>
              </Navbar.Collapse>
            </Navbar>
      </div>
      <Router>
        <div className = "main-view">
          <Route exact path="/" 
            render={() => {
              if (!username) return <LoginView onLoggedIn={this.onLoggedIn} setUser={this.setUser}/>;
              return <MoviesList user={username}/>;
            }
          }/>
          <Route path="/register" render={() => <RegistrationView />} />
          <Route exact path="/movies/:movieId" 
            render={({match}) => <MovieView movieId={match.params.movieId}/>}/>
          <Route exact path="/genres/:name"
            render={({match}) => {
              return <GenreView genre={movies.find(movie => 
                movie.Genre.Name === match.params.name).Genre}
              />}
          }/>
          <Route exact path="/directors/:name"
            render={({match}) => {
              return <DirectorView 
                director={movies.find(movie => 
                  movie.Director.Name === match.params.name).Director}
              />}
            } />
            <Route exact path="/users/:Username"
              render={({match}) => {
                if (!username) return <LoginView onLoggedIn={this.onLoggedIn}  setUser={this.setUser}/>;
                return <ProfileView/>;
              }
            }/>
        </div>
     </Router>
     </div>
    );
  }
}

const mapStateToProps = ({ moviesApp, userObject, movies }) => ({ moviesApp, userObject, movies });

export default connect(mapStateToProps, { setMovies, setUser } )(MainView);