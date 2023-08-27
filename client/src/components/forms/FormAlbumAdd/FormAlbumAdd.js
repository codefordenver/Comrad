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
import { DatePicker__React } from '../../DatePicker';

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
    const { libraryActions, submitCallback, showBuilderModal = false } = this.props;
    if (typeof values.artist == 'object' && values.artist.new) {
      libraryActions.add('artist', {"name": values.artist.new}, artistData => {
        libraryActions.add('album', {...values, artist: artistData._id, 'fromShowBuilderModal': showBuilderModal}, albumData => {
          if (typeof submitCallback === 'function') {
            submitCallback(albumData);
          }
        });
      });
    } else {
      libraryActions.add('album', {...values, 'fromShowBuilderModal': showBuilderModal}, albumData => {
        if (typeof submitCallback === 'function') {
          submitCallback(albumData);
        }
      });
    }
  };

  render() {
    const { props, submit } = this;
    const { albumCustomFields, artist, handleSubmit, configState, genreState, showBuilderModal = false } = props;

    return (
      <form className="form-album-add" onSubmit={handleSubmit(submit)} autoComplete="off">
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
          allowNewEntries={true}
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
        <Field
          className="mb-1-5"
          component={DatePicker__React}
          label="Release Date"
          name="release_date"
          validate={[requiredValidate]}
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
  enableReinitialize: true, // allow reinitializing, since Initial values wil change after album custom fields loads
})(FormAlbumAdd);

function mapStateToProps(state, ownProps) {

  let { showBuilderModal } = ownProps;

  let configState = state.config;
  let albumCustomFields = [];
  var initialValues = {
    artist: state.library.doc != null ? state.library.doc._id : null,
  };
  if (!showBuilderModal) {
    initialValues['custom.in_kgnu_library'] = true;
  }
  if ('album' in configState.customFields) {
    albumCustomFields = configState.customFields.album;
    if (showBuilderModal) {
      albumCustomFields = albumCustomFields.filter(acf => !acf.excludeFromShowBuilderModal);
      albumCustomFields.forEach(acf => {
        if (acf.showBuilderModalBehavior) {
          for (let k in acf.showBuilderModalBehavior) {
            acf[k] = acf.showBuilderModalBehavior[k];
          };
        }
      });
    }

    albumCustomFields.forEach(acf => {
      if (acf.defaultValue) {
        initialValues['custom.' + acf.name] = acf.defaultValue;
      }
    });
  }

  return {
    albumCustomFields: albumCustomFields,
    configState: configState,
    genreState: state.genre,
    "initialValues": initialValues,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    configActions: bindActionCreators({ ...configActions }, dispatch),
    libraryActions: bindActionCreators({ ...libraryActions }, dispatch),
    genreActions: bindActionCreators({ ...genreActions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxFormAlbumAdd);
