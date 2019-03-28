import React, { Component } from 'react';
import classnames from 'classnames';

export const BUTTON_ICON = {
  cancel: 'fas fa-times',
  confirm: 'fas fa-check',
  pencil: 'fas fa-pencil-alt',
};

export const BUTTON_SIZE = {
  medium: '',
  small: 'button-icon--small',
};

export const BUTTON_TYPE = {
  button: 'button',
  submit: 'submit',
};

class ButtonIcon extends Component {
  render() {
    const { props } = this;
    const { className, icon, onClick, onMouseDown, size, type } = props;

    return (
      <button
        className={classnames(
          'button-icon',
          BUTTON_ICON[icon],
          BUTTON_SIZE[size],
          className,
        )}
        onClick={onClick}
        onMouseDown={onMouseDown}
        type={BUTTON_TYPE[type]}
      />
    );
  }
}

export default ButtonIcon;
