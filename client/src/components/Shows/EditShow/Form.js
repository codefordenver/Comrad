import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

import Button from '../../Button';
import Card, { CardBody } from '../../Card';
import ModalClose from '../../Modal/Modal__Button_Close';
import RepeatDropdown from '../../RepeatDropdown';
import ShowDetailsTop from '../CommonShowForms/ShowDetailsTop';
import ShowDetailsBottom from '../CommonShowForms/ShowDetailsBottom';

import { getSearchDate } from '../../../redux/show';

import { repeatRuleToDropdownValue } from '../../../utils/events';

const FORM_NAME = 'EDIT_SHOW';
const ALLOW_REPEAT_SELECT = true;
class EditShowForm extends Component {

  state= {
    dateUtc: new Date()
  };

  componentDidUpdate() {
    const { props } = this;
    const {
      currentValues,
    } = props;
    let dateUtc = new Date();

    if (currentValues.start_time_utc != null && !currentValues.master_event_id) {
      dateUtc = currentValues.start_time_utc;
    } else if (currentValues.master_event_id && currentValues.repeat_rule != null 
              && currentValues.repeat_rule.repeat_start_date != null) {
      dateUtc = currentValues.repeat_rule.repeat_start_date;
    }

    if (String(this.state.dateUtc) != String(dateUtc)) {

      this.setState({
        "dateUtc": dateUtc
      });
    }
  };

  render() {
    const { props } = this;
    const {
      currentValues,
      isInstance,
      isRepeat,
      handleSubmit,
      editSummaryAndDescriptionOnly,
    } = props;
    const { dateUtc } = this.state;
    const host = props.initialValues.initial.show_details.host;

    return (
      <Card>
        <CardBody>
          <form className="edit-show-form" onSubmit={handleSubmit} autoComplete="off">
            <div className="edit-show-form__grid">
              {!editSummaryAndDescriptionOnly && (
                <ShowDetailsTop allowRepeatSelect={ALLOW_REPEAT_SELECT} />
              )}

              {isRepeat && ALLOW_REPEAT_SELECT && (
                <RepeatDropdown
                  formSelectorName={FORM_NAME}
                  dateUtc={dateUtc}
                  initialValues={this.props.initialValues}
                />
              )}

              <ShowDetailsBottom
                host={host}
                editSummaryAndDescriptionOnly={editSummaryAndDescriptionOnly}
                isInstance={isInstance}
              />
            </div>

            <div className="edit-show-form__buttons">
              <Button color="primary" type="submit">
                Save
              </Button>

              <ModalClose />
            </div>
          </form>
        </CardBody>
      </Card>
    );
  }
}

const selector = formValueSelector(FORM_NAME);

function mapStateToProps(state) {
  const selectedShow = state.show.selected;
  const initialValues = state => {
    const searchDates = getSearchDate(state.show);
    return {
      ...selectedShow,
      initial: { ...selectedShow },
      startDate: searchDates.start,
      endDate: searchDates.end,
      repeat_rule_dropdown_value: repeatRuleToDropdownValue(
        selectedShow.repeat_rule,
      ),
    };
  };

  const isRepeat = selector(state, 'is_recurring');
  const isInstance =
    selectedShow.master_event_id != null &&
    selectedShow.master_event_id._id !== selectedShow._id;
  const date = selector(state, 'start_time_utc');

  const currentValues =
    state.form[FORM_NAME] != null ? state.form[FORM_NAME].values : {};

  return {
    currentValues,
    initialValues: initialValues(state),
    isInstance,
    isRepeat,
    date,
  };
}

EditShowForm = reduxForm({
  form: FORM_NAME,
})(EditShowForm);

export default connect(mapStateToProps, {})(EditShowForm);
