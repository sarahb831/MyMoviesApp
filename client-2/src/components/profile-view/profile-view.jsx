import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from  'react-router-dom';

export default class ProfileView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { user } = this.props;

    return (
      <Card className = "profile-view" style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title className = "profile-username">Username: {user.Username}
          </Card.Title>
          <Card.Text className = "profile-password">Password: {user.Password}
          </Card.Text>
          <Card.Text className = "profile-email">Email: {user.Email}
          </Card.Text>
          <Card.Text className = "profile-birthday">Birthday: {user.Birthday}
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

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string,
    Password: PropTypes.string,
    Email: PropTypes.string
  }).isRequired
};