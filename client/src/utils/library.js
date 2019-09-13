export function getNextDiskAndTrackNumberForAlbum(album) {
  let maxDiskNumber = 1;
  let maxTrackNumber = 0;
  if (album.tracks != null && album.tracks.length) {
    for (var key in album.tracks) {
      if (
        album.tracks[key].disk_number >= maxDiskNumber ||
        (maxDiskNumber === 1 && album.tracks[key].disk_number === null)
      ) {
        if (album.tracks[key].disk_number > maxDiskNumber) {
          maxDiskNumber = album.tracks[key].disk_number;
          maxTrackNumber = album.tracks[key].track_number;
        } else {
          maxTrackNumber = Math.max(
            maxTrackNumber,
            album.tracks[key].track_number,
          );
        }
      }
    }
  }
  return { maxDiskNumber, maxTrackNumber };
}
