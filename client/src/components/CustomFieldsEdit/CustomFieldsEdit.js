import React, { Component } from 'react';

import { Field } from 'redux-form';

import Checkbox from '../Checkbox';
import Select from '../Select';

class CustomFieldsEdit extends Component {
  render() {
    const { fieldsMeta } = this.props;

    let elements = [];

    fieldsMeta.forEach(function(field, index) {
      let fieldName = 'custom.' + field.name;
      switch (field.editFieldType) {
        case 'checkbox':
          elements.push(
            <Field
              key={index}
              component={Checkbox}
              label={field.label}
              name={fieldName}
            />,
          );
          break;
        case 'dropdown':
          if (typeof field.options != 'object') {
            console.error(
              'options value not provided for custom field ' + fieldName,
            );
          } else {
            elements.push(
              <Field
                key={index}
                component={Select}
                label={field.label}
                name={fieldName}
                selectOptions={field.options}
              />,
            );
          }
          break;
        default:
          console.error(
            'no handler for custom field type of ' + field.editFieldType,
          );
          break;
      }
    });

    return <>{elements}</>;
  }
}

export default CustomFieldsEdit;
