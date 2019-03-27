import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { artistFindOne, artistUpdate } from '../../redux/artist';

import Input from '../Input';

class FormArtistUpdate extends Component {
  componentDidMount() {
    const { artist, artistFindOne, match } = this.props;
    const { _id } = artist.doc;
    const { id } = match.params;

    if (id !== _id) {
      artistFindOne(id);
    }
  }

  submit = values => {
    const { artistUpdate } = this.props;

    artistUpdate(values, () => {
      const { match } = this.props;
      const { url } = match;

      window.location.href = url;
    });
  };

  render() {
    const { props, submit } = this;
    const { artist, children, handleSubmit } = props;
    const { loading } = artist;

    const childrenWithProps = React.Children.map(children, child => {
      return React.cloneElement(child, { loading });
    });

    return (
      <form onSubmit={handleSubmit(submit)}>
        <Field
          className="mb-2"
          component={Input}
          label="Name"
          name="name"
          type="text"
          autoFocus
          onBlur={handleSubmit(submit)}
        />
        {childrenWithProps}
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
