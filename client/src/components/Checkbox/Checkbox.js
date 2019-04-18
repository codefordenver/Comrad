import React, { Component } from 'react';

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { className, ...rest } = this.props;
    return (
      <div className="checkbox-container">
        <input
          type="checkbox"
          name={this.props.label}
          className={`check-box ${className || ''}`}
          {...rest}
        />
        <span className="checkmark" />
        <div className="checkbox-label">{this.props.label}</div>
      </div>
    );
  }
}

export default Checkbox;
