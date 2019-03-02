import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setModalVisibility } from '../../../redux/modal';
import { deleteShow, deleteShowSeries } from '../../../redux/show';
import { MODAL_EDIT_SHOW } from '../ShowModalController';

import Button from '../../Button';

import ModalClose from '../../Modal/Modal__Button_Close';

import DropdownDJ from './Dropdown_DJ';

class NewShowForm extends Component {
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
            <div>
              <Button
                color="primary"
                onClick={() => {
                  this.showEditShowModal(data);
                }}
              >
                Edit Instance
              </Button>
            </div>

            <p>Edit Show Series</p>
            <p>Delete Single Show</p>
            <div>
              <Button
                color="primary"
                onClick={() => {
                  this.deleteSeriesShow(data);
                }}
              >
                Delete Series
              </Button>
            </div>
          </div>
        );

      case 'regular':
        return (
          <div>
            <div>
              <Button
                color="primary"
                onClick={() => {
                  this.showEditShowModal(data);
                }}
              >
                Edit Show
              </Button>
            </div>

            <div>
              <Button
                color="primary"
                onClick={() => {
                  this.deleteRegularShow(data);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        );

      default:
        break;
    }
  }

  render() {
    const { data } = this.props;
    const { _id } = data;
    const { host } = this.props.shows[_id].show_details;
    let firstname,
      lastname = '';
    console.log(data);

    if (host) {
      firstname = host.profile.first_name || '';
      lastname = host.profile.last_name || '';
    }

    const showType = this.checkShowType(data);

    return (
      <main className="show show__padding">
        <section className="show__body">
          <DropdownDJ />

          <p>{`Current DJ: ${firstname} ${lastname}`}</p>

          <p />

          {this.showOptions(showType, data)}

          <ModalClose />
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
