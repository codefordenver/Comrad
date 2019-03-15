import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { requiredValidate } from '../../utils/validation.js';
import axios from 'axios';

import Alert from '../../components/Alert';
import Card, { CardBody } from '../../components/Card';

class ArtistViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: null,
      editing: false,
      last_updated: '',
      originalArtistName: null,
    };

    axios.get('/api/artist/' + this.props.match.params.id).then(response => {
      let dateObj = new Date(response.data.updated_at);
      this.setState({
        artist: response.data,
        last_updated:
          dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString(),
        originalArtistName: response.data.name,
      });
    });
  }

  handleSubmit = (state, instance) => {
    console.log('test submit');
  };

  textChange = (state, instance) => {
    const { artist } = this.state;
    artist.name = this.refs.artistNameInput.value;
    this.setState({
      artist: artist,
    });
  };

  toggleEditMode = (state, instance) => {
    const { artist } = this.state;
    artist.name = this.state.originalArtistName;
    this.state.editing = this.setState({
      artist: artist,
      editing: !this.state.editing,
    });
  };

  render() {
    const { props, submit } = this;
    const { auth } = props;
    const { alert } = auth;
    const { display } = alert;
    return (
      <div className="artist-view-page">
        {this.state.artist != null && (
          <div>
            <Card>
              <CardBody>
                <div className="float-right">
                  Last updated: {this.state.last_updated}
                </div>
                <h1 className="mb-0">
                  {!this.state.editing && (
                    <span>
                      {this.state.artist.name}{' '}
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
                        value={this.state.artist.name}
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
  const auth = state.auth;

  return {
    auth,
  };
}

export default connect(
  mapStateToProps,
  {
    /*editArtist*/
  },
)(ReduxFormEditArtist);
