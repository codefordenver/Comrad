import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { MODAL_EDIT_SHOW } from '../ShowModalController';

import moment from 'moment';

import Button from '../../Button';
import Card from '../../Card';
import Checkbox from '../../Checkbox';
import Form from '../../Form';
import Input from '../../Input';

import ModalClose from '../../Modal/Modal__Button_Close';

class NewShowForm extends Component {
  componentDidMount() {
    this.props.inputUpdate({ repeat: false });
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.props.inputUpdate({ [name]: value });
  };

  handleCheckboxChange = e => {
    const { repeat } = this.props.input;
    this.props.inputUpdateShowRepeatCheckbox({ repeat: !repeat });
  };

  handleFormSubmit = () => {
    this.props.setModalVisibility(null, false);
  };

  handleFormCancel = e => {
    e.preventDefault();
    this.props.setModalVisibility(null, false);
  };

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

            <h2>Edit Show Series</h2>
            <h2>Delete Single Show</h2>
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
    console.log('New Show Model Open');
    console.log(this.props);

    const showType = this.checkShowType(data);

    return (
      <main className="show show__padding">
        <section className="show__body">
          <h1>You Clicked a Show!</h1>

          {this.showOptions(showType, data)}
          <ModalClose />
        </section>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    input: state.input,
  };
}

export default connect(
  mapStateToProps,
  actions,
)(NewShowForm);
