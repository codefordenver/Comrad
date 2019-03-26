import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userSearch } from '../../redux/user';

class Pagination extends Component {
  static propTypes = {
    action: PropTypes.func,
    search: PropTypes.shape({
      page: PropTypes.number,
      pages: PropTypes.number,
    }),
  };

  static defaultProps = {
    action: null,
    search: {
      page: 1,
      pages: 1,
    },
  };

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
    const { action, reducer } = this.props;
    const { page } = reducer;

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
    const { page, pages, total } = props.reducer;

    return (
      <>
        {total > 0 ? (
          <div className="pagination">
            <div className="pagination__page">{page}</div>
            <div className="pagination__text">of</div>
            <div className="pagination__pages">{pages}</div>
            <div className="pagination__arrow" onClick={handleLeftClick}>
              <i className="fas fa-arrow-left" />
            </div>
            <div className="pagination__arrow" onClick={handleRightClick}>
              <i className="fas fa-arrow-right" />
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

function mapStateToProps({ search }) {
  return {
    search,
  };
}

export default connect(
  mapStateToProps,
  { userSearch },
)(Pagination);
