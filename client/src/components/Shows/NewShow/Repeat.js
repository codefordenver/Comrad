import React, { Component } from 'react';
import { Field } from 'redux-form';

import RepeatDropdown from './Repeat_Dropdown';
import PickerDate from './PickerDate';

class Repeat extends Component {
  componentWillMount() {
    console.log('mounting');
  }
  componentWillUnmount() {
    console.log('unmounting');
  }

  render() {
    return (
      <div>
        <div className="show__grid_container">
          <div className="show__date_picker_end">
            <Field
              label="End"
              name="repeat_end_date"
              component={PickerDate}
              showClearDate
              placeholder="Never"
            />
          </div>

          <div className="show__grid_span_2">
            <RepeatDropdown />
          </div>
        </div>
      </div>
    );
  }
}

export default Repeat;
