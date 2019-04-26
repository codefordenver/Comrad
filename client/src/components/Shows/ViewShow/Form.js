import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setModalVisibility } from '../../../redux/modal';
import { deleteShow, deleteShowSeries } from '../../../redux/show';
import { MODAL_EDIT_SHOW } from '../ShowModalController';

import Button from '../../Button';
import DownshiftHost from './DownshiftHost';

const FORM_OPTIONS = {
  series: (data, deleteSereisShow) => {
    return (
      <div className="series">
        <div className="series__show-instance">Edit Show Instance</div>
        <div className="series__show-series">Edit Show Series</div>
        <div className="series__delete">Delete</div>
        <Button
          className="series__btn-delete"
          color="danger"
          onClick={() => deleteSereisShow(data)}
        >
          Delete Series
        </Button>
      </div>
    );
  },
  regular: (data, deleteRegularShow) => {
    return (
      <div className="regular">
        <Button
          className="regular__btn-delete"
          color="danger"
          onClick={() => deleteRegularShow(data)}
        >
          Delete Series
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

    deleteShowSeries(show.master_show_uid);
    setModalVisibility(null, false, null);
  };

  getHost = host => {
    if (host) {
      const { first_name, last_name } = host.profile;
      let firstname = first_name || '';
      let lastname = last_name || '';

      return `${firstname} ${lastname}`;
    }

    return null;
  };

  getShowType(show) {
    if (show._id.includes('-')) {
      return 'series';
    } else if (show.master_show_uid) {
      return 'instance';
    } else {
      return 'regular';
    }
  }

  getShowFunction = showType => {
    const { deleteRegularShow, deleteSeriesShow } = this;
    const showFunction = {
      series: deleteSeriesShow,
      regular: deleteRegularShow,
    };

    return showFunction[showType];
  };

  render() {
    const { getShowType, getShowFunction, props, getHost } = this;
    const { show, shows } = props;
    const { _id } = show;
    const { host } = shows[_id].show_details;

    const showType = getShowType(show);
    const showFunction = getShowFunction(showType);

    return (
      <main className="show show__padding">
        <section className="show__body">
          <DownshiftHost key={_id} _id={_id} host={getHost(host)} />
          {FORM_OPTIONS[showType](show, showFunction)}
        </section>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    shows: state.show.data,
  };
}

export default connect(
  mapStateToProps,
  {
    deleteShow,
    deleteShowSeries,
    setModalVisibility,
  },
)(NewShowForm);
