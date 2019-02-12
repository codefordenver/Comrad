import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

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

  getIconFont(type) {
    switch (type) {
      case 'success':
        return <i class="fas fa-check-circle" />;
      case 'info':
        return <i class="fas fa-info-circle" />;
      case 'danger':
        return <i class="fas fa-exclamation-circle" />;
      case 'warning':
        return <i class="fas fa-times-circle" />;
      default:
        break;
    }
  }

  render() {
    const {
      handleDisplayClick,
      getAlertClass,
      getDisplayClass,
      getIconFont,
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
          <i class="fas fa-times" />
        </div>
        <div className="alert__symbol">{getIconFont(type)}</div>
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
