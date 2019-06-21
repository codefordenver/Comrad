import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';

import { artistActions } from '../../../redux';
import { requiredValidate } from '../../../utils/validation.js';

import ButtonIcon from '../../ButtonIcon';
import Input from '../../Input';

class FormArtistUpdateName extends Component {
  state = {
    editMode: false,
  };

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
    const { artistActions } = this.props;

    return artistActions.update(values, () => {
      this.setState({
        editMode: false,
      });
    });
  };

  render() {
    const { handleDefault, handleEditClick, props, state, submit } = this;
    const { artist, handleSubmit, submitting } = props;
    const { editMode } = state;
    const { doc } = artist;
    const { name } = doc;

    return (
      <div className="faun">
        {editMode ? (
          <form className="faun__form" onSubmit={handleSubmit(submit)}>
            <Field
              autoFocus
              component={Input}
              label="Artist Name"
              onBlur={handleSubmit(submit)}
              name="name"
              type="text"
              validate={requiredValidate}
            />
            <ButtonIcon
              icon="confirm"
              onClick={handleSubmit(submit)}
              onMouseDown={handleDefault}
              submitting={submitting}
            />
            <ButtonIcon
              icon="cancel"
              onClick={handleSubmit(handleEditClick)}
              onMouseDown={handleDefault}
              submitting={submitting}
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

function mapDispatchToProps(dispatch) {
  return {
    artistActions: bindActionCreators({ ...artistActions }, dispatch),
  };
}

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
  mapDispatchToProps,
)(ReduxFormArtistUpdateName);
