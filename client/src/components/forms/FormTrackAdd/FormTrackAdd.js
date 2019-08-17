import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { requiredValidate } from '../../../utils/validation';
import { libraryActions } from '../../../redux';
import Button from '../../Button';
import DropdownArtist from '../../DropdownArtist';
import Input from '../../Input';
import { bindActionCreators } from 'redux';

class FormTrackAdd extends Component {
  submit = values => {
    const { albumId, libraryActions, submitCallback } = this.props;
    values.album = albumId;
    values.duration_in_seconds =
      parseInt(values.seconds) + parseInt(values.minutes) * 60;
    return libraryActions.add('track', values, trackData => {
      if (typeof submitCallback === 'function') {
        submitCallback(trackData);
      }
    });
  };

  renderArtists = ({ fields, meta: { error, submitFailed } }) => {
    const { artist } = this.props;
    return (
      <ul>
        <li>
          <button type="button" onClick={() => fields.push({})}>
            Add Artist
          </button>
          {submitFailed && error && <span>{error}</span>}
        </li>
        {fields.map((fieldName, index) => (
          <li key={index}>
            <button
              type="button"
              title="Remove Artist"
              onClick={() => fields.remove(index)}
            >
              Remove
            </button>
            <Field
              name={`${fieldName}`}
              type="text"
              component={DropdownArtist}
              label="Aritst"
              artist={artist}
            />
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const { props, submit } = this;
    const { handleSubmit } = props;

    return (
      <form className="form-track-add" onSubmit={handleSubmit(submit)}>
        <Field
          component={Input}
          label="Name"
          name="name"
          autoFocus
          validate={requiredValidate}
        />
        <FieldArray name="artists" component={this.renderArtists} />
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
    libraryActions: bindActionCreators({ ...libraryActions }, dispatch),
  };
}

const ReduxFormTrackAdd = reduxForm({
  form: 'trackAdd',
})(FormTrackAdd);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxFormTrackAdd);
