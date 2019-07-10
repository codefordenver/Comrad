import React, { Component } from 'react';

class CustomFieldsView extends Component {
  render() {
    const { fieldsMeta, fieldsValues } = this.props;

    let elements = [];

    fieldsMeta.forEach(function(field, index) {
      if (field.name in fieldsValues && fieldsValues[field.name] != null) {
        let value = fieldsValues[field.name];
        if (value === true) {
          value = 'Yes';
        } else if (value === false) {
          value = 'No';
        }
        elements.push(
          <div key={index}>
            <span>{field.label}:</span> {value}
          </div>,
        );
      }
    });

    return <>{elements}</>;
  }
}

export default CustomFieldsView;
