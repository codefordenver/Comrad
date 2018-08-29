import { SAVE_ALBUM } from '../actions/types';

export function saveAlbum(album) {
  return {
    type: SAVE_ALBUM,
    payload: album
  }
}