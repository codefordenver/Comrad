import React, { Component } from 'react';
import { Field } from 'redux-form';

import RepeatDropdown from './Repeat_Dropdown';
import DatePicker from '../../DatePicker';

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
              component={DatePicker}
              showClearDate
              placeholder="Never"
              allowNullDate
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
