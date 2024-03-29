import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { showAPI } from '../../../api';
import { setModalVisibility } from '../../../redux/modal';
import {
  selectShow,
  deleteShow,
  remove,
  removeInstanceFromSeries,
  createInstanceShow,
  editShow,
  updateShow,
} from '../../../redux/show';
import { getShowType } from '../../../utils/shows';
import { formatHostName } from '../../../utils/formatters';
import { MODAL_EDIT_SHOW, MODAL_EDIT_SERIES } from '../ShowModalController';

import DeleteModal from '../../DeleteModal';
import DropdownHost from '../../DropdownHost';

class NewShowForm extends Component {
  state = {
    deleteModal: false,
    deleteCallback: null,
  };

  componentDidMount() {
    const { setModalVisibility } = this.props;
    setModalVisibility(false, false, null);
  }

  closeDeleteModal = () => {
    this.setState({ deleteModal: false });
  };

  showEditShowModal = show => {
    const { setModalVisibility, selectShow } = this.props;
    selectShow(show);
    setModalVisibility(MODAL_EDIT_SHOW, true, null);
  };

  showEditInstanceModal = show => {
    const { setModalVisibility, createInstanceShow } = this.props;
    createInstanceShow(show.master_event_id._id, show).then(() => {
      setModalVisibility(MODAL_EDIT_SHOW, true, null);
    });
  };

  showEditSeriesModal = show => {
    const { setModalVisibility, selectShow } = this.props;
    // make an API call to get the data for the master show
    // console.log('showEditSeriesModal', show);
    if (show.master_event_id) {
      showAPI.findById(show.master_event_id._id)
      .then(response => {
        selectShow(response.data);
        setModalVisibility(MODAL_EDIT_SERIES, true, null);
      });
    } else {
      selectShow(show);
      setModalVisibility(MODAL_EDIT_SERIES, true, null);
    }
  };

  deleteRegularShow = show => {
    const { deleteShow, setModalVisibility } = this.props;
    deleteShow(show._id);
    setModalVisibility(null, false, null);
  };

  deleteSeriesShow = show => {
    const { remove, setModalVisibility } = this.props;
    remove(show.master_event_id._id);
    setModalVisibility(null, false, null);
  };

  deleteInstanceShow = show => {
    const { removeInstanceFromSeries, setModalVisibility } = this.props;
    removeInstanceFromSeries(show.master_event_id._id, show);
    setModalVisibility(null, false, null);
  };

