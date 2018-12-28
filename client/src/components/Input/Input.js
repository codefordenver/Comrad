import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { inputClear, inputUpdate } from '../../actions/index';
import validation from '../../utils/validation';

import Feedback from '../Feedback';
import Label from '../Label';

class Input extends Component {
  myRef = React.createRef();

  componentDidUpdate() {
    const { current } = this.myRef;
    this.toggleActiveClass(current);
  }

  componentWillUnmount() {
    const { name, inputClear } = this.props;
    inputClear(name);
  }

  toggleActiveClass(current) {
    const { classList, value } = current;
    if (value.length > 0) {
      return classList.add('active');
    }

    return classList.remove('active');
  }

  handleInputChange = e => {
    const { inputUpdate, validate } = this.props;
    const { classList, name, value } = e.target;

    if (validate) {
      const valid = validation.input(validate, value);
      valid ? classList.remove('invalid') : classList.add('invalid');
    }
    inputUpdate({ [name]: value });
  };

  handleBlurChange = e => {
    const { classList, value } = e.target;
    const { validate } = this.props;

    if (validate) {
      const valid = validation.input(validate, value);
      valid ? classList.remove('invalid') : classList.add('invalid');
    }
  };

  render() {
    const { myRef, props } = this;
    const { feedback, label, name, type, styleName = '', validate } = props;

    return (
      <Fragment>
        <input
          ref={myRef}
          className={`input ${styleName}`}
          name={name}
          type={type}
          validate={validate}
          onBlur={this.handleBlurChange}
          onChange={this.handleInputChange}
        />
        {label && <Label>{label}</Label>}
        {feedback && <Feedback>{feedback}</Feedback>}
      </Fragment>
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
  { inputClear, inputUpdate },
)(Input);
