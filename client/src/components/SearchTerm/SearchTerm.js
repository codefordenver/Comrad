import React from 'react';
import PropTypes from 'prop-types';

const SearchTerm = props => {
  const { q } = props;

  return (
    <div className="search-term">
      Search: <span className="search-term__term">{q}</span>
    </div>
  );
};

SearchTerm.propTypes = {
  q: PropTypes.string,
};

export default SearchTerm;
