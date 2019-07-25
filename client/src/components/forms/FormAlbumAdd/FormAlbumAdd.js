import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { requiredValidate } from '../../../utils/validation';
import { albumActions } from '../../../redux';

import Button from '../../Button';
import Checkbox from '../../Checkbox';
import Input from '../../Input';

class FormAlbumAdd extends Component {
  submit = values => {
    const { albumActions, submitCallback } = this.props;
    albumActions.add(values, albumData => {
      if (typeof submitCallback === 'function') {
        submitCallback(albumData);
      }
    });
  };

  render() {
    const { props, submit } = this;
    const { handleSubmit } = props;

    return (
      <form className="form-album-add" onSubmit={handleSubmit(submit)}>
        <Field
          component={Input}
          label="Name"
          name="name"
          autoFocus
          validate={requiredValidate}
        />
        <Field component={Input} label="Label" name="label" />
        <Field component={Checkbox} label="Compilation" name="compilation" />
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
    initialValues: {
      artist: state.artist.doc._id,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    albumActions: bindActionCreators({ ...albumActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxFormAlbumAdd);
