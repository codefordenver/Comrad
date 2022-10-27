import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Link, useParams } from "react-router-dom";

import Card, { CardBody } from '../../components/Card';
import Loading from '../../components/Loading';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { libraryActions } from '../../redux';

const AlbumItunesViewPage = ({ handleSubmit }) => {

  const { loading } = useSelector(state => state.library);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(libraryActions.findItunes(id));

    return () => {
      // cleanup code
      dispatch(libraryActions.clear());
    };
  }, []); 


  return (
    <div className="album-itunes-view-page">
        
      </div>
  );
}

export default AlbumItunesViewPage;