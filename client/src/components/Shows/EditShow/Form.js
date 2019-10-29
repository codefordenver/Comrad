import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

import Button from '../../Button';
import Card, { CardBody } from '../../Card';
import ModalClose from '../../Modal/Modal__Button_Close';
import RepeatDropdown from '../../RepeatDropdown';
import ShowDetailsTop from '../CommonShowForms/ShowDetailsTop';
import ShowDetailsBottom from '../CommonShowForms/ShowDetailsBottom';

import { getShowSelected, getSearchDate } from '../../../redux/show';

const FORM_NAME = 'EDIT_SHOW';
const ALLOW_REPEAT_SELECT = false;
class EditShowForm extends Component {
  render() {
    const { props } = this;
    const {
      isInstance,
      isRepeat,
      handleSubmit,
      date,
      editSummaryAndDescriptionOnly,
    } = props;
    const host = props.initialValues.initial.show_details.host;

    return (
      <Card>
        <CardBody>
          <form className="edit-show-form" onSubmit={handleSubmit}>
            <div className="edit-show-form__grid">
              {!editSummaryAndDescriptionOnly && (
                <ShowDetailsTop
                  formSelectorName={FORM_NAME}
                  date={date}
                  allowRepeatSelect={ALLOW_REPEAT_SELECT}
                />
              )}

              {isRepeat && ALLOW_REPEAT_SELECT && (
                <RepeatDropdown formSelectorName={FORM_NAME} date={date} />
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
  const selectedShow = getShowSelected(state.show);
  const initialValues = state => {
    const searchDates = getSearchDate(state.show);
    if (!selectedShow.repeat_start_date) {
      selectedShow.repeat_start_date = selectedShow.start_time_utc;
    }
    return {
      ...selectedShow,
      initial: { ...selectedShow },
      startDate: searchDates.start,
      endDate: searchDates.end,
    };
  };

  const isRepeat = selector(state, 'is_recurring');
  const isInstance = selectedShow.master_event_id != null;
  const date = selector(state, 'start_time_utc');

  return {
    initialValues: initialValues(state),
    isInstance,
    isRepeat,
    date,
  };
}

EditShowForm = reduxForm({
  form: FORM_NAME,
})(EditShowForm);

export default connect(
  mapStateToProps,
  {},
)(EditShowForm);
