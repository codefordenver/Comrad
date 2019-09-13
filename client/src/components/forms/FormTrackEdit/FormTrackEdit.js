import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { requiredValidate } from '../../../utils/validation';
import { libraryActions } from '../../../redux';
import Button from '../../Button';
import ButtonIcon from '../../ButtonIcon';
import DropdownLibrary from '../../DropdownLibrary';
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

  renderArtists = ({ fields, meta: { error, submitFailed } }) => {
    const { artists } = this.props;
    return (
      <div>
        <ul className="form-track-edit__artist-list">
          <li>
            <h3>Artists</h3>
            <ButtonIcon
              icon="plus"
              type="button"
              onClick={e => {
                e.preventDefault();
                fields.push({});
              }}
            />
          </li>
          {fields.map((fieldName, index) => (
            <li key={'field_' + index}>
              <Field
                name={`${fieldName}`}
                type="text"
                component={DropdownLibrary}
                libraryType="artist"
                label="Aritst"
                artist={artists.filter(obj => obj._id === fields.get(index))[0]}
              />
              <ButtonIcon
                icon="cancel"
                type="button"
                onClick={e => {
                  e.preventDefault();
                  fields.remove(index);
                }}
              />
            </li>
          ))}
        </ul>
        {submitFailed && error && <span>{error}</span>}
      </div>
    );
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
  let disk_number,
    duration_in_seconds,
    name,
    track_number,
    _id,
    album,
    artistIds,
    artists,
    minutes,
    seconds;
  if (state.library.doc != null) {
    ({
      disk_number,
      duration_in_seconds,
      name,
      track_number,
      _id,
      album,
      artists,
    } = state.library.doc);
    artistIds = artists.map(a => a._id);
    minutes = Math.floor(parseInt(duration_in_seconds) / 60);
    seconds = duration_in_seconds - minutes * 60;
  }

  return {
    artists: artists,
    initialValues: {
      disk_number: disk_number,
      duration_in_seconds: duration_in_seconds,
      name: name,
      track_number: track_number,
      minutes: minutes,
      seconds: seconds,
      id: _id,
      album: album,
      artists: artistIds,
    },
  };
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
