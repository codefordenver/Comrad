import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userSearch } from '../../redux/user';

import Filter, { FilterItem } from '../Filter';

export const FILTER_ITEMS = [
  {
    filter: 'all',
    id: 1,
    text: 'ALL',
  },
  {
    filter: 'active',
    id: 2,
    text: 'ACTIVE',
  },
  {
    filter: 'inactive',
    id: 3,
    text: 'INACTIVE',
  },
];

class FilterUsers extends Component {
  render() {
    const { user, userSearch } = this.props;
    const { filter, query } = user.search;

    return (
      <Filter className="mb-2">
        {FILTER_ITEMS.map(item => {
          const { filter: itemFilter, id, text } = item;

          return (
            <FilterItem
              className={itemFilter === filter && 'active'}
              key={id}
              onClick={() => userSearch({ query, filter: itemFilter })}
            >
              {text}
            </FilterItem>
          );
        })}
      </Filter>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;

  return {
    user,
  };
}

export default connect(
  mapStateToProps,
  { userSearch },
)(FilterUsers);
