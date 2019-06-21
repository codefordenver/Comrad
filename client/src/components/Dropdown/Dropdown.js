import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const DROPDOWN_TYPE = {
  button: ({ text }, { active }) => (
    <div className={classnames('dropdown__button', active && 'active')}>
      <div className="dropdown__button-text">{text}</div>
      <i className="fas fa-plus" />
    </div>
  ),
  icon: ({ src, faClass }) => (
    <div className="dropdown__icon">
      {src ? (
        <img alt="profile=" className="dropdown__img" src={src} />
      ) : faClass ? (
        <i className={faClass} />
      ) : (
        <i className="fas fa-user" />
      )}
    </div>
  ),
};

class Dropdown extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    /**
     * Additional classes added to element
     */
    className: PropTypes.string,
    /**
     * Direction dropdown will appear
     */
    position: PropTypes.oneOf([
      'bottom-left',
      'bottom-right',
      'top-left',
      'top-right',
      'right-top',
      'right-centered',
    ]),
    /**
     * What the shape of the dropdown will look like
     */
    type: PropTypes.oneOf(['button', 'icon']),
  };

  static defaultProps = {
    className: null,
  };

  static Item = props => {
    const { children, handleOnClick, to } = props;

    if (to) {
      return (
        <Link className="dropdown__item" to={to}>
          {children}
        </Link>
      );
    }

    if (handleOnClick) {
      return (
        <div className="dropdown__item" onClick={handleOnClick}>
          {children}
        </div>
      );
    }

    return <div className="dropdown__item">{children}</div>;
  };

  state = {
    active: false,
  };

  node = React.createRef();

  componentDidUpdate() {
    const { setClickListener, state, removeClickListener } = this;
    const { active } = state;

    if (active) {
      setClickListener();
    } else {
      removeClickListener();
    }
  }

  handleOnClick = e => {
    const { node } = this;
    const { target } = e;

    if (node && node.contains(target)) {
      this.setState(prevProps => ({
        active: !prevProps.active,
      }));
    } else {
      this.setState({
        active: false,
      });
    }
  };

  setClickListener = () => {
    document.addEventListener('click', this.handleOnClick);
  };

  removeClickListener = () => {
    document.removeEventListener('click', this.handleOnClick);
  };

  render() {
    const { handleOnClick, props, state } = this;
    const { children, className, position, type } = props;
    const { active } = state;

    return (
      <div
        className={classnames('dropdown', className)}
        ref={ref => (this.node = ref)}
      >
        <div className="dropdown__type" onClick={handleOnClick}>
          {DROPDOWN_TYPE[type](props, state)}
        </div>
        <div
          className={classnames('dropdown__list', active && 'active', position)}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default Dropdown;
