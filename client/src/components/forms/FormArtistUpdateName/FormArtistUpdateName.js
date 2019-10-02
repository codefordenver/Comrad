import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';

import classnames from 'classnames';

import { alertActions, libraryActions } from '../../../redux';
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
    const { alertActions, library, libraryActions } = this.props;
    const { _id } = library.doc;

    values.id = _id;

    return libraryActions.update(values, () => {
      alertActions.show('success', 'Success', 'Artist name has been updated');
      this.setState({
        editMode: false,
      });
    });
  };

  render() {
    const { handleDefault, handleEditClick, props, state, submit } = this;
    const { auth, library, className, handleSubmit, submitting } = props;
    const { editMode } = state;
    const { doc } = library;
    const { name } = doc;

    return (
      <div className={classnames('faun', className)}>
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
          <div className={classnames('faun__heading', className)}>
            <h1 className="mb-0">{name}</h1>
            {(auth.doc.role === 'Admin' ||
              auth.doc.role === 'Full Access' ||
              auth.doc.role === 'Music Library Admin') && (
              <ButtonIcon
                className="faun__edit"
                icon="pencil"
                size="small"
                inline={true}
                onClick={handleEditClick}
              />
            )}
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
    libraryActions: bindActionCreators({ ...libraryActions }, dispatch),
    alertActions: bindActionCreators({ ...alertActions }, dispatch),
  };
}

function mapStateToProps({ auth, library }) {
  return {
    auth,
    library,
    initialValues: {
      ...library.doc,
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxFormArtistUpdateName);
