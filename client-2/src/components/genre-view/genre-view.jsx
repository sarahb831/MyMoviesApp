import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from  'react-router-dom';

import './genre-view.scss';

export default class GenreView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre } = this.props;

    if (!genre) return null;


    return (
      <Container>
      <Row>
        <Col></Col>
        <Col xs={12} md={8}>
          <Card className = "genre-view" style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title className = "genre-name">Genre: {genre.Name}</Card.Title>
          <Card.Text className = "genre-description">{genre.Description}
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
      </Col>
        <Col>
        </Col>
      </Row>
    </Container>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string,
    Description: PropTypes.string
  }).isRequired
};

