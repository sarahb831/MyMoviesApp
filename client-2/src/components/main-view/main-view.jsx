import React from 'react';

import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';

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
      user: null,
      registered: true
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
    const {movies, user, registered } = this.state;

    if ((!user) && (registered)) return <LoginView 
      onLoggedIn={user => this.onLoggedIn(user)}
      onRegistrationClicked={() => this.onRegistrationClicked()} />;

   if (!registered) return <RegistrationView onRegistrationDone={user => this.onRegistrationDone(user)} />;

   if (!movies) return (
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

    return (
      <Router>
        <div className = "main-view">
          <Route exact path="/" 
            render={() => movies.map(m => 
              <MovieCard key={m._id} movie={m}/>)}/>
          <Route path="/movies/:movieId" 
            render={({match}) => 
              <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
      
          <Button
           variant="primary"
           type="submit"
           className = "button-primary"
           onClick = {() => this.handleLogout}>
           Logout
          </Button>
        </div>
     </Router>
    );
  }
}
