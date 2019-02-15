import React, { Component } from 'react';
import { Field } from 'redux-form';

import RepeatDropdown from './Repeat_Dropdown';
import PickerDate from './PickerDate';

class Repeat extends Component {
  render() {
    return (
      <div>
        <div className="show__grid_container">
          <div className="show__date_picker_end">
            <label htmlFor="repeat_end_date">Ends</label>
            <Field name="repeat_end_date" component={PickerDate} />
          </div>

          <div className="">
            <RepeatDropdown />
          </div>
        </div>
      </div>
    );
  }
}

export default Repeat;
