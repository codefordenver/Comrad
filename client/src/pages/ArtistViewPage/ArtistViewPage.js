import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { requiredValidate } from '../../utils/validation.js';
import {
  artistFindOne,
  artistUpdate,
  changeEditingArtistName,
} from '../../redux/artist/artistActions.js';

import Alert from '../../components/Alert';
import Card, { CardBody } from '../../components/Card';
import Input from '../../components/Input';

class ArtistViewPage extends Component {
  constructor(props) {
    super(props);
    if (this.props.editingName) {
      this.props.changeEditingArtistName(false);
    }
    this.props.artistFindOne(this.props.match.params.id);
  }

  doNotTakeFocus = e => {
    e.preventDefault(); // do not take the focus so that the field's onblur event is not fired
  };

  submit = values => {
    const changeEditingArtistName = this.props.changeEditingArtistName;
    if (this.props.dirty) {
      this.props.artistUpdate(
        this.props.artist._id,
        values.artistName,
        function() {
          changeEditingArtistName(false);
        },
      );
    } else {
      changeEditingArtistName(false);
    }
  };

  toggleEditMode = (state, instance) => {
    this.props.changeEditingArtistName(!this.props.editingName);
  };

  render() {
    const { props, submit } = this;
    const { alert, artist, editingName, handleSubmit } = props;
    const { display } = alert;
    return (
      <div className="artist-view-page">
        {artist != null && (
          <div>
            <Card>
              <CardBody>
                <div className="float-right">
                  Last updated: {artist.updated_at_string}
                </div>
                <h1 className="mb-0">
                  {!editingName && (
                    <span>
                      {artist.name}{' '}
                      <a
                        onClick={this.toggleEditMode}
                        className="edit-button"
                      />
                    </span>
                  )}
                  {editingName && (
                    <form onSubmit={handleSubmit(submit)}>
                      {display && <Alert {...alert} />}
                      <Field
                        name="artistName"
                        component={Input}
                        inline="true"
                        focus="true"
                        type="text"
                        validate={[requiredValidate]}
                        onBlur={handleSubmit(submit)}
                      />
                      <a
                        className="ok-button"
                        onMouseDown={this.doNotTakeFocus}
                        onClick={handleSubmit(submit)}
                      />
                      <a
                        onClick={this.toggleEditMode}
                        onMouseDown={this.doNotTakeFocus}
                        className="cancel-button"
                      />
                    </form>
                  )}
                </h1>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

const ReduxFormEditArtist = reduxForm({
  form: 'editArtistName',
  enableReinitialize: true, //necessary for initialValues property to work
})(ArtistViewPage);

function mapStateToProps(state) {
  const artist = state.artist.doc;
  const editingName = state.artist.editingName;
  const alert = state.artist.alert;
  const initialValues = {
    artistName: artist.name,
  };

  return {
    alert,
    artist,
    editingName,
    initialValues,
  };
}

export default connect(
  mapStateToProps,
  {
    artistFindOne,
    artistUpdate,
    changeEditingArtistName,
  },
)(ReduxFormEditArtist);
