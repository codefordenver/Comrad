import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export const ALERT_CLASS = {
  success: 'alert--success',
  info: 'alert--info',
  danger: 'alert--danger',
  warning: 'alert--warning',
};

export const ICON_SET = {
  success: '<i className="fas fa-check-circle" />',
  info: '<i className="fas fa-info-circle" />',
  danger: '<i className="fas fa-exclamation-circle" />',
  warning: '<i className="fas fa-times-circle" />',
};

class Alert extends Component {
  state = {
    display: true,
  };

  handleDisplayClick = () => {
    this.setState(prevProps => ({
      display: !prevProps.display,
    }));
  };

  getDisplayClass(display) {
    if (display) {
      return 'open';
    }

    return 'close';
  }

  render() {
    const { handleDisplayClick, getDisplayClass, props, state } = this;
    const { display } = state;
    const { header, className, type, text, ...rest } = props;

    return (
      <div
        className={classnames(
          'alert',
          ALERT_CLASS[type],
          getDisplayClass(display),
          className,
        )}
        {...rest}
      >
        <div className="alert__times" onClick={handleDisplayClick}>
          <i className="fas fa-times" />
        </div>
        <div className="alert__symbol">{ICON_SET[type]}</div>
        <div className="alert__body">
          <div className="alert__header">{header}</div>
          <div className="alert__message">{text}</div>
        </div>
      </div>
    );
  }
}

Alert.propTypes = {
  /**
   * Header Text
   */
  header: PropTypes.string,
  /**
   * Additional classes added to root element
   */
  className: PropTypes.string,
  /**
   * Body Text
   */
  text: PropTypes.string,
  /**
   * Background color based on type
   */
  type: PropTypes.oneOf(['success', 'info', 'danger', 'warning']),
};

export default Alert;
