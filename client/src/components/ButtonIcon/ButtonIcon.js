import React, { Component } from 'react';
import classnames from 'classnames';

export const BUTTON_ICON = {
  pencil: () => <i className="fas fa-pencil-alt" />,
};

export const BUTTON_TYPE = {
  button: 'button',
  submit: 'submit',
};

class ButtonIcon extends Component {
  render() {
    const { props } = this;
    const { className, icon, type } = props;

    return (
      <button
        className={classnames('button-icon', className)}
        type={BUTTON_TYPE[type]}
      >
        {BUTTON_ICON[icon]}
      </button>
    );
  }
}

export default ButtonIcon;
