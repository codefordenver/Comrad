import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import Button from '../Button';
import Filter from '../Filter';
import Input from '../Input';

class FormUserSearch extends Component {
  render() {
    const { props } = this;
    const { handleSubmit, handleUserSubmit } = props;

    return (
      <form
        className="f-user-search mb-2"
        onSubmit={handleSubmit(handleUserSubmit)}
      >
        <div className="f-user-search__field">
          <Field
            className="mb-1"
            component={Input}
            label="Search"
            name="s"
            type="text"
          />
          <Button type="submit">Search</Button>
        </div>
        <div className="f-user-search__filter">
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

function mapStateToProps(state) {
  return {
    initialValues: {
      s: '',
      filter: 'All',
    },
  };
}

export default connect(
  mapStateToProps,
  {},
)(ReduxFormUserSearch);
