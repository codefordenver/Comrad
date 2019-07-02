import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { requiredValidate } from '../../../utils/validation';
import { artistActions } from '../../../redux';

import Button from '../../Button';
import Input from '../../Input';

class FormArtistAdd extends Component {
  submit = (values, dispatch, props) => {
    const { artistActions, submitCallback } = this.props;
    artistActions.add(values, submitCallback);
  };

  render() {
    const { props, submit } = this;
    const { handleSubmit } = props;

    return (
      <form className="form-artist-add" onSubmit={handleSubmit(submit)}>
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
    artistActions: bindActionCreators({ ...artistActions }, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(ReduxFormArtistAdd);
