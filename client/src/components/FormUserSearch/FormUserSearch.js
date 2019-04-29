import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import Button from '../Button';
import Filter from '../Filter';
import Input from '../Input';

import { userSearch } from '../../redux/user';

class FormUserSearch extends Component {
  handleOnChange = (e, filter) => {
    const { q, userSearch } = this.props;

    userSearch({ filter, q });
  };

  submit = values => {
    const { userSearch } = this.props;
    userSearch(values);
  };

  render() {
    const { handleOnChange, props, submit } = this;
    const { handleSubmit } = props;

    return (
      <form className="fus mb-2" onSubmit={handleSubmit(submit)}>
        <div className="fus__field">
          <Field
            className="mb-1"
            component={Input}
            label="Search"
            name="q"
            type="text"
          />
          <Button type="submit">Search</Button>
        </div>
        <div className="fus__filter">
          <Filter
            onChange={handleOnChange}
            name="filter"
            text="All"
            value="all"
          />
          <Filter
            onChange={handleOnChange}
            name="filter"
            text="Active"
            value="active"
          />
          <Filter
            onChange={handleOnChange}
            name="filter"
            text="Inactive"
            value="inactive"
          />
        </div>
      </form>
    );
  }
}

const selector = formValueSelector('userSearch');

const ReduxFormUserSearch = reduxForm({
  form: 'userSearch',
})(FormUserSearch);

function mapStateToProps(state) {
  const { user } = state;
  const { search } = user;

  return {
    user,
    q: selector(state, 'q'),
    initialValues: { ...search },
  };
}

export default connect(
  mapStateToProps,
  { userSearch },
)(ReduxFormUserSearch);
