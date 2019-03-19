import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RCTooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

function preventDefault(e) {
  e.preventDefault();
}

class Tooltip extends Component {
  constructor(props) {
    super(props);
    this.escFunction = this.escFunction.bind(this);
  }

  state = {
    visible: false,
  };

  static propTypes = {
    /**
     * Any component that can be wrapped in JSX
     */
    children: PropTypes.node.isRequired,
    /**
     * Any additional classes added
     */
    className: PropTypes.string,
    /**
     * Set the default placement of the tooltip
     */
    placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
    /**
     * Overlay sets the content that is shown within the tooltip popup.
     */
    overlay: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
      .isRequired,
    /**
     * Set if the tooltip should be shown on mouse hover or mouse click
     */
    trigger: PropTypes.oneOf(['hover', 'click']).isRequired,
    /**
     * Destory the tooltip when it is hidden.  This will unmount the tooltip.
     */
    destroyTooltipOnHide: PropTypes.bool,
    /**
     * For on hover tooltips, can set the delay (in seconds) when leaving the tooltip area.
     */
    mouseLeaveDelay: PropTypes.number,
    /**
     * Used to set a unique id on the tooltip component for accessability
     */
    id: PropTypes.string,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false);
  }

  escFunction(event) {
    //https://stackoverflow.com/questions/37440408/how-to-detect-esc-key-press-in-react-and-how-to-handle-it
    if (event.keyCode === 27) {
      this.setState({
        visible: false,
      });
    }
  }

  onVisibleChange = visible => {
    this.setState({
      visible,
    });
  };

  render() {
    const {
      children,
      className,
      placement,
      text,
      overlay,
      trigger,
      destroyTooltipOnHide = false,
      mouseLeaveDelay = 0,
      ...rest
    } = this.props;

    const { visible } = this.state;

    return (
      <RCTooltip
        className={className}
        trigger={trigger}
        overlay={overlay}
        placement={placement}
        //Visible and onVisableChange are used for trigger='click' tooltips
        visible={visible}
        onVisibleChange={this.onVisibleChange}
        destroyTooltipOnHide={destroyTooltipOnHide}
        mouseLeaveDelay={mouseLeaveDelay}
        {...rest}
      >
        {children}
      </RCTooltip>
    );
  }
}

export default Tooltip;
