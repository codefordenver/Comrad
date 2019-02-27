import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { userSearch } from '../../redux/user';

import Button from '../Button';
import Input from '../Input';

class FormUserSearch extends Component {
  submit = values => {
    const {
      userSearch,
      user: {
        search: { filter },
      },
    } = this.props;

    userSearch({ ...values, filter });
  };

  render() {
    const { props, submit } = this;
    const { handleSubmit } = props;

    return (
      <form className="user-search-form mb-2" onSubmit={handleSubmit(submit)}>
        <Field
          className="mb-1"
          component={Input}
          label="Search"
          name="query"
          type="text"
        />
        <Button type="submit">Search</Button>
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
  { userSearch },
)(ReduxFormUserSearch);
