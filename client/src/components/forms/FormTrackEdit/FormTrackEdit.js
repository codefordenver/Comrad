import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { requiredValidate } from '../../../utils/validation';
import { libraryActions } from '../../../redux';
import Button from '../../Button';
import Input from '../../Input';
import { bindActionCreators } from 'redux';

class FormTrackEdit extends Component {
  submit = values => {
    const { libraryActions, submitCallback } = this.props;
    values.duration_in_seconds =
      parseInt(values.seconds) + parseInt(values.minutes) * 60;
    return libraryActions.update(values, trackData => {
      if (typeof submitCallback === 'function') {
        submitCallback(trackData);
      }
    });
  };

  render() {
    const { props, submit } = this;
    const { handleSubmit } = props;

    return (
      <form className="form-track-edit" onSubmit={handleSubmit(submit)}>
        <Field
          component={Input}
          label="Name"
          name="name"
          autoFocus
          validate={requiredValidate}
        />
        <div className="duration-container">
          <div className="duration-label-container">
            <div className="duration-label">Duration:</div>
          </div>
          <Field
            component={Input}
            name="minutes"
            className="minutes"
            type="number"
            validate={requiredValidate}
          />
          <div className="duration-colon">:</div>
          <Field
            component={Input}
            name="seconds"
            className="seconds"
            type="number"
            validate={requiredValidate}
          />
        </div>
        <Field
          component={Input}
          label="Disk Number"
          name="disk_number"
          type="number"
        />
        <Field
          component={Input}
          label="Track Number"
          name="track_number"
          type="number"
        />
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  if (state.library.doc != null) {
    const {
      disk_number,
      duration_in_seconds,
      name,
      track_number,
      _id,
      album,
    } = state.library.doc;
    const minutes = Math.floor(parseInt(duration_in_seconds) / 60);
    const seconds = duration_in_seconds - minutes * 60;
    return {
      initialValues: {
        disk_number: disk_number,
        duration_in_seconds: duration_in_seconds,
        name: name,
        track_number: track_number,
        minutes: minutes,
        seconds: seconds,
        id: _id,
        album: album,
      },
    };
  } else {
    return {};
  }
}

function mapDispatchToProps(dispatch) {
  return {
    libraryActions: bindActionCreators({ ...libraryActions }, dispatch),
  };
}

const ReduxFormTrackEdit = reduxForm({
  form: 'trackEdit',
})(FormTrackEdit);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxFormTrackEdit);
