import React from 'react';
import { Link } from  'react-router-dom';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss';

export default class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <div>
        <Card>
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button 
                variant="link" 
                className = "button-primary"
                block>
                Details
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string
  }).isRequired
};
