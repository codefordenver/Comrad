import React from 'react';
import { capFirstLetter } from '../../../utils/capFirstLetter';

export function CellLibraryTrack({ original: { album, artists }, value }) {
  if (!value) {
    return null;
  }

  function getArtists(artists) {
    let artistNames = artists.filter(artist => artist.name);

    if (artistNames) {
      return (
        <span className="table-library__type-artists">
          &nbsp;by{' '}
          {artistNames.length > 0 ? artistNames.join(', ') : artistNames[0]}
        </span>
      );
    }

    return null;
  }

  function getAlbum(album) {
    if (album) {
      return (
        <span className="table-library__type-album">
          &nbsp;(from the album: {album})
        </span>
      );
    }

    return null;
  }

  return (
    <div className="table-library__name">
      ${capFirstLetter(value)}${getArtists(artists)}${getAlbum(album)}
    </div>
  );
}
