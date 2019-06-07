import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setModalVisibility } from '../../../redux/modal';
import {
  deleteShow,
  deleteShowSeries,
  createInstanceShow,
  updateShow,
} from '../../../redux/show';
import { MODAL_EDIT_SHOW } from '../ShowModalController';

import Button from '../../Button';
import DropdownHost from '../../DropdownHost';

const FORM_OPTIONS = {
  series: (data, deleteFunction) => {
    return (
      <div className="series">
        <div className="series__show-instance">Edit Show Instance</div>
        <div className="series__show-series">Edit Show Series</div>
        <div className="series__delete">Delete This Show</div>
        <Button
          className="series__btn-delete"
          color="danger"
          onClick={() => deleteFunction(data)}
        >
          Delete Entire Series
        </Button>
      </div>
    );
  },
  instance: (data, deleteFunction) => {
    return (
      <div className="instance">
        <div className="series__show-instance">Edit Show Instance</div>
        <div className="series__show-series">Edit Show Series</div>
        <div className="series__delete">Delete This Show</div>
        <Button
          className="regular__btn-delete"
          color="danger"
          onClick={() => deleteFunction(data)}
        >
          Delete Series
        </Button>
      </div>
    );
  },
  regular: (data, deleteFunction) => {
    return (
      <div className="regular">
        <h3>Regular</h3>
        <Button
          className="regular__btn-delete"
          color="danger"
          onClick={() => deleteFunction(data)}
        >
          Delete Show
        </Button>
      </div>
    );
  },
};

class NewShowForm extends Component {
  componentDidMount() {
    const { setModalVisibility, show } = this.props;

    setModalVisibility(false, false, show);
  }

  showEditShowModal = show => {
    const { setModalVisibility } = this.props;

    setModalVisibility(MODAL_EDIT_SHOW, true, show);
  };

  deleteRegularShow = show => {
    const { deleteShow, setModalVisibility } = this.props;

    deleteShow(show._id);
    setModalVisibility(null, false, null);
  };

  deleteSeriesShow = show => {
    const { deleteShowSeries, setModalVisibility } = this.props;

    deleteShowSeries(show.master_show_uid._id);
    setModalVisibility(null, false, null);
  };

  deleteSeriesInstanceShow = show => {
    const { deleteShowSeries, setModalVisibility } = this.props;
    deleteShowSeries(show._id);
    setModalVisibility(null, false, null);
  };

  getShowType(show) {
    if (show._id.includes('-')) {
      return 'series';
    } else if (show.master_show_uid._id) {
      return 'instance';
    } else {
      return 'regular';
    }
  }

  getShowFunction = showType => {
    const {
      deleteRegularShow,
      deleteSeriesShow,
      deleteSeriesInstanceShow,
    } = this;
    const showFunction = {
      series: deleteSeriesShow,
      instance: deleteSeriesInstanceShow,
      regular: deleteRegularShow,
    };

    return showFunction[showType];
  };

  handleHostSelect = host => {
    const { props } = this;
    const { updateShow, show } = props;
    const { _id, master_show_uid } = show;
    const showType = this.getShowType(show);
    console.log(host);
    if (showType === 'series') {
      const { createInstanceShow } = this.props;
      show.show_details.host = host._id;
      createInstanceShow(master_show_uid._id, show);
    } else {
      //Only update host if the show is regular or instance
      updateShow(_id, { 'show_details.host': host._id });
    }
  };

  render() {
    const { getShowType, getShowFunction, props } = this;
    const { show } = props;
    const { _id } = show;
    const { host } = show.show_details;

    const showType = getShowType(show);
    const showFunction = getShowFunction(showType);

    return (
      <main className="show show__padding">
        <section className="show__body">
          {show.show_details.title}
          <div />
          {show._id}
          <div />
          {'Start Time: ' + show.show_start_time_utc}
          <div />
          {'End Time: ' + show.show_end_time_utc}
          <div />
          {'Start Date: ' + show.repeat_rule.repeat_start_date}
          <div />
          {'End Date: ' + show.repeat_rule.repeat_end_date}

          <DropdownHost
            key={_id}
            _id={_id}
            host={host}
            onHostSelect={this.handleHostSelect}
            filterByStatus="Active"
          />
          {FORM_OPTIONS[showType](show, showFunction)}
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
    deleteShow,
    deleteShowSeries,
    createInstanceShow,
    updateShow,
    setModalVisibility,
  },
)(NewShowForm);
