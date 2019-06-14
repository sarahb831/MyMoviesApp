// client\src\components\movie-view\movie-view.jsx

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from  'react-router-dom';

export default class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;


    return (
      <Card className = "movie-view" style={{ width: '18rem' }}>
        <Card.Img variant="top" src={movie.ImagePath} className = "movie-poster" />
        <Card.Body>
          <Card.Title className = "movie-title">{movie.Title}</Card.Title>
          <Card.Text className = "movie-description">Description: {movie.Description}
          </Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Text className = "movie-genre">{movie.Genre.Name}</Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Text className = "movie-director">{movie.Director.Name}</Card.Text>
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
          <Button 
            onClick={() => onClick()} 
            variant="link"
            className = "button-primary">
            Return to Main Menu 
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

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
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