  FORM_OPTIONS = {
    series: data => {
      const { auth } = this.props;
      return (
        <div className="event__tooltip__commands series">
          <div>
            <div
              className="event__tooltip__edit"
              onClick={() => this.showEditInstanceModal(data)}
            >
              Edit Show Instance
            </div>
            <div
              className="event__tooltip__edit"
              onClick={() => this.showEditSeriesModal(data)}
            >
              Edit Show Series
            </div>
          </div>
          {auth.doc.roles != null &&
            (auth.doc.roles.indexOf('Admin') !== -1 ||
              auth.doc.roles.indexOf('Full Access') !== -1 ||
              auth.doc.roles.indexOf('Show Captain') !== -1) && (
              <div>
                <div
                  className="event__tooltip__delete"
                  onClick={() =>
                    this.setState({
                      deleteCallback: () => this.deleteInstanceShow(data),
                      deleteModal: {
                        type: 'show instance of ',
                        name: data.show_details.title,
                      },
                    })
                  }
                >
                  Delete Instance
                </div>
                <div
                  className="event__tooltip__delete"
                  onClick={() =>
                    this.setState({
                      deleteCallback: () => this.deleteSeriesShow(data),
                      deleteModal: {
                        type: 'show series',
                        name: data.show_details.title,
                      },
                    })
                  }
                >
                  Delete Series
                </div>
              </div>
            )}
        </div>
      );
    },
    instance: data => {
      const { auth } = this.props;
      return (
        <div className="event__tooltip__commands instance">
          <div>
            <div
              className="event__tooltip__edit"
              onClick={() => this.showEditShowModal(data)}
            >
              Edit Show Instance
            </div>
            {auth.doc.roles != null &&
              (auth.doc.roles.indexOf('Admin') !== -1 ||
                auth.doc.roles.indexOf('Full Access') !== -1 ||
                auth.doc.roles.indexOf('Show Captain') !== -1 ||
                (auth.doc.roles.indexOf('DJ') !== -1 &&
                  auth.doc._id === data.master_event_id.show_details.host)) && (
                <div
                  className="event__tooltip__edit"
                  onClick={() => this.showEditSeriesModal(data.master_event_id)}
                >
                  Edit Show Series
                </div>
              )}
          </div>
          {auth.doc.roles != null &&
            (auth.doc.roles.indexOf('Admin') !== -1 ||
              auth.doc.roles.indexOf('Full Access') !== -1 ||
              auth.doc.roles.indexOf('Show Captain') !== -1) && (
              <div>
                <div
                  className="event__tooltip__delete"
                  onClick={() =>
                    this.setState({
                      deleteCallback: () => this.deleteRegularShow(data),
                      deleteModal: {
                        type: 'show instance of ',
                        name: data.show_details.title,
                      },
                    })
                  }
                >
                  Delete Instance
                </div>
                <div
                  className="event__tooltip__delete"
                  onClick={() =>
                    this.setState({
                      deleteCallback: () => this.deleteSeriesShow(data),
                      deleteModal: {
                        type: 'show series',
                        name: data.show_details.title,
                      },
                    })
                  }
                >
                  Delete Series
                </div>
              </div>
            )}
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
            onClick={() =>
              this.setState({
                deleteCallback: () => this.deleteRegularShow(data),
                deleteModal: {
                  type: 'show',
                  name: data.show_details.title,
                },
              })
            }
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
    const showType = getShowType(show);
    if (showType === 'series') {
      const { createInstanceShow } = this.props;
      show.show_details.host = host._id;
      show.show_details.host_type = host.host_type ? host.host_type : 'User';
      createInstanceShow(master_event_id._id, show);
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
    const { props, state } = this;
    const { deleteModal, deleteCallback } = state;
    const { show, auth, formatHostName } = props;
    const { _id } = show;
    const { host } = show.show_details;

    const showType = getShowType(show);

    let formattedHostName;
    if (host != null) {
      formattedHostName = formatHostName(host);
    }

    return (
      <main className="show show__padding">
        <section className="show__body">
          <div className="event__tooltip__title">{show.show_details.title}</div>

          {/* false && this.showDebugData(show) */}
          {auth.doc.roles != null &&
            (auth.doc.roles.indexOf('Admin') !== -1 ||
              auth.doc.roles.indexOf('Full Access') !== -1 ||
              auth.doc.roles.indexOf('Show Captain') !== -1) && (
              <>
                <DropdownHost
                  key={_id}
                  _id={_id}
                  host={host}
                  onHostSelect={this.handleHostSelect}
                  filterByStatus="Active"
                />
                {this.FORM_OPTIONS[showType](show)}
              </>
            )}
          {auth.doc.roles != null &&
            auth.doc.roles.indexOf('Admin') === -1 &&
            auth.doc.roles.indexOf('Full Access') === -1 &&
            auth.doc.roles.indexOf('Show Captain') === -1 && (
              <div>
                <b>Host: </b>
                {host != null && <>{formattedHostName}</>}
                {(host === null || typeof host === 'undefined') && <>None</>}
              </div>
            )}
          {auth.doc.roles != null &&
            auth.doc.roles.indexOf('DJ') !== -1 &&
            host != null &&
            auth.doc._id === host._id && (
              <>{this.FORM_OPTIONS[showType](show)}</>
            )}
        </section>
        {/* Delete modal */}
        {deleteModal ? (
          <DeleteModal
            deleteModal={deleteModal}
            closeDeleteModal={this.closeDeleteModal}
            deleteCallback={deleteCallback}
          />
        ) : null}
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    //shows: state.show.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    formatHostName: formatHostName,
    selectShow: bindActionCreators(selectShow, dispatch),
    deleteShow: bindActionCreators(deleteShow, dispatch),
    updateShow: bindActionCreators(updateShow, dispatch),
    setModalVisibility: bindActionCreators(setModalVisibility, dispatch),
    remove: bindActionCreators(remove, dispatch),
    removeInstanceFromSeries: bindActionCreators(
      removeInstanceFromSeries,
      dispatch,
    ),
    createInstanceShow: bindActionCreators(createInstanceShow, dispatch),
    editShow: bindActionCreators(editShow, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewShowForm);
