import { albumTypes } from '../albumTypes';
import { albumAPI } from '../../../api';

export const findOne = id => async dispatch => {
  try {
    dispatch({ type: albumTypes.LOAD });

    const { data: album } = await albumAPI.findOne(id);
    const { data: tracks } = await albumAPI.findOneTracks(id);

    const doc = {
      ...album,
    };

    doc.tracks = tracks; //tracks must be included here and not in the doc object declaration above: otherwise, the tracks array gets resorted (possibly a browser bug? tested in Windows Firefox 68.0)

    dispatch({ type: albumTypes.FIND_ONE, payload: doc });
  } catch (err) {
    console.log(err);
  }
};
