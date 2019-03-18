import React, { Component } from 'react';
import { connect } from 'react-redux';
import { librarySearch } from '../../redux/library';

import Filter, { FilterItem } from '../Filter';

export const FILTER_LIBRARY_ITEMS = [
  {
    id: 1,
    value: 'all',
  },
  {
    id: 2,
    value: 'album',
  },
  {
    id: 3,
    value: 'artist',
  },
  {
    id: 4,
    value: 'track',
  },
];

class FilterLibrary extends Component {
  render() {
    const { library, librarySearch } = this.props;
    const { search } = library;
    const { filter } = search;

    return (
      <Filter className="mb-2">
        {FILTER_LIBRARY_ITEMS.map(item => {
          const { id, value } = item;

          return (
            <FilterItem
              className={value === filter && 'active'}
              key={id}
              onClick={() => librarySearch({ ...search, filter: value })}
            >
              {value.toUpperCase()}
            </FilterItem>
          );
        })}
      </Filter>
    );
  }
}

function mapStateToProps(state) {
  const { library } = state;

  return {
    library,
  };
}

export default connect(
  mapStateToProps,
  { librarySearch },
)(FilterLibrary);
