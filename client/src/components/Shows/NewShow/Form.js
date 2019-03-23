import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import moment from 'moment';

import Repeat from './Repeat';
import Input from '../../Input';
import Button from '../../Button';
import Card from '../../Card';
import DatePicker from '../../DatePicker';
import ModalClose from '../../Modal/Modal__Button_Close';

import { getShowSelected } from '../../../redux/show';
import { requiredValidate } from '../../../utils/validation';

class NewShowForm extends Component {
  render() {
    const { isRepeat, handleSubmit } = this.props;
    //Need handleBlur for time fields.  Redux-form is clearing the field otherwise.
    const handleBlur = e => e.preventDefault();
    return (
      <main className="show show__padding">
        <section className="show__body">
          <Card>
            <form onSubmit={handleSubmit}>
              <div className="show__grid_container">
                <div className="show__grid_span_3">
                  <Field
                    label="Title"
                    name="title"
                    component={Input}
                    type="text"
                    validate={[requiredValidate]}
                  />
                </div>

                <div>
                  <Field
                    label="From"
                    name="show_start_time_utc"
                    component={Input}
                    type="time"
                    format={value => moment(value).format('HH:mm')}
                    parse={value => moment(value, 'HH:mm')}
                    onBlur={handleBlur}
                    validate={[requiredValidate]}
                    dirtyOverride
                  />
                </div>

                <div>
                  <Field
                    label="To"
                    name="show_end_time_utc"
                    component={Input}
                    type="time"
                    format={value => moment(value).format('HH:mm')}
                    parse={value => moment(value, 'HH:mm')}
                    onBlur={handleBlur}
                    validate={[requiredValidate]}
                    dirtyOverride
                  />
                </div>

                <div className="show__grid_container show__grid_span_3">
                  <div className="show__date_picker_start">
                    <Field
                      label="Start"
                      name="repeat_start_date"
                      component={DatePicker}
                      validate={[requiredValidate]}
                    />
                  </div>

                  <div className="">
                    <Field
                      label="Repeat"
                      name="repeat"
                      component={Input}
                      type="checkbox"
                      dirtyOverride
                    />
                  </div>

                  {isRepeat && (
                    <div className="show__grid_span_3">
                      <Repeat />
                    </div>
                  )}
                </div>

                <div className="show__grid_span_3">
                  <Field
                    label="Summary"
                    name="summary"
                    component={Input}
                    type="text"
                  />
                  {/**
                  *Example of text area.  Needs to be turned into a full component to use with redux-forms.
                  <textarea
                    name=""
                    id=""
                    style={{ resize: 'none', width: '100%' }}
                    rows="7"
                  />*/}
                </div>

                <div className="show__grid_span_3">
                  <Field
                    label="Description"
                    name="description"
                    component={Input}
                    type="text"
                  />
                </div>

                <div>
                  <Field
                    label="Producer"
                    name="producer"
                    component={Input}
                    type="text"
                  />
                </div>

                <div>
                  <Field
                    label="Host"
                    name="host"
                    component={Input}
                    type="text"
                  />
                </div>

                <div className="show__grid_container show__grid_span_3">
                  <div className="">
                    <Button color="primary" type="submit">
                      Save
                    </Button>
                  </div>

                  <div>
                    <ModalClose />
                  </div>
                </div>
              </div>
            </form>
          </Card>
        </section>
      </main>
    );
  }
}

const selector = formValueSelector('newShow');

function mapStateToProps(state) {
  const initialValues = state => {
    const selectedShow = getShowSelected(state.show);

    return {
      show_start_time_utc: moment(selectedShow.start),
      show_end_time_utc: moment(selectedShow.end),
      repeat_start_date: moment(selectedShow.start),
      repeat_end_date: moment(selectedShow.end),
      repeat: false,
    };
  };

  const isRepeat = selector(state, 'repeat');

  return {
    initialValues: initialValues(state),
    isRepeat,
  };
}

NewShowForm = reduxForm({
  form: 'newShow',
})(NewShowForm);

export default connect(
  mapStateToProps,
  {},
)(NewShowForm);
