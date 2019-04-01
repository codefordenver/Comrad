import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { userSearch } from '../../redux/user';

import Button from '../Button';
import Filter from '../Filter';
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
    const { props } = this;
    const { handleSubmit, handleUserSubmit } = props;

    console.log(props);

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
            name="query"
            type="text"
          />
          <Button type="submit">Search</Button>
        </div>
        <div className="f-user-search__filter">
          <Filter />
        </div>
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
