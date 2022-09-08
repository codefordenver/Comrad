import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Field, reduxForm } from 'redux-form';

import Card, { CardBody } from '../../components/Card';
import Loading from '../../components/Loading';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { libraryActions } from '../../redux';

const AlbumAddFromItunesPage = ({ handleSubmit }) => {

  const dispatch = useDispatch();
  
  const itunesAlbumSearch = (form) => {
    dispatch(libraryActions.search(form.q));
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
      </div>
  );
}

export default reduxForm({
  form: 'albumAddFromItunes' // a unique identifier for this form
})(AlbumAddFromItunesPage)