import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { requiredValidate } from '../../../utils/validation';
import { albumActions, trackActions } from '../../../redux';
import Button from '../../Button';
import Input from '../../Input';
import { bindActionCreators } from 'redux';

class FormTrackEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submit = values => {
    const { trackActions, history, albumActions } = this.props;
    return trackActions.edit(values, trackData => {
      albumActions.clear();
      history.push(`/library/album/${trackData.album._id}`);
    });
  };

  render() {
    const { props, submit } = this;
    const { handleSubmit } = props;

    return (
      <form
        className="form-track-edit"
        onSubmit={handleSubmit(data => {
          submit({
            ...data,
          });
        })}
      >
        <Field
          component={Input}
          label="Disk Number"
          name="disk_number"
          type="number"
          autoFocus
          validate={requiredValidate}
        />
        <Field
          component={Input}
          label="Track Number"
          name="track_number"
          type="number"
          autoFocus
          validate={requiredValidate}
        />
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
            autoFocus
            validate={requiredValidate}
          />
          <div className="duration-colon">:</div>
          <Field
            component={Input}
            name="seconds"
            className="seconds"
            type="number"
            autoFocus
            validate={requiredValidate}
          />
        </div>
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const minutes = Math.floor(parseInt(ownProps.duration_in_seconds) / 60);
  const seconds = ownProps.duration_in_seconds - minutes * 60;
  return {
    initialValues: {
      disk_number: ownProps.disk_number,
      duration_in_seconds: ownProps.duration_in_seconds,
      name: ownProps.name,
      track_number: ownProps.track_number,
      minutes: minutes,
      seconds: seconds,
      id: ownProps.id,
      album: ownProps.album,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    albumActions: bindActionCreators({ ...albumActions }, dispatch),
    trackActions: bindActionCreators({ ...trackActions }, dispatch),
  };
}

const ReduxFormTrackEdit = reduxForm({
  form: 'trackEdit',
})(FormTrackEdit);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxFormTrackEdit);
