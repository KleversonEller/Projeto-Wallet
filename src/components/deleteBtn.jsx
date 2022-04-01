import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteEvent } from '../actions';

class Delete extends React.Component {
  constructor() {
    super();
    this.deleteClick = this.deleteClick.bind(this);
  }

  deleteClick(event) {
    const { eventDelete } = this.props;
    eventDelete(event.target.name);
  }

  render() {
    const { id } = this.props;
    return (
      <button
        data-testid="delete-btn"
        onClick={ this.deleteClick }
        name={ id }
        type="button"
      >
        X
      </button>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  eventDelete: (id) => dispatch(deleteEvent(id)),
});

Delete.propTypes = {
  id: PropTypes.string,
  eventDelete: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Delete);
