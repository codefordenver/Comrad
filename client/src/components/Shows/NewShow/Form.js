import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import moment from 'moment';

import Button from '../../Button';
import Card, { CardBody } from '../../Card';
import ModalClose from '../../Modal/Modal__Button_Close';
import RepeatDropdown from '../../RepeatDropdown';
import ShowDetailsTop from '../CommonShowForms/ShowDetailsTop';
import ShowDetailsBottom from '../CommonShowForms/ShowDetailsBottom';

import { getSearchDate } from '../../../redux/show';

const FORM_NAME = 'NEW_SHOW';
const ALLOW_REPEAT_SELECT = true;
class NewShowForm extends Component {
  componentDidMount() {
    const { change, date } = this.props;
    change(FORM_NAME, 'repeat_rule.repeat_start_date', date);
  }

  render() {
    const { props } = this;
    const { isRepeat, handleSubmit, date } = props;

    return (
      <Card>
        <CardBody>
          <form autoComplete="off" className="new-show-form" onSubmit={handleSubmit}>
            <div className="edit-show-form__grid">
              <ShowDetailsTop allowRepeatSelect={ALLOW_REPEAT_SELECT} />
              {isRepeat && ALLOW_REPEAT_SELECT && (
                <>
                  <RepeatDropdown formSelectorName={FORM_NAME} dateUtc={date} />
                </>
              )}

              <ShowDetailsBottom />
            </div>

            <div className="new-show-form__buttons">
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
  const initialValues = state => {
    const selectedShow = state.show.selected;
    const searchDates = getSearchDate(state.show);
    let startTime = '';
    let endTime = '';
    if (selectedShow !== undefined) {
      if (selectedShow.start !== undefined) {
        startTime = moment(selectedShow.start);
      }
      if (selectedShow.end !== undefined) {
        endTime = moment(selectedShow.end);
      }
    }

    return {
      start_time_utc: startTime,
      end_time_utc: endTime,
      repeat_rule: {
        repeat_start_date: startTime,
      },
      startDate: searchDates.start,
      endDate: searchDates.end,
      is_recurring: false,
    };
  };

  const isRepeat = selector(state, 'is_recurring');
  const date = selector(state, 'start_time_utc');

  return {
    initialValues: initialValues(state),
    isRepeat,
    date,
  };
}

NewShowForm = reduxForm({
  form: FORM_NAME,
})(NewShowForm);

export default connect(mapStateToProps, {})(NewShowForm);
