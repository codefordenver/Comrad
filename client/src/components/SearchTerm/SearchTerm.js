import React, { Fragment } from 'react';

const SearchTerm = props => {
  const { q } = props.reducers;

  return (
    <Fragment>
      {q ? (
        <div className="search-term">
          <div className="search-term__text">
            Search: "<span className="search-term__term">{q}"</span>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default SearchTerm;
