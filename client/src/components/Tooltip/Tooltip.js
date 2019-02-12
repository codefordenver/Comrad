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
      ...rest
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
          role="tooltip"
          key="tooltip"
        >
          <section className="tooltip__content">
            {heading ? <h1 className="tooltip__heading">{heading}</h1> : null}
            <p className="tooltip__text">{text}</p>
          </section>
        </div>,
      ],
      ...rest,
    });

    return updatedChild;
  }
}

export default Tooltip;
