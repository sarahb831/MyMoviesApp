import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import './sort-column-selection.scss';

import { setSortColumn } from  '../../actions/actions';

 function SortColumnSelection(props) {
    return (
        <Form>
            <Form.Group controlId="formSort">
                <Form.Label>Sort Movies By...</Form.Label>
                <Form.Control 
                    as="select" 
                    onChange={e => props.setSortColumn(e.target.value)}
                    value={props.sortColumn}
                    placeholder="sort-column">
                    <option value="Title">Title</option>
                    <option value="Genre.Name">Genre</option>
                    <option value="Director.Name">Director</option>             
                </Form.Control>
            </Form.Group>
        </Form>
    )
}


export default connect(
    ({sortColumn}) => ({sortColumn}), { setSortColumn }
)(SortColumnSelection);




/*SortColumnSelection.propTypes = {
    setSortColumn: PropTypes.func.isRequired,
    sortColumn: PropTypes.func.isRequired
  };
  */