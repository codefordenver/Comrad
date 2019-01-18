import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import validate from '../../../utils/validation';

import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';

import Button from '../../Button';
import Card from '../../Card';
import CardBody from '../../CardBody';
import Checkbox from '../../Checkbox';
import Form from '../../Form';
import Input from '../../Input';
import Label from '../../Label';
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
    validate.input(e.target);
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const valid = validate.submit();

    //NEED TO SETUP VALIDATION
    this.props.postShow(this.state);
    this.props.setModalVisibility(null, false);

    if (valid) {
      //this.props.postShow(this.state);
    }
  };

  handleFormCancel = e => {
    e.preventDefault();
    this.setState(initialState);
    this.props.setModalVisibility(null, false);
  };

  render() {
    return (
      <main className="show">
        <section className="show__body">
          {console.log('New State')}
          {console.log(this.state)}

          <Card>
            <CardBody>
              <Form>
                <div className="show__grid_container">
                  <div className="show__grid_span_3">
                    <Label>Title</Label>
                    <Input
                      name="title"
                      onChange={this.handleInputChange}
                      onBlur={this.handleInputBlur}
                      type="text"
                      value={this.state.title}
                    />
                  </div>

                  <div>
                    <Label>From</Label>
                    <Input
                      name="show_start_time_utc"
                      onChange={this.handleInputChangeTime}
                      onBlur={this.handleInputBlur}
                      type="time"
                      value={moment(this.state.show_start_time_utc).format(
                        'HH:mm',
                      )}
                    />
                  </div>

                  <div>
                    <Label>To</Label>
                    <Input
                      name="show_end_time_utc"
                      onChange={this.handleInputChangeTime}
                      onBlur={this.handleInputBlur}
                      type="time"
                      value={moment(this.state.show_end_time_utc).format(
                        'HH:mm',
                      )}
                    />
                  </div>
                  <div className="show__grid_container show__grid_span_3">
                    <div className="">
                      <Label>Start</Label>
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
                      <Label>Repeat</Label>
                      <Checkbox
                        name="repeat"
                        onChange={this.handleCheckboxChange}
                        onBlur={this.handleInputBlur}
                        type="checkbox"
                        defaultChecked={this.state.repeat}
                      />
                    </div>

                    {this.state.repeat && (
                      <div className="">
                        <div className="">
                          <Label>Ends</Label>
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
                          <Label>Repeat Type</Label>
                          <Select
                            selectOptions={[
                              'DAILY',
                              'WEEKLY',
                              'MONTHLY',
                              'YEARLY',
                            ]}
                            name="repeatType"
                            onChange={this.handleInputChange}
                            onBlur={this.handleInputBlur}
                            value={this.state.repeatType}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="show__grid_span_3">
                    <Label>Summary</Label>
                    <Input
                      name="summary"
                      onChange={this.handleInputChange}
                      onBlur={this.handleInputBlur}
                      type="text"
                      value={this.state.summary}
                    />
                  </div>

                  <div className="show__grid_span_3">
                    <Label>Description</Label>
                    <Input
                      name="description"
                      onChange={this.handleInputChange}
                      onBlur={this.handleInputBlur}
                      type="text"
                      value={this.state.description}
                    />
                  </div>

                  <div>
                    <Label>Producer</Label>
                    <Input
                      name="producer"
                      onChange={this.handleInputChange}
                      onBlur={this.handleInputBlur}
                      type="text"
                      value={this.state.producer}
                    />
                  </div>

                  <div>
                    <Label>Host</Label>
                    <Input
                      name="host"
                      onChange={this.handleInputChange}
                      onBlur={this.handleInputBlur}
                      type="text"
                      value={this.state.host}
                    />
                  </div>

                  <div>
                    <Label>Playlist</Label>
                    <Input
                      name="playlist"
                      onChange={this.handleInputChange}
                      onBlur={this.handleInputBlur}
                      type="text"
                      value={this.state.playlist}
                    />
                  </div>

                  <div className="show__grid_span_3">
                    <div className="">
                      <Button onClick={this.handleFormSubmit} type="primary">
                        Save
                      </Button>

                      <Button onClick={this.handleFormCancel} type="secondary">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            </CardBody>
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
