import React, {useEffect, useState, useMemo} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Link, useParams, useHistory } from "react-router-dom";
import { isEmpty } from 'lodash';

import Card, { CardBody } from '../../components/Card';
import Loading from '../../components/Loading';
import Input from '../../components/Input';
import Button from '../../components/Button';
import TableAlbumTracks from '../../components/tables/TableAlbumTracks';

import { libraryActions, alertActions } from '../../redux';

const AlbumItunesViewPage = ({ handleSubmit }) => {
  const auth = useSelector(state => state.auth);
  const { loading, itunesResult } = useSelector(state => state.library);

  const { id } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(libraryActions.findItunes(id));

    return () => {
      // cleanup code
      dispatch(libraryActions.clear());
    };
  }, []); 

  const tracksFromItunesData = useMemo(() => {
    if (itunesResult) {
      return itunesResult.tracks.map(t => {
        return {
          disk_number: t.diskNumber,
          track_number: t.trackNumber, 
          name: t.name,
          duration_in_seconds: t.duration,
          imported: (
            itunesResult.localAlbum &&
            itunesResult.localAlbum.tracks.find(localTrack => localTrack.name.toLowerCase() == t.name.toLowerCase())
            ? true: false
            )
        };
      });
    } else {
      return [];
    }
  }, [itunesResult]);

  const importAlbum = (collectionId) => {
    dispatch(libraryActions.importFromItunes({
      collectionId: collectionId,
      callback: (result) => {
        history.push('/library/album/' + result.album_id);
        dispatch(alertActions.show('success', 'Success', 'Album has been imported'));
      }
    }));
  };


  return (
    <div className="album-view-page album-view-page--itunes">
        {loading && <Loading />}
        {!loading && itunesResult && (
          <>
            <Card>
              <CardBody>
                <div className="album-view-page__header">
                  <div className="album-view-page__song">
                    <h5>Album</h5>
                    <h1 className="album-view-page__song-name">{itunesResult.album.title}</h1>
                    <h5 className="album-view-page__song-artist">
                      {itunesResult.album.artist ? (
                        <>
                          by{' '}
                          
                            {itunesResult.album.artist}
                        </>
                      ) : (
                        'No Artist'
                      )}
                    </h5>
                    {!!itunesResult.album.copyright && <span>&nbsp; {itunesResult.album.copyright}</span>}
                    {!!itunesResult.album.genre && <span>&nbsp;| {itunesResult.album.genre}</span>}
                    {!!itunesResult.album.compilation && <span>&nbsp;| Compilation</span>}
                  </div>
                  <div></div>
                  {auth.doc.roles != null &&
                    (auth.doc.roles.indexOf('Admin') !== -1 ||
                      auth.doc.roles.indexOf('Full Access') !== -1 ||
                      auth.doc.roles.indexOf('Music Library Admin') !== -1) && (
                      <Button
                        className="edit-album-button mt-1"
                        onClick={e => importAlbum(id)}
                      >
                        Import Album
                      </Button>
                    )}
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="tracks-header mb-1">
                  <h2>Tracks</h2>
                </div>
                {isEmpty(tracksFromItunesData) ? (
                  <LargeText align="left">No Tracks</LargeText>
                ) : (
                  <TableAlbumTracks
                    tracks={tracksFromItunesData}
                  />
                )}
              </CardBody>
            </Card>
          </>
          )}
      </div>
  );
}

export default AlbumItunesViewPage;