import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import validate from '../../utils/validation';

import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import 'react-dates/lib/css/_datepicker.css';

import Button from '../../components/Button';
import Card from '../../components/Card';
import CardBody from '../../components/CardBody';
import CardImg from '../../components/CardImg';
import CardTitle from '../../components/CardTitle';
import Checkbox from '../../components/Checkbox';
import Form from '../../components/Form';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import Label from '../../components/Label';
import Select from '../../components/Select';

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

  repeat_start_date: moment(),
  repeat_end_date: moment('1900', 'YYYY'),

  focused: false,
};

class EventNew extends Component {
  state = initialState;

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleInputChangeTime = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: moment(value, 'HH:mm'),
    });
  };

  handleInputBlur = e => {
    validate.input(e.target);
  };

  handleFormSubmit = e => {
    e.preventDefault();

    const valid = validate.submit();

    this.props.postShow(this.state);

    //NEED TO SETUP VALIDATION
    if (valid) {
      //this.props.postShow(this.state);
    }
  };

  handleFormCancel = e => {
    e.preventDefault();

    this.setState(initialState);
  };

  render() {
    return (
      <main className="event">
        <section className="event__body">
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
                      this.setState({ repeat_start_date })
                    } // PropTypes.func.isRequired
                    focused={this.state.focused} // PropTypes.bool
                    onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                    id="show_start_date_picker" // PropTypes.string.isRequired,
                    numberOfMonths={1}
                  />
                </FormGroup>

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
                </FormGroup>

                <FormGroup>
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
                    Create Event
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
)(EventNew);
