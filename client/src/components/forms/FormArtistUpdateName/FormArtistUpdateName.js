import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';

import classnames from 'classnames';

import { alertActions, libraryActions } from '../../../redux';
import { requiredValidate } from '../../../utils/validation.js';

import ButtonIcon from '../../ButtonIcon';
import Input from '../../Input';

const FORM_NAME = 'artistUpdate';

class FormArtistUpdateName extends Component {
  state = {
    editMode: false,
    pressedTabKey: false,
  };

  handleBlur = e => {
    if (!this.state.pressedTabKey) {
      // let users tab over the field without submitting it so that screen readers can work effectively
      this.formSubmit(this.props.formValues);
    }
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

  handleKeyDown = e => {
    //detect pressing tab
    if ((e.which || e.keyCode) === 9) {
      this.setState({
        pressedTabKey: true,
      });
    } else {
      this.setState({
        pressedTabKey: false,
      });
    }
  };

  formSubmit = values => {
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
    const { handleDefault, handleEditClick, props, state, formSubmit } = this;
    const { auth, library, className, handleSubmit, submitting } = props;
    const { editMode } = state;
    const { doc } = library;
    const { name } = doc;

    return (
      <div className={classnames('faun', className)}>
        {editMode ? (
          <form className="faun__form" onSubmit={handleSubmit(formSubmit)}>
            <Field
              autoFocus
              component={Input}
              label="Artist Name"
              onBlur={this.handleBlur}
              onKeyDown={this.handleKeyDown}
              name="name"
              type="text"
              validate={requiredValidate}
            />
            <ButtonIcon
              icon="confirm"
              onClick={handleSubmit(formSubmit)}
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
            {auth.doc.roles != null &&
              (auth.doc.roles.indexOf('Admin') !== -1 ||
                auth.doc.roles.indexOf('Full Access') !== -1 ||
                auth.doc.roles.indexOf('Music Library Admin') !== -1) && (
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
  form: FORM_NAME,
  enableReinitialize: true,
})(FormArtistUpdateName);

function mapDispatchToProps(dispatch) {
  return {
    libraryActions: bindActionCreators({ ...libraryActions }, dispatch),
    alertActions: bindActionCreators({ ...alertActions }, dispatch),
  };
}

function mapStateToProps({ auth, form, library }) {
  return {
    auth,
    library,
    initialValues: {
      ...library.doc,
    },
    formValues: form[FORM_NAME] != null ? form[FORM_NAME].values : null,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxFormArtistUpdateName);
