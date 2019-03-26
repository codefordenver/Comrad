import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { artistFindOne, artistUpdate } from '../../redux/artist';

import Alert from '../Alert';
import Button from '../Button';
import Input from '../Input';

class FormArtistUpdate extends Component {
  componentDidMount() {
    const { artistFindOne, match } = this.props;
    const { id } = match.params;

    artistFindOne(id);
  }

  submit = values => {
    const { artistUpdate } = this.props;

    artistUpdate(values);
  };

  render() {
    const { props, submit } = this;
    const { children, handleSubmit } = props;

    return (
      <form onSubmit={handleSubmit(submit)}>
        <Field
          className="mb-2"
          component={Input}
          label="Name"
          name="name"
          type="text"
        />
        {children}
      </form>
    );
  }
}

const ReduxFormArtistUpdate = reduxForm({
  form: 'artistUpdate',
  enableReinitialize: true,
})(FormArtistUpdate);

function mapStateToProps({ artist }) {
  return {
    artist,
    initialValues: {
      ...artist.doc,
    },
  };
}

export default connect(
  mapStateToProps,
  { artistFindOne, artistUpdate },
)(ReduxFormArtistUpdate);
