import React from 'react';
import { capFirstLetter } from '../../../utils/capFirstLetter';

export function CellLibraryType({ value }) {
  return <div className="library-search__type">{capFirstLetter(value)}</div>;
}
