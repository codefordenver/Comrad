import React, { Fragment, Component } from 'react';

import Feedback from '../Feedback';
import Label from '../Label';

class Input extends Component {
  myRef = React.createRef();

  componentDidUpdate() {
    const { current } = this.myRef;
    this.toggleActiveClass(current);
  }

  toggleActiveClass(current) {
    const { classList, value } = current;
    if (value.length > 0) {
      return classList.add('active');
    }

    return classList.remove('active');
  }

  render() {
    const { myRef, props } = this;
    const { feedback = '', label = '', styleName = '', ...rest } = props;

    return (
      <Fragment>
        <input ref={myRef} className={`input ${styleName}`} {...rest} />
        {label && <Label>{label}</Label>}
        {feedback && <Feedback>{feedback}</Feedback>}
      </Fragment>
    );
  }
}

export default Input;
