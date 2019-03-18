import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { librarySearch } from '../../redux/library';

import Button from '../Button';
import Input from '../Input';

class FormLibrarySearch extends Component {
  submit = values => {
    const { librarySearch, library } = this.props;
    const { search } = library;

    librarySearch({ ...search, query: values.query });
  };

  render() {
    const { props, submit } = this;
    const { handleSubmit } = props;

    return (
      <form
        className="library-search-form mb-1"
        onSubmit={handleSubmit(submit)}
      >
        <Field component={Input} label="Search" name="query" type="text" />
        <Button type="submit">Search</Button>
      </form>
    );
  }
}

const ReduxFormLibrarySearch = reduxForm({
  form: 'librarySearch',
})(FormLibrarySearch);

function mapStateToProps(state) {
  const library = state.library;

  return {
    library,
  };
}

export default connect(
  mapStateToProps,
  { librarySearch },
)(ReduxFormLibrarySearch);
