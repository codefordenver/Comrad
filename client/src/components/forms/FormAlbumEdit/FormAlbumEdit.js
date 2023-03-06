import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {
  requiredValidate,
  albumNeedsArtistOrCompilation,
} from '../../../utils/validation';
import { libraryActions, configActions, genreActions } from '../../../redux';
import Button from '../../Button';
import DropdownLibrary from '../../DropdownLibrary';
import Input from '../../Input';
import { bindActionCreators } from 'redux';
import Checkbox from '../../Checkbox';
import CustomFieldsEdit from '../../CustomFieldsEdit';
import Select from '../../Select';
import { DatePicker__React } from '../../DatePicker';

class FormAlbumEdit extends Component {
  componentWillMount() {
    const { configActions, configState, genreActions, genreState } = this.props;

    if (!('album' in configState.customFields)) {
      configActions.customFieldsForModel('album');
    }

    if (!genreState.docs.length) {
      genreActions.findAll();
    }
  }

  submit = values => {
    const { libraryActions, submitCallback } = this.props;
    return libraryActions.update(values, albumData => {
      if (typeof submitCallback === 'function') {
        submitCallback(albumData);
      }
    });
  };

  render() {
    const { props, submit } = this;
    const { handleSubmit, configState, genreState } = props;
    let albumCustomFields = [];
    if ('album' in configState.customFields) {
      albumCustomFields = configState.customFields.album;
    }

    return (
      <form
        autocomplete="off"
        className="form-album-edit"
        onSubmit={handleSubmit(data => {
          submit({
            ...data,
          });
        })}
      >
        <Field
          component={Input}
          label="Name"
          name="name"
          autoFocus
          validate={requiredValidate}
        />
        <Field
          component={DropdownLibrary}
          libraryType="artist"
          className="mb-1-5"
          label="Artist"
          name="artist"
          artist={this.props.initialValues.artist}
          validate={albumNeedsArtistOrCompilation}
        />
        <Field
          component={Checkbox}
          label="Compilation"
          name="compilation"
          validate={albumNeedsArtistOrCompilation}
        />
        <Field component={Input} label="Label" name="label" />
        <Field
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
          <Button type="submit">Submit</Button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  let artist, name, label, compilation, _id, custom, genre, release_date;
  if (state.library.doc != null) {
    ({
      artist,
      name,
      label,
      compilation,
      _id,
      custom,
      genre,
      release_date,
    } = state.library.doc);
  }
  return {
    configState: state.config,
    genreState: state.genre,
    initialValues: {
      artist: artist,
      name: name,
      label: label,
      compilation: compilation,
      id: _id,
      custom: custom,
      genre: genre != null ? genre._id : null,
      release_date: release_date ? release_date : null,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    libraryActions: bindActionCreators({ ...libraryActions }, dispatch),
    configActions: bindActionCreators({ ...configActions }, dispatch),
    genreActions: bindActionCreators({ ...genreActions }, dispatch),
  };
}

const ReduxFormAlbumEdit = reduxForm({
  form: 'albumEdit',
})(FormAlbumEdit);

export default connect(mapStateToProps, mapDispatchToProps)(ReduxFormAlbumEdit);
