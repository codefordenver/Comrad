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
    text: PropTypes.string,
    /**
     * Background color based on type
     */
    type: PropTypes.oneOf(['success', 'info', 'danger', 'warning']),
  };

  handleToggle = () => {
    console.log('Handle Toggle Function');
  };

  render() {
    const { handleToggle, props } = this;
    const { display, header, className, type, text } = props;
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

        {/* <div className="alert__times" onClick={handleToggle}>
          <i className="fas fa-times" />
        </div> */}
        <div className="alert__symbol">{ICON_SET[type]}</div>
        <div className="alert__body">
          <div className="alert__header">{header}</div>
          <div className="alert__message">{text}</div>
        </div>
      </div>
    );
  }
}

export default Alert;
