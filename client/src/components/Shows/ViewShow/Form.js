import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setModalVisibility } from '../../../redux/modal';
import { deleteShow, deleteShowSeries } from '../../../redux/show';
import { MODAL_EDIT_SHOW } from '../ShowModalController';

import ModalClose from '../../Modal/Modal__Button_Close';

import DownshiftHost from './DownshiftHost';

class NewShowForm extends Component {
  componentDidMount() {
    console.log('Form mounting');
    const { show } = this.props;
    const { setModalVisibility } = this.props;
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

  checkShowType(show) {
    if (show._id.includes('-')) {
      return 'series';
    } else if (show.master_show_uid) {
      return 'instance';
    } else {
      return 'regular';
    }
  }

  showOptions(type, data) {
    switch (type) {
      case 'series':
        return (
          <div>
            {/*<div>
              <Button
                color="primary"
                onClick={() => {
                  this.showEditShowModal(data);
                }}
              >
                Edit Instance
              </Button>
              </div>*/}
            <div>Edit Show Instance</div>
            <div>Edit Show Series</div>
            <div>Delete Single Show</div>
            <button
              onClick={() => {
                this.deleteSeriesShow(data);
              }}
            >
              Delete Series
            </button>
          </div>
        );

      case 'regular':
        return (
          <div>
            {/*<div>
              <Button
                color="primary"
                onClick={() => {
                  this.showEditShowModal(data);
                }}
              >
                Edit Instance
              </Button>
              </div>*/}
            <button
              onClick={() => {
                this.deleteRegularShow(data);
              }}
            >
              Delete Series
            </button>
          </div>
        );

      default:
        break;
    }
  }

  render() {
    const { show } = this.props;
    const { _id } = show;
    const showType = this.checkShowType(show);
    const { host } = this.props.shows[_id].show_details;

    const setHost = host => {
      if (host) {
        let firstname,
          lastname = '';
        firstname = host.profile.first_name || '';
        lastname = host.profile.last_name || '';
        return `${firstname} ${lastname}`;
      }
      return;
    };

    return (
      <main className="show show__padding">
        <section className="show__body">
          <DownshiftHost key={_id} _id={_id} host={setHost(host)} />
          {this.showOptions(showType, show)}
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
