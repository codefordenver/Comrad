import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { requiredValidate } from '../../../utils/validation';
import { albumActions, configActions } from '../../../redux';
import Button from '../../Button';
import Input from '../../Input';
import { bindActionCreators } from 'redux';
import Checkbox from '../../Checkbox';
import CustomFieldsEdit from '../../CustomFieldsEdit';

class FormAlbumEdit extends Component {
  componentDidMount() {
    const { configActions, configState } = this.props;

    if (!('album' in configState.customFields)) {
      configActions.customFieldsForModel('album');
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
    const { handleSubmit, configState, initialValues } = props;
    const { genres } = initialValues;

    let albumCustomFields = [];
    if ('album' in configState.customFields) {
      albumCustomFields = configState.customFields.album;
    }
    let genreList = [];
    for (let i = 0; i < Object.values(genres).length; i++) {
      genreList.push(Object.values(genres)[i]);
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
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  const { name, label, compilation, _id, custom } = state.album.doc;
  const genres = state.genre.docs;
  return {
    configState: state.config,
    initialValues: {
      name: name,
      label: label,
      compilation: compilation,
      id: _id,
      custom: custom,
      genres: genres,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    albumActions: bindActionCreators({ ...albumActions }, dispatch),
    configActions: bindActionCreators({ ...configActions }, dispatch),
  };
}

const ReduxFormAlbumEdit = reduxForm({
  form: 'albumEdit',
})(FormAlbumEdit);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxFormAlbumEdit);
