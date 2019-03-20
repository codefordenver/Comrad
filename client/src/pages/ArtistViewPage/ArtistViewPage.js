import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { requiredValidate } from '../../utils/validation.js';
import { artistFindOne } from '../../redux/artist/artistActions.js';

import Alert from '../../components/Alert';
import Card, { CardBody } from '../../components/Card';

class ArtistViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
    this.props.artistFindOne(this.props.match.params.id);
  }

  handleSubmit = (state, instance) => {
    console.log('test submit');
  };

  toggleEditMode = (state, instance) => {
    this.state.editing = this.setState({
      editing: !this.state.editing,
    });
  };

  render() {
    const { props, submit } = this;
    const { artist, auth } = props;
    const { alert } = auth;
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
                  {!this.state.editing && (
                    <span>
                      {artist.name}{' '}
                      <a
                        onClick={this.toggleEditMode}
                        className="edit-button"
                      />
                    </span>
                  )}
                  {this.state.editing && (
                    <form onSubmit={this.handleSubmit(submit)}>
                      {display && <Alert {...alert} />}
                      <Field
                        label="Artist Name"
                        validate={requiredValidate}
                        component="input"
                        name="aritstName"
                        type="text"
                        initial="sean test"
                        value={artist.name}
                      />
                      <a className="ok-button" />
                      <a
                        onClick={this.toggleEditMode}
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
  form: 'editArtist',
})(ArtistViewPage);

function mapStateToProps(state) {
  const artist = state.artist.doc;
  const auth = state.auth;

  return {
    artist,
    auth,
  };
}

export default connect(
  mapStateToProps,
  {
    artistFindOne,
  },
)(ReduxFormEditArtist);
