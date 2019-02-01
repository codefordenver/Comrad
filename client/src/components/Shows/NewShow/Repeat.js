import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

import moment from 'moment';

import Select from '../../Select';

import PickerDate from './PickerDate';

class Repeat extends Component {
  handleInputChange = e => {
    const { name, value } = e.target;
    this.props.inputUpdate({ [name]: value });
  };

  render() {
    const { repeat } = this.props.input;

    return (
      <div>
        {repeat && (
          <div className="show__grid_container">
            <div className="show__date_picker_end">
              Ends
              <PickerDate
                dateType="repeat_end_date"
                initialDate={moment(this.props.input.repeat_end_date)}
              />
            </div>

            <div className="">
              Repeat Type
              <Select
                selectOptions={['', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']}
                name="repeatType"
                onChange={this.handleInputChange}
              />
            </div>
          </div>
        )}
      </div>
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
)(Repeat);
