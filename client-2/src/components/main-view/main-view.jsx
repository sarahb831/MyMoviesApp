import React from 'react';

import axios from 'axios';

import './main-view.scss';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { setMovies } from  '../../actions/actions'; // to import relevant actions

import MoviesList from '../movies-list/movies-list';


import RegistrationView from '../registration-view/registration-view';
import LoginView from  '../login-view/login-view';
// import MovieCard from '../movie-card/movie-card'; // not used for react-redux version
import MovieView from '../movie-view/movie-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

class MainView extends React.Component {

  /* keep? */
  constructor() {
    super();

    this.onLoggedIn = this.onLoggedIn.bind(this);
    this.state = {
      user: null,
      movies: [],
      userObject: {},
      token: null
    };
  }
  
  componentDidMount() {    
    let accessToken;
    const userObject = localStorage.getItem('userObject');
    if (userObject !== null) accessToken = userObject.token;
    if (userObject != null && accessToken != null) {
      this.setState({
        user: userObject.user.Username,
        userObject,
        token: accessToken
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://my-movie-app-smb.herokuapp.com/movies', {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // movies moved here now
      console.log('in getMovies .then()');
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onLoggedIn(authData) {
    console.log(authData.user.Username);
    console.log(authData.token);
   this.setState({
      user: authData.user.Username,
      userObject: authData,
      token: authData.token
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    localStorage.setItem('userObject', authData.user);
    this.getMovies(authData.token);
  }


  handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userObject');
    window.location.href = 'http://localhost:3000/';
    console.log("localStorage cleared");
  }

  getFavoriteMoviesDetails(userObject, movies) {
   // const { movies } = this.state;
    console.log('gFMD movies:',movies);
    let favoriteMoviesDetails = [];
    console.log('userObject:',userObject ? userObject : null);
    console.log('userObject.userObject.user.Username:', userObject.userObject.user.Username ? userObject.userObject.user.Username : 'does not exist');
    if ((userObject !== undefined) && 
      (userObject.userObject.user.FavoriteMovies != null) && 
      (userObject.userObject.user.FavoriteMovies.length > 0) && movies) {
      favoriteMoviesDetails = movies.movies.filter(movie => userObject.userObject.user.FavoriteMovies.includes(movie._id));
    }
    console.log('favMoviesDetails:',favoriteMoviesDetails ? favoriteMoviesDetails : 'no fav movies found');
    return favoriteMoviesDetails;
  } 

  render() {
    const { movies } = this.props;
    const { user, token, userObject } = this.state;
    console.log('render, movies', movies);
    return ( 
      <div>
        <div>
          <Navbar bg="info" variant="light"fixed="top" 
            className="sticky-navbar navbar navbar-default navbar-fixed-top">
              <Navbar.Brand href="#home">myMovies</Navbar.Brand>
              { user !== null && <Navbar.Text>
                Signed in as: {user}
              </Navbar.Text>
              }
              <Navbar.Collapse className="justify-content-end">
                { user !== null && <Link to={`/users/${user}`}>
                  <Button variant="link" 
                    type="submit"
                    className="button-profile"
                    size="sm">
                    Profile
                  </Button>
                </Link>
                }
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
              if (!user) return <LoginView onLoggedIn={this.onLoggedIn} />;
              return <MoviesList user={user}/>;
            }
          }/>
  
          <Route path="/register" render={() => <RegistrationView />} />
          <Route path="/movies/:movieId" 
            render={({match}) => <MovieView movieId={match.params.movieId}/>}/>
          <Route  exact path="/genres/:name"
            render={({ match }) => {
              if (!movies || !movies.length) return <div className="main-view"/>;
              return <GenreView genre={match.params.name}/>}
              } />
            <Route exact path="/directors/:name"
            render={({match}) => {
              if (!movies || !movies.length) return <div className="main-view"/>;
              return <DirectorView director={match.params.name}/>}
            } />
            <Route exact path="/users/:Username"
              render={({match}) => {
                if (!user) return <LoginView onLoggedIn={this.onLoggedIn} />;
                return <ProfileView profile={userObject} token={token} 
                  movies={() => this.getFavoriteMoviesDetails({userObject},{movies})}/>;
              }
            }/>
        </div>
     </Router>
     </div>
    );
  }
}

export default connect(({movies}) => ({movies}), { setMovies } )(MainView);