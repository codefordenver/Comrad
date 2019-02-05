import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

import moment from 'moment';

import Button from '../../Button';
import Card from '../../Card';
import Checkbox from '../../Checkbox';
import Form from '../../Form';
import Input from '../../Input';

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

  render() {
    console.log('New Show Model Open');
    console.log(this.props);
    return (
      <main className="show show__padding">
        <section className="show__body">
          <h1>You Clicked a Show!</h1>

          <h2>Edit Instance</h2>
          <h2>Edit Show Series</h2>
          <h2>Delete Series</h2>
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
