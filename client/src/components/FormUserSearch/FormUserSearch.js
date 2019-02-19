import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import Button from '../Button';
import Input from '../Input';

class FormUserSearch extends Component {
  submit = values => {
    console.log(values);
  };

  render() {
    const { props, submit } = this;
    const { handleSubmit } = props;

    return (
      <form onSubmit={handleSubmit(submit)}>
        <Field
          className="mb-1"
          component={Input}
          label={'Search'}
          name="search"
          type="text"
        />
        <Button type="submit">Submit</Button>
      </form>
    );
  }
}

const ReduxFormUserSearch = reduxForm({
  form: 'userSearch',
})(FormUserSearch);

function mapStateToProps(state) {
  const user = state.user;

  return {
    user,
  };
}

export default connect(
  mapStateToProps,
  {},
)(ReduxFormUserSearch);
