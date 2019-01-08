import React, { Component } from 'react';
import classnames from 'classnames';

class Tooltip extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

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
