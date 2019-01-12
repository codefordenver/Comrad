import React, { Component, Fragment } from 'react';
import { alertClear } from '../../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ReactComponent as ExclamationCircle } from '../../images/exclamation-circle-solid.svg';
import { ReactComponent as CheckCircle } from '../../images/check-circle-solid.svg';
import { ReactComponent as InfoCircle } from '../../images/info-circle-solid.svg';
import { ReactComponent as TimesCircle } from '../../images/times-circle-solid.svg';

class Alert extends Component {
  state = {
    display: this.props.display,
  };

  componentWillUnmount() {
    const { alertClear } = this.props;
    alertClear();
  }

  // getDisplayClass()

  getAlertClass = type => {
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
  };

  getIconSVG = type => {
    switch (type) {
      case 'success':
        return <CheckCircle />;
      case 'info':
        return <InfoCircle />;
      case 'error':
        return <ExclamationCircle />;
      case 'warning':
        return <TimesCircle />;
      default:
        break;
    }
  };

  render() {
    const { getAlertClass, getIconSVG, props, state } = this;
    const { display } = state;
    const { header, styleName, type, text, ...rest } = props;

    return (
      <Fragment>
        {display ? (
          <div className={`${getAlertClass(type)} ${styleName}`} {...rest}>
            <div className="alert__symbol">{getIconSVG(type)}</div>
            <div className="alert__body">
              <div className="alert__header">{header}</div>
              <div className="alert__message">{text}</div>
            </div>
          </div>
        ) : null}
      </Fragment>
    );
  }
}

Alert.propTypes = {
  /**
   * Boolean to trigger display
   */
  display: PropTypes.bool,
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
   * Background color
   */
  type: PropTypes.string,
};

Alert.defaultProps = {
  display: false,
  header: '',
  styleName: '',
  text: '',
  type: '',
};

function mapStateToProps(
  state,
  { display: ownDisplay, header: ownHeader, text: ownText, type: ownType },
) {
  const { display, header, text, type } = state.alert;

  return {
    display: display || ownDisplay,
    header: header || ownHeader,
    text: text || ownText,
    type: type || ownType,
  };
}

export default connect(
  mapStateToProps,
  { alertClear },
)(Alert);
