import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Tooltip extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  static propTypes = {
    text: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
  };

  handleMouseOver = event => {
    event.preventDefault();
    this.setState({ open: true });
  };

  handleMouseOut = event => {
    event.preventDefault();
    this.setState({ open: false });
  };

  render() {
    const { children, placement, text, ...otherProps } = this.props;
    const { open } = this.state;

    return (
      <div
        className="tooltip-container"
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        {...otherProps}
      >
        {children}
        <div
          className={classnames('tooltip', `tooltip--${placement}`, {
            'tooltip--open': open,
          })}
        >
          <span className="tooltip__text">{text}</span>
        </div>
      </div>
    );
  }
}

export default Tooltip;
