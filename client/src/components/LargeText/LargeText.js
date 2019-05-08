import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class LargeText extends Component {
  static propTypes = {
    children: PropTypes.string,
  };

  static defaultProps = {
    align: 'left',
    children: null,
  };

  render() {
    const { align, children } = this.props;

    return (
      <div className={classnames('large-text', `text-${align}`)}>
        {children}
      </div>
    );
  }
}

export default LargeText;
