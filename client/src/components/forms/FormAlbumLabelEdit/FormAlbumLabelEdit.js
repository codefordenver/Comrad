import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { requiredValidate } from '../../../utils/validation';
import { libraryActions } from '../../../redux';
import Button from '../../Button';
import Input from '../../Input';
import { bindActionCreators } from 'redux';

class FormAlbumLabelEdit extends Component {
  submit = values => {
    const { albumId, libraryActions, submitCallback } = this.props;
    values.id = albumId;
    return libraryActions.update(values, albumData => {
      if (typeof submitCallback === 'function') {
        submitCallback(albumData);
      }
    });
  };

  render() {
    const { props, submit } = this;
    const { handleSubmit, skipCallback } = props;

    return (
      <form
        autoComplete="off"
        className="form-album-label-edit"
        onSubmit={handleSubmit(data => {
          submit({
            ...data,
          });
        })}
      >
        <Field
          component={Input}
          label="Label"
          name="label"
          validate={requiredValidate}
        />
        <div>
          <Button type="submit">Submit</Button>
          {skipCallback && <Button color="neutral" className="ml-1" onClick={skipCallback}>
            Skip
          </Button>}
        </div>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    libraryActions: bindActionCreators({ ...libraryActions }, dispatch),
  };
}

const ReduxFormAlbumEdit = reduxForm({
  form: 'albumLabelEdit',
})(FormAlbumLabelEdit);

export default connect(
  null,
  mapDispatchToProps,
)(ReduxFormAlbumEdit);
