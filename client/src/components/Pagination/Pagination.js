import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { usersSearch } from '../../actions';

class Pagination extends Component {
  handleRightClick = () => {
    const { action, reducer } = this.props;
    const { page, pages } = reducer;

    if (page < pages && action) {
      action(
        {},
        {
          page: page + 1,
        },
      );
    }
  };

  handleLeftClick = () => {
    const { action, search } = this.props;
    const { page } = search;

    if (page > 1 && action) {
      action(
        {},
        {
          page: page - 1,
        },
      );
    }
  };

  render() {
    const { handleLeftClick, handleRightClick, props } = this;
    const { page, pages } = props.reducer;

    console.log(props);

    return (
      <Fragment>
        {pages ? (
          <div className="pagination">
            <div className="pagination__page">{page || 1}</div>
            <div className="pagination__text">of</div>
            <div className="pagination__pages">{pages || 1}</div>
            <div className="pagination__arrow" onClick={handleLeftClick}>
              <i className="fas fa-arrow-left" />
            </div>
            <div className="pagination__arrow" onClick={handleRightClick}>
              <i className="fas fa-arrow-right" />
            </div>
          </div>
        ) : null}
      </Fragment>
    );
  }
}

Pagination.propTypes = {
  action: PropTypes.func,
  search: PropTypes.shape({
    page: PropTypes.number,
    pages: PropTypes.number,
  }),
};

Pagination.defaultProps = {
  action: null,
  search: {
    page: 1,
    pages: 1,
  },
};

function mapStateToProps(state) {
  return {
    search: state.search,
  };
}

export default connect(
  mapStateToProps,
  { usersSearch },
)(Pagination);
