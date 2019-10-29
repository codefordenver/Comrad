import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import Button from '../../Button';
import Card, { CardBody } from '../../Card';
import { DatePicker__React } from '../../DatePicker';
import Input from '../../Input';
import RepeatDropdown from '../../RepeatDropdown';
import RichTextArea from '../../RichTextArea';
import TextArea from '../../TextArea';

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
    const { handleSubmit } = props;
    const { isRepeat } = this.state;

    return (
      <Card>
        <CardBody>
          <form className="traffic-form" onSubmit={handleSubmit}>
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
                label="From"
                name="start_time_utc"
                type="time"
                validate={[requiredValidate]}
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
              />

              <Field
                className="z-index--250"
                component={DatePicker__React}
                label="To"
                name="end_time_utc"
                validate={[requiredValidate]}
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
              />

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

              <Field
                className="grid-span--2"
                component={TextArea}
                label="Summary"
                name="traffic_details.summary"
                type="text"
              />

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
  return {
    initialValues: {},
  };
}

const ReduxFormTrafficAdd = reduxForm({
  form: 'trafficAdd',
})(FormTrafficAdd);

export default connect(
  mapStateToProps,
  {},
)(ReduxFormTrafficAdd);
