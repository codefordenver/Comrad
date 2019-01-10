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
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
    text: PropTypes.string.isRequired,
    heading: PropTypes.string,
  };

  static defaultProps = {
    className: null,
    heading: null,
  };

  handleMouseEnter = event => {
    this.setState({ open: true });
  };

  handleMouseLeave = event => {
    this.setState({ open: false });
  };

  render() {
    const {
      children,
      className,
      placement,
      text,
      heading,
      ...otherProps
    } = this.props;
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
          {heading ? <h3 className="tooltip__heading">{heading}</h3> : null}
          <p className="tooltip__text">{text}</p>
        </div>,
      ],
      ...otherProps,
    });

    return updatedChild;
  }
}

export default Tooltip;
