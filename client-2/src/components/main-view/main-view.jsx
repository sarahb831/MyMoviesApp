import React from 'react';

import axios from 'axios';

import RegistrationView from '../registration-view/registration-view';
import LoginView from  '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import Button from 'react-bootstrap/Button';

export default class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: null,
      selectedMovieId: null,
      user: null,
      registered: true
    };
  }
// change back to 'http://my-movie-app-smb.herokuapp.com/movies' once git push to Heroku resolved
  componentDidMount() {
    window.addEventListener('hashchange', this.handleNewHash, false);

    this.handleNewHash();
    
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }

  }

  handleNewHash = () => {
    const movieId = window.location.hash.replace(/^#\/?|\/$/g, '').split('/');

    this.setState({
      selectedMovieId: movieId[0]
    });
  }

  onMovieClick(movie) {
    window.location.hash = '#' + movie._id;
    
    this.setState({
      selectedMovieId: movie._id
    });
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

  handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  render() {
    const {movies, selectedMovieId, user, registered } = this.state;

    if ((!user) && (registered)) return <LoginView 
      onLoggedIn={user => this.onLoggedIn(user)}
      onRegistrationClicked={() => this.onRegistrationClicked()} />;

   if (!registered) return <RegistrationView onRegistrationDone={user => this.onRegistrationDone(user)} />;

    // before movies have been loaded
    if (!movies || !movies.length) return (
      <div className = "main-view">
        <Button
          variant="primary"
         type="submit"
         className = "button-primary"
          onClick = {() => this.handleLogout}>
          Logout
        </Button>
      </div>
    )

    const selectedMovie = selectedMovieId ? movies.find(m=> m._id === selectedMovieId) : null;

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
        <Button
          variant="primary"
          type="submit"
          className = "button-primary"
         onClick = {() => this.handleLogout}>
          Logout
        </Button>
      </div>
     
    );
  }
}
