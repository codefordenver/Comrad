import React, {useEffect, useState, useMemo} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Link, useHistory } from "react-router-dom";

import Card, { CardBody } from '../../components/Card';
import Loading from '../../components/Loading';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { alertActions, libraryActions } from '../../redux';

const AlbumAddFromItunesPage = ({ handleSubmit }) => {

  const { loadingSearchItunes, loadingError, itunesResults } = useSelector(state => state.library);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    return () => {
      // cleanup code
      dispatch(libraryActions.clear());
    };
  }, []); 
  
  const itunesAlbumSearch = (form) => {
    dispatch(libraryActions.searchItunes(form['q']));
  };

  const importAlbum = (collectionId) => {
    dispatch(libraryActions.importFromItunes({
      collectionId: collectionId,
      callback: (result) => {
        history.push('/library/album/' + result.album_id);
        dispatch(alertActions.show('success', 'Success', 'Album has been imported'));
      }
    }));
  };

  const itunesResultsHtml = useMemo(() => {
    if (!itunesResults) return null;
    let html = itunesResults.map(r => {
      let image = null;
      let link = null;
      let titleLink = null;
      let buttonArea = null;
      if (r.is_partial_import === false) {
        link = "/library/album/" + r.local_id;
        image = <Link to={link}><img src={r.artworkUrl100} alt={r.collectionName} /></Link>;
        buttonArea = (<>
              <b>Imported</b><br />
              <Link to={"/library/album/" + r.local_id} className="button button--neutral button--normal">View Album</Link>
            </>);
      } else if (r.is_partial_import === true) {
        link = "/library/album/add-from-itunes/" + r.collectionId;
        image = <Link to={link}><img src={r.artworkUrl100} alt={r.collectionName} /></Link>;
        buttonArea = (<>
          {r.local_track_count} tracks imported so far
          <br />
          <Button color="neutral" onClick={e => importAlbum(r.collectionId)}>Import</Button>
        </>);
      } else {
        //if no value for r.is_partial_import, then this album is not imported at all
        link = "/library/album/add-from-itunes/" + r.collectionId;
        image = <Link to={link}><img src={r.artworkUrl100} alt={r.collectionName} /></Link>;
        buttonArea = (<Button color="neutral" onClick={e => importAlbum(r.collectionId)}>Import</Button>);
      }
      return (<div className="album-add-from-itunes-page__result" key={"collection-" + r.collectionId}>
        {image}
        <div>
          <Link to={link}>{r.collectionName}</Link>
          <br />
          <i>{r.artistName}</i>
          <br />
          {buttonArea}            
        </div>
      </div>)
    });
    
    return html;
  }, [itunesResults]);



  return (
    <div className="album-add-from-itunes-page">
        <Card className="mb-1">
          <CardBody>
            <h1 className="mb-0">Add New Album From Itunes</h1>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="aap__form">
            <form autocomplete="off" onSubmit={handleSubmit(itunesAlbumSearch)}>
              <Field
                className="mb-1"
                component={Input}
                label="Search"
                name="q"
                type="text"
              />
              <Button type="submit" className="ml-1">
                Submit
              </Button>
            </form>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            {loadingSearchItunes && <Loading />}
            {loadingError && (
              <div>An error occurred loading data. Please try again.</div>
            )}
            {itunesResults && <div className="album-add-from-itunes-page__results">
              {itunesResultsHtml}
            </div>}
          </CardBody>
        </Card>
      </div>
  );
}

export default reduxForm({
  form: 'albumAddFromItunes' // a unique identifier for this form
})(AlbumAddFromItunesPage)