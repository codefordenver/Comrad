import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';

import Button from '../Button';
import Filter from '../Filter';
import Input from '../Input';

import { userActions } from '../../redux/user';

class FormUserSearch extends Component {
  handleOnChange = (e, newValue) => {
    const { q, userActions } = this.props;

    userActions.search({ status: newValue, q });
  };

  submit = values => {
    const { userActions } = this.props;
    userActions.search(values);
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
            name="status"
            text="All"
            value="all"
          />

          <Filter
            onChange={handleOnChange}
            name="status"
            text="Active"
            value="active"
          />

          <Filter
            onChange={handleOnChange}
            name="status"
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

  return {
    user,
    q: selector(state, 'q'),
    initialValues: { ...user.searchParams },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators({ ...userActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxFormUserSearch);
