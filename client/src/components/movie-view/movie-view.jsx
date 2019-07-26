// client\src\components\movie-view\movie-view.jsx

import React from 'react';
import { connect } from 'react-redux';
import { Link } from  'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MovieView(props) {
  const { movies, movieId } = props;

  if (!movies || !movies.length) return null;
  // eslint-disable-next-line
  const movie = movies.find(movie => movie._id == movieId); // note not strict equality here
  if (!movie) return null;
  return (
    <Container>
      <Row>
        <Col md={3}></Col>
        <Col xs={12} sm={6}>
          <Card className = "movie-view" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={movie.ImagePath} className = "movie-poster" />
            <Card.Body>
              <Card.Title className = "movie-title">{movie.Title}</Card.Title>
              <Card.Text className = "movie-description">Description: {movie.Description}
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="link" className="button-primary" block>
                  Director
                </Button>
              </Link>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="link" className="button-secondary" block>
                  Genre
                </Button>
              </Link>
              <Link to={`/`}>
                <Button variant="link" className = "button-primary" block>
                  Return to Main Menu 
                </Button>
              </Link> 
            </Card.Body>
          </Card>
        </Col>
        <Col>
        </Col>
      </Row>
    </Container>
    );
}

export default connect(({movies}) => ({movies}))(MovieView);
// transmits movies array without changes

