import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { requiredValidate } from '../../../utils/validation';
import { albumActions, trackActions } from '../../../redux';
import Button from '../../Button';
import Input from '../../Input';
import { bindActionCreators } from 'redux';

class FormTrackEdit extends Component {
  submit = values => {
    return;
  };

  render() {
    const { props, submit } = this;
    const { handleSubmit } = props;
    //console.log(this.props)

    return (
      <form className="form-track-edit">
        <Field
          component={Input}
          label="Disk Number"
          name="disk_number"
          type="number"
          autoFocus
          validate={requiredValidate}
        />
        <Field
          component={Input}
          label="Track Number"
          name="track_number"
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
  //console.log(ownProps)
  return state;
}

/*function mapDispatchToProps(dispatch) {
  return {
    albumActions: bindActionCreators({ ...albumActions }, dispatch),
    trackActions: bindActionCreators({ ...trackActions }, dispatch),
  };
}*/

const ReduxFormTrackEdit = reduxForm({
  form: 'trackEdit',
})(FormTrackEdit);

export default connect(mapStateToProps)(ReduxFormTrackEdit);
