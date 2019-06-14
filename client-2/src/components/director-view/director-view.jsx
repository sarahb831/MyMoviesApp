import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from  'react-router-dom';

export default class DirectorView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director } = this.props;

    if (!director) return null;


    return (
      <Card className = "director-view" style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title className = "director-name">Director: {director.Name}</Card.Title>
          <Card.Text className = "director-bio">Bio: {director.Bio}
          </Card.Text>
          <Card.Text className = "director-birth">Birth: {director.Birth}</Card.Text>
          <Card.Text className = "director-death">Death: {director.Death}</Card.Text>
        </Card.Body>
        
        <Card.Body>
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

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string,
    Bio: PropTypes.string,
    Birth: PropTypes.string,
    Death: PropTypes.string
  }).isRequired
};

