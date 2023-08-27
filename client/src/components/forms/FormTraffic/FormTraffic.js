import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { bindActionCreators } from 'redux';

import { configActions } from '../../../redux';

import Button from '../../Button';
import Checkbox from '../../Checkbox';
import CustomFieldsEdit from '../../CustomFieldsEdit';
import { DatePicker__React } from '../../DatePicker';
import Input from '../../Input';
import RepeatDropdown from '../../RepeatDropdown';
import RichTextArea from '../../RichTextArea';
import Select from '../../Select';

import { requiredValidate } from '../../../utils/validation';

const FORM_NAME = 'trafficAddEdit';

class FormTraffic extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isRepeat:
        this.props.initialValues != null
          ? this.props.initialValues.is_recurring
          : false,
      "dateUtc": new Date()
    };
  }

  componentWillMount() {
    const { configState, configActions } = this.props;

    if (!('giveaway' in configState.customFields)) {
      configActions.customFieldsForModel('giveaway');
    }
  }

  componentDidUpdate() {
    const { props } = this;
    const {
      currentValues,
    } = props;
    let dateUtc = new Date();

    if (currentValues.start_time_utc != null && !this.isInstance()) {
      dateUtc = currentValues.start_time_utc;
    } else if (this.isInstance() && currentValues.repeat_rule != null 
              && currentValues.repeat_rule.repeat_start_date != null) {
      dateUtc = currentValues.repeat_rule.repeat_start_date;
    }

    if (String(this.state.dateUtc) != String(dateUtc)) {

      this.setState({
        "dateUtc": dateUtc
      });
    }
  };

  isInstance = () => {
    return this.props.initialValues.master_event_id != null;
  };

  toggleIsRepeat = () => {
    this.setState({
      isRepeat: !this.state.isRepeat,
    });
  };

  updatedDateTime = value => {
    const { change } = this.props;
    change('repeat_rule.repeat_start_date', value);
  };



  render() {
    const { props } = this;
    const {
      configState,
      currentValues,
      formValues,
      handleSubmit,
      submitCallback,
      cancelCallback,
    } = props;
    const { isRepeat, dateUtc } = this.state;

    let giveawayCustomFields = [];
    if ('giveaway' in configState.customFields) {
      giveawayCustomFields = configState.customFields.giveaway;
    }

    return (
      <form className="traffic-form" onSubmit={handleSubmit(submitCallback)} autoComplete="off">
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
            label="Date/Time of Announcement"
            name="start_time_utc"
            type="time"
            onChange={this.updatedDateTime}
            validate={[requiredValidate]}
            dateFormat="MM/dd/yyyy h:mm aa"
          />

          {!this.isInstance() && (
            <>
              <Field
                component={Checkbox}
                dirtyOverride
                label="Repeats"
                name="is_recurring"
                onChange={this.toggleIsRepeat}
              />
              {isRepeat && (
                <>
                  <RepeatDropdown
                    formSelectorName={FORM_NAME}
                    dateUtc={
                      dateUtc
                    }
                    disabled={false}
                    initialValues={this.props.initialValues}
                  />
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
            onChange={(evt, newValue) => {
              if (newValue == 'Giveaway') {
                this.props.change('traffic_details.giveaway_details.ticket_quantity', 2);
              }
            }}
          />

          {formValues?.traffic_details?.type === 'Feature' && (
              <Field
                component={Input}
                label="Producer"
                name="traffic_details.producer"
              />
            )}

          {formValues?.traffic_details?.type === 'Underwriting' && (
              <Field
                component={Input}
                label="Underwriter Name"
                name="traffic_details.underwriter_name"
              />
            )}

          {formValues?.traffic_details?.type === 'Giveaway' && (
              <>
                <Field
                  component={Input}
                  label="Event Name"
                  validate={[requiredValidate]}
                  name="traffic_details.giveaway_details.event_name"
                />
                <Field
                  component={DatePicker__React}
                  label="Event Date"
                  validate={[requiredValidate]}
                  name="traffic_details.giveaway_details.event_date"
                />
                <Field
                  component={DatePicker__React}
                  type="timeOnly"
                  label="Event Time"
                  validate={[requiredValidate]}
                  name="traffic_details.giveaway_details.event_time"
                />
                <Field
                  component={Input}
                  label="Ticket Quantity"
                  validate={[requiredValidate]}
                  name="traffic_details.giveaway_details.ticket_quantity"
                />
                <Field
                  component={Input}
                  label="Venue"
                  validate={[requiredValidate]}
                  name="traffic_details.giveaway_details.venue"
                />
                <CustomFieldsEdit
                  fieldsMeta={giveawayCustomFields}
                  prefixToCustomProperty="traffic_details.giveaway_details"
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
          <Button color="neutral" onClick={cancelCallback}>
            Cancel
          </Button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state, ownProps) {
  let formValues = {};
  if (state.form != null && state.form[FORM_NAME] != null) {
    formValues = state.form[FORM_NAME].values;
  }
  const currentValues =
    state.form[FORM_NAME] != null ? state.form[FORM_NAME].values : {};
  let initialValues =
    ownProps.initialValues != null ? ownProps.initialValues : {};
  if (ownProps.timeToAddAt != null) {
    initialValues.start_time_utc = ownProps.timeToAddAt;
    initialValues['repeat_rule.repeat_start_date'] = ownProps.timeToAddAt;
  }

  return {
    configState: state.config,
    currentValues,
    formValues: formValues,
    initialValues,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    configActions: bindActionCreators({ ...configActions }, dispatch),
  };
}

const ReduxFormTraffic = reduxForm({
  form: FORM_NAME,
})(FormTraffic);

export default connect(mapStateToProps, mapDispatchToProps)(ReduxFormTraffic);
