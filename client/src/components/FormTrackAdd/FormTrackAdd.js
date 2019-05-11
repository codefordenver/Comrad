import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { requiredValidate } from '../../utils/validation';
import { trackAdd } from '../../redux/track'; //need to set up correct path

import Button from '../Button';
import Input from '../Input';

class FormTrackAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  submit = (values, dispatch, props) => {
    const { trackAdd, submitCallback } = this.props;
    trackAdd(values, submitCallback);
  };

  render() {
    const { props, submit } = this;
    const { handleSubmit } = props;

    return (
      <form className="form-track-add" onSubmit={handleSubmit(submit)}>
        <Field
          component={Input}
          label="Disk Number"
          name="disk-number"
          type="number"
          autoFocus
          validate={requiredValidate}
        />
        <Field
          component={Input}
          label="Track Number"
          name="track-number"
          type="number"
          autoFocus
          validate={requiredValidate}
        />
        <Field
          component={Input}
          label="Name"
          name="name"
          autoFocus
          validate={requiredValidate}
        />
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
            autoFocus
            validate={requiredValidate}
          />
          <div className="duration-colon">:</div>
          <Field
            component={Input}
            name="seconds"
            className="seconds"
            type="number"
            placeholder="00"
            autoFocus
            validate={requiredValidate}
          />
        </div>
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
      'disk-number': ownProps.maxDiskNumber,
    },
  };
}

const ReduxFormTrackAdd = reduxForm({
  form: 'trackAdd',
})(FormTrackAdd);

export default connect(mapStateToProps)(ReduxFormTrackAdd);
