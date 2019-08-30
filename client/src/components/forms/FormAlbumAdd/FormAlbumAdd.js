import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { requiredValidate } from '../../../utils/validation';
import { configActions, genreActions, libraryActions } from '../../../redux';

import Button from '../../Button';
import Checkbox from '../../Checkbox';
import CustomFieldsEdit from '../../CustomFieldsEdit';
import Input from '../../Input';
import Select from '../../Select';

class FormAlbumAdd extends Component {
  componentDidMount() {
    const { configState, configActions, genreActions, genreState } = this.props;

    if (!('album' in configState.customFields)) {
      configActions.customFieldsForModel('album');
    }

    if (!genreState.docs.length) {
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
    const { handleSubmit, configState, genreState } = props;

    let albumCustomFields = [];
    if ('album' in configState.customFields) {
      albumCustomFields = configState.customFields.album;
    }

    return (
      <form className="form-album-add" onSubmit={handleSubmit(submit)}>
        <Field
          className="mb-3"
          component={Input}
          label="Name"
          name="name"
          autoFocus
          validate={requiredValidate}
        />
        <Field component={Input} label="Label" name="label" />
        <Field component={Checkbox} label="Compilation" name="compilation" />
        <Field
          className="mb-3"
          component={Select}
          label="Genre"
          name="genre"
          selectOptions={genreState.docs}
        />
        <CustomFieldsEdit fieldsMeta={albumCustomFields} />
        <div>
          <Button type="submit">Submit</Button>
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
      artist: state.library.doc._id,
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
