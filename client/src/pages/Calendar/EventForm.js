import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import * as actions from "../../actions";

class EventForm extends Component {
  componentDidMount() {
    this.props.initialize(this.props.event);
  }

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      postEvent,
    } = this.props;

    console.log("Event form: " + this.props.event);
    
    return (
      <form
        onSubmit={handleSubmit(values => {
          postEvent(values);
        })}
      >
        <div>
          <label>Event Name</label>
          <div>
            <Field
              name="title"
              component="input"
              type="text"
              placeholder="Event Name"
              className = "field-width"
            />
          </div>
        </div>
        <div>
          <label>Event Description</label>
          <div>
            <Field
              name="eventDescription"
              component="input"
              type="text"
              placeholder="Event Description"
              className = "field-width"
            />
          </div>
        </div>
        <div>
          <label>Start Time</label>
          <div>
            <Field name="start" component="input" type="text" className = "field-width"/>
          </div>
        </div>
        <div>
          <label>End Time</label>
          <div>
            <Field name="end" component="input" type="text" className = "field-width"/>
          </div>
        </div>
        <div>
          <label>Resource ID</label>
          <div>
            <Field name="resourceId" component="input" type="text" className = "field-width"/>
          </div>
        </div>
        <div>
          <label htmlFor="repeat_bool">Repeat</label>
          <div>
            <Field
              name="repeat_bool"
              id="repeat_bool"
              component="input"
              type="checkbox"
              className = "field-width"
            />
          </div>
        </div>
        <div>
          <label>Repeat Type</label>
          <div>
            <Field name="repeat_type" component="select" className = "field-width">
              <option />
              <option value="hour">Hourly</option>
              <option value="day">Daily</option>
              <option value="week">Weekly</option>
              <option value="month">Monthly</option>
              <option value="year">Yearly</option>
            </Field>
          </div>
        </div>
        <div>
          <label>Notes</label>
          <div>
            <Field name="notes" component="textarea" className = "field-width"/>
          </div>
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>
            Submit
          </button>
          <button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Clear Values
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  //
});

EventForm = connect(
  mapStateToProps,
  actions
)(EventForm);

export default reduxForm({
  form: "newEvent" // a unique identifier for this form
})(EventForm);
