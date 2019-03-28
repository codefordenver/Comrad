import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { artistFindOne, artistUpdate } from '../../redux/artist';
import { requiredValidate } from '../../utils/validation.js';

import ButtonIcon from '../ButtonIcon';
import Input from '../Input';

class FormArtistUpdateName extends Component {
  state = {
    editMode: false,
  };

  componentDidMount() {
    const { artist, artistFindOne, match } = this.props;
    const { _id } = artist.doc;
    const { id } = match.params;

    if (id !== _id) {
      artistFindOne(id);
    }
  }

  handleEditClick = () => {
    const { initialize, initialValues } = this.props;

    this.setState(
      prevState => ({
        editMode: !prevState.editMode,
      }),
      () => initialize(initialValues),
    );
  };

  handleDefault = e => {
    e.preventDefault();
  };

  submit = values => {
    const { artistUpdate } = this.props;

    artistUpdate(values, () => {
      this.setState({
        editMode: false,
      });
    });
  };

  render() {
    const { handleDefault, handleEditClick, props, state, submit } = this;
    const { artist, handleSubmit } = props;
    const { editMode } = state;
    const { doc } = artist;
    const { name } = doc;

    return (
      <div className="faun">
        {editMode ? (
          <form className="faun__form" onSubmit={handleSubmit(submit)}>
            <Field
              component={Input}
              label="Artist Name"
              name="name"
              type="text"
              autoFocus
              onBlur={handleSubmit(submit)}
              validate={requiredValidate}
            />
            <ButtonIcon
              icon="confirm"
              onClick={handleSubmit(submit)}
              onMouseDown={handleDefault}
            />
            <ButtonIcon
              icon="cancel"
              onClick={handleSubmit(handleEditClick)}
              onMouseDown={handleDefault}
            />
          </form>
        ) : (
          <div className="faun__heading">
            <div className="faun__name">{name}</div>
            <ButtonIcon
              className="faun__edit"
              icon="pencil"
              size="small"
              inline={true}
              onClick={handleEditClick}
            />
          </div>
        )}
      </div>
    );
  }
}

const ReduxFormArtistUpdateName = reduxForm({
  form: 'artistUpdate',
  enableReinitialize: true,
})(FormArtistUpdateName);

function mapStateToProps({ artist }) {
  return {
    artist,
    initialValues: {
      ...artist.doc,
    },
  };
}

export default connect(
  mapStateToProps,
  { artistFindOne, artistUpdate },
)(ReduxFormArtistUpdateName);
