import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import moment from 'moment';
import './_TextArea.scss';

export class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <form>
          <textarea
            className="large-input"
            type="text"
            placeholder="test input"
            rows="5"
            cols="80"
          />
        </form>
      </div>
    );
  }
}

export default TextArea;
