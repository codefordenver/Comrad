import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { REGEX_ANY_CHARS } from '../../../utils/validation';

import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';

import Button from '../../Button';
import Card from '../../Card';
import Checkbox from '../../Checkbox';
import Form from '../../Form';
import Input from '../../Input';
import Select from '../../Select';

const initialState = {
  title: '',
  summary: '',
  description: '',
  producer: '',
  host: '',
  playlist: '',

  show_start_time_utc: moment(),
  show_end_time_utc: moment().add(1, 'hour'),

  repeat: false,
  repeatType: '',
  repeat_start_date: moment(),
  repeat_end_date: moment(),

  start_focused: false,
  end_focused: false,
};

class NewShowForm extends Component {
  state = initialState;

  updateTime(date, time) {
    const newHours = moment(time, 'HH:mm').format('HH');
    const newMinutes = moment(time, 'HH:mm').format('mm');

    return moment(date)
      .hours(newHours)
      .minutes(newMinutes);
  }

  updateDateAndTime = repeat => {
    const date = this.state.repeat_start_date;
    const { show_start_time_utc, show_end_time_utc } = this.state;

    const newStartTime = this.updateTime(date, show_start_time_utc);
    const newEndTime = this.updateTime(date, show_end_time_utc);

    this.setState({
      show_start_time_utc: newStartTime,
      show_end_time_utc: newEndTime,
    });

    if (!repeat) {
      this.setState({
        repeat_end_date: date,
        repeatType: '',
      });
    }
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleCheckboxChange = e => {
    const { name, value } = e.target;
    const { repeat } = this.state;

    this.setState({ [name]: !repeat }, () => this.updateDateAndTime(repeat));
  };

  handleInputDateChange = (type, dateValue) => {
    const { repeat } = this.state;

    this.setState({ [type]: dateValue }, () => this.updateDateAndTime(repeat));
  };

  handleInputChangeTime = e => {
    const { name, value } = e.target;
    const date = this.state.repeat_start_date;

    const newTime = this.updateTime(date, value);

    this.setState({
      [name]: newTime,
    });
  };

  handleInputBlur = e => {
    //validate.input(e.target);
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.props.setModalVisibility(null, false);
  };

  handleFormCancel = e => {
    e.preventDefault();
    this.setState(initialState);
    this.props.setModalVisibility(null, false);
  };

  render() {
    console.log(this.state);
    return (
      <main className="show">
        <section className="show__body">
          {console.log('New State')}
          {console.log(this.props.postShow)}

          <Card>
            <Form callback={this.handleFormSubmit} action={this.props.postShow}>
              <div className="show__grid_container">
                <div className="show__grid_span_3">
                  Title
                  <Input
                    name="title"
                    onChange={this.handleInputChange}
                    type="text"
                    validate={REGEX_ANY_CHARS}
                    feedback="Enter Field"
                    action="custom"
                  />
                </div>

                <div>
                  From
                  <Input
                    name="show_start_time_utc"
                    onChange={this.handleInputChangeTime}
                    type="time"
                    value={moment(this.state.show_start_time_utc).format(
                      'HH:mm',
                    )}
                    validate={REGEX_ANY_CHARS}
                    feedback="Enter Field"
                  />
                </div>

                <div>
                  To
                  <Input
                    name="show_end_time_utc"
                    onChange={this.handleInputChangeTime}
                    type="time"
                    value={moment(this.state.show_end_time_utc).format('HH:mm')}
                    validate={REGEX_ANY_CHARS}
                    feedback="Enter Field"
                  />
                </div>

                <div className="show__grid_container show__grid_span_3">
                  <div className="">
                    Start
                    <SingleDatePicker
                      date={this.state.repeat_start_date} // momentPropTypes.momentObj or null
                      onDateChange={repeat_start_date =>
                        this.handleInputDateChange(
                          'repeat_start_date',
                          repeat_start_date,
                        )
                      } // PropTypes.func.isRequired
                      focused={this.state.start_focused} // PropTypes.bool
                      onFocusChange={({ focused }) =>
                        this.setState({ start_focused: focused })
                      } // PropTypes.func.isRequired
                      id="show_start_date_picker" // PropTypes.string.isRequired,
                      isOutsideRange={() => false}
                      numberOfMonths={1}
                    />
                  </div>

                  <div className="">
                    Repeat
                    <Checkbox
                      name="repeat"
                      onChange={this.handleCheckboxChange}
                      type="checkbox"
                      defaultChecked={this.state.repeat}
                    />
                  </div>

                  {this.state.repeat && (
                    <div className="">
                      <div className="">
                        Ends
                        <SingleDatePicker
                          date={this.state.repeat_end_date} // momentPropTypes.momentObj or null
                          onDateChange={repeat_end_date =>
                            this.handleInputDateChange(
                              'repeat_end_date',
                              repeat_end_date,
                            )
                          } // PropTypes.func.isRequired
                          focused={this.state.end_focused} // PropTypes.bool
                          onFocusChange={({ focused }) =>
                            this.setState({ end_focused: focused })
                          } // PropTypes.func.isRequired
                          id="show_end_date_picker" // PropTypes.string.isRequired,
                          isOutsideRange={() => false}
                          numberOfMonths={1}
                        />
                      </div>

                      <div className="">
                        Repeat Type
                        <Select
                          selectOptions={[
                            'DAILY',
                            'WEEKLY',
                            'MONTHLY',
                            'YEARLY',
                          ]}
                          name="repeatType"
                          onChange={this.handleInputChange}
                          value={this.state.repeatType}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="show__grid_span_3">
                  Summary
                  <Input
                    name="summary"
                    onChange={this.handleInputChange}
                    type="text"
                    value={this.state.summary}
                  />
                </div>

                <div className="show__grid_span_3">
                  Description
                  <Input
                    name="description"
                    onChange={this.handleInputChange}
                    type="text"
                    value={this.state.description}
                  />
                </div>

                <div>
                  Producer
                  <Input
                    name="producer"
                    onChange={this.handleInputChange}
                    type="text"
                    value={this.state.producer}
                  />
                </div>

                <div>
                  Host
                  <Input
                    name="host"
                    onChange={this.handleInputChange}
                    type="text"
                    value={this.state.host}
                  />
                </div>

                <div>
                  Playlist
                  <Input
                    name="playlist"
                    onChange={this.handleInputChange}
                    type="text"
                    value={this.state.playlist}
                  />
                </div>

                <div className="show__grid_span_3">
                  <div className="">
                    <Button color="primary" type="submit">
                      Save
                    </Button>

                    <Button onClick={this.handleFormCancel}>Cancel</Button>
                  </div>
                </div>
              </div>
            </Form>
          </Card>
        </section>
      </main>
    );
  }
}

export default connect(
  null,
  actions,
)(NewShowForm);
