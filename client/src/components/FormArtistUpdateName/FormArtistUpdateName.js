import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { artistFindOne, artistUpdate } from '../../redux/artist';

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
    this.setState(prevState => ({
      editMode: !prevState.editMode,
    }));
  };

  submit = (values, confirm) => {
    const { artistUpdate, initialize, initialValues } = this.props;

    if (confirm) {
      artistUpdate(values, () => {
        this.setState({
          editMode: false,
        });
      });
    } else {
      initialize(initialValues);
      this.setState({
        editMode: false,
      });
    }
  };

  render() {
    const { handleEditClick, props, state, submit } = this;
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
              label="Name"
              name="name"
              type="text"
              autoFocus
              // onBlur={handleSubmit(data => submit(data, true))}
            />
            <ButtonIcon
              icon="confirm"
              onClick={handleSubmit(data => submit(data, true))}
            />
            <ButtonIcon
              icon="cancel"
              onClick={handleSubmit(data => submit(data, false))}
            />
          </form>
        ) : (
          <div className="faun__heading">
            <div className="faun__name">{name}</div>
            <ButtonIcon
              className="faun__edit"
              icon="pencil"
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
