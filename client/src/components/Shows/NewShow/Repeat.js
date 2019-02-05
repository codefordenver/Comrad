import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

import moment from 'moment';

import Select from '../../Select';

import RepeatDropdown from './Repeat_Dropdown';
import PickerDate from './PickerDate';

class Repeat extends Component {
  handleInputChange = e => {
    const { name, value } = e.target;
    this.props.inputUpdate({ [name]: value });
  };

  render() {
    const { repeat, repeat_start_date, repeat_end_date } = this.props.input;

    return (
      <div>
        {repeat && (
          <div className="show__grid_container">
            <div className="show__date_picker_end">
              Ends
              <PickerDate
                dateType="repeat_end_date"
                initialDate={repeat_end_date}
              />
            </div>

            <div className="">
              <RepeatDropdown date={repeat_start_date} />
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
