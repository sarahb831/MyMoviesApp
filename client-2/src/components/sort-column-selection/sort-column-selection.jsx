import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { setFilter } from  '../../actions/actions';

function SortColumnSelector(props) {
    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Sort By
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item value="title" selected>Title</Dropdown.Item>
                    <Dropdown.Item value="Genre.Name">Genre</Dropdown.Item>
                    <Dropdown.Item value="Director.Name">Director</Dropdown.Item>
                </Dropdown.Menu>
                Form.Control
        onChange={e => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder="filter"
        />;
            </Dropdown>
        </div>
        )
}

export default connect(
    ({visibilityFilter}) => ({visibilityFilter}), { setFilter }
)(VisibilityFilterInput);

VisibilityFilterInput.propTypes = {
    setFilter: PropTypes.func.isRequired,
    visibilityFilter: PropTypes.func.isRequired
  };

export default connect(
    ({visibilityFilter}) => ({visibilityFilter}), { setFilter }
)(VisibilityFilterInput);

VisibilityFilterInput.propTypes = {
    setFilter: PropTypes.func.isRequired,
    visibilityFilter: PropTypes.func.isRequired
  };