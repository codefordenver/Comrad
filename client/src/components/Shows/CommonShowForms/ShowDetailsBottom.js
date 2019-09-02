import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import Input from '../../Input';
import DropdownHost from '../../DropdownHost';
import TextArea from '../../TextArea';

class ShowDetailsBottom extends Component {
  render() {
    const { host, editSummaryAndDescriptionOnly = false } = this.props;
    return (
      <>
        <Field
          className="grid-span--2"
          component={TextArea}
          label="Summary"
          name="show_details.summary"
          type="text"
        />

        <Field
          className="grid-span--2"
          component={TextArea}
          label="Description"
          name="show_details.description"
          type="text"
        />

        {!editSummaryAndDescriptionOnly && (
          <Field
            label="Producer"
            name="show_details.producer"
            component={Input}
            type="text"
          />
        )}

        {!editSummaryAndDescriptionOnly && (
          <Field
            label="Host"
            name="show_details.host"
            component={DropdownHost}
            host={host}
          />
        )}
      </>
    );
  }
}

export default connect(
  null,
  null,
)(ShowDetailsBottom);
