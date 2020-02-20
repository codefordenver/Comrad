import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import {
  albumNeedsArtistOrCompilation,
  requiredValidate,
} from '../../../utils/validation';
import { configActions, genreActions, libraryActions } from '../../../redux';

import Button from '../../Button';
import Checkbox from '../../Checkbox';
import CustomFieldsEdit from '../../CustomFieldsEdit';
import DropdownLibrary from '../../DropdownLibrary';
import Input from '../../Input';
import Select from '../../Select';

class FormAlbumAdd extends Component {
  componentWillMount() {
    const { configState, configActions, genreActions, genreState } = this.props;

    if (!('album' in configState.customFields)) {
      configActions.customFieldsForModel('album');
    }

    if (!Object.keys(genreState.docs).length) {
      genreActions.findAll();
    }
  }

  submit = values => {
    const { libraryActions, submitCallback } = this.props;
    libraryActions.add('album', values, albumData => {
      if (typeof submitCallback === 'function') {
        submitCallback(albumData);
      }
    });
  };

  render() {
    const { props, submit } = this;
    const { artist, handleSubmit, configState, genreState } = props;

    let albumCustomFields = [];
    if ('album' in configState.customFields) {
      albumCustomFields = configState.customFields.album;
    }

    return (
      <form className="form-album-add" onSubmit={handleSubmit(submit)}>
        <Field
          component={Input}
          className="mb-1-5"
          label="Name"
          name="name"
          autoFocus={artist != null ? true : false}
          validate={requiredValidate}
        />
        <Field
          component={DropdownLibrary}
          libraryType="artist"
          className="mb-1-5"
          label="Artist"
          name="artist"
          artist={artist}
          autoFocus={artist == null ? true : false}
          validate={albumNeedsArtistOrCompilation}
        />
        <Field
          component={Checkbox}
          className="mb-1-5"
          label="Compilation"
          name="compilation"
          validate={albumNeedsArtistOrCompilation}
        />
        <Field
          component={Input}
          className="mb-1-5"
          label="Label"
          name="label"
        />
        <Field
          className="mb-1-5"
          component={Select}
          label="Genre"
          name="genre"
          selectOptions={genreState.docs}
        />
        <CustomFieldsEdit fieldsMeta={albumCustomFields} />
        <div>
          <Button type="submit" className="mr-1">
            Submit
          </Button>
          {this.props.additionalButton != null && this.props.additionalButton}
        </div>
      </form>
    );
  }
}

const ReduxFormAlbumAdd = reduxForm({
  form: 'albumAdd',
})(FormAlbumAdd);

function mapStateToProps(state) {
  return {
    configState: state.config,
    genreState: state.genre,
    initialValues: {
      artist: state.library.doc != null ? state.library.doc._id : null,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    configActions: bindActionCreators({ ...configActions }, dispatch),
    libraryActions: bindActionCreators({ ...libraryActions }, dispatch),
    genreActions: bindActionCreators({ ...genreActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxFormAlbumAdd);
