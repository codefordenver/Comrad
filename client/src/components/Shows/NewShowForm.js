import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import validate from '../../utils/validation';

import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';

import Button from '../Button';
import Card from '../Card';
import CardBody from '../CardBody';
import CardTitle from '../CardTitle';
import Checkbox from '../Checkbox';
import Form from '../Form';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Label from '../Label';
import Select from '../Select';

const initialState = {
  title: '',
  summary: '',
  description: '',
  producer: '',
  host: '',
  guests: '',
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
              <CardTitle className="text-center">Create New Event:</CardTitle>

              <Form>
                <FormGroup>
                  <Label>Title</Label>
                  <Input
                    name="title"
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputBlur}
                    type="text"
                    value={this.state.title}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Show Start Date</Label>
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
                  <Label>Repeat</Label>
                  <Checkbox
                    name="repeat"
                    onChange={this.handleCheckboxChange}
                    onBlur={this.handleInputBlur}
                    type="checkbox"
                    defaultChecked={this.state.repeat}
                  />
                </FormGroup>

                {this.state.repeat && (
                  <div>
                    <FormGroup>
                      <Label>Repeat End Date</Label>
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

                      <Label>Repeat Type</Label>
                      <Select
                        selectOptions={['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']}
                        name="repeatType"
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputBlur}
                        value={this.state.repeatType}
                      />
                    </FormGroup>
                  </div>
                )}

                <FormGroup>
                  <Label>Show Start Time</Label>
                  <Input
                    name="show_start_time_utc"
                    onChange={this.handleInputChangeTime}
                    onBlur={this.handleInputBlur}
                    type="time"
                    value={moment(this.state.show_start_time_utc).format(
                      'HH:mm',
                    )}
                  />

                  <Label>Show End Time</Label>
                  <Input
                    name="show_end_time_utc"
                    onChange={this.handleInputChangeTime}
                    onBlur={this.handleInputBlur}
                    type="time"
                    value={moment(this.state.show_end_time_utc).format('HH:mm')}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Summary</Label>
                  <Input
                    name="summary"
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputBlur}
                    type="text"
                    value={this.state.summary}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Description</Label>
                  <Input
                    name="description"
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputBlur}
                    type="text"
                    value={this.state.description}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Producer</Label>
                  <Input
                    name="producer"
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputBlur}
                    type="text"
                    value={this.state.producer}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Host</Label>
                  <Input
                    name="host"
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputBlur}
                    type="text"
                    value={this.state.host}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Guests</Label>
                  <Input
                    name="guests"
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputBlur}
                    type="text"
                    value={this.state.guests}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Playlist</Label>
                  <Input
                    name="playlist"
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputBlur}
                    type="text"
                    value={this.state.playlist}
                  />
                </FormGroup>

                <FormGroup className="text-center">
                  <Button onClick={this.handleFormSubmit} type="primary">
                    Create Show
                  </Button>

                  <Button onClick={this.handleFormCancel} type="secondary">
                    Cancel
                  </Button>
                </FormGroup>
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
