import React, { Component } from 'react';
import { connect } from 'react-redux';

import ModalClose from '../../Modal/Modal__Button_Close';

class NewShowForm extends Component {
  render() {
    return (
      <main className="show show__padding">
        <section className="show__body">
          <h1>Editing show modal</h1>

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
  {},
)(NewShowForm);
