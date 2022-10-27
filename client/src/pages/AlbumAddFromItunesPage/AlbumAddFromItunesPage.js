import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Link } from "react-router-dom";

import Card, { CardBody } from '../../components/Card';
import Loading from '../../components/Loading';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { libraryActions } from '../../redux';

const AlbumAddFromItunesPage = ({ handleSubmit }) => {

  const { loadingSearchItunes, loadingError, itunesResults } = useSelector(state => state.library);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      // cleanup code
      dispatch(libraryActions.clear());
    };
  }, []); 
  
  const itunesAlbumSearch = (form) => {
    dispatch(libraryActions.searchItunes(form['q']));
  }



  return (
    <div className="album-add-from-itunes-page">
        <Card className="mb-1">
          <CardBody>
            <h1 className="mb-0">Add New Album From Itunes</h1>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="aap__form">
            <form onSubmit={handleSubmit(itunesAlbumSearch)}>
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
              {itunesResults.map(r => <div className="album-add-from-itunes-page__result" key={"collection-" + r.collectionId}>
                <Link to={"/library/album/add-from-itunes/" + r.collectionId}><img src={r.artworkUrl100} alt={r.collectionName} /></Link>
                <div>
                  <Link to={"/library/album/add-from-itunes/" + r.collectionId}>{r.collectionName}</Link>
                  <br />
                  <i>{r.artistName}</i>
                  <br />
                  <Button color="neutral">Import</Button>
                </div>
              </div>)}
            </div>}
          </CardBody>
        </Card>
      </div>
  );
}

export default reduxForm({
  form: 'albumAddFromItunes' // a unique identifier for this form
})(AlbumAddFromItunesPage)