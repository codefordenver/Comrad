import React, { Component } from 'react';

import { Field } from 'redux-form';

import Checkbox from '../Checkbox';
import Select from '../Select';
import Input from '../Input';

import {
  requiredValidate,
} from '../../utils/validation';

class CustomFieldsEdit extends Component {
  render() {
    const { fieldsMeta, prefixToCustomProperty } = this.props;

    let elements = [];

    fieldsMeta.forEach(function(field, index) {
      let fieldName = 'custom.' + field.name;
      let defaultValue = field.defaultValue;
      if (prefixToCustomProperty != null) {
        fieldName = prefixToCustomProperty + '.' + fieldName;
      }
      switch (field.editFieldType) {
        case 'checkbox':
          elements.push(
            <Field
              key={index}
              className="mb-1-5"
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
                className="mb-1-5"
                component={Select}
                label={field.label}
                name={fieldName}
                selectOptions={field.options}
              />,
            );
          }
          break;
        case 'text':
          elements.push(
            <Field
              key={index}
              className="mb-1-5"
              component={Input}
              label={field.label}
              name={fieldName}
              validate={field.required ? requiredValidate : null}
            />,
          );
          break;
        case 'hidden':
          elements.push(
            <Field
              key={index}
              className="mb-1-5"
              type="hidden"
              name={fieldName}
              component="input"
            />,
          );
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
