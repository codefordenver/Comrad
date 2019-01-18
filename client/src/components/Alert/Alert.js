import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { ReactComponent as ExclamationCircle } from '../../images/exclamation-circle-solid.svg';
import { ReactComponent as CheckCircle } from '../../images/check-circle-solid.svg';
import { ReactComponent as InfoCircle } from '../../images/info-circle-solid.svg';
import { ReactComponent as TimesCircle } from '../../images/times-circle-solid.svg';
import { ReactComponent as TimesSolid } from '../../images/times-solid.svg';

export const ALERT_CLASS = {
  success: 'alert--success',
  info: 'alert--info',
  danger: 'alert--danger',
  warning: 'alert--warning',
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

  getAlertClass(type) {
    switch (type) {
      case 'success':
        return ALERT_CLASS.success;
      case 'info':
        return ALERT_CLASS.info;
      case 'danger':
        return ALERT_CLASS.danger;
      case 'warning':
        return ALERT_CLASS.warning;
      default:
        break;
    }
  }

  getIconSVG(type) {
    switch (type) {
      case 'success':
        return <CheckCircle className="check-circle" />;
      case 'info':
        return <InfoCircle className="info-circle" />;
      case 'danger':
        return <ExclamationCircle className="exclamation-circle" />;
      case 'warning':
        return <TimesCircle className="times-circle" />;
      default:
        break;
    }
  }

  render() {
    const {
      handleDisplayClick,
      getAlertClass,
      getDisplayClass,
      getIconSVG,
      props,
      state,
    } = this;
    const { display } = state;
    const { header, className, type, text, ...rest } = props;

    return (
      <div
        className={classnames(
          'alert',
          getAlertClass(type),
          getDisplayClass(display),
          className,
        )}
        {...rest}
      >
        <div className="alert__times" onClick={handleDisplayClick}>
          <TimesSolid />
        </div>
        <div className="alert__symbol">{getIconSVG(type)}</div>
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
