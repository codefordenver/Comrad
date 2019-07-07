import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { requiredValidate } from '../../../utils/validation';
import { albumActions } from '../../../redux';

import Button from '../../Button';
import Input from '../../Input';
import Checkbox from '../../Checkbox';

class FormAlbumAdd extends Component {
  submit = values => {
    const { albumActions, history } = this.props;
    return albumActions.add(values, albumData => {
      albumActions.clear();
      history.push(`/library/artist/${albumData.artist}`);
    });
  };

  render() {
    const { props, submit } = this;
    const { handleSubmit } = props;

    return (
      <form
        className="form-album-add"
        onSubmit={handleSubmit(data => {
          submit({
            ...data,
          });
        })}
      >
        <Field
          component={Input}
          label="Name"
          name="name"
          autoFocus
          validate={requiredValidate}
        />
        <Field
          component={Input}
          label="Label"
          name="label"
          autoFocus
          validate={requiredValidate}
        />
        <Field component={Checkbox} name="compilation" label="Compilation" />
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
    initialValues: {
      artist: state.artist.doc._id,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    albumActions: bindActionCreators({ ...albumActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxFormAlbumAdd);
