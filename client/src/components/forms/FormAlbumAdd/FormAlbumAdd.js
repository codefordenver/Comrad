import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { requiredValidate } from '../../../utils/validation';
import { albumActions, genreActions } from '../../../redux';

import Button from '../../Button';
import Checkbox from '../../Checkbox';
import Input from '../../Input';
import Select from '../../Select';

class FormAlbumAdd extends Component {
  componentDidMount() {
    const { genreActions, genreState } = this.props;

    if (!genreState.docs.length) {
      genreActions.findAll();
    }
  }

  submit = values => {
    const { albumActions, submitCallback } = this.props;
    albumActions.add(values, albumData => {
      if (typeof submitCallback === 'function') {
        submitCallback(albumData);
      }
    });
  };

  render() {
    const { props, submit } = this;
    const { handleSubmit, genreState } = props;

    return (
      <form className="form-album-add" onSubmit={handleSubmit(submit)}>
        <Field
          className="mb-3"
          component={Input}
          label="Name"
          name="name"
          autoFocus
          validate={requiredValidate}
        />
        <Field className="mb-3" component={Input} label="Label" name="label" />
        <Field
          className="mb-3"
          component={Select}
          label="Genre"
          name="genre"
          selectOptions={genreState.docs}
        />
        <Field
          className="mb-3"
          component={Checkbox}
          label="Compilation"
          name="compilation"
        />
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    );
  }
}

const ReduxFormAlbumAdd = reduxForm({
  form: 'albumAdd',
})(FormAlbumAdd);

function mapStateToProps(state) {
  return {
    genreState: state.genre,
    initialValues: {
      artist: state.artist.doc._id,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    albumActions: bindActionCreators({ ...albumActions }, dispatch),
    genreActions: bindActionCreators({ ...genreActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxFormAlbumAdd);
