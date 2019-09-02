import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { requiredValidate } from '../../../utils/validation';
import { libraryActions } from '../../../redux';
import Button from '../../Button';
import ButtonIcon from '../../ButtonIcon';
import DropdownArtist from '../../DropdownArtist';
import Input from '../../Input';
import { bindActionCreators } from 'redux';

class FormTrackAdd extends Component {
  state = {
    artistsSelectedInDropdown: [this.props.artist],
  };

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

  handleDropdownArtistSelect = artist => {
    let { artistsSelectedInDropdown } = this.state;
    artistsSelectedInDropdown.push(artist);
    this.setState({
      artistsSelectedInDropdown: artistsSelectedInDropdown,
    });
  };

  renderArtists = ({ fields, meta: { error, submitFailed } }) => {
    const { artistsSelectedInDropdown } = this.state;
    return (
      <div>
        <ul className="form-track-add__artist-list">
          <li>
            <h3>Artists</h3>
            <ButtonIcon
              icon="plus"
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
                component={DropdownArtist}
                onArtistSelect={this.handleDropdownArtistSelect}
                label="Aritst"
                artist={
                  artistsSelectedInDropdown.filter(
                    obj => obj._id === fields.get(index),
                  )[0]
                }
              />
              <ButtonIcon
                icon="cancel"
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
