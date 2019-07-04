// client\src\components\movie-view\movie-view.jsx

import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from  'react-router-dom';

function MovieView(props) {
  const { movies, movieId } = props;

  if (!movies || !movies.length) return null;

  // eslint-disable-next-line
  const movie = movies.find(movie => movie._id == movieId); // note not strict equality here

  return (
      <Card className = "movie-view" style={{ width: '18rem' }}>
        <Card.Img variant="top" src={movie.ImagePath} className = "movie-poster" />
        <Card.Body>
          <Card.Title className = "movie-title">{movie.Title}</Card.Title>
          <Card.Text className = "movie-description">Description: {movie.Description}
          </Card.Text>
        </Card.Body>
        
        <Card.Body>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link" className="button-primary">
              Director
            </Button>
          </Link>
          <Link to={`genres/${movie.Genre.Name}`}>
            <Button variant="link" className="button-primary">
              Genre
            </Button>
          </Link>
          <Link to={`/`}>
            <Button variant="link" className = "button-primary">
              Return to Main Menu 
            </Button>
          </Link>
        </Card.Body>
      </Card>
    );
}

/*
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string
    }).isRequired,
  }).isRequired
};
*/

export default connect(({movies}) => ({movies}))(MovieView);
// transmits movies array without changes

