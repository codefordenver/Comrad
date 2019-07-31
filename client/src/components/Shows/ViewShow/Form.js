import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setModalVisibility } from '../../../redux/modal';
import {
  selectShow,
  deleteShow,
  deleteShowSeries,
  deleteShowInstance,
  createInstanceShow,
  updateShow,
} from '../../../redux/show';
import { MODAL_EDIT_SHOW } from '../ShowModalController';

import DropdownHost from '../../DropdownHost';

class NewShowForm extends Component {
  componentDidMount() {
    const { setModalVisibility, show } = this.props;

    setModalVisibility(false, false, show);
  }

  showEditShowModal = show => {
    const { setModalVisibility, selectShow } = this.props;

    selectShow(show);
    setModalVisibility(MODAL_EDIT_SHOW, true, show);
  };

  deleteRegularShow = show => {
    const { deleteShow, setModalVisibility } = this.props;
    deleteShow(show._id);
    setModalVisibility(null, false, null);
  };

  deleteSeriesShow = show => {
    const { deleteShowSeries, setModalVisibility } = this.props;
    deleteShowSeries(show.master_event_id);
    setModalVisibility(null, false, null);
  };

  deleteInstanceShow = show => {
    const { deleteShowInstance, setModalVisibility } = this.props;
    deleteShowInstance(show.master_event_id, show);
    setModalVisibility(null, false, null);
  };

  getShowType(show) {
    if (show._id.includes('-')) {
      return 'series';
    } else if (show.master_event_id) {
      return 'instance';
    } else {
      return 'regular';
    }
  }

  FORM_OPTIONS = {
    series: data => {
      return (
        <div className="series">
          <div
            className="not_done event__tooltip__edit"
            //onClick={() => this.showEditShowModal(data)}
          >
            Edit Show Instance
          </div>
          <div className="not_done event__tooltip__delete">
            Edit Show Series
          </div>
          <div
            className="event__tooltip__delete"
            onClick={() => this.deleteInstanceShow(data)}
          >
            Delete Instance
          </div>
          <div
            className="event__tooltip__delete"
            onClick={() => this.deleteSeriesShow(data)}
          >
            Delete Series
          </div>
        </div>
      );
    },
    instance: data => {
      return (
        <div className="instance">
          <div
            className="event__tooltip__edit"
            onClick={() => this.showEditShowModal(data)}
          >
            Edit Show Instance
          </div>
          <div className="not_done event__tooltip__delete">
            Edit Show Series
          </div>
          <div
            className="event__tooltip__delete"
            onClick={() => this.deleteRegularShow(data)}
          >
            Delete Instance
          </div>
          <div
            className="event__tooltip__delete"
            onClick={() => this.deleteSeriesShow(data)}
          >
            Delete Series
          </div>
        </div>
      );
    },
    regular: data => {
      return (
        <div className="regular">
          <div
            className="event__tooltip__edit"
            onClick={() => this.showEditShowModal(data)}
          >
            Edit Show
          </div>
          <div
            className="event__tooltip__delete"
            onClick={() => this.deleteRegularShow(data)}
          >
            Delete
          </div>
        </div>
      );
    },
  };

  handleHostSelect = host => {
    const { props } = this;
    const { updateShow, show } = props;
    const { _id, master_event_id } = show;
    const showType = this.getShowType(show);
    if (showType === 'series') {
      const { createInstanceShow } = this.props;
      show.show_details.host = host._id;
      createInstanceShow(master_event_id, show);
    } else {
      //Only update host if the show is regular or instance
      updateShow(_id, { 'show_details.host': host._id });
    }
  };

  showDebugData = show => (
    <div>
      {console.log('Show Tooltip Opened.  Show Data: ')}
      {console.log(show)}
      <div />
      {'Show: ID: ' + show._id}
      <div />
      {'Show Master ID: ' + show.master_event_id}
      <div />
      {'Show Master Time ID: ' + show.master_time_id}
      <div />
      {'Start Time: ' + show.start_time_utc}
      <div />
      {'End Time: ' + show.end_time_utc}
      <div />
      {'Start Date: ' + show.repeat_rule.repeat_start_date}
      <div />
      {'End Date: ' + show.repeat_rule.repeat_end_date}
    </div>
  );

  render() {
    const { getShowType, props } = this;
    const { show } = props;
    const { _id } = show;
    const { host } = show.show_details;

    const showType = getShowType(show);

    return (
      <main className="show show__padding">
        <section className="show__body">
          <div className="event__tooltip__title">{show.show_details.title}</div>

          {false && this.showDebugData(show)}

          <DropdownHost
            key={_id}
            _id={_id}
            host={host}
            onHostSelect={this.handleHostSelect}
            filterByStatus="Active"
          />
          {this.FORM_OPTIONS[showType](show)}
        </section>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    //shows: state.show.data,
  };
}

export default connect(
  mapStateToProps,
  {
    selectShow,
    deleteShow,
    updateShow,
    setModalVisibility,
    deleteShowSeries,
    deleteShowInstance,
    createInstanceShow,
  },
)(NewShowForm);
