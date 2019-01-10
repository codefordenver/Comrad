import React, { Component, Fragment } from 'react';
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

  handleMouseEnter = event => {
    this.setState({ open: true });
  };

  handleMouseLeave = event => {
    this.setState({ open: false });
  };

  render() {
    const { children, className, placement, text, ...otherProps } = this.props;
    const { open } = this.state;

    const child = React.Children.only(children);
    const updatedChild = React.cloneElement(child, {
      className: classnames(child.props.className, 'tooltip-container'),
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      children: [
        child.props.children,
        <div
          className={classnames('tooltip', `tooltip--${placement}`, {
            'tooltip--open': open,
          })}
        >
          <span className="tooltip__text">{text}</span>
        </div>,
      ],
    });

    return updatedChild;
  }
}

export default Tooltip;
