import React from 'react';

import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import RegistrationView from '../registration-view/registration-view';
import LoginView from  '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

export default class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      user: null
    };
  }

  // change back to 'http://my-movie-app-smb.herokuapp.com/movies' once git push to Heroku resolved
  componentDidMount() {    
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('http://localhost:3000/movies', {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // assign result to state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onMainViewClick() {
    this.setState({
      selectedMovie: null
    });
  }

  handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log("localStorage cleared");
  }

  render() {
    const {movies, user} = this.state;

    if (!movies) return (
      <div className = "main-view">
        <Navbar bg="info" variant="light">
              <Navbar.Brand href="#home">myMovies</Navbar.Brand>
              <Navbar.Text>
                Signed in as: {user}
              </Navbar.Text>
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
    )

    return (
      <div>
      <div>
      <Navbar bg="info" variant="light">
              <Navbar.Brand href="#home">myMovies</Navbar.Brand>
              <Navbar.Text>
                Signed in as: {user}
              </Navbar.Text>
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
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              return movies.map(m => <MovieCard key={m._id} movie={m}/>)
            }
          }/>
  
          <Route path="/register" render={() => <RegistrationView />} />
          <Route path="/movies/:movieId" 
            render={({match}) => 
              <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
          <Route  exact path="/genres/:name"
            render={({ match }) => {
              if (!movies || !movies.length) return <div className="main-view"/>;
              return <GenreView genre={movies.find(m => 
                m.Genre.Name === match.params.name).Genre}/>}
            } />
            <Route exact path="/directors/:name"
            render={({match}) => {
              if (!movies || !movies.length) return <div className="main-view"/>;
              return <DirectorView director={movies.find(m =>
                m.Director.Name === match.params.name).Director}/>}
            } />
            <Route exact path="/users/:Username"
              render={({match}) =>
            <ProfileView profile={user}/>}
            />

            
        </div>
     </Router>
     </div>
    );
  }
}
