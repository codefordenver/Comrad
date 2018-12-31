import React, { Component } from 'react';

class CircleDropdown extends Component {
  state = {
    active: false,
  };

  componentWillMount() {
    document.addEventListener('click', this.toggleActive, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.toggleActive, false);
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  toggleActive = e => {
    const { active } = this.state;

    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.setState({
        active: false,
      });
      return;
    }

    // if (active) {
    //   this.setState({
    //     active: false,
    //   });
    //   return;
    // }

    this.setState(prevState => ({
      active: true,
    }));
  };

  render() {
    const { state, toggleActive, setWrapperRef } = this;
    const { active } = state;

    return (
      <div className="circle-drop">
        <div
          ref={setWrapperRef}
          className="circle-drop__icon"
          onClick={toggleActive}
        />
        <div className={`circle-drop__list ${active ? 'active' : ''}`}>
          <div className="circle-drop__item">Dropdown Item</div>
          <div className="circle-drop__item">Dropdown Item</div>
          <div className="circle-drop__item">Dropdown Item</div>
        </div>
      </div>
    );
  }
}

export default CircleDropdown;
