import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { messageClear } from '../../actions';

class Alert extends Component {
  componentWillUnmount() {
    const { messageClear } = this.props;
    messageClear();
  }

  getAlertClass(type) {
    switch (type) {
      case 'success':
        return 'alert alert--success';
      case 'info':
        return 'alert alert--info';
      case 'error':
        return 'alert alert--error';
      case 'warning':
        return 'alert alert--warning';
      default:
        break;
    }
  }

  getAlertHeader(type) {
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

  getIconClass(type) {
    switch (type) {
      case 'success':
        return 'fas fa-check-circle';
      case 'info':
        return 'fas fa-info-circle';
      case 'error':
        return 'fas fa-exclamation-circle';
      case 'warning':
        return 'fas fa-times-circle';
      default:
        break;
    }
  }
  render() {
    const { getAlertClass, getAlertHeader, getIconClass, props } = this;
    const { message } = props;
    const { type, text } = message;

    return (
      <Fragment>
        {text ? (
          <div className={getAlertClass(type)}>
            <div className="alert__symbol">
              <i className={getIconClass(type)} />
            </div>
            <div className="alert__title-body">
              <div className="alert__header">{getAlertHeader(type)}</div>
              <div className="alert__body">
                <div className="alert__message">{text}</div>
              </div>
            </div>
          </div>
        ) : null}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    message: state.message,
  };
}

export default connect(
  mapStateToProps,
  { messageClear },
)(Alert);
