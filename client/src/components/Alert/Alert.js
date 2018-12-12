import React, { Component } from 'react';

class Alert extends Component {
  getAlertClass(props) {
    const { type } = props;
    let alertClass = 'alert';

    switch (type) {
      case 'success':
        return (alertClass += ' alert--success');
      case 'info':
        return (alertClass += ' alert--info');
      case 'error':
        return (alertClass += ' alert--error');
      case 'warning':
        return (alertClass += ' alert--warning');
      default:
        break;
    }
  }

  getAlertHeader(props) {
    const { type } = props;

    switch (type) {
      case 'success':
        return 'Success Status';
      case 'info':
        return 'Information Status';
      case 'error':
        return 'Error Status';
      case 'warning':
        return 'Warning Status';
      default:
        break;
    }
  }

  getIconClass(props) {
    const { type } = props;
    let iconClass = 'fas fa-2x';

    switch (type) {
      case 'success':
        return (iconClass += ' fa-check-circle');
      case 'info':
        return (iconClass += ' fa-info-circle');
      case 'error':
        return (iconClass += ' fa-exclamation-circle');
      case 'warning':
        return (iconClass += ' fa-times-circle');
      default:
        break;
    }
  }
  render() {
    const { getAlertClass, getAlertHeader, getIconClass, props } = this;
    const { children } = props;

    return (
      <div className={getAlertClass(props)}>
        <div className="alert__symbol">
          <i className={getIconClass(props)} />
        </div>
        <div className="alert__title-body">
          <div className="alert__header">{getAlertHeader(props)}</div>
          <div className="alert__body">{children}</div>
        </div>
      </div>
    );
  }
}

export default Alert;
