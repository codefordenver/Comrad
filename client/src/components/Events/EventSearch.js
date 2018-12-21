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
  start_date: moment().subtract(1, 'day'),
  end_date: moment(),

  start_focused: false,
  end_focused: false,
};

class EventSearch extends Component {
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

    this.props.searchShow(this.state.start_date, this.state.end_date);

    //NEED TO SETUP VALIDATION
    if (valid) {
      //this.props.searchShow(this.state);
    }
  };

  handleFormCancel = e => {
    e.preventDefault();

    this.setState(initialState);
  };

  render() {
    return (
      <main className="event_search">
        <section className="event_search__body">
          {console.log(this.state)}

          <Card styleName="event_search">
            <CardBody>
              <CardTitle className="text-center">Search For Events:</CardTitle>

              <Form>
                <FormGroup>
                  <Label>Show Start Date</Label>
                  <SingleDatePicker
                    date={this.state.start_date} // momentPropTypes.momentObj or null
                    onDateChange={start_date => this.setState({ start_date })} // PropTypes.func.isRequired
                    focused={this.state.start_focused} // PropTypes.bool
                    onFocusChange={({ focused }) =>
                      this.setState({ start_focused: focused })
                    } // PropTypes.func.isRequired
                    id="search_start_date_picker" // PropTypes.string.isRequired,
                    isOutsideRange={() => false}
                    numberOfMonths={1}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Show End Date</Label>
                  <SingleDatePicker
                    date={this.state.end_date} // momentPropTypes.momentObj or null
                    onDateChange={end_date => this.setState({ end_date })} // PropTypes.func.isRequired
                    focused={this.state.end_focused} // PropTypes.bool
                    onFocusChange={({ focused }) =>
                      this.setState({ end_focused: focused })
                    } // PropTypes.func.isRequired
                    id="search_end_date_picker" // PropTypes.string.isRequired,
                    isOutsideRange={() => false}
                    numberOfMonths={1}
                  />
                </FormGroup>
                <FormGroup className="text-center">
                  <Button onClick={this.handleFormSubmit} type="primary">
                    Search For Events
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
)(EventSearch);
