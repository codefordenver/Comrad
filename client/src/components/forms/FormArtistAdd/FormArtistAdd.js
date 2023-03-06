import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { requiredValidate } from '../../../utils/validation';
import { libraryActions } from '../../../redux';

import Button from '../../Button';
import Input from '../../Input';

class FormArtistAdd extends Component {
  submit = (values, dispatch, props) => {
    const { libraryActions, submitCallback } = this.props;
    libraryActions.add('artist', values, submitCallback);
  };

  render() {
    const { props, submit } = this;
    const { handleSubmit } = props;

    return (
      <form className="form-artist-add" onSubmit={handleSubmit(submit)} autocomplete="off">
        <Field
          component={Input}
          label="Name"
          name="name"
          autoFocus
          validate={requiredValidate}
        />
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    );
  }
}

const ReduxFormArtistAdd = reduxForm({
  form: 'artistAdd',
})(FormArtistAdd);

function mapDispatchToProps(dispatch) {
  return {
    libraryActions: bindActionCreators({ ...libraryActions }, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(ReduxFormArtistAdd);
