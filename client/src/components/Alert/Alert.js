import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as ExclamationCircle } from '../../images/exclamation-circle-solid.svg';
import { ReactComponent as CheckCircle } from '../../images/check-circle-solid.svg';
import { ReactComponent as InfoCircle } from '../../images/info-circle-solid.svg';
import { ReactComponent as TimesCircle } from '../../images/times-circle-solid.svg';
import { ReactComponent as TimesSolid } from '../../images/times-solid.svg';

class Alert extends Component {
  state = {
    display: 'open',
  };

  handleDisplayClick = () => {
    const { display } = this.state;
    const newDisplay = display === 'open' ? 'close' : 'open';

    this.setState({
      display: newDisplay,
    });
  };

  getAlertClass(type) {
    switch (type) {
      case 'success':
        return 'alert--success';
      case 'info':
        return 'alert--info';
      case 'error':
        return 'alert--error';
      case 'warning':
        return 'alert--warning';
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
      case 'error':
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
      getIconSVG,
      props,
      state,
    } = this;
    const { display } = state;
    const { header, styleName, type, text, ...rest } = props;

    return (
      <div
        className={`alert ${getAlertClass(type)} ${display} ${styleName}`}
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
   * Additoinal classes added to element
   */
  styleName: PropTypes.string,
  /**
   * Body Text
   */
  text: PropTypes.string,
  /**
   * Background color based on type
   */
  type: PropTypes.oneOf(['success', 'info', 'error', 'warning']),
};

Alert.defaultProps = {
  styleName: '',
};

export default Alert;
