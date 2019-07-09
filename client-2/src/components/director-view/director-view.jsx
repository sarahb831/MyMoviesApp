import React from 'react';
import PropTypes from 'prop-types';
import { Link } from  'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './director-view.scss';

export default class DirectorView extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { director } = this.props;

    if (!director) return null;
    return (
      <Container>
        <Row>
        <Col md={3}></Col>
        <Col xs={12} sm={6}>
          <Card className = "director-view" style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className = "director-name">Director: {director.Name}</Card.Title>
              <Card.Text className = "director-bio">Biography: {director.Bio}</Card.Text>
              <Card.Text className = "director-birth">Birth: {director.Birth}</Card.Text>
              {director.Death !== "0" && 
                <Card.Text className = "director-death">Death: {director.Death}</Card.Text>}
            </Card.Body>
        
            <Card.Body>
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
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string,
    Bio: PropTypes.string
  }).isRequired
};