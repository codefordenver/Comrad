import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export const ALERT_TYPES = ['success', 'info', 'danger', 'warning'];

export const ALERT_CLASS = {
  success: 'alert--success',
  info: 'alert--info',
  danger: 'alert--danger',
  warning: 'alert--warning',
};

export const ALERT_ICON = {
  success: <i className="fas fa-check-circle" />,
  info: <i className="fas fa-info-circle" />,
  danger: <i className="fas fa-exclamation-circle" />,
  warning: <i className="fas fa-times-circle" />,
};

class Alert extends Component {
  static propTypes = {
    /**
     * Additional classes added to root element
     */
    className: PropTypes.string,
    /**
     * Header Text
     */
    header: PropTypes.string,
    /**
     * Body Text
     */
    message: PropTypes.string,
    /**
     * Background color based on type
     */
    type: PropTypes.oneOf(ALERT_TYPES).isRequired,
  };

  static defaultProps = {
    className: null,
    header: 'Alert',
    message: null,
  };

  componentWillUnmount() {
    const { alertClose } = this.props;

    alertClose();
  }

  render() {
    const { props } = this;
    const { alertClose, className, display, header, type, message } = props;

    return (
      <div
        className={classnames(
          'alert',
          ALERT_CLASS[type],
          display ? 'open' : 'close',
          className,
        )}
      >
        {/* TODO: Need to figure out how to handle clicks */}
        <div className="alert__times" onClick={alertClose}>
          <i className="fas fa-times" />
        </div>
        <div className="alert__icon">{ALERT_ICON[type]}</div>
        <div className="alert__body">
          <div className="alert__header">{header}</div>
          <div className="alert__message">{message}</div>
        </div>
      </div>
    );
  }
}

export default Alert;
