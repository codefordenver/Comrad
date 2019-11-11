import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import Button from '../../Button';
import Card, { CardBody } from '../../Card';
import { DatePicker__React } from '../../DatePicker';
import Input from '../../Input';
import RepeatDropdown from '../../RepeatDropdown';
import RichTextArea from '../../RichTextArea';
import Select from '../../Select';

import { requiredValidate } from '../../../utils/validation';

class FormTrafficAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRepeat: this.props.isRepeat != null ? this.props.isRepease : false,
    };
  }

  toggleIsRepeat = () => {
    this.setState({
      isRepeat: !this.state.isRepeat,
    });
  };

  render() {
    const { props } = this;
    const { editingInstance, formValues, handleSubmit, submitCallback } = props;
    const { isRepeat } = this.state;

    return (
      <Card>
        <CardBody>
          <form
            className="traffic-form"
            onSubmit={handleSubmit(submitCallback)}
          >
            <div className="traffic-form__grid">
              <Field
                className="grid-span--2"
                component={Input}
                label="Title"
                name="traffic_details.title"
                type="text"
                validate={[requiredValidate]}
              />

              <Field
                className="z-index--250"
                component={DatePicker__React}
                label="Date/Time"
                name="start_time_utc"
                type="time"
                validate={[requiredValidate]}
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
              />

              {!editingInstance && (
                <>
                  <Field
                    component={Input}
                    dirtyOverride
                    label="Repeat"
                    name="is_recurring"
                    type="checkbox"
                    onChange={this.toggleIsRepeat}
                  />
                  {isRepeat && (
                    <>
                      <RepeatDropdown />
                    </>
                  )}
                </>
              )}

              <Field
                className="grid-column-start--1"
                component={Select}
                label="Type"
                name="traffic_details.type"
                validate={[requiredValidate]}
                selectOptions={[
                  'Announcement',
                  'Feature',
                  'Giveaway',
                  'Legal ID',
                  'PSA',
                  'Underwriting',
                ]}
              />

              {formValues.traffic_details != null &&
                formValues.traffic_details.type === 'Feature' && (
                  <Field
                    component={Input}
                    label="Producer"
                    name="traffic_details.producer"
                  />
                )}

              {formValues.traffic_details != null &&
                formValues.traffic_details.type === 'Underwriting' && (
                  <Field
                    component={Input}
                    label="Underwriter Name"
                    name="traffic_details.underwriter_name"
                  />
                )}

              {formValues.traffic_details != null &&
                formValues.traffic_details.type === 'Giveaway' && (
                  <>
                    <Field
                      component={Input}
                      label="Event Name"
                      name="traffic_details.giveaway_details.event_name"
                    />
                    <Field
                      component={DatePicker__React}
                      label="Event Date"
                      name="traffic_details.giveaway_details.event_date"
                    />
                    <Field
                      component={Input}
                      label="Venue"
                      name="traffic_details.giveaway_details.venue"
                    />
                  </>
                )}

              <Field
                className="grid-span--2"
                component={RichTextArea}
                label="Description"
                name="traffic_details.description"
                type="text"
              />
            </div>

            <div className="traffic-form__buttons">
              <Button color="primary" type="submit">
                Save
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    );
  }
}

function mapStateToProps(state, ownProps) {
  let formValues = {};
  if (state.form != null && state.form.trafficAdd != null) {
    formValues = state.form.trafficAdd.values;
  }
  return {
    formValues: formValues,
    initialValues: ownProps.initialValues != null ? ownProps.initialValues : {},
  };
}

const ReduxFormTrafficAdd = reduxForm({
  form: 'trafficAdd',
})(FormTrafficAdd);

export default connect(
  mapStateToProps,
  {},
)(ReduxFormTrafficAdd);
