import React, { Component } from 'react';
import classNames from 'classnames';

import { DropdownIcon } from './DropdownIcon';
import { DropdownPlus } from './DropdownPlus';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.state = { active: false };
  }

  handleClick = event => {
    console.log('handle click', this.node.contains(event.target));
    if (this.node.contains(event.target)) {
      console.log('contains');
      this.setState(prevProps => ({
        active: !prevProps.active,
      }));
    } else {
      console.log("doesn't contain");
      this.setState({
        active: false,
      });
    }
  };

  componentWillMount() {
    document.addEventListener('click', this.handleClick);
    console.log('component will mount');
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
    console.log('component will unmount');
  }

  render() {
    const { props, state } = this;
    const { children, className, dropdownPosition, type } = props;

    let button = [];
    switch (type) {
      case 'icon':
        button.push(<DropdownIcon icon={this.props.icon} />);
        break;
      case 'circle':
        break;
      case 'plus':
      default:
        button.push(<DropdownPlus text={this.props.text} />);
    }

    let dropdownListAdditionalClass = '';
    if (typeof dropdownPosition !== 'undefined') {
      switch (dropdownPosition) {
        case 'belowAndAlignAgainstRight':
          dropdownListAdditionalClass =
            'dropdown__list--below-and-align-against-right';
          break;
        default:
      }
    }

    return (
      <div className={classNames('dropdown', className)}>
        <div ref={node => (this.node = node)}>
          <div className="dropdown__button" onClick={this.handleClick}>
            {button}
          </div>
        </div>
        <div
          className={`dropdown__list ${
            this.state.active ? 'active' : ''
          } ${dropdownListAdditionalClass}`}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default Dropdown;
/*
import React, { Component } from 'react';
import classnames from 'classnames';

import { DropdownIcon } from './DropdownIcon';
import { DropdownPlus } from './DropdownPlus';

class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.node = React.createRef()
    this.state = {
      active: false,
    };
  }


  componentWillMount() {
    document.addEventListener('click', this.handleClickOutside);
    console.log('component will mount')
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutSide);
    console.log('component will unmount')
  }

  handleClick = e => {
    this.setState(prevProps => ({
      active: !prevProps.active,
    }));
  };
  handleClick = () => {
    console.log('handle click')
    console.log('contains')
    this.setState({
      active: !this.state.active
    })
  }

  handleClickOutside = event => {
    if (!this.node.contains(event.target)) {
      this.setState({
        active: false
      })
    }
  }

  render() {
    const { props, state } = this;
    const { children, className, dropdownPosition, type } = props;
    const { active } = state;

    let button = [];
    switch (type) {
      case 'icon':
        button.push(<DropdownIcon icon={this.props.icon} />);
        break;
      case 'circle':
        break;
      case 'plus':
      default:
        button.push(<DropdownPlus text={this.props.text} />);
    }

    let dropdownListAdditionalClass = '';
    if (typeof dropdownPosition !== 'undefined') {
      switch (dropdownPosition) {
        case 'belowAndAlignAgainstRight':
          dropdownListAdditionalClass =
            'dropdown__list--below-and-align-against-right';
          break;
        default:
      }
    }

    return (
      <div className={classnames('dropdown', className)}>
        <div ref={node => this.node = node}>
          <div className="dropdown__button" onClick={this.handleClick}>
            {button}
          </div>
        </div>
        <div
          className={`dropdown__list ${
            active ? 'active' : ''
          } ${dropdownListAdditionalClass}`}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default Dropdown;
*/
