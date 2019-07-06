import React from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from  '../../actions/actions';

/* function VisibilityFilterInput(props) {
    return <Form.Control
        onChange={e => this.props.setFilter(e.target.value)}
        value={this.props.visibilityFilter}
        placeholder="filter"
        />;
}
*/

const mapStateToProps = state => {
    return { currentFilter: state.visibilityFilter };
}

const VisibilityFilterInput = ({ currentFilter, setFilter }) => {
    console.log('VFI, currentFilter: ', currentFilter);
    return <Form.Control
        onChange={e => setFilter(e.target.value) }
        value = {currentFilter}
        placeholder='Movie Title Filter'
        />;

};

export default connect( mapStateToProps, { setFilter })(VisibilityFilterInput)
/* export default connect(
    ({visibilityFilter}) => ({visibilityFilter}), { setFilter }
)(VisibilityFilterInput);
*/

/*VisibilityFilterInput.propTypes = {
    setFilter: PropTypes.func.isRequired,
    visibilityFilter: PropTypes.func.isRequired
  };
  */
