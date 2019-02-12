import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { REGEX_ANY_CHARS } from '../../../utils/validation';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import moment from 'moment';

import Button from '../../Button';
import Card from '../../Card';
import Checkbox from '../../Checkbox';
import Form from '../../Form';
import Input from '../../Input';

import PickerDate from './PickerDate';
import PickerTime from './PickerTime';

import Repeat from './Repeat';

import ModalClose from '../../Modal/Modal__Button_Close';

class NewShowForm extends Component {
  componentDidMount() {
    this.props.inputUpdate({ repeat: false });
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.props.inputUpdate({ [name]: value });
  };

  handleCheckboxChange = e => {
    const { repeat } = this.props.input;
    this.props.inputUpdateShowRepeatCheckbox({ repeat: !repeat });
  };

  handleFormSubmit = () => {
    this.props.setModalVisibility(null, false);
  };

  handleFormCancel = e => {
    e.preventDefault();
    this.props.setModalVisibility(null, false);
  };

  render() {
    const { isRepeat } = this.props;
    return (
      <main className="show show__padding">
        <section className="show__body">
          <Card>
            <form onSubmit={this.props.handleSubmit}>
              <div className="show__grid_container">
                <div className="show__grid_span_3">
                  <label htmlFor="title">Title</label>
                  <Field name="title" component="input" type="text" />
                </div>

                <div>
                  <label htmlFor="show_start_time_utc">From</label>
                  <Field
                    name="show_start_time_utc"
                    component="input"
                    type="time"
                    format={value => moment(value).format('HH:mm')}
                    parse={value => moment(value, 'HH:mm')}
                  />
                </div>

                <div>
                  <label htmlFor="show_end_time_utc">To</label>
                  <Field
                    name="show_end_time_utc"
                    component="input"
                    type="time"
                    format={value => moment(value).format('HH:mm')}
                    parse={value => moment(value, 'HH:mm')}
                  />
                </div>

                <div className="show__grid_container show__grid_span_3">
                  <div className="show__date_picker_start">
                    <label htmlFor="repeat_start_date">Start</label>
                    <Field name="repeat_start_date" component={PickerDate} />
                  </div>

                  <div className="">
                    <label htmlFor="repeat">Repeat</label>
                    <Field name="repeat" component="input" type="checkbox" />
                  </div>

                  <div className="show__grid_span_3">
                    {isRepeat && <Repeat />}
                  </div>
                </div>

                <div className="show__grid_span_3">
                  Summary
                  <Input
                    name="summary"
                    onChange={this.handleInputChange}
                    type="text"
                  />
                </div>

                <div className="show__grid_span_3">
                  Description
                  <Input
                    name="description"
                    onChange={this.handleInputChange}
                    type="text"
                  />
                </div>

                <div>
                  Producer
                  <Input
                    name="producer"
                    onChange={this.handleInputChange}
                    type="text"
                  />
                </div>

                <div>
                  Host
                  <Input
                    name="host"
                    onChange={this.handleInputChange}
                    type="text"
                  />
                </div>

                <div>
                  Playlist
                  <Input
                    name="playlist"
                    onChange={this.handleInputChange}
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
  const isRepeat = selector(state, 'repeat');
  console.log(state.input.show_start_time_utc);
  return {
    initialValues: {
      show_start_time_utc: moment(state.input.show_start_time_utc),
      show_end_time_utc: moment(state.input.show_end_time_utc),
      repeat: false,
    },
    isRepeat,
  };
}

NewShowForm = reduxForm({
  form: 'newShow',
})(NewShowForm);

export default connect(
  mapStateToProps,
  actions,
)(NewShowForm);
