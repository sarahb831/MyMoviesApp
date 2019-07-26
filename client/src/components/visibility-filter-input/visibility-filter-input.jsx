import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import './visibility-filter-input.scss';

import { setFilter } from  '../../actions/actions';

const mapStateToProps = state => {
    return { currentFilter: state.visibilityFilter };
}

const VisibilityFilterInput = ({ currentFilter, setFilter }) => {
    return <Form.Control
        onChange={e => setFilter(e.target.value) }
        value = {currentFilter}
        placeholder='Enter Filter for Movie Title Here'
        />;
};

export default connect( mapStateToProps, { setFilter })(VisibilityFilterInput)

