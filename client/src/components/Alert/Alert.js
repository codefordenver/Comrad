import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { alertTypes } from '../../redux/alert';

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
  state = {
    active: false,
  };

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
    type: PropTypes.oneOf(ALERT_TYPES),
  };

  static defaultProps = {
    className: null,
    header: 'Alert',
    message: null,
  };

  componentDidUpdate(prevProps) {
    const { props } = this;
    const { alertInactive } = props;

    if (props.location.pathname !== prevProps.location.pathname) {
      alertInactive();
    }
  }

  handleAlertClose = () => {
    const { alertInactive } = this.props;

    alertInactive();
  };

  render() {
    const { handleAlertClose, props } = this;
    const { alertState, className } = props;

    return (
      <div
        className={classnames(
          'alert',
          alertState.active ? 'alert--active' : 'alert--inactive',
          ALERT_CLASS[alertState.type],
          className,
        )}
      >
        {/* TODO: Need to figure out how to handle clicks */}
        <div className="alert__times" onClick={handleAlertClose}>
          <i className="fas fa-times" />
        </div>
        <div className="alert__icon">{ALERT_ICON[alertState.type]}</div>
        <div className="alert__container">
          <div className="alert__header">{alertState.header}</div>
          <div className="alert__body">{String(alertState.body)}</div>{' '}
          {/* Use String() since the body is sometimes passed response messages from APIs: in case an object is accidentally passed, this will prevent a breaking error */}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ alert }) {
  return {
    alertState: alert,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    alertInactive: () => dispatch({ type: alertTypes.INACTIVE }),
  };
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Alert),
);
