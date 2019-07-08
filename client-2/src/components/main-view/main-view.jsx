import React from 'react';
import axios from 'axios';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { setMovies } from  '../../actions/actions'; // to import relevant actions

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

  /* keep? */
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
      // movies moved here now
      console.log('in getMovies .then()');
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
    window.location.href = 'http://localhost:3000/';
    console.log("localStorage cleared");
  }

  getMovie(movieId) {
    const { movies } = this.props;
    console.log('gMBD movies:',movies);
    let movie;
    if (movies != null)  {
    // eslint-disable-next-line
      const movie = movies.find(movie => movie._id == movieId); // note not strict equality here
  
      console.log('gMBD movie:',movie ? movie : 'no movie found');
    }  
    return movie;
  }

  render() {
    const { userObject } = this.props;
    const username = userObject.user ? userObject.user.Username : null;
   
    return ( 
      <div>
        <div>
          <Navbar bg="info" variant="light"fixed="top" 
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
          <Route path="/movies/:movieId" 
            render={({match}) => <MovieView movieId={match.params.movieId}/>}/>
          <Route  /*exact path="/genres/:name"
            render={({ match }) => {
             // if (!movies || !movies.length) return <div className="main-view"/>;
              return <GenreView genre={match.params.name}/>}
              */
              exact path="/genres/:movieId"
              render={({match}) => {
                return <GenreView movie={() => this.getMovie(match.params.movieId)}/>              }
              } />
            <Route exact path="/directors/:movieId"
            render={({match}) => {
              return <DirectorView movie={() => this.getMovie(match.params.movieId)}/>}
            } />
            <Route exact path="/users/:Username"
              render={({match}) => {
                if (!username) return <LoginView onLoggedIn={this.onLoggedIn}  setUser={this.setUser}/>;
                return <ProfileView 
                  /*movies={() => this.getFavoriteMoviesDetails()}*/
                  />;
              }
            }/>
        </div>
     </Router>
     </div>
    );
  }
}
/*MainView.propTypes = {
  setUser: PropTypes.func.isRequired
};
*/
const mapStateToProps = ({ moviesApp, userObject, movies }) => ({ moviesApp, userObject, movies });

export default connect(mapStateToProps, { setMovies } )(MainView);