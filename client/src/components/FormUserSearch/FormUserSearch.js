import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import Button from '../Button';
import Filter from '../Filter';
import Input from '../Input';

import { userSearch } from '../../redux/user';

class FormUserSearch extends Component {
  submit = values => {
    const { userSearch } = this.props;

    userSearch(values);
  };

  render() {
    const { props, submit } = this;
    const { handleSubmit } = props;

    return (
      <form className="fus mb-2" onSubmit={handleSubmit(submit)}>
        <div className="fus__field">
          <Field
            className="mb-1"
            component={Input}
            label="Search"
            name="s"
            type="text"
          />
          <Button type="submit">Search</Button>
        </div>
        <div className="fus__filter">
          <Filter name="filter" text="All" value="All" />
          <Filter name="filter" text="Active" value="Active" />
          <Filter name="filter" text="Inactive" value="Inactive" />
        </div>
      </form>
    );
  }
}

const ReduxFormUserSearch = reduxForm({
  form: 'userSearch',
})(FormUserSearch);

function mapStateToProps({ user }) {
  const { search } = user;

  return {
    user,
    initialValues: { ...search },
  };
}

export default connect(
  mapStateToProps,
  { userSearch },
)(ReduxFormUserSearch);
