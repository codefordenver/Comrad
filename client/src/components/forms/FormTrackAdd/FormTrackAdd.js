import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { requiredValidate } from '../../../utils/validation';
import { trackActions } from '../../../redux';
import Button from '../../Button';
import Input from '../../Input';
import { bindActionCreators } from 'redux';

class FormTrackAdd extends Component {
  submit = values => {
    const { albumId, trackActions, submitCallback } = this.props;
    values.album = albumId;
    return trackActions.add(values, trackData => {
      if (typeof submitCallback === 'function') {
        submitCallback(trackData);
      }
    });
  };

  render() {
    const { props, submit } = this;
    const { handleSubmit } = props;

    return (
      <form
        className="form-track-add"
        onSubmit={handleSubmit(data => {
          const duration_in_seconds =
            parseInt(data.seconds) + parseInt(data.minutes) * 60;
          submit({
            ...data,
            duration_in_seconds: duration_in_seconds,
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
        <div className="duration-container">
          <div className="duration-label-container">
            <div className="duration-label">Duration:</div>
          </div>
          <Field
            component={Input}
            name="minutes"
            className="minutes"
            type="number"
            placeholder="00"
            validate={requiredValidate}
          />
          <div className="duration-colon">:</div>
          <Field
            component={Input}
            name="seconds"
            className="seconds"
            type="number"
            placeholder="00"
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

function mapStateToProps(state, ownProps) {
  return {
    initialValues: {
      artists: [ownProps.artistId],
      disk_number: ownProps.maxDiskNumber,
      track_number: ownProps.maxTrackNumber + 1,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    trackActions: bindActionCreators({ ...trackActions }, dispatch),
  };
}

const ReduxFormTrackAdd = reduxForm({
  form: 'trackAdd',
})(FormTrackAdd);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxFormTrackAdd);
