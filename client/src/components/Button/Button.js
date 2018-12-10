import React, { Component } from 'react';

class Button extends Component {

  getButtonClass(props) {
    const { type } = props
    let buttonClass = "button"

    switch (type) {
      case "primary":
        return buttonClass += " button--primary"
      case "secondary":
        return buttonClass += " button--secondary"
      default:
        break;
    }
  }

  render() {
    const { props, getButtonClass } = this
    const { children } = props
    
    return (
      <button className={getButtonClass(props)} {...props}>{children}</button>
    )
  }
}

export default Button