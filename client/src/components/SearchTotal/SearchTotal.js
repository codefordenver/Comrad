import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class SearchTotal extends Component {
  render() {
    const { total } = this.props.reducer;

    return (
      <Fragment>
        {total ? (
          <div className="search-total">
            <div className="search-total__text">Total:&nbsp;</div>
            <div className="search-total__number">{total}</div>
          </div>
        ) : null}
      </Fragment>
    );
  }
}

SearchTotal.propTypes = {
  search: PropTypes.shape({
    total: PropTypes.number,
  }),
};

SearchTotal.defaultProps = {
  search: {
    total: 0,
  },
};

function mapStateToProps(state) {
  return {
    search: state.search,
  };
}

export default connect(
  mapStateToProps,
  null,
)(SearchTotal);
