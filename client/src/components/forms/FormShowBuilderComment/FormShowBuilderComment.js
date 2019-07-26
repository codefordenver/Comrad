import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, submit } from 'redux-form';
import { bindActionCreators } from 'redux';
import { requiredValidate } from '../../../utils/validation';
import { albumActions } from '../../../redux';

import Button from '../../Button';
import RichTextArea from '../../RichTextArea';

class FormShowBuilderComment extends Component {
  handleReduxFormSubmit = values => {
    console.log('submit');
    console.log(values);
  };

  handleAddToSavedItems = () => {
    const { dispatch, submit } = this.props;
    this.props.change('submitAction', 'saved_items');
    //dispatch(submitAction('showBuilderComment'))};
    submit();
  };

  handleAddToScratchpad = () => {
    const { dispatch, submit } = this.props;
    this.props.change('submitAction', 'scratchpad');
    //dispatch(submitAction('showBuilderComment'))};
    submit();
  };

  render() {
    const { props, handleReduxFormSubmit } = this;
    const { handleSubmit } = props;

    return (
      <form
        className="form-show-builder-comment"
        onSubmit={handleSubmit(handleReduxFormSubmit)}
      >
        <Field
          component={RichTextArea}
          label="Comment"
          name="comment"
          autoFocus
          validate={requiredValidate}
        />
        <div>
          <Button type="button" onClick={this.handleAddToScratchpad}>
            Add to Scratchpad
          </Button>
          <Button type="button" onClick={this.handleAddToSavedItems}>
            Add to Saved Items
          </Button>
        </div>
      </form>
    );
  }
}

const ReduxFormShowBuilderComment = reduxForm({
  form: 'showBuilderComment',
})(FormShowBuilderComment);

export default connect()(ReduxFormShowBuilderComment);
