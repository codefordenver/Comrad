import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { messageClear } from '../../actions';
import _isEmpty from 'lodash/isEmpty';

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
    const { getAlertClass, getIconClass, props } = this;
    const { message } = props;
    const { header, type, text } = message;

    return (
      <Fragment>
        {_isEmpty(message) ? null : (
          <div className={getAlertClass(type)}>
            <div className="alert__symbol">
              <i className={getIconClass(type)} />
            </div>
            <div className="alert__title-body">
              <div className="alert__header">{header}</div>
              <div className="alert__body">
                <div className="alert__message">{text}</div>
              </div>
            </div>
          </div>
        )}
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
