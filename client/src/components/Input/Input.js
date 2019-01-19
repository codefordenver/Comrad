import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { inputClear, inputUpdate } from '../../actions/index';
import validation from '../../utils/validation';

import Feedback from '../Feedback';
import Label from '../Label';
import { ReactComponent as SearchSolid } from '../../images/search-solid.svg';
import { ReactComponent as UserSolid } from '../../images/user-solid.svg';

class Input extends Component {
  state = {};

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

  /**
   * If a string is passed, it will return a react component based on it
   * @param {string} icon
   * @return {element}
   */
  getIconClass(icon) {
    switch (icon) {
      case 'search':
        return <SearchSolid className="icon" />;
      case 'user':
        return <UserSolid className="icon" />;
      default:
        break;
    }
  }

  /**
   * If there is feedback, adding some extra margin to bottom to include it
   * @param {string} feedback
   * @return {string}
   */
  getMarginClass(feedback = '') {
    switch (feedback.length > 0) {
      case true:
        return 'mb-3';
      default:
        return false;
    }
  }

  render() {
    const { getIconClass, getMarginClass, myRef, props } = this;

    const {
      feedback,
      icon,
      invalid,
      label,
      name,
      type,
      className,
      validate,
    } = props;

    return (
      <div
        className={classnames(
          'form-group',
          getMarginClass(feedback),
          className,
        )}
      >
        <input
          ref={myRef}
          className={classnames('input', invalid && 'invalid')}
          name={name}
          type={type}
          validate={validate}
          onBlur={this.handleBlurChange}
          onChange={this.handleInputChange}
        />
        {label && <Label>{label}</Label>}
        {feedback && <Feedback>{feedback}</Feedback>}
        {icon && getIconClass(icon)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { input } = state;

  return {
    input,
  };
}

export default connect(
  mapStateToProps,
  { inputClear, inputUpdate },
)(Input);
