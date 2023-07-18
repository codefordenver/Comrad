import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, FieldArray } from 'redux-form';
import { bindActionCreators } from 'redux';
import ButtonIcon from '../../ButtonIcon';
import CustomFieldsEdit from '../../CustomFieldsEdit';
import Input from '../../Input';
import DropdownHost from '../../DropdownHost';
import RichTextArea from '../../RichTextArea';
import TextArea from '../../TextArea';
import { requiredValidate } from '../../../utils/validation';
import { configActions } from '../../../redux';

class ShowDetailsBottom extends Component {
  componentWillMount() {
    const { configState, configActions } = this.props;
    if (!('show' in configState.customFields)) {
      configActions.customFieldsForModel('show');
    }
  }

  renderGuests = ({ fields, meta: { error, submitFailed } }) => {
    return (
      <div>
        <ul className="edit-show-form__guest-list">
          <li>
            <h3>Guests</h3>
            <ButtonIcon
              icon="plus"
              type="button"
              onClick={e => {
                e.preventDefault();
                fields.push('');
              }}
            />
          </li>
          {fields.map((fieldName, index) => (
            <li key={'field_' + index}>
              <Field
                name={`${fieldName}`}
                type="text"
                component={Input}
                label="Guest"
                validate={[requiredValidate]}
              />
              <ButtonIcon
                icon="cancel"
                type="button"
                onClick={e => {
                  e.preventDefault();
                  fields.remove(index);
                }}
              />
            </li>
          ))}
        </ul>
        {submitFailed && error && <span>{error}</span>}
      </div>
    );
  };

  render() {
    const {
      configState,
      host,
      editDescriptionOnly = false,
      isInstance,
    } = this.props;

    let showCustomFields = [];
    if ('show' in configState.customFields) {
      showCustomFields = configState.customFields.show;
    }

    return (
      <>
        {!editDescriptionOnly && (
          <Field
            className="grid-span--2"
            component={TextArea}
            label="Summary"
            name="show_details.summary"
            type="text"
          />
        )}

        <Field
          className="grid-span--2"
          component={RichTextArea}
          label="Description"
          name="show_details.description"
          type="text"
        />

        {!editDescriptionOnly && (
          <Field
            label="Producer"
            name="show_details.producer"
            component={Input}
            type="text"
          />
        )}

        {!editDescriptionOnly && (
          <Field
            label="Host"
            name="show_details.host"
            component={DropdownHost}
            host={host}
          />
        )}
        {!editDescriptionOnly && isInstance && (
          <FieldArray
            name="show_details.guests"
            component={this.renderGuests}
          />
        )}
        {!editDescriptionOnly && (
          <CustomFieldsEdit
            prefixToCustomProperty="show_details"
            fieldsMeta={showCustomFields}
          />
        )}
      </>
    );
  }
}

function mapStateToProps({ config }) {
  return {
    configState: config,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    configActions: bindActionCreators({ ...configActions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowDetailsBottom);
