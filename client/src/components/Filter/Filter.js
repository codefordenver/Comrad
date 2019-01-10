import React from 'react';

export const Filter = props => {
  const { filterItems, handleFilterClick } = props;

  return (
    <ul className="filter__list">
      {filterItems
        ? filterItems.map(item => (
            <li key={item} className="filter__item">
              <span
                className="filter__span"
                onClick={
                  handleFilterClick ? () => handleFilterClick(item) : null
                }
              >
                {item}
              </span>
            </li>
          ))
        : null}
    </ul>
  );
};
