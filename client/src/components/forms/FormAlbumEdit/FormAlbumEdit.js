import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { requiredValidate } from '../../../utils/validation';
import { albumActions, configActions, genreActions } from '../../../redux';
import Button from '../../Button';
import Input from '../../Input';
import { bindActionCreators } from 'redux';
import Checkbox from '../../Checkbox';
import CustomFieldsEdit from '../../CustomFieldsEdit';
import Select from '../../Select';

class FormAlbumEdit extends Component {
  componentDidMount() {
    const { configActions, configState, genreActions, genreState } = this.props;

    if (!('album' in configState.customFields)) {
      configActions.customFieldsForModel('album');
    }

    if (!genreState.docs.length) {
      genreActions.findAll();
    }
  }

  submit = values => {
    const { albumActions, submitCallback } = this.props;
    return albumActions.edit(values, albumData => {
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
        <Field component={Input} label="Label" name="label" />
        <Field component={Checkbox} label="Compilation" name="compilation" />
        <CustomFieldsEdit fieldsMeta={albumCustomFields} />
        <Field
          component={Select}
          label="Genre"
          name="genre"
          selectOptions={genreState.docs}
        />
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  const { name, label, compilation, _id, custom, genre } = state.album.doc;
  return {
    configState: state.config,
    genreState: state.genre,
    initialValues: {
      name: name,
      label: label,
      compilation: compilation,
      id: _id,
      custom: custom,
      genre: genre != null ? genre._id : null,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    albumActions: bindActionCreators({ ...albumActions }, dispatch),
    configActions: bindActionCreators({ ...configActions }, dispatch),
    genreActions: bindActionCreators({ ...genreActions }, dispatch),
  };
}

const ReduxFormAlbumEdit = reduxForm({
  form: 'albumEdit',
})(FormAlbumEdit);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxFormAlbumEdit);
