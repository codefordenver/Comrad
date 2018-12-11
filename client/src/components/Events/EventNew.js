import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import validate from "../../utils/validation";
import logo from "../../images/kgnu_logo.png";

import Button from '../../components/Button'
import Card from "../../components/Card";
import CardBody from "../../components/CardBody";
import CardImg from "../../components/CardImg";
import CardTitle from "../../components/CardTitle";
import Checkbox from "../../components/Checkbox";
import Form from "../../components/Form";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import Label from "../../components/Label";
import Select from "../../components/Select";

const initialState = {
  title: "",
  summary: "",
  description: "",
  producer: "",
  host: "",
  guests: "",
  playlist: "",
  show_start_time_utc: "",
  show_end_time_utc: ""
};

class EventNew extends Component {
  state = initialState;

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  handleInputBlur = e => {
    validate.input(e.target);
  };

  handleFormSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const valid = validate.submit();

    if (valid) {
      this.props.loginUser({ email, password }, () => {
        this.props.history.push("/");
      });
    }
  };

  render() {
    const { errorMessage } = this.props.auth;

    return (
      <main className="event">
        <section className="event__body">
          <Card>
            <CardBody>
              <CardTitle className="text-center" >Create New Event:</CardTitle>

              {errorMessage ? <div>{errorMessage}</div> : null}

              <Form onSubmit={this.handleFormSubmit}>
                <Label>Title</Label>
                <FormGroup>
                  <Input
                    name="title"
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputBlur}
                    type="text"
                    value={this.state.title}
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
                    name="guest"
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputBlur}
                    type="text"
                    value={this.state.guest}
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
                  <Button type="primary">Create Event</Button>

                  <Button type="secondary">Cancel</Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </section>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps,
  actions
)(EventNew);
