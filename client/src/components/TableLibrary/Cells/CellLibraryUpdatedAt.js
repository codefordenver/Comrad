import React from 'react';

export function CellLibraryUpdatedAt({ value }) {
  let dateObj = new Date(value);

  return (
    <div className="library-search__updated-at">
      ${dateObj.toLocaleDateString()} {dateObj.toLocaleTimeString()}
    </div>
  );
}
