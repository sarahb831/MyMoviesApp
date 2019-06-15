import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from  'react-router-dom';

export default class GenreView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre } = this.props;

    if (!genre) return null;


    return (
      <Card className = "genre-view" style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title className = "genre-name">Genre {genre.Name}</Card.Title>
          <Card.Text className = "genre-description">{genre.description}
          </Card.Text>
        </Card.Body>
        
        <Card.Body>
        <Link to={`/`}>
            <Button variant="link" className = "button-primary">
              Return to Main Menu 
            </Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string,
    Description: PropTypes.string
  }).isRequired
};

