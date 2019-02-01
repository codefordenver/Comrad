import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { REGEX_ANY_CHARS } from '../../../utils/validation';

import moment from 'moment';

import Button from '../../Button';
import Card from '../../Card';
import Checkbox from '../../Checkbox';
import Form from '../../Form';
import Input from '../../Input';

import PickerDate from './PickerDate';
import PickerTime from './PickerTime';

import Repeat from './Repeat';

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
    return (
      <main className="show show__padding">
        <section className="show__body">
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
                  />
                </div>

                <div>
                  From
                  <PickerTime timeType="show_start_time_utc" />
                </div>

                <div>
                  To
                  <PickerTime timeType="show_end_time_utc" />
                </div>

                <div className="show__grid_container show__grid_span_3">
                  <div className="show__date_picker_start">
                    Start
                    <PickerDate
                      dateType="repeat_start_date"
                      initialDate={moment(this.props.input.repeat_start_date)}
                    />
                  </div>

                  <div className="">
                    Repeat
                    <Checkbox
                      name="repeat"
                      onChange={this.handleCheckboxChange}
                      type="checkbox"
                      defaultChecked={false}
                    />
                  </div>

                  <div className="show__grid_span_3">
                    <Repeat />
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
                    <Button color="secondary" onClick={this.handleFormCancel}>
                      Cancel
                    </Button>
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

function mapStateToProps(state) {
  return {
    input: state.input,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(NewShowForm);
