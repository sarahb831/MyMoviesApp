import React from 'react';

import axios from 'axios';

import RegistrationView from '../registration-view/registration-view';
import LoginView from  '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

export default class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      registered: true
    };
  }
// change back to 'http://my-movie-app-smb.herokuapp.com/movies' once git push to Heroku resolved
  componentDidMount() {
    axios.get('http://localhost:3000/movies')
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  getMovies(token) {
    axios.get('http://localhost:3000/movies', {
      headers: { Authorization: `Bearer ${token}`}
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

  onRegistrationClicked() {
    this.setState({
      registered: false
    });
  }
  
  onRegistrationDone(user) {
    this.setState({
      registered: true,
      user
    });
  }

  onMainViewClick() {
    this.setState({
      selectedMovie: null
    });
  }

  render() {
    const {movies, selectedMovie, user, registered } = this.state;

    if ((!user) && (registered)) return <LoginView 
      onLoggedIn={user => this.onLoggedIn(user)}
      onRegistrationClicked={() => this.onRegistrationClicked()} />;

   if (!registered) return <RegistrationView onRegistrationDone={user => this.onRegistrationDone(user)} />;

    // before movies have been loaded
    if (!movies) return <div className = "main-view"/>;

    return (
      <div className = "main-view">
      {/* if there is a selectedMovie, assign it to the MovieView movie,
       else onClick assign the selectedMovie to movie */}
      {selectedMovie
        ? <MovieView
            movie={selectedMovie}
            onClick = {button => this.onMainViewClick()}/>
        : movies.map(movie => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onClick={movie => this.onMovieClick(movie)}/>
        ))
      }
      </div>
    );
  }
}
