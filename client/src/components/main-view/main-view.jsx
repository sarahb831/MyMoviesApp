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
      user: null
    };
  }
// change back to 'http://my-movie-app-smb.herokuapp.com/movies' once git to Heroku resolved
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

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onMainViewClick() {
    this.setState({
      selectedMovie: null
    });
  }

  render() {
    const {movies, selectedMovie, user } = this.state;

   if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

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
