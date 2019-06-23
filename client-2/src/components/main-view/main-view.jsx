import React from 'react';

import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

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

  /* keep? */
  constructor() {
    super();

    this.onLoggedIn = this.onLoggedIn.bind(this);

    this.state = {
      user: null,
      userObject: {}
    };
  }
  

  // change back to 'http://my-movie-app-smb.herokuapp.com/movies' once git push to Heroku resolved
  componentDidMount() {    
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
        userObject: localStorage.getItem('userObject')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('http://my-movie-app-smb.herokuapp.com/movies', {
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
      userObject: authData.user
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    localStorage.setItem('userObject', authData.user);
    this.getMovies(authData.token);
    console.log('calling window.open');
    window.open('/');
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
    localStorage.removeItem('userObject');
    console.log("localStorage cleared");
  }

  render() {

    const { user, userObject } = this.state;
if (user) {
  console.log("user not null: ",user);
}
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
              <Link to={`/users/:${user.Username}`}>
                  <Button variant="link" className="button-primary">
                    Profile
                  </Button>
                </Link>
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
              render={() =>
            <ProfileView profile={userObject}/>}
            />

            
        </div>
     </Router>
     </div>
    );
  }
}

export default connect(null, { setMovies } )(MainView);