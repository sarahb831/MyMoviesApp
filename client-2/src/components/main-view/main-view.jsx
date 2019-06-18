import React from 'react';

import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { setMovies } from  '../../actions/actions'; // to import relevant actions

import MoviesList from '../movies-list/movies-list';


import RegistrationView from '../registration-view/registration-view';
import LoginView from  '../login-view/login-view';
// import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

class MainView extends React.Component {

  /*
  constructor() {
    super();

    this.state = {
      user: null
    };
  }
  */

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
      // movies moved here now
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onLoggedIn(authData) {
    console.log(authData.user.Username);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  // remove?
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

    const { user } = this.state;

    if (!user) return (
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
            <LoginView onLoggedIn={this.onLoggedIn}/>
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
              return <MoviesList/>;
            }
          }/>
  
          <Route path="/register" render={() => <RegistrationView />} />
          <Route path="/movies/:id" 
            render={({match}) => <MovieView movieId={match.params.id}/>}/>
          <Route  exact path="/genres/:name"
            render={({ match }) => {
            //  if (!movies || !movies.length) return <div className="main-view"/>;
              return <GenreView genre={match.params.name}/>}
            } />
            <Route exact path="/directors/:name"
            render={({match}) => {
             // if (!movies || !movies.length) return <div className="main-view"/>;
              return <DirectorView director={match.params.name}/>}
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

export default connect(null, { setMovies } )(MainView);